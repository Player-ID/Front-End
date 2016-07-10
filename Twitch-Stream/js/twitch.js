var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp",
	"storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
var twitchEndpoint = "https://api.twitch.tv/kraken/streams/";

function getAllChannelData () {
	for (var i = 0; i < channels.length; i++) {
		getChannelData(channels[i]);
	}
}

function getChannelData (channel) {
	$.getJSON(twitchEndpoint + encodeURI(channel) + "?callback=?", function(data) {
		console.log(data);
	});
}



$(document).ready(function() {
	getAllChannelData();

	// Set up add channel functionality
	$('#add-channel').keyup(function(e) {
	    if(e.keyCode == 13) {
	        $(this).trigger("enterKey");
	    }
	});
	$('#add-channel').bind("enterKey",function(e) {
		var newChannel = $('#add-channel').val();
		if (newChannel != '') {
			channels.push(newChannel);
			getChannelData(newChannel);
		}
	});
});