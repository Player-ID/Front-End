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
var alliance = "1";

function GameState(board, player, position, score) {
    this.board = board;
    this.player = player;
    this.position = position;
    this.score = score;
}

function getBestMove(game, player) {
    alliance = player;
    var newGameState = new GameState(game, player, -1, 0);
    return minimax(newGameState, 2, 0, -11, 11).position;
}

function minimax(game, depth, moveCount, min, max) {
    var moves = getAvailableMoves(game.board, game.player);
    if (depth === 0 || moves.length === 0) {
        // At leaf or root of tree. Return game state.
        return new GameState(game.board, game.player, game.position,
                getScore(game.board, moveCount));
    }

    var nextPlayer = getNextTurn(game.player);
    var bestGameState;
    if (alliance == game.player) {
        // Max Node
        var score = min;
        for (var i = 0; i < moves.length; i++) {
            var newGameState = new GameState(game.board.slice(),
                    nextPlayer, moves[i], 0);
            newGameState.board[moves[i]] = game.player;
            var scoreAfter = minimax(newGameState, depth - 1, moveCount + 1,
                    score, max).score;
            if (scoreAfter > score) {
                score = scoreAfter;
                bestGameState = newGameState;
                bestGameState.score = score;    
            }
            if (score > max) {
                return bestGameState;
            }
        }
    } else {
        // Min Node
        var score = max;
        for (var i = 0; i < moves.length; i++) {
            var newGameState = new GameState(game.board.slice(),
                    nextPlayer, moves[i], 0);
            newGameState.board[moves[i]] = game.player;
            var scoreAfter = minimax(newGameState, depth - 1, moveCount + 1,
                    min, score).score;
            if (scoreAfter < score) {
                score = scoreAfter;
                bestGameState = newGameState;
                bestGameState.score = score;
            }
            if (score < min) {
                return bestGameState;
            }
        }
    }
    return bestGameState;
}

function getScore(game, moves) {
    if (checkWin(game, alliance)) {
        return 10 - moves;
    } else if (checkWin(game, getNextTurn(alliance))) {
        return moves - 10;
    } else {
        return 0;
    }
}

function getAvailableMoves(game, player) {
    var available = [];

    if (checkWin(game, player)) {
        return available;
    }

    for (var i = 0; i < 9; i++) {
        if (game[i] === 0) {
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

function checkWin(game, player) {
    for (var i = 0; i < winningCombos.length; i++) {
        var lineCount = 0;
        for (var j = 0; j < winningCombos[i].length; j++) {
            if (game[winningCombos[i][j]] == player) {
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