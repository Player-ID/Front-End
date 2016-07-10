var remoteUrl = "https://en.wikipedia.org/w/api.php"
	+ "?action=query&format=json&prop=extracts"
	+ "&generator=search&formatversion=2"
	+ "&exsentences=1&exlimit=10&exintro=1&explaintext=1"
	+ "&gsrnamespace=0&gsrlimit=10&gsrsearch=";
var wikiUrl = "http://en.wikipedia.org/?curid=";

function populateResults (result) {
	var searchResult = result.query.pages;
	var newHtml = "";
	for (var i = 0; i < searchResult.length; i++) {
		var title = searchResult[i].title;
		var snippet = searchResult[i].extract;
		var pageId = searchResult[i].pageid;

		var itemTemplate = '<a class="content"><h3>' + title
			+ '</h3><p>' + snippet + '</p></a>';
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