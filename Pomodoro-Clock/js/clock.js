var canvas;
var context;
var time = "25:00";
var intervalTimer;
var breakMode = false;
var breakLength = 5;
var workLength = 25;
var minute = 25;
var second = 00;

function tickTime() {
    second--;
    if (second < 0) {
        second = 59;
        minute--;
    }

    if (second < 10) {
        time = String(minute) + ":0" + String(second);
    } else {
        time = String(minute) + ":" + String(second);
    }

    if (minute >= 0 && second >= 0) {
        drawTime();
    } else {
        if (!breakMode) {
            stopTimer();
            breakMode = true;
            drawText("Period Ended!\nHit START.");
        } else {
            stopTimer();
            breakMode = false;
            drawText("Ready!");
        }
    }
}

function drawTime() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    var height = computeHeight();
    context.fillStyle = "#7EC0EE"
    context.fillRect(0, canvas.height - height, canvas.width, height);

    context.font = "100px Helvetica";
    context.fillStyle = "black";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(time, canvas.width / 2, canvas.height / 2);
}

function drawText(text) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = "50px Helvetica";
    context.fillStyle = "black";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(text, canvas.width / 2, canvas.height / 2);
}

function computeHeight() {
    var totalLength;
    if (breakMode) {
        totalLength = breakLength;
    } else {
        totalLength = workLength;
    }
    return canvas.height *
                (60 * (totalLength - minute - 1) + (60 - second)) /
                (60 * totalLength);
}

function startTimer() {
    stopTimer();
    if (breakMode) {
        minute = breakLength;
        second = 0;
    } else {
        minute = workLength;
        second = 0;
    }
    intervalTimer = setInterval(tickTime, 1000);
}

function stopTimer() {
    if (intervalTimer != undefined) {
        clearInterval(intervalTimer);
    }
}

$(document).ready(function() {
    canvas = document.getElementById("timer-canvas");
    context = canvas.getContext("2d");
    drawText("Ready!");

    $('#start').on("click", function() {
        startTimer();
    })
    $('#stop').on("click", function() {
        stopTimer();
    });
    $('#increase-break').on("click", function() {
        if (breakLength < 59) {
            stopTimer();
            breakLength++;
            $('#break-length').html(String(breakLength));
        }
    });
    $('#decrease-break').on("click", function() {
        if (breakLength > 1) {
            stopTimer();
            breakLength--;
            $('#break-length').html(String(breakLength));
        }
    });
    $('#increase-work').on("click", function() {
        if (workLength < 59) {
            stopTimer();
            workLength++;
            $('#work-length').html(String(workLength));
        }
    });
    $('#decrease-work').on("click", function() {
        if (workLength > 1) {
            stopTimer();
            workLength--;
            $('#work-length').html(String(workLength));
        }
    });
});