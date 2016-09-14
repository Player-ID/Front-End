var canvas;
var context;
var game = {
    /*
    [0, 1, 2,
     3, 4, 5,
     6, 7, 8]
    */
    winningCombos : [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5 ,8],
        [0, 4, 8],
        [2, 4, 6]
    ],

    isSinglePlayer : true,
    isPlayerOne : true,
    playerOneScore : 0,
    playerTwoScore : 0,
    playerOneSymbol : "X",
    playerTwoSymbol : "O",

    gameboard :
    [0, 0, 0,
     0, 0, 0,
     0, 0, 0],
    spacesFilled : 0,
    currentTurn : "1",

    resetBoard : function() {
        this.gameboard =
        [0, 0, 0,
         0, 0, 0,
         0, 0, 0];
        this.spacesFilled = 0;
        if (this.currentTurn == "0") {
            this.nextTurn();
        }
    },

    resetGame : function() {
        this.playerOneScore = 0;
        this.playerTwoScore = 0;
        this.gameboard =
        [0, 0, 0,
         0, 0, 0,
         0, 0, 0];
        this.spacesFilled = 0;
        this.currentTurn = "1";
    },

    makeMove : function(position) {
        // Make move. Return false if move cannot be made.
        if (this.gameboard[position] != "0" || this.currentTurn == "0") {
            return false;
        }

        if (this.currentTurn == "1") {
            this.gameboard[position] = "1";
        } else {
            this.gameboard[position] = "2";
        }
        updateBoard(position);
        this.spacesFilled++;
        this.endTurn();
        return true;
    },

    endTurn : function() {
        if (this.checkWin()) {
            if (this.currentTurn == "1") {
                this.playerOneScore++;
                displayOutcome("win-1");
            } else {
                this.playerTwoScore++;
                displayOutcome("win-2");
            }
            showScore();
            this.currentTurn = "0";
        } else if (this.spacesFilled === 9) {
            this.currentTurn = "0";
            displayOutcome("draw");
        } else {
            this.nextTurn();
        }
    },

    nextTurn : function() {
        if (this.currentTurn == "0") {
            if (this.playerOneScore > this.playerTwoScore) {
                this.currentTurn = "2";
            } else {
                this.currentTurn = "1";
            }
        } else if (this.currentTurn == "1") {
            this.currentTurn = "2";
        } else {
            this.currentTurn = "1";
        }
        highlightTurn();
    },

    checkWin : function() {
        for (var i = 0; i < this.winningCombos.length; i++) {
            var lineCount = 0;
            for (var j = 0; j < this.winningCombos[i].length; j++) {
                if (this.gameboard[this.winningCombos[i][j]] == this.currentTurn) {
                    lineCount++;
                } else {
                    break;
                }
            }

            if (lineCount === 3) {
                // Win!
                return true;
            }
        }
        return false;
    }
};

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

function updateBoard(position) {
    var symbol;
    if (game.gameboard[position] == "1") {
        symbol = "X";
    } else {
        symbol = "O";
    }

    var tile = "#tile-" + position;
    $(tile).text(symbol);
}

function showScore() {
    $('#player-one-score').html('Player 1:<hr>' + game.playerOneScore);
    $('#player-two-score').html('Player 2:<hr>' + game.playerTwoScore);
}

function highlightTurn() {
    // Slide out the sign for curent turn.
    if (game.currentTurn == "1" && game.isPlayerOne) {
        $('#player-one-turn').animate({
            left: '50%'
        }, 200);

        $('#player-two-turn').animate({
            right: '75%'
        }, 200);
    } else {
        $('#player-one-turn').animate({
            left: '75%'
        }, 200);

        $('#player-two-turn').animate({
            right: '50%'
        }, 200);
    }
}

function initializeBoard() {
    for (var i = 0; i < 9; i++) {
        var tile = "#tile-" + i;
        $(tile).click(function() {
            var position = $(this).attr('id').slice(-1);
            game.makeMove(position);
        });
    }
}

function displayOutcome(outcome) {
    if (outcome == "win-1") {
        if (game.isSinglePlayer) {
            if (!game.isPlayerOne) {
                $('#message').text('Computer won!');
            } else {
                $('#message').text('Player won!');
            }
        } else {
            $('#message').text('Player 1 won!');
        }
    } else if (outcome == "win-2") {
        if (game.isSinglePlayer) {
            if (game.isPlayerOne) {
                $('#message').text('Computer won!');
            } else {
                $('#message').text('Player won!');
            }
        } else {
            $('#message').text('Player 2 won!');
        }
    } else if (outcome == "draw") {
        $('#message').text('T\'was a draw!');
    } else {
        $('#message').text('I call it Noughts and Crosses...');
    }

    $('#settings-container').show();
    $('#settings-container').animate({
        opacity: 0.8
    }, 500);
    $('#message-container').animate({
        top: '50%'
    }, 500);
}

$(document).ready(function() {
    console.log("JS Ready.");

    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");

    $('#play-button').click(function() {
        // Animate menu away and apply settings.
        $('#settings-container').animate({
            opacity: 0
        }, 500, function() {
            $('#settings-container').hide();
        });

        $('#settings').animate({
            top: '-50%'
        }, 500);

        game.isSinglePlayer = !($('#isTwoPlayer').is(':checked'));
        if (game.isSinglePlayer) {
            $('#player-two-turn').text("CPU Turn");
        } else {
            $('#player-two-turn').text("Player 2 Turn");
        }

        game.isPlayerOne = !($('#isPlayerO').is(':checked'));

        drawBoard();
        initializeBoard();
        showScore();
        highlightTurn();
    });

    $('#continue-button').click(function() {
        // Animate menu away and start a new round.
        $('#settings-container').animate({
            opacity: 0
        }, 500, function() {
            $('#settings-container').hide();
        });
        $('#message-container').animate({
            top: '-50%'
        }, 500);

        for (var i = 0; i < 9; i++) {
            var tile = "#tile-" + i;
            $(tile).text("");
        }
        game.resetBoard();
    });

    $('#players').click(function() {
        // Hide XO selection if in 2 player mode.
        $('#symbol-option').toggle(!($('#isTwoPlayer').is(':checked')));
    })
})
