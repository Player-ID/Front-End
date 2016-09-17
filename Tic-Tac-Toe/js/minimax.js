var winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5 ,8],
    [0, 4, 8],
    [2, 4, 6]
];
const INVALID = -1;
var alliance = "1";
var board;

function GameState(score, position) {
    this.position = position;
    this.score = score;
}

function getBestMove(game, player) {
    alliance = player;
    board = game.slice();
    return minimax(9, player, 0, -100, 100).position;
}

function minimax(depth, player, moveCount, min, max) {
    var moves = getAvailableMoves(player);
    if (checkWin(player)) {
        return new GameState(getWinScore(player, moveCount), INVALID);
    } else if (checkWin(getNextTurn(player))) {
        return new GameState(getWinScore(getNextTurn(player), moveCount), INVALID);
    } else if (depth === 0 || moves.length === 0) {
        // At leaf or end of tree size.
        return new GameState(0, INVALID);
    }

    var score = (alliance == player) ? min : max;
    var bestGameState = new GameState(score, INVALID);
    for (var i = 0; i < moves.length; i++) {
        // Make Move
        board[moves[i]] = player;

        // TODO: Maybe optimize?
        // Writing the wrapping for loop inside the below if statements instead
        // can be more efficient as the alliance checks are not run constantly
        // but clutter the code.

        // Calculate new score
        if (alliance == player) {
            // Max node
            var newScore = minimax(depth - 1, getNextTurn(player),
                    moveCount + 1, bestGameState.score, max).score;
            if (newScore > bestGameState.score) {
                bestGameState.score = newScore;
                bestGameState.position = moves[i];
            }
            if (bestGameState.score > max) {
                // Undo Move
                board[moves[i]] = 0;
                break;
            }
        } else {
            // Min node
            var newScore = minimax(depth - 1, getNextTurn(player),
                    moveCount + 1, min, bestGameState.score).score;
            if (newScore < bestGameState.score) {
                bestGameState.score = newScore;
                bestGameState.position = moves[i];
            }
            if (bestGameState.score < min) {
                // Undo Move
                board[moves[i]] = 0;
                break;
            }
        }

        // Undo Move
        board[moves[i]] = 0;
    }
    return bestGameState;
}

function getWinScore(player, moveCount) {
    if (checkWin(alliance)) {
        return 10 - moveCount;
    } else  {
        return moveCount - 10;
    }
}

function getAvailableMoves() {
    var available = [];

    for (var i = 0; i < 9; i++) {
        if (board[i] === 0) {
            available.push(i);
        }
    }
    return available;
}

function getNextTurn(currentTurn) {
    if (currentTurn == "1") {
        return "2";
    } else {
        return "1";
    }
}

function checkWin(player) {
    for (var i = 0; i < winningCombos.length; i++) {
        var lineCount = 0;
        for (var j = 0; j < winningCombos[i].length; j++) {
            if (board[winningCombos[i][j]] == player) {
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