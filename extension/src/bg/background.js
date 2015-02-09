//PUT YOUR IP ADDRESS HERE with http:// in front of it. It's important.
var Graffiti = new Graffiti('http://192.168.1.15:9000');
var socket = io.connect('http://192.168.1.15:9000', {
    path: '/socket.io-client',
    transports: ['websocket'],
    'force new connection': true
});

chrome.storage.local.clear()

var user = {};
getIdentity();

socket.on('page:save', function(doc) {
    console.log('received from socket', doc);
    chrome.tabs.query({}, function(tabs) {
        tabs.forEach(function(tab) {
            var href = tab.url.split('/');
            var domain = href[2].replace(/\./g, '+');
            href.splice(0, 3);
            var path = href.join('+');
            if (doc.name === (domain + '+' + path)) {
                return chrome.tabs.sendMessage(tab.id, {
                    action: 'Page:' + doc._id,
                    err: null,
                    data: doc
                })
            }
        })
    });
});

socket.on('comment:save', function(doc) {
    console.log('received from socket', doc);
    chrome.tabs.query({}, function(tabs) {
        tabs.forEach(function(tab) {
            var href = tab.url.split('/');
            var domain = href[2].replace(/\./g, '+');
            href.splice(0, 3);
            var path = href.join('+');
            if (doc.pageRef === (domain + '+' + path)) {
                return chrome.tabs.sendMessage(tab.id, {
                    action: 'Comment:CREATE',
                    err: null,
                    data: doc
                })
            }
        })
    });
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status && changeInfo.status == 'complete') {
        chrome.tabs.sendMessage(tabId, {
            //message
            action: 'init',
            err: null,
            data: null
        }, function(response) {
            if (response) console.log(response);
        });
    }
})

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    Graffiti[message.action.split(':')[0]]()[message.method](message.args, function(err, data) {
        chrome.tabs.sendMessage(sender.tab.id, {
            action: message.action,
            data: data,
            err: err
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

function getIdentity() {
    chrome.storage.local.get('identities', function(identities) {
    	console.log(identities);
    	user = identities;
    	if(typeof user === 'object'){
    		return user;
    	}
    	else{
    		return JSON.parse(user);
    	}
    });
}

function addIdentity(origin,name,cb) {
		user[origin] = name;
		console.log(user);
    chrome.storage.local.set({'identities':JSON.stringify(user)});
}

chrome.runtime.onMessageExternal.addListener(
    function(request, sender, sendResponse) {
        if(request.action === 'Identity' && request.method === 'GET'){
        	sendResponse(user);
        }
        if(request.action === 'Identity' && request.method === 'ADD'){
        	addIdentity(request.data.origin,request.data.name);
        	sendResponse(user);
        }
    });
