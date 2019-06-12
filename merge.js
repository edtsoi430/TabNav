function mergeAll(){

    chrome.tabs.query({lastFocusedWindow: false}, function(tabs){
    var list = [];
    for(i = 0; i < tabs.length; i++){
        list.push(tabs[i].id);
    }

    chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs){
      chrome.tabs.move(list, {windowId : tabs[0].windowId, index: -1});
      });
    });
}
document.getElementById("mergeAll").addEventListener("click", mergeAll);

function merge(){


    // console.log(tabsToMove.includes(tab, 0))
    if (tabsToMove.size == 0){
        // open last focused tab in window
        var toRun;
    }
    else {
        var creating = chrome.windows.create({
            type: "normal"
        });

        var list = [];
        for(k = 0; k < tabsToMove.length; k++) {
            list.push(windows[k].tabs[i].id);
        }

        var windowId_1;

        chrome.windows.getLastFocused(function(window){
          windowId_1 = window.id;
        });

        chrome.tabs.move(list, {windowId : windowId_1, index: -1});

        console.log(tabsToMove);
    }
}
//document.getElementById("new-window").addEventListener("click", mergeAll);
