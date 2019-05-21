// edtsoi

chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
    conditions: [new chrome.declarativeContent.PageStateMatcher({})],
    actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
});


function updateBadge(tabs){
	chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 0] });
	chrome.browserAction.setBadgeText({text: tabs.length.toString()});
}

chrome.tabs.query({}, updateBadge);


//chrome.commands.onCommand.addListener(function(command) {
//  chrome.tabs.query({currentWindow: true}, function(tabs) {
//    if (command === 'open-search'){ // open search
//        window.open("popup.html");
//    }        
//  });
//});
