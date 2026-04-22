import {STARTING_LIVES} from './Constants.js';
import {Domino} from './Domino.js';


/** 
~~~~~~~~~~~~~~~~~~ Code Written by Zoey McKee | CS 233JS | 4/15/2026 ~~~~~~~~~~~~~~~~~~
AI Policy:  Generative tools were used for explaining usage of certain functions.
            No code was reviewed or written by an AI Model
**/
export class  GameLogic {
    #boneyard
    #currentDomino
    #nextDomino
    #score
    #lives
    #isResolving
    #isGameOver

    constructor(){

        this.#boneyard = [];
        this.#currentDomino = new Domino();
        this.#nextDomino = new Domino();
        this.#score = 0;
        this.#lives = STARTING_LIVES;
        this.#isResolving = false;
        this.#isGameOver = false;

    }

    //~~~~~~~~~~~~~~~ Getters ~~~~~~~~~~~~~~~
    getBoneyard(){ return this.#boneyard }
    getCurrentDomino() { return this.#currentDomino }
    getNextDomino(){ return this.#nextDomino }
    getScore(){ return this.#score }
    getLives(){ return this.#lives }
    getIsResolving(){ return this.#isResolving }
    getIsGameOver() { return this.#isGameOver }

    //~~~~~~~~~~~~~~~ Setters ~~~~~~~~~~~~~~~
    setBoneyard(input){ this.#boneyard = input }
    setCurrentDomino(input) { this.#currentDomino = input }
    setNextDomino(input){ this.#nextDomino = input }
    setScore(input){ this.#score = input }
    setLives(input){ this.#lives = input }
    setIsResolving(input){ this.#isResolving = input }
    setIsGameOver(input) { this.#isGameOver = input }

    //Dumps boneyard array and fills it with new dominos in sequential order
    fillBoneyard() {
        // TODO: fill the boneyard with domino objects and reset game state.
        this.setBoneyard([]);

        let k = 0;
        for(let i = 0; i <= 6; i++){
            //Here it applies the offset k to j to ensure no duplicates are produced.
            for(let j = 0; j+k <= 6; j++){

                this.getBoneyard().push(new Domino(i, j+k));
            }

            k++;
        }
    }

    //Mixes up the boneyard list
    shuffleBoneyard(){
        // TODO: shuffle the boneyard randomly.
        for(let i = 0; i < 100; i++){
            //generates random numbers within array bounds
            let indexA = Math.floor(Math.random() * this.getBoneyard().length);
            let indexB = Math.floor(Math.random() * this.getBoneyard().length);

            //sets a buffer to indexA so its value isnt lost
            let buffer = this.getBoneyard()[indexA];

            //Sets A to B and B to buffer; the old value of A
            this.getBoneyard()[indexA] = this.getBoneyard()[indexB];
            this.getBoneyard()[indexB] = buffer;

        }
    }

    dealStartingDominos(){
        // TODO: Choose the two starting dominos
        this.setCurrentDomino(this.getBoneyard()[0]);
        this.getBoneyard().splice(0,1);
        this.setNextDomino(this.getBoneyard()[0]);
                
    }

    // ~~~~~~~~~~~~~~ ARROW FUNCTIONS ~~~~~~~~~~~~~~
    //Returns domino pip total
    getTotalPips = (domino) => domino.getTotal();

    // ~~~~~~~~~~~~~~ TEMPLATE STRINGS ~~~~~~~~~~~~~~
    //Returns formatted domino name from domino object
    getDominoFilename =  (domino) => `domino_${domino.getLeftPips()}_${domino.getRightPips()}`

    evaluateGuess(guess) {
        // TODO: evaluate the guess and return whether it is correct.
        switch(guess){
        
        //If high, returns whether or the hidden domino value is higher than
        //the shown domino value 
        
        case "high":
            if(this.getCurrentDomino().getTotal() <= this.getNextDomino().getTotal()){
  
                return true
            }

            return false

        //If low, returns whether or the hidden domino value is lower than
        //the shown domino value 
        case "low":
            if(this.getCurrentDomino().getTotal() >= this.getNextDomino().getTotal()){

                return true
            }

            return false
        }
    }

    //Ran at the end of every non gaming ending rouund.
    //Draws new dominos and pops domino list
    advanceRound(){
        // TODO: advance to the next round by shifting dominos and drawing a new hidden domino.
        this.dealStartingDominos();   
    
    }
}
