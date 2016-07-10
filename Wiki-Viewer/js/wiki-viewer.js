var remoteUrl = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=revisions&list=search&rvprop=content&srsearch=";

function populateResults (result) {
	var searchResult = result.query.search;
	var newHtml = "";
	for (var i = 0; i < searchResult.length; i++) {
		var title = searchResult[i].title;
		var snippet = searchResult[i].snippet;

		var itemTemplate = '<div class="content"><h3>' + title
			+ '</h3><p>' + snippet + '</p></div>';
		newHtml = newHtml.concat(itemTemplate);
	}
	$('#results').fadeOut(500, function() {
        $("#results").html(newHtml).fadeIn(500);
    });
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