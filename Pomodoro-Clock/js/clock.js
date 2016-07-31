var canvas;
var context;
var time = "Ready!";
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

    if (minute != 0 || second != 0) {
        drawTime();
    } else {
        if (!breakMode) {
            minute = breakLength;
            second = 0;
            drawTime();
        } else {
            time = "Ready!";
            drawTime();
            stopTimer();
        }
    }
}

function drawTime() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = "100px Helvetica";
    context.fillStyle = "black";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(time, canvas.width / 2, canvas.height / 2); 
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
    drawTime();

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