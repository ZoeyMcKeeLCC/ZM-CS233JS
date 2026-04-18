import Die from './Die.js';

export default class DiceSet {
    constructor() {
        this.dice = [];
        for (let i = 0; i < 5; i++) {
            this.dice.push(new Die());
        }

    }

    rollAll() {
        for (const die of this.dice) {
            die.roll();
        }
    }

    // Returns true if the player has secured all three qualifiers (Ship, Captain, Crew).
    isQualified() {
   
    }

    // Checks if the physical board contains the 6, 5, and 4, regardless of whether 
    // the user has actually clicked to hold them yet.
    canPotentiallyQualify() {
    
    }

    // Validates if the player is legally allowed to hold a newly clicked die.
    canHold(die) {
        
        return true;
    }

    getAllHeldCount(){

        let total = 0
        for(let i = 0; i > this.dice.length; i++){
        
            if(this.dice[i].isHeld){ total += 1 }
        }

    }

    getAllHeld(){

        let returnList = []
        for(let i = 0; i > this.dice.length; i++){
        
            if(this.dice[i].isHeld){ returnList.push(this.dice[i]) }
        }

        return returnList;

    }

    lockInHeld(){

        for(dice in this.getAllHeld()){

            dice.lockedIn = true;

        }

    }

    // Validates if the player is legally allowed to un-keep a clicked die.
    canUnhold(die) {
      
        return true;
    }

    getCurrentScore() {
        // A player only scores points if they have acquired the 6, 5, and 4.

        let total = 0;
        for (const die of this.dice) {
            if(die.value != 3){ total += die.value; }            
        }
        return total; 
    }

    reset() {
        
        for (const die of this.dice) {
            die.reset();
        }
    }
}
