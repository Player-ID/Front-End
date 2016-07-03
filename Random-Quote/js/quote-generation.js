// Insert mashape API key here:
var mashapeKey = "";
var quoteLeft = "<i class=\"fa fa-quote-left\"></i>";

function getQuote() {
  $.ajax({
    headers: {
      "X-Mashape-Key": mashapeKey,
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    url: "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous",
    success: function(response) {
      var r = JSON.parse(response);
      var currentQuote = r.quote;
      var currentAuthor = r.author;

      $("#quote-text").html(quoteLeft + " " + currentQuote);
      $("#quote-origin").html("- " + currentAuthor);
    }
  });
}

$(document).ready(function () {
  getQuote();
  $("#new-quote").on("click", getQuote);
});