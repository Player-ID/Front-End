$(document).ready(function(){
	
	// Navigation
	$(".about").click(function(){
		$('html, body').animate({
			scrollTop: $("#about").offset().top
		}, 500);
	});

	$(".showcase").click(function(){
		$('html, body').animate({
			scrollTop: $("#showcase").offset().top-50
		}, 500);
	});

	$(".contact").click(function(){
		$('html, body').animate({
			scrollTop: $("#contact").offset().top
		}, 500);
	});

});