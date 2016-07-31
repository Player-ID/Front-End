var entry = "0";
var evaluate = "0";
var complete = false;

function handleKey(keyId) {
	switch (keyId) {
		case "clear-all":
			reset();
			break;
		case "clear-entry":
			if (entry !== "0") {
				evaluate = evaluate.substr(0, evaluate.length - entry.length);
				if (evaluate === "") {
					evaluate = "0";
				}
				entry = "0";
			}
			if (complete) {
				reset();
			}
			break;
		case "zero":
		case "one":
		case "two":
		case "three":
		case "four":
		case "five":
		case "six":
		case "seven":
		case "eight":
		case "nine":
		case "decimal":
			if (complete) {
				reset();
			}
			if (entry === "0" ||
				((entry.length === 1 || entry === "&times;" ||
					entry === "&divide;") &&
					"0123456789.".indexOf(entry) === -1)) {
				entry = convertToNumber(keyId);
			} else {
				entry = entry.concat(convertToNumber(keyId));
			}
			if (entry !== "0") {
				if (evaluate === "0") {
					evaluate = convertToNumber(keyId);
				} else {
					evaluate = evaluate.concat(convertToNumber(keyId));
				}
			}
			break;
		case "plus":
		case "minus":
		case "multiply":
		case "divide":
			if ("+-&times;&divide;".indexOf(entry) !== -1) {
				evaluate = evaluate.substr(0, evaluate.length-entry.length);
			} else if (complete) {
				evaluate = entry;
				complete = false;
			}
			evaluate = evaluate.concat(convertToSign(keyId));
			entry = convertToSign(keyId);
			break;
		case "equal":
			if ("+-&times;&divide;".indexOf(entry) !== -1) {
				evaluate = evaluate.substr(0, evaluate.length-entry.length);
			} else if (complete) {
				evaluate = entry;
			}
			evaluate = evaluate.concat(convertToSign(keyId));
			parseExpression();
			complete = true;
			break;
	}
	updateUI();

	if (entry.length > 12 || evaluate.length > 24){
		reset();
		$('#input').html("0");
		$('#log').html("Error: Overflow!");
	}
}

function reset() {
	entry = "0";
	evaluate = "0";
	complete = false;
}

function updateUI() {
	$('#input').html(String(entry));
	$('#log').html(String(evaluate));
}

function convertToNumber(str) {
	switch (str) {
		case "zero":
			return "0";
		case "one":
			return "1";
		case "two":
			return "2";
		case "three":
			return "3";
		case "four":
			return "4";
		case "five":
			return "5";
		case "six":
			return "6";
		case "seven":
			return "7";
		case "eight":
			return "8";
		case "nine":
			return "9";
		case "decimal":
			return ".";
	}
}

function convertToSign(str) {
	switch (str) {
		case "plus":
			return "+";
		case "minus":
			return "-";
		case "multiply":
			return "&times;";
		case "divide":
			return "&divide;";
		case "equal":
			return "=";
	}
}

function parseExpression() {
	var numbers = evaluate.split(/[^0123456789.]/gi);
	var operators = evaluate.split(/\d+\.?\d*/gi);

	function removeEmpty(value) {
		return value != "";
	}
	numbers = numbers.filter(removeEmpty);
	operators = operators.filter(removeEmpty);
	
	var result = parseInt(numbers[0]);
	for (var i = 1; i < numbers.length; i++) {
		var operation = operators.shift();
		var num = parseInt(numbers[i]);
		switch (operation) {
			case "+":
				result += num;
				break;
			case "-":
				result -= num;
				break;
			case "&times;":
				result *= num;
				break;
			case "&divide;":
				result /= num;
				break;
		}
	}
	entry = String(result);
	evaluate = evaluate.concat(String(result));
}

$(document).ready(function() {
	console.log("cheese");
	$(".button").on("click", function(event) {
		handleKey(event.target.id);
	});
});