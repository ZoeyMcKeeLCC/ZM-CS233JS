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
        this.checkForTriples();
        for(const die of this.getDice()){
            die.roll()         
        }    

    }

    checkNumberofDuplicateValues(input){
        let buffer = 0;
        for(const die of this.getDice()){
            if(die.getValue() === input){ buffer +=1 } 

        }
        //console.log(`Woww BufferTime: ${buffer}`)
        return buffer
    }

    setTriples(){
        //console.log(this.getDice())
        for(const die of this.getDice()){
            if(this.checkNumberofDuplicateValues(die.getValue()) >= 3 ){ die.setIsTriple(true) }
            else{ die.setIsTriple(false) }

        }
    }

    checkForTriples(){
        for(const die of this.getDice()){
            if(die.getIsTriple()){ return true; }
            else{ return false; }

        }

    }

    getCurrentScore() {
        // A player only scores points if they have acquired the 6, 5, and 4.
        let totalScore = 0;
        for (const die of this.getDice()) {
            //console.log(`Search Value: ${die.getValue()} Returns: ${this.checkForTriples(die.getValue())}`)
            if(die.getValue() != 3){ 
                totalScore += die.getValue(); 
            }            
        }

        this.setTriples()
        if(this.checkForTriples()){
            totalScore += 10;
        }

        return totalScore; 
    }

    printDice() {
        let buffer = ""
        for (const die of this.getDice()) {
            
            buffer += `${die.getValue()}, `
        }
        return buffer;
    }


    canHold(die){
        return true;
    }

    canUnhold(die) {
        return !die.getLockedIn()
    }

    reset() {
        for (const die of this.getDice()) {
            die.reset();
        }
    }

    getHeldCount(){
        let count = 0;
        for (const die of this.getDice()) {
            if(die.getIsHeld()){ count += 1}

        }

        return count
    }

    //returns whether or not all of the dice in the dice list are held
    areAllHeld(){

        for (const die of this.getDice()) {
            if(!die.getIsHeld()){ return false }
        }
            return true

    }



}