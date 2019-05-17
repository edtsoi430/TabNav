function merge(){

    var windowId_1;

    chrome.windows.getLastFocused({populate: true}, function(window){
      windowId_1 = window.id;
    });

    chrome.tabs.query({lastFocusedWindow: false}, function(tabs){
    var list = [];
    for(i = 0; i < tabs.length; i++){
    //    if(tabs[i].windowId != windowId_1){     //added filter in query to avoid comparison
            list.push(tabs[i].id);
      //  }
    }
    chrome.tabs.move(list, {windowId : windowId_1, index: -1});
    });
}
document.getElementById("mergeAll").addEventListener("click", merge);
