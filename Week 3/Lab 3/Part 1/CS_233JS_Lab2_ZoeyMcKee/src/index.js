/*  Overview
    BoneYard Bluff uses a shuffled boneyard of standard double-six dominos.
    One domino is face up on the left, and one is face down on the right.
    The player guesses whether the hidden domino total is higher or lower than
    the visible domino total. The right domino is revealed for 2 seconds.
    If the guess is correct, score increases, the revealed domino becomes the
    new left domino, and a fresh hidden domino is drawn. Reach a score of 10 to win.
*/

// -------------------- Imports --------------------

import {GameLogic} from './gameLogic.js'
import {ui}from './UI.js'
import {WIN_STREAK, REVEAL_DELAY_MS, STARTING_LIVES} from './Constants.js'

// -------------------- Main Flow --------------------
function init() {
    let gameLogicInstance = new GameLogic()
    ui.cacheDominoElements();
    resetGame(gameLogicInstance);

    ui.bindResetButton(resetGame(gameLogicInstance));
    ui.bindGuessButtons(handleGuess(gameLogicInstance));
    
    resetGame(gameLogicInstance);
}

function resetGame(gameLogic) {
    gameLogic.fillBoneyard();
    gameLogic.shuffleBoneyard();
    gameLogic.dealStartingDominos();
    gameLogic.setLives(STARTING_LIVES);
    gameLogic.setScore(0);
    gameLogic.setIsGameOver(false);
    gameLogic.setIsResolving(false);

    console.log(gameLogic)

    ui.showRightDominoBack();
    ui.showLeftDomino(gameLogic.getDominoFilename(gameLogic.getCurrentDomino()));

    ui.updateStatus([gameLogic.getScore(), gameLogic.getLives(), gameLogic.getBoneyard().length, ' ']);
    ui.enableGuessButtons();
}

function handleGuess(gameLogic) {
    console.log(gameLogic)
    console.log(`IsResolving: ${gameLogic.getIsResolving()} IsGameOver: ${gameLogic.getIsGameOver()} GetNextDomino: ${gameLogic.getNextDomino()}`)
    if (gameLogic.getIsResolving() || gameLogic.getIsGameOver() || gameLogic.getNextDomino() === null) {
        return;
    }

    const guess = this.dataset.guess;
    gameLogic.setIsResolving(true);
    ui.disableGuessButtons();

    const result = gameLogic.evaluateGuess(ui.guess);
    ui.showRightDominoFace(gameLogic.getDominoFilename(gameLogic.getNextDomino()));

    setTimeout(function () {
        completeRound(result, gameLogic);
    }, REVEAL_DELAY_MS);

    return handleGuess;
}

function completeRound(result, gameLogic) {
    if (result) {
        gameLogic.getScore(gameLogic.getScore()+1);
        gameLogic.advanceRound();

        if (gameLogic.getScore() >= WIN_STREAK) {
            gameLogic.setIsGameOver(true);
            ui.showLeftDomino(gameLogic.getDominoFilename(gameLogic.getCurrentDomino()));
            ui.showRightDominoBack();
            ui.updateStatus([gameLogic.getScore(), gameLogic.getLives(), gameLogic.getBoneyard().length, 'You win! Streak of 10.']);
            return;
        }

        if (gameLogic.getBoneyard().length === 0) {
            gameLogic.setIsGameOver(true);
            ui.showLeftDomino(gameLogic.getDominoFilename(gameLogic.getCurrentDomino()));
            ui.showRightDominoBack();
            ui.updateStatus([gameLogic.getScore(), gameLogic.getLives(), gameLogic.getBoneyard().length, 'No more dominos.']);
            return;
        }

        ui.showLeftDomino(gameLogic.getDominoFilename(gameLogic.getCurrentDomino()));
        ui.showRightDominoBack();
        ui.updateStatus([gameLogic.getScore(), gameLogic.getLives(), gameLogic.getBoneyard().length, 'Correct! Keep the streak going.']);
    }
    else {
        gameLogic.setScore(gameLogic.getScore() - 1);
        gameLogic.advanceRound();

        if (gameLogic.getLives() <= 0) {
            gameLogic.setIsGameOver(true);
            ui.showLeftDomino(gameLogic.getDominoFilename(gameLogic.getCurrentDomino()));
            ui.showRightDominoBack();
            ui.updateStatus([gameLogic.getScore(), gameLogic.getLives(), gameLogic.getBoneyard().length, 'No lives left. Game over.']);
            return;
        }

        if (gameLogic.getBoneyard().length === 0) {
            gameLogic.setIsGameOver(true);
            ui.showLeftDomino(gameLogic.getDominoFilename(gameLogic.getCurrentDomino()));
            ui.showRightDominoBack();
            ui.updateStatus([gameLogic.getScore(), gameLogic.getLives(), gameLogic.getBoneyard().length, 'No more dominos.']);
            return;
        }

        ui.showLeftDomino(gameLogic.getDominoFilename(gameLogic.getCurrentDomino()));
        ui.showRightDominoBack();
        ui.updateStatus([gameLogic.getScore(), gameLogic.getLives(), gameLogic.getBoneyard().length, 'Wrong guess. You lost a life.']);
    }

    gameLogic.getIsResolving() = false;
    ui.enableGuessButtons();
}

window.onload = init;