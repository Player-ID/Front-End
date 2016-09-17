var game = {
    strictMode : false,
    order : [],
    playerIndex : 0,
    lockClick : true,

    getNextColor : function() {
        lockClick = true;
        var rand = Math.floor(Math.random() * 4);
        this.order.push(this.convertToColor(rand));
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
    }
}
const flashTime = 750;
var sequenceHandler;
var sounds = {
    green : "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",
    red : "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",
    yellow : "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",
    blue : "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3",
}

function playSequence() {
    var i = 0;
    sequenceHandler = setInterval(function() {
        flashColor(game.order[i]);
        i++;
        if (i === game.order.length) {
          clearInterval(sequenceHandler);
          game.lockClick = false;
        }
      }, flashTime);
}

function flashColor(color) {
    var find = "#" + color;
    $(find).addClass('highlight');
    setTimeout(function() {
        $(find).removeClass('highlight');
    }, 1000);
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

function showMessage(text) {
    game.lockClick = true;
    $('#message').text(text);
    $('#message').animate({
        top : '0'
    }, 500);
}

function pickColor() {
    if (game.lockClick) {
        // Do nothing if playing a sequence
        return;
    }

    console.log($(this).attr('id'), game.order[game.playerIndex]);
    if (game.order[game.playerIndex] == $(this).attr('id')) {
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
        if (game.strictMode) {
            game.resetGame();
        }
    }
}

function togglePower() {
    if ($('#game-on').is(':checked')) {
        $('#green').addClass('on');
        $('#red').addClass('on');
        $('#yellow').addClass('on');
        $('#blue').addClass('on');
        game.resetGame();
        game.getNextColor();
    } else {
        $('#green').removeClass('on');
        $('#red').removeClass('on');
        $('#yellow').removeClass('on');
        $('#blue').removeClass('on');
    }
}

$(document).ready(function() {
    togglePower();
    $('.switch').click(togglePower);

    $('#green').click(pickColor);
    $('#red').click(pickColor);
    $('#yellow').click(pickColor);
    $('#blue').click(pickColor);
});