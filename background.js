chrome.omnibox.setDefaultSuggestion({description: 'Enter a keyword below to go to a URL!'});

chrome.omnibox.onInputEntered.addListener(function(text) {
    base = "";
    rest = "";
    index = text.indexOf("/");
    if (index < 0) {
    	base = text;
    } else {
    	base = text.substring(0, index);
    	rest = text.substring(index + 1);
    }

    chrome.storage.sync.get(base, function(res) {
		chrome.tabs.getSelected(null, function(tab) {
            if (base in res) {
			    url = res[base] + rest;
	    	    chrome.tabs.update(tab.id, {url: url});
            } else {
                chrome.tabs.update(tab.id, {url: chrome.extension.getURL('/error.html')});
            }
	    });
    });
});

chrome.omnibox.onInputChanged.addListener(function(text, suggest) {
    chrome.storage.sync.get(null, function(data) {
        suggestions = [];
        for (key in data) {
            if (key.indexOf(text) > -1) {
                suggestions.push({description: key, content: key});
            }
        }
        suggest(suggestions);
    });
});
