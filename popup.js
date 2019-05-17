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
//currentWindow: true
        chrome.tabs.query({}, function(tabs){        // open search
//            var x = new String("");
            for(i = 0; i < tabs.length; i++){
//                x += tabs[i].title + '\n';
                var img = document.createElement("img")
                var new_li = document.createElement("li");
                var new_a = document.createElement('a');
                var url = document.createElement('a');
                var tab = document.createElement("div");
                var full_tab = document.createElement("div");
                var check = document.createElement("input")
                var br = document.createElement("br")


                if (tabs[i].favIconUrl) { 
                    img.setAttribute("src", tabs[i].favIconUrl);
                    img.setAttribute("width", "20");
                    img.setAttribute("height", "20");
                }
                else {
                    img.setAttribute("src", "images/bulletpoint.png");
                    img.setAttribute("width", "15");
                    img.setAttribute("height", "15");
                }

                img.setAttribute("alt", "Icon");
                img.setAttribute("style", "float: left;");
                    

                img.setAttribute("style", "float: left; vertical-align: sub;");
                    
                check.setAttribute("type", "checkbox");
                check.setAttribute("id", "check");
                check.setAttribute("name", "select");
                check.setAttribute("style", "float: left; vertical-align: sub;");

                url.setAttribute("style", "color: grey; font-size: 66%;");
                url.innerHTML = tabs[i].url.substring(0, 75);

                if (tabs[i].url.length > 75) {
                    url.innerHTML += "...";
                }


                new_a.innerHTML = tabs[i].title;
//                Pass callback as function argument
                // tab.addEventListener("click", switchTab.bind(null, tabs, i));


                tab.addEventListener("click", switchTab.bind(null, tabs, i));

                // tab.appendChild(check);
                tab.appendChild(img);
                tab.appendChild(new_a);
                
                if (tabs[i].highlighted){
                    tab.setAttribute("style", "background-color: #E2FF3A;")
                }
                else{
                    tab.setAttribute("style", "background-color: #f6f6f6;")                    
                } 

                tab.appendChild(br);
                tab.appendChild(url);

                full_tab.appendChild(check)
                full_tab.appendChild(tab)

                full_tab.setAttribute("style", "background-color: #ECECEC;") 

                new_li.appendChild(full_tab);
                document.getElementById("tabs_results").appendChild(new_li);
            }
//            alert(x);
        });
