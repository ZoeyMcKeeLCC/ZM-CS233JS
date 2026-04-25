/*  Overview
    BoneYard Bluff uses a shuffled boneyard of standard double-six dominos.
    One domino is face up on the left, and one is face down on the right.
    The player guesses whether the hidden domino total is higher or lower than
    the visible domino total. The right domino is revealed for 2 seconds.
    If the guess is correct, score increases, the revealed domino becomes the
    new left domino, and a fresh hidden domino is drawn. Reach a score of 10 to win.

    Written by Brian Bird, 3/29/2026, using GitHub Copilot, revised by B. Bird 4/15/26
    */

// Linter note: import/module parsing warnings can be ignored in this browser ES module file.
import { GameLogic } from "./gameLogic.js";
import { UI } from "./ui.js";

// -------------------- Constants --------------------
const WIN_STREAK = 10;
const REVEAL_DELAY_MS = 500;

const gameLogic = new GameLogic();
const ui = new UI();
// -------------------- Main Flow --------------------
function init() {
  ui.cacheDominoElements();
  ui.getHighButton().onclick = handleHighGuess;
  ui.getLowButton().onclick = handleLowGuess;
  ui.getResetButton().onclick = resetGame;

  resetGame();
}

function resetGame() {
    gameLogic.fillBoneyard();  // also resets some of the game state
    gameLogic.shuffleBoneyard();
    gameLogic.dealStartingDominos();

    ui.showLeftDominoFace(gameLogic.getCurrentDomino());
    ui.showRightDominoBack();
    ui.updateStatus(gameLogic.getScore(), gameLogic.getLives(), gameLogic.getBoneyard().length);
    ui.enableGuessButtons();
}

/**
 * Handles the player clicking the "higher" button.
 */
// converted to use arrow functions
const handleHighGuess = () => {
  processGuess("high", gameLogic);
};

/**
 * Handles the player clicking the "lower" button.
 */
// converted to use arrow functions
const handleLowGuess = () => {
  processGuess("low");
};

/**
 * Determines if the round can proceed, evaluates the player's guess,
 * reveals the hidden domino, and sets a timeout to complete the round.
 * @param {string} guess - The player's guess, either "high" or "low".
 */
function processGuess(guess) {
  if (
    gameLogic.getIsResolving() ||
    gameLogic.getIsGameOver() ||
    gameLogic.getNextDomino() === null
  ) {
    return processGuess;
  }

  gameLogic.setIsResolving(true)
  ui.disableGuessButtons();

  const isCorrect = gameLogic.evaluateGuess(guess);
  ui.showRightDominoFace(gameLogic.getNextDomino());

  // converted to use arrow functions
  setTimeout(() => {
    completeRound(isCorrect, gameLogic);
  }, REVEAL_DELAY_MS);
}

function completeRound(isCorrect) {
    if (isCorrect) {
        gameLogic.setScore(gameLogic.getScore() + 1)
        gameLogic.advanceRound();

        if (gameLogic.getScore() >= WIN_STREAK) {
            gameLogic.setIsGameOver(true)
            ui.showLeftDominoFace(gameLogic.getCurrentDomino());
            ui.showRightDominoBack();
            ui.updateStatus(gameLogic.getScore(), gameLogic.getLives(), gameLogic.getBoneyard().length, 'You win! Streak of 10.');
            return;
        }

        if (gameLogic.getNextDomino() === null) {
            gameLogic.setIsGameOver(true)
            ui.showLeftDominoFace(gameLogic.getCurrentDomino());
            ui.showRightDominoBack();
            ui.updateStatus(gameLogic.getScore(), gameLogic.getLives(), gameLogic.getBoneyard().length, 'No more dominos.');
            return;
        }

        ui.showLeftDominoFace(gameLogic.getCurrentDomino());
        ui.showRightDominoBack();
        ui.updateStatus(gameLogic.getScore(), gameLogic.getLives(), gameLogic.getBoneyard().length, 'Correct! Keep the streak going.');
    }
    else {
        gameLogic.setLives(gameLogic.getLives() - 1);
        gameLogic.advanceRound();

        if (gameLogic.getLives() <= 0) {
            gameLogic.setIsGameOver(true)
            ui.showLeftDominoFace(gameLogic.getCurrentDomino());
            ui.showRightDominoBack();
            ui.updateStatus(gameLogic.getScore(), gameLogic.getLives(), gameLogic.getBoneyard().length, 'No lives left. Game over.');
            return;
        }

        if (gameLogic.getNextDomino() === null) {
            gameLogic.setIsGameOver(true);
            ui.showLeftDominoFace(gameLogic.getCurrentDomino());
            ui.showRightDominoBack();
            ui.updateStatus(gameLogic.getScore(), gameLogic.getLives(), gameLogic.getBoneyard().length, 'No more dominos.');
            return;
        }

        ui.showLeftDominoFace(gameLogic.getCurrentDomino());
        ui.showRightDominoBack();
        ui.updateStatus(gameLogic.getScore(), gameLogic.getLives(), gameLogic.getBoneyard().length, 'Wrong guess. You lost a life.');
    }

    gameLogic.setIsResolving(false);
    ui.enableGuessButtons();
}

window.onload = init;
