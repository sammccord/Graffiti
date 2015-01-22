var Game = new Graffiti('http://192.168.1.120:9000');
var socket = io.connect('http://192.168.1.120:9000',{
	path: '/socket.io-client',
	transports: ['websocket'],
	'force new connection': true
});


chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if (changeInfo.status && changeInfo.status == 'complete') {
        chrome.tabs.sendMessage(tabId, {
        	//message
        	action: 'init',
        	err: null,
        	data: null
        }, function(response) {
        		if(response) console.log(response);
        });
    }
})

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	Game[message.action.split(':')[0]]()[message.method](message.args,function(err,data){
		chrome.tabs.sendMessage(sender.tab.id,{
			action:message.action,
			data:data,
			err:err
		});
	})
})

chrome.storage.onChanged.addListener(function(changes, namespace) {
    for (key in changes) {
        var storageChange = changes[key];
        console.log('Storage key "%s" in namespace "%s" changed. ' +
            'Old value was "%s", new value is "%s".',
            key,
            namespace,
            storageChange.oldValue,
            storageChange.newValue);
    }
});