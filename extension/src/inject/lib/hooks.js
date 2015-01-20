var modules, hooks = {};

chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
        modules.trigger(request.action, {
            data: request.data,
            err: request.err
        });
    });

modules = {
    send: function(args) {
        chrome.runtime.sendMessage({
            action: args.action,
            method: args.method,
            args: args.args
        });
    },
    on: function(eventName, fn) {
        if (hooks[eventName]) {
            hooks[eventName].push(fn)
        } else {
            hooks[eventName] = [fn]
        }
    },
    trigger: function(eventName, data) {
        console.log('triggering');
        if (hooks[eventName]) {
            hooks[eventName].forEach(function(fn) {
                fn(data);
            });
        } else {
            console.log('no hook')
        }
    }
}
