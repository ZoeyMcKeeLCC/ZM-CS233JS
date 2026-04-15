/*  Overview
    BoneYard Bluff uses a shuffled boneyard of standard double-six dominos.
    One domino is face up on the left, and one is face down on the right.
    The player guesses whether the hidden domino total is higher or lower than
    the visible domino total. The right domino is revealed for 2 seconds.
    If the guess is correct, score increases, the revealed domino becomes the
    new left domino, and a fresh hidden domino is drawn. Reach a score of 10 to win.
*/

// -------------------- Imports --------------------

import {gameLogic} from './gameLogic.js'
import {ui}from './UI.js'
import {WIN_STREAK, REVEAL_DELAY_MS, STARTING_LIVES} from './Constants.js'
// -------------------- Constants --------------------

// -------------------- Main Flow --------------------
function init() {
    ui.cacheDominoElements();
    ui.bindGuessButtons(handleGuess);
    ui.bindResetButton(resetGame);

    resetGame();
}

function resetGame() {
    gameLogic.fillBoneyard();
    gameLogic.shuffleBoneyard();
    gameLogic.dealStartingDominos();
    gameLogic.lives = STARTING_LIVES
    gameLogic.score = 0;
    gameLogic.isGameOver = false;
    gameLogic.isResolving = false;

    ui.showLeftDomino(gameLogic.getDominoFilename(gameLogic.currentDomino));
    ui.showRightDominoBack();
    ui.updateStatus([gameLogic.score, gameLogic.lives, gameLogic.boneyard.length, ' ']);
    ui.enableGuessButtons();
}

function handleGuess() {
    if (gameLogic.isResolving || gameLogic.isGameOver || gameLogic.nextDomino === null) {
        return;
    }

    const guess = this.dataset.guess;
    gameLogic.isResolving = true;
    ui.disableGuessButtons();

    const result = gameLogic.evaluateGuess(guess);
    ui.showRightDominoFace(gameLogic.getDominoFilename(gameLogic.nextDomino));

    setTimeout(function () {
        completeRound(result);
    }, REVEAL_DELAY_MS);
}

function completeRound(result) {
    if (result) {
        gameLogic.score++;
        gameLogic.advanceRound();

        if (gameLogic.score >= WIN_STREAK) {
            gameLogic.isGameOver = true;
            ui.showLeftDomino(gameLogic.getDominoFilename(gameLogic.currentDomino));
            ui.showRightDominoBack();
            ui.updateStatus([gameLogic.score, gameLogic.lives, gameLogic.boneyard.length, 'You win! Streak of 10.']);
            return;
        }

        if (gameLogic.boneyard.length === 0) {
            gameLogic.isGameOver = true;
            ui.showLeftDomino(gameLogic.getDominoFilename(gameLogic.currentDomino));
            ui.showRightDominoBack();
            ui.updateStatus([gameLogic.score, gameLogic.lives, gameLogic.boneyard.length, 'No more dominos.']);
            return;
        }

        ui.showLeftDomino(gameLogic.getDominoFilename(gameLogic.currentDomino));
        ui.showRightDominoBack();
        ui.updateStatus([gameLogic.score, gameLogic.lives, gameLogic.boneyard.length, 'Correct! Keep the streak going.']);
    }
    else {
        gameLogic.lives--;
        gameLogic.advanceRound();

        if (gameLogic.lives <= 0) {
            gameLogic.isGameOver = true;
            ui.showLeftDomino(gameLogic.getDominoFilename(gameLogic.currentDomino));
            ui.showRightDominoBack();
            ui.updateStatus([gameLogic.score, gameLogic.lives, gameLogic.boneyard.length, 'No lives left. Game over.']);
            return;
        }

        if (gameLogic.boneyard.length === 0) {
            gameLogic.isGameOver = true;
            ui.showLeftDomino(gameLogic.getDominoFilename(gameLogic.currentDomino));
            ui.showRightDominoBack();
            ui.updateStatus([gameLogic.score, gameLogic.lives, gameLogic.boneyard.length, 'No more dominos.']);
            return;
        }

        ui.showLeftDomino(gameLogic.getDominoFilename(gameLogic.currentDomino));
        ui.showRightDominoBack();
        ui.updateStatus([gameLogic.score, gameLogic.lives, gameLogic.boneyard.length, 'Wrong guess. You lost a life.']);
    }

    gameLogic.isResolving = false;
    ui.enableGuessButtons();
}

window.onload = init;