var remoteUrl = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=revisions&list=search&rvprop=content&srsearch=";

function populateResults (result) {
	console.log(result);
	var searchResult = result.query.search;
	console.log(searchResult);
}

function apiCall (query) {
	var requestURL = remoteUrl + encodeURI(query) + "&callback=?";
	console.log(requestURL);
	$.getJSON(requestURL, function(json){
		populateResults(json);
	});
}

$(document).ready(function() {
	console.log("Script is running.");
	$('#search').bind("enterKey",function(e) {
		var searchString = $('#search').val();
		if (searchString != '') {
			apiCall(searchString);
		}
	});
	$('#search').keyup(function(e) {
	    if(e.keyCode == 13) {
	        $(this).trigger("enterKey");
	    }
	});
});