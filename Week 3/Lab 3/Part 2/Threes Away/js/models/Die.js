/* 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Code base provided by Brian Bird 
modified by Zoey McKee, 4/19/2026
No AI tools were used in the creation 
of this project except for researching 
how certain functions work
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

export class Die{

    #value
    #isHeld
    #lockedIn
    #isTriple
    constructor(){
        this.#value = 1;
        this.#isHeld = false;
        this.#lockedIn = false;
        this.#isTriple = false;
    }

    //Getters
    getValue(){ return this.#value }
    getIsHeld(){ return this.#isHeld }
    getLockedIn(){ return this.#lockedIn }
    getIsTriple(){ return this.#isTriple }


    //Setters
    setValue(input){ this.#value = input }
    setIsHeld(input){ this.#isHeld = input }
    setLockedIn(input){ this.#lockedIn = input }
    setIsTriple(input){ this.#isTriple = input }

    //changes die value to random number between 1-3, sets isLockedIn flag if die is held at end of turn
    roll(){

        if(!this.getIsHeld()){
            this.setValue(Math.floor(Math.random() * 6) + 1); 
        }

        else{
            this.setLockedIn(true);
        }

        return this.getValue();

    }

    //If die isn't Locked In, toggles isHeld boolean
    toggleHold() {
        if(!this.getLockedIn()){ 
            this.setIsHeld(!this.getIsHeld()); 
        }

    }

    //Changes isHeld to true
    hold() { this.setIsHeld(true) }

    //Changes isLockedIn to true
    lockIn(){ this.setLockedIn(true) }

    //Resets die state
    reset() {
        this.setIsHeld(false);
        this.setLockedIn(false);
        this.setValue(1);
    }

}