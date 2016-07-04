var temp;
var openWeatherApiKey = "";
var latitude;
var longitude;
var weatherData;

function getLocation () {
	console.log("Getting location from IP");
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
	weatherData = result;
	$("#city").html(result.name + ", " + result.sys.country);
	$("#condition").html(properCap(result.weather[0].main));
	$("#description").html(properCap(result.weather[0].description));

	var icon = result.weather[0].icon;
	$("#icon").attr("src", "http://openweathermap.org/img/w/" + icon + ".png");

	var temp = result.main.temp;
	var minTemp = result.main.temp_min;
	var maxTemp = result.main.temp_max;
	temp = toCelsius(temp);
	minTemp = toCelsius(minTemp);
	maxTemp = toCelsius(maxTemp);
	if ($("#unitCheck").is(':checked')) {
		console.log("Converting to Fahrenheit");
		temp = toFahrenheit(temp) + "&#8457;";
		minTemp = toFahrenheit(minTemp) + "&#8457;";
		maxTemp = toFahrenheit(maxTemp) + "&#8457;";
	} else {
		temp = temp + "&#8451;";
		minTemp = minTemp + "&#8451;";
		maxTemp = maxTemp + "&#8451;";
	}
	minTemp = "Min: " + minTemp;
	maxTemp = "Max: " + maxTemp;
	$("#temp").html(temp);
	$("#min-temp").html(minTemp);
	$("#max-temp").html(maxTemp);

	var id = result.weather[0].id;
	if (id >= 800 && id < 900) {
		$("body").css("background-image", "url(https://pixabay.com/static/uploads/photo/2013/02/10/16/01/sky-80232_960_720.jpg)");
	} else if (id >= 600 && id < 700) {
		$("body").css("background-image", "url(https://pixabay.com/static/uploads/photo/2012/03/01/01/35/winter-20248_960_720.jpg)");
	} else if (id >= 200 && id < 600) {
		$("body").css("background-image", "url(https://pixabay.com/static/uploads/photo/2016/01/17/04/29/rain-drops-1144448_960_720.jpg)");
	}

	matchHeight();
}

function toCelsius (temp) {
	return Math.round(temp - 273.0);
}

function toFahrenheit (temp) {
	return Math.round(temp * 9.0/5.0 + 32.0);
}

function properCap (str) {
	return str[0].toUpperCase() + str.substring(1).toLowerCase();
}

function errorRetrieving () {
	window.alert("Error retrieving weather data. Refresh to try again.");
}

function matchHeight () {
	if ($('#weather').height() >= $('#temperature').height()) {
		$('#temperature').css("height", $('#weather').css("height"));
	} else {
		$('#weather').css("height", $('#temperature').css("height"));
	}
}

$(document).ready(function () {
	console.log("Running JS");

	// Fake data for testing.
	var result = {
	    "coord": {
	        "lon": -0.13,
	        "lat": 51.51
	    },
	    "weather": [
	        {
	            "id": 500,
	            "main": "Rain",
	            "description": "light rain",
	            "icon": "10n"
	        }
	    ],
	    "base": "cmc stations",
	    "main": {
	        "temp": 286.164,
	        "pressure": 1017.58,
	        "humidity": 96,
	        "temp_min": 250.234,
	        "temp_max": 300.234,
	        "sea_level": 1027.69,
	        "grnd_level": 1017.58
	    },
	    "wind": {
	        "speed": 3.61,
	        "deg": 165.001
	    },
	    "rain": {
	        "3h": 0.185
	    },
	    "clouds": {
	        "all": 80
	    },
	    "dt": 1446583128,
	    "sys": {
	        "message": 0.003,
	        "country": "GB",
	        "sunrise": 1446533902,
	        "sunset": 1446568141
	    },
	    "id": 2643743,
	    "name": "London",
	    "cod": 200
	}
	updateData(result);

	$("#unitCheck").on("click", function () {
		updateData(weatherData);
	});
	matchHeight();
	//getLocation();
});