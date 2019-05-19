function merge(){
    chrome.tabs.query({}, function(tabs){
    // change windowId_1 to active_tab_windowId
    var windowId_1 = tabs[0].windowId;
    var list = [];
    for(i=1; i < tabs.length; i++){
        if(tabs[i].windowId != windowId_1){
            list.push(tabs[i].id);
        }   
    }
    chrome.tabs.move(list, {windowId : windowId_1, index: -1});
    });
}
document.getElementById("mergeAll").addEventListener("click", merge);