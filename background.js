// edtsoi

    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({})],
        actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });

    chrome.tabs.query({}, function(tabs){
        chrome.browserAction.setBadgeBackgroundColor({ color: "#6698FF" });
        chrome.browserAction.setBadgeText({text: tabs.length.toString()});
    });
        
    function updateBadge(){
        chrome.tabs.query({}, function(tabs){
            chrome.browserAction.setBadgeText({text: tabs.length.toString()});
        });
    }

    // Update number of tabs currently opened.
    chrome.tabs.onUpdated.addListener(updateBadge.bind());
    chrome.tabs.onRemoved.addListener(updateBadge.bind());
    chrome.tabs.onCreated.addListener(updateBadge.bind());


//chrome.commands.onCommand.addListener(function(command) {
//  chrome.tabs.query({currentWindow: true}, function(tabs) {
//    if (command === 'open-search'){ // open search
//        window.open("popup.html");
//    }        
//  });
//});