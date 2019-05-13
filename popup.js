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
                var new_li = document.createElement("li");
                var new_a = document.createElement('a');
                new_a.innerHTML = tabs[i].title;
//                Pass callback as function argument
                new_a.addEventListener("click", switchTab.bind(null, tabs, i));
                new_li.appendChild(new_a);
                document.getElementById("tabs_results").appendChild(new_li);
            }
//            alert(x);
        });
