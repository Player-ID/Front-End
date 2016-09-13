var canvas;
var context;

$(document).ready(function() {
    console.log("JS Ready.");

    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    drawBoard();

    $('#play-button').click(function() {
        $('#settings-container').animate({
            opacity: 0
        }, 500);

        $('#settings').animate({
            top: '-50%'
        }, 500);
    });

    $('#players').click(function() {
        $('#symbol-option').toggle(!($('#isTwoPlayer').is(':checked')));
    })
})

function drawBoard() {
    context.lineWidth = 0.5;
    context.strokeStyle = "#fff";

    // Vertical lines
    context.beginPath();
    context.moveTo(140, 20);
    context.lineTo(140, 400);
    context.closePath();
    context.stroke();

    context.beginPath();
    context.moveTo(280, 20);
    context.lineTo(280, 400);
    context.closePath();
    context.stroke();

    // Horizontal lines
    context.lineWidth = .5;

    context.beginPath();
    context.moveTo(20, 140);
    context.lineTo(400, 140);
    context.closePath();
    context.stroke();
      
    context.beginPath();
    context.moveTo(20, 280);
    context.lineTo(400, 280);
    context.closePath();
    context.stroke();
}

/*var game = {
    
    [0, 1, 2,
     3, 4, 5,
     6, 7, 8]
     

    var gameboard =
    [0, 0, 0,
     0, 0, 0,
     0, 0, 0];

    const WINNING_COMBOS = {
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5 ,8],
        [0, 4, 8],
        [2, 4, 6]
    }

    var playerOneWins = 0;
    var playerTwoWins = 0;
    const PLAYER_ONE_TAG = 1;
    const PLAYER_TWO_TAG = 2;

    resetBoard: function() {
        gameboard =
        [0, 0, 0,
         0, 0, 0,
         0, 0, 0];
    };

    resetGame : function() {
        playerOneWins = 0;
        playerTwoWins = 0;
        gameboard =
        [0, 0, 0,
         0, 0, 0,
         0, 0, 0];
    };
}*/