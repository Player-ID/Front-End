var channels = ["ESL_SC2", "OgamingSC2", "brunofin", "cretetion", "freecodecamp",
	"storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "comster404"];
var twitchEndpoint = "https://api.twitch.tv/kraken/streams/";
var defaultImage = "https://static-cdn.jtvnw.net/ttv-static/404_preview-200x200.jpg"
var onlineChannels = [];
var offlineChannels = [];
// Options are "all", "online", "offline".
var showCategory = "all";

function getAllChannelData() {
	onlineChannels = [];
	offlineChannels = [];
	for (var i = 0; i < channels.length; i++) {
		getChannelData(channels[i]);
	}
}

function getChannelData(channel) {
	$.getJSON(twitchEndpoint + encodeURI(channel) + "?callback=?", function(data) {
		// Populate channelInfos
		if (data.hasOwnProperty("error")) {
			offlineChannels.push({
				"channel": channel,
				"message": data.message,
				"category": "error"
			});
		} else if (data.stream == null) {
			offlineChannels.push({
				"channel": channel,
				"message": "Offline",
				"category": "offline"
			});
		} else {
			onlineChannels.push({
				"channel": channel,
				"game": data.stream.game,
				"message": data.stream.channel.status,
				"image": data.stream.channel.logo,
				"category": "online"
			});
		}
		populateList();
	});
}

function populateList() {
	$('#results').fadeOut(500, function() {
		var newHtml = "";
		if (showCategory == "all" || showCategory == "online") {
			for (var i = 0; i < onlineChannels.length; i++) {
				newHtml = newHtml.concat(generateHtml(onlineChannels[i]));
			}
		}
		if (showCategory == "all" || showCategory == "offline" || showCategory == "error") {
			for (var i = 0; i < offlineChannels.length; i++) {
				newHtml = newHtml.concat(generateHtml(offlineChannels[i]));
			}
		}
		$('#results').html(newHtml).fadeIn(500);
    });
}

function generateHtml(channelInfo) {
	var html = "";
	var channelName = channelInfo.channel;
	var channelMessage = channelInfo.message;
	var channelImage = defaultImage;
	if (channelInfo.hasOwnProperty("image") && channelInfo.image != "") {
		channelImage = channelInfo.image;
	}
	var channelGame = "";
	if (channelInfo.hasOwnProperty("game") && channelInfo.image != "") {
		channelGame = channelInfo.game;
	}

	html = '<div class="channel ' + channelInfo.category
	+ '"><div class="image"><img src="' + channelImage
	+ '" alt="channel image"></div><div class="channel-name"><span>' + channelName
	+ '</span></div><div class="channel-message"><span>';
	if (channelGame == "") {
		html = html + channelMessage + '</span></div></div>';
	} else {
		html = html + channelGame + ' : ' + channelMessage + '</span></div></div>';
	}

	return html;
}

$(document).ready(function() {
	getAllChannelData();

	// Display category
	$('#all').on('click', function() {
		showCategory = "all";
		populateList();
	});
	$('#online').on('click', function() {
		showCategory = "online";
		populateList();
	});
	$('#offline').on('click', function() {
		showCategory = "offline";
		populateList();
	});

	// Set up add channel functionality
	$('#add-channel').keyup(function(e) {
	    if(e.keyCode == 13) {
	        $(this).trigger("enterKey");
	    }
	});
	$('#add-channel').bind("enterKey",function(e) {
		var newChannel = $('#add-channel').val();
		if (newChannel != '') {
			var exists = false;
			// Only add if it is not already in the list
			for (var i = 0; i < channels.length; i++) {
				if (channels[i] == newChannel);
			}
			if (exists == false) {
				channels.push(newChannel);
			}
			getAllChannelData(newChannel);
		}
	});
});