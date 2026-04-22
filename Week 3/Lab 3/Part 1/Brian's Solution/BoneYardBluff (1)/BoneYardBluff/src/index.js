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
import { gameLogic } from "./gameLogic.js";
import { ui } from "./ui.js";

// -------------------- Constants --------------------
const WIN_STREAK = 10;
const REVEAL_DELAY_MS = 2000;

// -------------------- Main Flow --------------------
function init() {
  ui.cacheDominoElements();
  ui.highButton.onclick = handleHighGuess;
  ui.lowButton.onclick = handleLowGuess;
  ui.resetButton.onclick = resetGame;

  resetGame();
}

function resetGame() {
    gameLogic.fillBoneyard();  // also resets some of the game state
    gameLogic.shuffleBoneyard();
    gameLogic.dealStartingDominos();

    ui.showLeftDominoFace(gameLogic.currentDomino);
    ui.showRightDominoBack();
    ui.updateStatus(gameLogic.score, gameLogic.lives, gameLogic.boneyard.length);
    ui.enableGuessButtons();
}

/**
 * Handles the player clicking the "higher" button.
 */
// converted to use arrow functions
const handleHighGuess = () => {
  processGuess("high");
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
    gameLogic.isResolving ||
    gameLogic.isGameOver ||
    gameLogic.nextDomino === null
  ) {
    return;
  }

  gameLogic.isResolving = true;
  ui.disableGuessButtons();

  const isCorrect = gameLogic.evaluateGuess(guess);
  ui.showRightDominoFace(gameLogic.nextDomino);

  // converted to use arrow functions
  setTimeout(() => {
    completeRound(isCorrect);
  }, REVEAL_DELAY_MS);
}

function completeRound(isCorrect) {
    if (isCorrect) {
        gameLogic.score++;
        gameLogic.advanceRound();

        if (gameLogic.score >= WIN_STREAK) {
            gameLogic.isGameOver = true;
            ui.showLeftDominoFace(gameLogic.currentDomino);
            ui.showRightDominoBack();
            ui.updateStatus(gameLogic.score, gameLogic.lives, gameLogic.boneyard.length, 'You win! Streak of 10.');
            return;
        }

        if (gameLogic.nextDomino === null) {
            gameLogic.isGameOver = true;
            ui.showLeftDominoFace(gameLogic.currentDomino);
            ui.showRightDominoBack();
            ui.updateStatus(gameLogic.score, gameLogic.lives, gameLogic.boneyard.length, 'No more dominos.');
            return;
        }

        ui.showLeftDominoFace(gameLogic.currentDomino);
        ui.showRightDominoBack();
        ui.updateStatus(gameLogic.score, gameLogic.lives, gameLogic.boneyard.length, 'Correct! Keep the streak going.');
    }
    else {
        gameLogic.lives--;
        gameLogic.advanceRound();

        if (gameLogic.lives <= 0) {
            gameLogic.isGameOver = true;
            ui.showLeftDominoFace(gameLogic.currentDomino);
            ui.showRightDominoBack();
            ui.updateStatus(gameLogic.score, gameLogic.lives, gameLogic.boneyard.length, 'No lives left. Game over.');
            return;
        }

        if (gameLogic.nextDomino === null) {
            gameLogic.isGameOver = true;
            ui.showLeftDominoFace(gameLogic.currentDomino);
            ui.showRightDominoBack();
            ui.updateStatus(gameLogic.score, gameLogic.lives, gameLogic.boneyard.length, 'No more dominos.');
            return;
        }

        ui.showLeftDominoFace(gameLogic.currentDomino);
        ui.showRightDominoBack();
        ui.updateStatus(gameLogic.score, gameLogic.lives, gameLogic.boneyard.length, 'Wrong guess. You lost a life.');
    }

    gameLogic.isResolving = false;
    ui.enableGuessButtons();
}

window.onload = init;
