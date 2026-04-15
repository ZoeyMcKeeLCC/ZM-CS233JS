/*  Overview
    BoneYard Bluff uses a shuffled boneyard of standard double-six dominos.
    One domino is face up on the left, and one is face down on the right.
    The player guesses whether the hidden domino total is higher or lower than
    the visible domino total. The right domino is revealed for 2 seconds.
    If the guess is correct, score increases, the revealed domino becomes the
    new left domino, and a fresh hidden domino is drawn. Reach a score of 10 to win.
*/

// -------------------- Constants --------------------
const WIN_STREAK = 10;
const REVEAL_DELAY_MS = 500;
const STARTING_LIVES = 5;

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
    ui.updateStatus(gameLogic.score, gameLogic.lives, gameLogic.boneyard.length);
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
            ui.updateStatus(gameLogic.score, gameLogic.lives, gameLogic.boneyard.length, 'You win! Streak of 10.');
            return;
        }

        if (gameLogic.boneyard.length === 0) {
            gameLogic.isGameOver = true;
            ui.showLeftDomino(gameLogic.getDominoFilename(gameLogic.currentDomino));
            ui.showRightDominoBack();
            ui.updateStatus(gameLogic.score, gameLogic.lives, gameLogic.boneyard.length, 'No more dominos.');
            return;
        }

        ui.showLeftDomino(gameLogic.getDominoFilename(gameLogic.currentDomino));
        ui.showRightDominoBack();
        ui.updateStatus(gameLogic.score, gameLogic.lives, gameLogic.boneyard.length, 'Correct! Keep the streak going.');
    }
    else {
        gameLogic.lives--;
        gameLogic.advanceRound();

        if (gameLogic.lives <= 0) {
            gameLogic.isGameOver = true;
            ui.showLeftDomino(gameLogic.getDominoFilename(gameLogic.currentDomino));
            ui.showRightDominoBack();
            ui.updateStatus(gameLogic.score, gameLogic.lives, gameLogic.boneyard.length, 'No lives left. Game over.');
            return;
        }

        if (gameLogic.boneyard.length === 0) {
            gameLogic.isGameOver = true;
            ui.showLeftDomino(gameLogic.getDominoFilename(gameLogic.currentDomino));
            ui.showRightDominoBack();
            ui.updateStatus(gameLogic.score, gameLogic.lives, gameLogic.boneyard.length, 'No more dominos.');
            return;
        }

        ui.showLeftDomino(gameLogic.getDominoFilename(gameLogic.currentDomino));
        ui.showRightDominoBack();
        ui.updateStatus(gameLogic.score, gameLogic.lives, gameLogic.boneyard.length, 'Wrong guess. You lost a life.');
    }

    gameLogic.isResolving = false;
    ui.enableGuessButtons();
}

window.onload = init;



/** ~~~~~~~~~~~~~~~~~~ Code Written by Zoey McKee | CS 233JS | 4/2/2026 ~~~~~~~~~~~~~~~~~~


AI Policy:  Generative tools were used for explaining usage of certain functions.
            No code was reviewed or written by an AI Model

**/



// -------------------- Core Logic --------------------
// Domino object constructor used in gameLogic object
function Domino(leftPips, rightPips) {
    this.leftPips = leftPips;
    this.rightPips = rightPips;

    Domino.prototype.getTotal = function(){

        return Number(this.leftPips)+Number(this.rightPips);

    }
}

const gameLogic = {
    boneyard: [],
    currentDomino: null,
    nextDomino: null,
    score: 0,
    lives: STARTING_LIVES,
    isResolving: false,
    isGameOver: false,

    //Dumps boneyard array and fills it with new dominos in sequential order
    fillBoneyard: function () {
        // TODO: fill the boneyard with domino objects and reset game state.
        this.boneyard = [];

        let k = 0;
        for(let i = 0; i <= 6; i++){
            //Here it applies the offset k to j to ensure no duplicates are produced.
            for(let j = 0; j+k <= 6; j++){

                this.boneyard.push(new Domino(i,j+k))
            }

            k++
        }
    },

    //Mixes up the boneyard list
    shuffleBoneyard: function () {
        // TODO: shuffle the boneyard randomly.
        for(let i = 0; i < 100; i++){
            //generates random numbers within array bounds
            let indexA = Math.floor(Math.random() * this.boneyard.length);
            let indexB = Math.floor(Math.random() * this.boneyard.length);

            //sets a buffer to indexA so its value isnt lost
            let buffer = this.boneyard[indexA];

            //Sets A to B and B to buffer; the old value of A
            this.boneyard[indexA] = this.boneyard[indexB];
            this.boneyard[indexB] = buffer;

        }
    },

    dealStartingDominos: function () {
        // TODO: Choose the two starting dominos
        this.currentDomino = this.boneyard[0];
        this.boneyard.splice(0,1);
        this.nextDomino = this.boneyard[0];
                
    },

    //Returns domino pip total
    getTotalPips: function (domino) {
        // TODO: Add up the total value of the domino
        return domino.getTotal();
    },

    getDominoFilename: function (domino) {
        return 'domino_' + domino.leftPips + '_' + domino.rightPips;
    },


    evaluateGuess: function (guess) {
        // TODO: evaluate the guess and return whether it is correct.

        switch(guess){
        
        //If high, returns whether or the hidden domino value is higher than
        //the shown domino value 
        case "high":
            if(this.currentDomino.getTotal() <= this.nextDomino.getTotal()){
                return true
            }
            return false

        //If low, returns whether or the hidden domino value is lower than
        //the shown domino value 
        case "low":
            if(this.currentDomino.getTotal() >= this.nextDomino.getTotal()){
                return true
            }
            return false
        }
    },

    //Ran at the end of every non gaming ending rouund.
    //Draws new dominos and pops domino list
    advanceRound: function () {
        // TODO: advance to the next round by shifting dominos and drawing a new hidden domino.
        
        this.dealStartingDominos();   
    
    }
};

// -------------------- UI --------------------
// The ui object handles all interaction with the HTML document
// It only modifies visual elements and relies on gameLogic for data.


const ui = {
    leftDominoElement: null,
    rightDominoElement: null,
    statusElement: null,
    highButton: null,
    lowButton: null,
    resetButton: null,

    cacheDominoElements: function () {
        this.leftDominoElement = document.getElementById('left-domino');
        this.rightDominoElement = document.getElementById('right-domino');
        this.statusElement = document.getElementById('status');
        this.messageElement = document.getElementById('message');

        this.highButton = document.getElementById('high-btn');
        this.lowButton = document.getElementById('low-btn');
        this.resetButton = document.getElementById('reset-btn');
    },

    renderFilenameAsText: function (filename) {
        const parts = filename.split('_');
        return parts[1] + ' | ' + parts[2];
    },

    //Updates shown domino
    showLeftDomino: function (filename) {
        // TODO: show the face of the left domino.
        this.leftDominoElement.innerHTML = this.renderFilenameAsText(filename)

    },

    //Changes the hidden domino to hidden
    showRightDominoBack: function () {
        // TODO: show the back of the right domino.
        this.rightDominoElement.innerHTML = "? | ?"
        this.rightDominoElement.className = "domino-card back"
    },

    //Changes the hidden domino to visible
    showRightDominoFace: function (filename) {
        // TODO: show the face of the right domino.
        this.rightDominoElement.innerHTML = this.renderFilenameAsText(filename)
        this.rightDominoElement.className = "domino-card"
    },

    bindGuessButtons: function (clickHandler) {
        this.highButton.dataset.guess = 'high';
        this.lowButton.dataset.guess = 'low';
        this.highButton.onclick = clickHandler;
        this.lowButton.onclick = clickHandler;
    },

    bindResetButton: function (clickHandler) {
        this.resetButton.onclick = clickHandler;
    },

    disableGuessButtons: function () {
        // TODO: disable the guess buttons.
        this.highButton.disabled = true;
        this.lowButton.disabled = true;
    },

    enableGuessButtons: function () {
        this.highButton.disabled = false;
        this.lowButton.disabled = false;
    },

    //Updates User info via input values
    updateStatus: function (score, lives, remaining, message = '') {
        // TODO: show score, lives, remaining dominos, and optional message in the status element.'
        this.statusElement.innerHTML = "Score: "+score+"  | Lives: "+lives+ "| Remaining: "+ remaining;
        this.messageElement.innerHTML = message;
        console.log(message)

    }
};