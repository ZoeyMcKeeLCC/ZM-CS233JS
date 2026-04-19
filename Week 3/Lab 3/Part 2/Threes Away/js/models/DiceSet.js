/* 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Code base provided by Brian Bird 
modified by Zoey McKee, 4/19/2026
No AI tools were used in the creation 
of this project except for researching 
how certain functions work
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

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

    //Rolls all the dice, checks for triples
    rollAll(){

        for(const die of this.getDice()){
            die.roll()         
        }    
        this.checkForTriples();

    }

    //Iterates through dice list, marking how many dice of the same value it found
    checkNumberofDuplicateValues(input){
        let buffer = 0;
        console.log(this.getDice())
        for(const die of this.getDice()){
            console.log(die)
            if(die.getValue() === input){ buffer +=1 } 

        }
        console.log(`Input: ${input} Found: ${buffer}`)
        return buffer
    }

    //If it was found that it has 3 or more duplicates, sets isTriple flag on die
    setTriples(){
        //console.log(this.getDice())
        for(const die of this.getDice()){
            if(Number(this.checkNumberofDuplicateValues(die.getValue())) >= 3 ){  
                die.setIsTriple(true) 
            }
            else{ 
                die.setIsTriple(false)
            }

        }
    }

    //Goes through list to check if any dice have isTriple flag
    checkForTriples(){
        this.setTriples()
        let buffer= false
        for(const die of this.getDice()){
            if(die.getIsTriple() === true){
                console.log(`Value: ${die.getValue()} Triple detected!!!`)
                buffer = true; 
            }
        }

        return buffer
    }

    //Returns player score
    getCurrentScore() {
        // Adds die face values to score unless die value = 3
        let totalScore = 0;
        for (const die of this.getDice()) {
            //console.log(`Search Value: ${die.getValue()} Returns: ${this.checkForTriples(die.getValue())}`)
            if(die.getValue() != 3){ 
                totalScore += die.getValue(); 
            }            
        }

        //console.log(`Is there a triple? ${this.checkForTriples()}`)
        //Checks for triples
        if(this.checkForTriples()){
            totalScore += 10;
        }

        return totalScore; 
    }

    //Test function used to print die list
    printDice() {
        let buffer = ""
        for (const die of this.getDice()) {
            
            buffer += `${die.getValue()}, `
        }
        return buffer;
    }

    //Returns whether or not die can be held, left over function from source code.
    canHold(die){
        return true;
    }

    //Returns whether or not die has isLockedIn flag
    canUnhold(die) {
        return !die.getLockedIn()
    }

    //Resets all Dice
    reset() {
        for (const die of this.getDice()) {
            die.reset();
        }
    }

    //Returns how many dice the player is holding
    getHeldCount(){
        let count = 0;
        for (const die of this.getDice()) {
            if(die.getIsHeld()){ count += 1}

        }

        return count
    }

    //Returns whether or not all of the dice in the dice list are held
    areAllHeld(){

        for (const die of this.getDice()) {
            if(!die.getIsHeld()){ return false }
        }
            return true

    }



}