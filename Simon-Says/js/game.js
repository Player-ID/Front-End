var game = {
    strictMode : false,
    order : [],
    playerIndex : 0,
    lockClick : true,

    getNextColor : function() {
        lockClick = true;
        if (this.order.length < 20) {
            var rand = Math.floor(Math.random() * 4);
            this.order.push(this.convertToColor(rand));
        }
        updateScore();
        playSequence();
    },

    convertToColor : function(number) {
        switch(number) {
            case 0:
                return "green";
            case 1:
                return "red";
            case 2:
                return "yellow";
            case 3:
                return "blue";
        }
    },

    resetGame : function() {
        this.order = [];
        this.playerIndex = 0;
        updateScore();
    }
}
const flashTime = 750;
var sequenceHandler;
var colorHandler;
var sounds = {
    green : new Howl({
            src: ["https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"],
            html5: true
        }),
    red : new Howl({
            src: ["https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"],
            html5: true
        }),
    yellow : new Howl({
            src: ["https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"],
            html5: true
        }),
    blue : new Howl({
            src: ["https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"],
            html5: true
        }),
}

function playSequence() {
    game.lockClick = true;
    var i = 0;
    sequenceHandler = setInterval(function() {
        flashColor(game.order[i]);
        i++;
        if (i === game.order.length) {
          clearInterval(sequenceHandler);
          game.lockClick = false;
        }
      }, flashTime + 250);
}

function flashColor(color) {
    if (sounds[color] !== undefined) {
        var find = "#" + color;
        $(find).addClass('highlight');
        sounds[color].play();
        colorHandler = setTimeout(function() {
            sounds[color].stop();
            $(find).removeClass('highlight');
            clearInterval(colorHandler);
        }, flashTime);
    }
}

function notifyError() {
    var text = "You made a mistake! The correct color was " +
            game.order[game.playerIndex] +". ";
    if (game.strictMode) {
        text = text + "Restarting Game.";
    } else {
        text = text  + "Try again!";
    }
    showMessage(text);
}

function updateScore() {
    if (game.order.length == 21) {
        showMessage("You Win!!!");
        game.resetGame();
    }
    $('#score').text(game.order.length);
}

function showMessage(text) {
    game.lockClick = true;
    $('#message p').text(text);
    $('#message').animate({
        top : '0'
    }, 500);
}

function hideMessage() {
    $('#message').animate({
        top : '-100%'
    }, 500);
    if (game.order.length === 0) {
        game.getNextColor();
    } else if (!game.strictMode) {
        game.lockClick = false;
    }
}

function pickColor() {
    if (game.lockClick) {
        // Do nothing if playing a sequence
        return;
    }

    game.lockClick = true;
    var color = $(this).attr('id');
    $(this).addClass('highlight');
    sounds[color].play();
    colorHandler = setInterval(function () {
        sounds[color].stop();
        $("#" + color).removeClass('highlight');
        game.lockClick = false;
        clearInterval(colorHandler);

        if (game.order[game.playerIndex] == color) {
            // Correctly selected color
            game.playerIndex++;
            if (game.playerIndex >= game.order.length) {
                // No more colors in sequence
                game.playerIndex = 0;
                game.getNextColor();
            }
        } else {
            // Incorrectly guessed color
            notifyError();
            game.playerIndex = 0;
            if (game.strictMode) {
                game.resetGame();
            }
        }
    }, 500);
}

function togglePower() {
    game.resetGame();
    if ($('#game-on').is(':checked')) {
        $('#green').addClass('on');
        $('#red').addClass('on');
        $('#yellow').addClass('on');
        $('#blue').addClass('on');
        game.getNextColor();
    } else {
        $('#green').removeClass('on');
        $('#red').removeClass('on');
        $('#yellow').removeClass('on');
        $('#blue').removeClass('on');
        clearInterval(sequenceHandler);
        clearInterval(colorHandler);
    }
}

function toggleStrict() {
    if ($('#strict-mode').is(':checked')) {
        game.strictMode = true;
    } else {
        game.strictMode = false;
    }
}

$(document).ready(function() {
    togglePower();
    toggleStrict();

    $('.switch').click(togglePower);
    $('.toggle').click(toggleStrict);
    $('#green').click(pickColor);
    $('#red').click(pickColor);
    $('#yellow').click(pickColor);
    $('#blue').click(pickColor);

    $('#continue').click(hideMessage);
});