//edtsoi
// Helper function to filter search result
        function filter_results() {
            var input, filter, ul, a, li, i;
            input = document.getElementById("input-search");
            filter = input.value.toUpperCase();
            ul = document.getElementById("tabs_results");
            li = ul.getElementsByTagName("li");
            for (i = 0; i < li.length; i++) {
                a = li[i].getElementsByTagName("a")[0];
                let txtValue = a.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    li[i].style.display = "";
                } else {
                    li[i].style.display = "none";
                }
            }
        }
        document.getElementById("input-search").addEventListener("keyup", filter_results);

        // Helper function to switch between tabs according to id (in active window)
        function switchTab(tabs_in, id_in){
            chrome.tabs.query({}, function(tabs){
//                alert(tabs_in[id_in].windowId);
                chrome.windows.update(tabs_in[id_in].windowId, {focused: true});
                chrome.tabs.update(tabs_in[id_in].id, {active: true});
            });
        }


        function closeTab(tabs_in, id_in, cur_a, cur_img){
            chrome.tabs.query({}, function(tabs){
                chrome.tabs.remove(tabs_in[id_in].id);
            });
            cur_a.remove();
            cur_img.remove();
            //location.reload();
            // add in code that adjust height of popup upon closing
            event.stopPropagation();
        }

        // Helper for parsing html. Counting occurence.
        function count(string,char) {
          var re = new RegExp(char,"gi");
          return string.match(re).length;
        }

        //return promise using asynchronous query
        function get_cur_tab_id(){
          var promise = new Promise(function(resolve, reject){
            chrome.tabs.query({highlighted: true, lastFocusedWindow: true}, function(tabs){
               resolve(tabs[0]);
            });
          })
          return promise;
        };

        //chain the promise to solve asynchronous problem
        var cur_tab;
        get_cur_tab_id().then(function(result){
           cur_tab= result;
        });
        
        // Helper function to create new window rows in popup (for drag and drop use)
        function newWindow(){
            chrome.windows.getAll({populate: true,}, function(windows){
                console.log(tabsToMove.size);
                if (tabsToMove.length == 0) {
                    chrome.windows.create({type: "normal"});
                }
                else {
                    var windowId_1;
                    var window1Index = Number(tabsToMove[0].split(' ')[0]);
                    var tab1Index = Number(tabsToMove[0].split(' ')[1]);
                    chrome.windows.create({type: "normal",tabId: windows[window1Index].tabs[tab1Index].id}, function(window){
                        windowId_1 = window.id;
                        chrome.tabs.query({}, function(tabs){
                            var list = [];
                            for(k = 1; k < tabsToMove.length; k++) {
                                var windowIndex = Number(tabsToMove[k].split(' ')[0]);
                                var tabIndex = Number(tabsToMove[k].split(' ')[1]);
                                list.push(windows[windowIndex].tabs[tabIndex].id);

                            }
                            chrome.tabs.move(list, {windowId : windowId_1, index: -1});
                            tabsToMove = [];
                        });
                    });
                }
                location.reload();
            });
        }

        document.getElementById("new-window").addEventListener("click", newWindow);

    //--------------------------------------
    var tabsToMove = [];
    function updateTabResults(){
        chrome.windows.getAll({populate: true,}, function(windows){
            for(i = 0; i < windows.length; i++){
                var title = document.createElement('div');
                title.setAttribute("class", "window");
                title.setAttribute("id", i);
                title.innerHTML = "Window " + (i + 1).toString();
                title.addEventListener("click", function(e) {
                        if (!tabsToMove.size == 0) {
                            var window1Index = Number(tabsToMove[0].split(' ')[0]);
                            var tab1Index = Number(tabsToMove[0].split(' ')[1]);

                            chrome.tabs.query({}, function(tabs){
                                var list = [];
                                for(k = 0; k < tabsToMove.length; k++) {
                                    var windowIndex = Number(tabsToMove[k].split(' ')[0]);
                                    var tabIndex = Number(tabsToMove[k].split(' ')[1]);
                                    list.push(windows[windowIndex].tabs[tabIndex].id);
                                    //console.log(windows[e.path[1].id.split(' ')[0]]);
                                    console.log(e.path[1].id);
                                }
                                chrome.tabs.move(list, {windowId : windows[Number(e.path[1].id)].id, index: -1});
                                tabsToMove = [];
                            });
                        }
                        console.log(e.path[1].id);
                        console.log(windows[Number(e.path[1].id)].tabs);
                        // switchTab.bind(null, windows[Number(e.path[1].id)].tabs, 0);

                    }, false);
                
                document.getElementById("tabs_results").appendChild(title);
                for(j = 0; j < windows[i].tabs.length; j++){
                    var img = document.createElement("img")
                    var new_li = document.createElement("li");
                    var new_a = document.createElement('a');
                    var x = document.createElement("button");
                    var span = document.createElement("span");

                    new_li.setAttribute("id", i + " " + j);
                    new_a.setAttribute("id", i + " " + j);
                    span.setAttribute("id", i + " " + j);
                    img.setAttribute("id", i + " " + j);

                    if (windows[i].tabs[j].favIconUrl) {
                        img.setAttribute("src", windows[i].tabs[j].favIconUrl);
                    }
                    else {
                        img.setAttribute("src", "images/bulletpoint.png");
                    }
                    img.width = img.height = 30;
                    img.setAttribute("style", "float: left; vertical-align: middle;");
                    img.setAttribute("class", "favicon");
                    span.setAttribute("aria-hidden", "true");
                    span.innerHTML = "&times;";
                    
                    x.className="closeSpan";
                    x.setAttribute("type", "button");
                    x.setAttribute("class", "close");
                    x.setAttribute("aria-label", "close");
                    x.setAttribute("style", "float: right; vertical-align: middle;");
                    x.width = x.height = 15;
                    x.appendChild(span);
                    x.addEventListener("click", closeTab.bind(null, windows[i].tabs, j, new_a, img));

                    //used span to avoid two hyperlinks.
                    let name = document.createElement("span");
                    let url = document.createElement("span");
                    if(windows[i].tabs[j].title.length > 35){
                      name.innerHTML = windows[i].tabs[j].title.substring(0,35) +'...' + "<br />";
                    }
                    else{
                      name.innerHTML = windows[i].tabs[j].title +"<br />";
                    }

                    name.setAttribute("style", "font-size: 80%;");
                    url.setAttribute("style", "color: grey; font-size: 60%;");

                    //parse address before the third slash.
                    if(count(windows[i].tabs[j].url.substring(0, windows[i].tabs[j].url.length-1), '/') <= 2){
                      url.innerHTML = windows[i].tabs[j].url;
                    }
                    else{
                      url.innerHTML =  windows[i].tabs[j].url.substring(0, windows[i].tabs[j].url.indexOf('/', 8));
                    }

                    new_a.appendChild(name);
                    new_a.appendChild(url);
                    new_a.appendChild(x);
                    new_a.setAttribute("draggable", true);

                    //cur_tab from get_cur_tab_id. Used promise to solve asynchronous problem.
                    if(windows[i].tabs[j].id == cur_tab.id){
                      new_a.setAttribute("style", "background-color: #A7E8FF;");
                    };
                    new_li.appendChild(img);
                    new_li.appendChild(new_a);
                    new_li.addEventListener('contextmenu', function(e) {
                        var tab = e.path[1].id;
                        if (tabsToMove.includes(tab)){
                            tabsToMove.splice(tabsToMove.indexOf(tab), 1);
                            this.style.backgroundColor = 'transparent';
                            var aCol = this.getElementsByTagName( 'a' );
                            aCol[0].style.backgroundColor = 'transparent';
                        }
                        else {
                            tabsToMove.push(tab);
                            this.style.backgroundColor = 'red';
                            var aCol = this.getElementsByTagName( 'a' );
                            aCol[0].style.backgroundColor = '#F9B7E1';
                        }
                        e.preventDefault();
                    }, false);
                    new_li.addEventListener("click", switchTab.bind(null, windows[i].tabs, j));
                    document.getElementById("tabs_results").appendChild(new_li);
                }
            }
        });
    }
    updateTabResults();