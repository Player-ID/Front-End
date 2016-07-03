function tweet () {
	var text = $('#quote-text').text();
	var author = $('#quote-origin').text();
	console.log(text, author);
	var fullUrl = "https://twitter.com/intent/tweet";
	fullUrl = fullUrl.concat("?text=" + text.substring(1) + "+" + author);
	console.log(fullUrl);
	fullUrl = encodeURI(fullUrl);
	console.log(fullUrl);
	window.open(fullUrl);
}

$(document).ready(function () {
  	$("#twitter").on("click", tweet);
});