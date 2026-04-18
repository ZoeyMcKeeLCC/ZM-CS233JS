import {Die} from './Die.js'

export class DiceSet{

    #dice
    constructor(){

        this.#dice = []
        for (let i = 0; i < 5; i++) {
            this.#dice.push(new Die());
        }

    }

    //Getter and Setter
    getDice(){ return this.#dice }
    setDice(input){ this.#dice = input}

    rollAll(){

        for(const die of this.getDice()){
            die.roll();
        }    
    }


    getCurrentScore() {
        // A player only scores points if they have acquired the 6, 5, and 4.

        let total = 0;
        for (const die of this.getDice()) {
            if(die.value != 3){ total += die.value; }            
        }
        return total; 
    }

    printDice() {

        let buffer = ""
        for (const die of this.getDice()) {
            
            buffer += `${die.getValue()}, `
        }
        return buffer;
    }


    canUnhold(die) {

        return !die.getLockedIn()
    }

    reset() {
        
        for (const die of this.getDice()) {
            die.reset();
        }
    }

    //returns whether or not all of the dice in the dice list are held
    areAllHeld(){

        for (const die of this.getDice()) {
            if(!die.getIsHeld()){ return false}
            return true
        }

    }



}