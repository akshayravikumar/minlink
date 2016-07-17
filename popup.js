$(document).ready(function() {
	numKeys = 0;
	addEntry = function() {
		keyword = $("#keyword-input").val();
    	target = $("#target-input").val();
	    if (keyword.length === 0 || target.length === 0) {
			Materialize.toast('Inputs must not be empty', 2000);
			return;
		}
	    update = {};
	    update[keyword] = target;
	    chrome.storage.sync.set(update);
	    if (numKeys === 0) {
	    	$('#data').empty();
	    }
	    $('#data').append(getRowHTML(keyword, target));
	    numKeys++;
	    $("#keyword-input").val("");
	    $("#target-input").val("");
	    setButtons();
	}

	$('#add-button').click(function() {
    	addEntry();
	});

	$('#clear-button').click(function() {
		$("#keyword-input").val("");
	    $("#target-input").val("");
	});

	setCurrentURL = function() {
		chrome.tabs.getSelected(null, function(tab) {
			if (tab.url.indexOf("chrome://") < 0) {
				$("#target-input").val(tab.url);
			}
		});
	}

	setButtons = function() {
	    $('.edit-button').unbind('click').click(function() {
	    	key = $(this).attr('key');
	    	if ($(this).attr('purpose') === 'edit') {
	    		$(this).html("<i class='large material-icons'>done</i>");
	    		$(this).addClass("blue");
	    		$(this).removeClass("purple");
	    		$("[key='" + key + "'][data-type='key']").prop('disabled', false);
	    		$("[key='" + key + "'][data-type='value']").prop('disabled', false);
	    		$(this).attr('purpose', 'save')
	    	} else if ($(this).attr('purpose') === "save") {
	    		$(this).html("<i class='large material-icons'>mode_edit</i>");
	    		$(this).addClass("purple");
	    		$(this).removeClass("blue");
	    		newKey = $("[key='" + key + "'][data-type='key']").val();
	    		newValue = $("[key='" + key + "'][data-type='value']").val();
	    		if (newKey.length === 0 || newValue.length === 0) {
	    			Materialize.toast('Inputs must not be empty', 2000);
	    			return;
	    		}
	    		chrome.storage.sync.remove(key);
	    		update = {};
	    		update[newKey] = newValue;
	    		chrome.storage.sync.set(update);
	    		$("[key='" + key + "'][data-type='key']").prop('disabled', true);
	    		$("[key='" + key + "'][data-type='value']").prop('disabled', true);
	    		$("[key='" + key + "'][data-type='key']").attr('key', newKey);
	    		$("[key='" + key + "'][data-type='value']").attr('key', newKey);
	    		$(this).attr('purpose', 'edit')
	    	}
	    });

	    $('.delete-button').unbind('click').click(function() {
	    	key = $(this).attr('key');
	    	chrome.storage.sync.remove(key);
	    	$("tr[key='" + key + "']").remove();
	    	numKeys--;
	    	if (numKeys === 0) {
		    	$('#data').html("<div class='subtitle'> Add entries above! </div>");
		    }
	    });
	}

	getRowHTML = function(key, value) {
		html = "<tr key='" + key + "'>";
        html += "<td><input disabled data-type='key' pattern='[a-zA-Z0-9-_]+' key = '" + key + "' value='" + key + "'></td>";
        html += "<td><input disabled data-type='value' key='" + key + "' value='" + value +  "'></td>";
        html += "<td class='button-column center-align'><button purpose='edit' class='edit-button btn-floating purple' key='" + key + "'><i class='large material-icons'>mode_edit</i></button>";
       	html += "&nbsp;&nbsp;&nbsp;<button class='delete-button btn-floating red' key='" + key + "'><i class='large material-icons'>delete</i></button></td>";
        html += "</tr>";
        return html;
	}

	resetTable = function() {
		chrome.storage.sync.get(null, function(data) {
			$('#data').empty();
			numKeys = 0;
		    for (key in data) {
		    	if (key) {
		        	$('#data').append(getRowHTML(key, data[key]));
		        	numKeys++;
		        }
		    }
		    if (numKeys === 0) {
		    	$('#data').html("<div class='subtitle'> Add entries above! </div>");
		    }
		    setButtons();
		});
	}

	resetTable();
	setButtons();
	setCurrentURL();
	$('#keyword-input').focus();
	$('#keyword-input,#target-input').keypress(function(e) {
	    if(e.which == 13) {
	        addEntry();
	    }
	});
});

