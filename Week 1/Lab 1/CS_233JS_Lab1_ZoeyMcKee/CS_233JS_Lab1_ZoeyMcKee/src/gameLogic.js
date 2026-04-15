import {STARTING_LIVES} from './Constants.js'
import {Domino} from './Domino.js'

export const gameLogic = {
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
