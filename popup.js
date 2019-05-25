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
//            $("#"+String(tabs_in[id_in].id)).remove();
            // stop clicking child event from triggering parent event
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
        
    //drag and drop-------------------------

//        function allowDrop(ev) {
//          ev.preventDefault();
//        }
//
//        function drag(ev) {
//          ev.dataTransfer.setData("text", ev.target.id);
//        }
//
//        function drop(ev) {
//          ev.preventDefault();
//          var data = ev.dataTransfer.getData("text");
//          ev.target.appendChild(document.getElementById(data));
//        }
        
        // Helper function to create new window rows in popup (for drag and drop use)
        function newWindow(){
            var dragbox = document.getElementById("dragbox");
            var newdiv = document.createElement("div");
            newdiv.className = "w";
            var windowText = document.createElement("p");
            windowText.innerHTML = "Window";
            newdiv.appendChild(windowText);
            newdiv.id = "div1";
            dragbox.appendChild(newdiv);
        }

        document.getElementById("new-window").addEventListener("click", newWindow);

    //--------------------------------------
    function updateTabResults(){
        chrome.tabs.query({}, function(tabs){ // display tab list
            for(i = 0; i < tabs.length; i++){
                var img = document.createElement("img");
                var new_li = document.createElement("li");
                var new_a = document.createElement('a');
                var x = document.createElement("button");
                var span = document.createElement("span");
                var tab_id = tabs[i].id;

                if (tabs[i].favIconUrl) {
                    img.setAttribute("src", tabs[i].favIconUrl);
                    img.width = 27;
                    img.height = 27;
                }
                else {
                    img.setAttribute("src", "images/bulletpoint.png");
                    img.width = 23;
                    img.height = 23;
                }
                img.setAttribute("style", "float: left; vertical-align: middle;");
                
                span.setAttribute("aria-hidden", "true");
                span.innerHTML = "&times;";
                
                x.setAttribute("type", "button");
                x.setAttribute("class", "close");
                x.setAttribute("aria-label", "close");
                x.setAttribute("id", String(tab_id));
                x.width = 15;
                x.height = 15;
                x.setAttribute("style", "float: right; vertical-align: middle;");
                x.appendChild(span);
                
                x.addEventListener("click", closeTab.bind(null, tabs, i, new_a, img));
                //used span to avoid two hyperlinks.
                let name = document.createElement("span");
                let url = document.createElement("span");
                if(tabs[i].title.length > 80){
                  name.innerHTML = tabs[i].title.substring(0,80) +'...' + "<br />";
                }
                else{
                  name.innerHTML = tabs[i].title +"<br />";
                }

                name.setAttribute("style", "font-size: 95%;");
                url.setAttribute("style", "color: grey; font-size: 66%;");

                //parse address before the third slash.
                if(count(tabs[i].url.substring(0, tabs[i].url.length-1), '/') <= 2){
                  url.innerHTML = tabs[i].url;
                }
                else{
                  url.innerHTML =  tabs[i].url.substring(0, tabs[i].url.indexOf('/', 8));
                }

                new_a.appendChild(name);
                new_a.appendChild(url);
                new_a.appendChild(x);
                new_a.setAttribute("draggable", true);

                //cur_tab from get_cur_tab_id. Used promise to solve asynchronous problem.
                if(tabs[i].id == cur_tab.id){
                  new_a.setAttribute("style", "background-color: #E2FF3A;");
                };
                new_li.appendChild(img);
                new_li.appendChild(new_a);
                new_li.addEventListener("click", switchTab.bind(null, tabs, i));
                document.getElementById("tabs_results").appendChild(new_li);
            }
        });   
    }
    updateTabResults();
