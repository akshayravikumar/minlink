chrome.storage.sync.set({"wiki": "http://wikipedia.org/wiki", "mail": "http://mail.google.com"});

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
    	if (base in res) {
    		chrome.tabs.getSelected(null, function(tab) {
    			url = res[base] + rest;
		    	chrome.tabs.update(tab.id, {url: url});
		    });
    	} else {
    		alert("There is no entry for " + base + ".");
    	}
    });
});




RESEDA
AMORAL
DESPOT
LIPOMA
LARDON
TELEOST
TOPSIDE


RES
AMO
DES
LOP

DEBASER
