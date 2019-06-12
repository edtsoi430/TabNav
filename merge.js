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
    location.reload();
}
document.getElementById("mergeAll").addEventListener("click", mergeAll);
