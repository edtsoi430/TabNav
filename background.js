// edtsoi

chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
    conditions: [new chrome.declarativeContent.PageStateMatcher({})],
    actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
});

// Template in case extra commands need to be done

//chrome.commands.onCommand.addListener(function(command) {
//  chrome.tabs.query({currentWindow: true}, function(tabs) {
//    if (command === 'open-search'){ // open search
//        window.open("popup.html");
//    }        
//  });
//});
