var temp;
var openWeatherApiKey = "";
var latitude;
var longitude;

function getLocation () {
	console.log("getting location form IP");
	$.ajax({
		url: "http://freegeoip.net/json/",
		success: function (result) {
			latitude = result.latitude;
			longitude = result.longitude;
			console.log(latitude, longitude);
			getWeather();
		}
	});
}

function getWeather () {
	var baseUrl = "api.openweathermap.org/data/2.5/weather?APPID=" + openWeatherApiKey;
	if (longitude != undefined && latitude != undefined) {
		baseUrl = baseUrl.concat("&lat=" + encodeURI(latitude) + "&lon=" + encodeURI(longitude));
	}
	console.log(baseUrl);
	$.ajax({
		url: baseUrl,
		success: updateData(result),
		error: errorRetrieving()
	});
}

function updateData (result) {
	console.log(result);
	$("#city").html(result.name + ", " + result.sys.country);
	$("#condition").html(result.weather[0].main);
	$("#description").html(result.weather[0].description);

	var icon = result.weather[0].icon;
	$("#icon").attr("src", "http://openweathermap.org/img/w/" + icon + ".png");

	var temp = result.main.temp;
	var minTemp = result.main.temp_min;
	var maxTemp = result.main.temp_max;
	$("#temp").html(temp);
	$("#min-temp").html(minTemp);
	$("#max-temp").html(maxTemp);

	var id = result.weather[0].id;
	if (id >= 800 && id < 900) {
		$("body").css("background-image", "url('clear.jpg')");
	} else if (id >= 600 && id < 700) {
		$("body").css("background-image", "url('snow.jpg')");
	} else if (id >= 200 && id < 600) {
		$("body").css("background-image", "url('rain.jpg')");
	}
}

function errorRetrieving () {
	$("#city").html("Error Retrieving Data");
}

$(document).ready(function () {
	console.log("Running JS");
	getLocation();
});