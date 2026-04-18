export class Die{

    #value
    #isHeld
    #lockedIn
    constructor(){
        this.#value = 1;
        this.#isHeld = false;
        this.#lockedIn = false;
    }

    //Getters
    getValue(){ return this.#value }
    getIsHeld(){ return this.#isHeld }
    getLockedIn(){ return this.#lockedIn }

    //Setters
    setValue(input){ this.#value = input }
    setIsHeld(input){ this.#isHeld = input }
    setLockedIn(input){ this.#lockedIn = input }

    roll(){

        this.setValue(Math.floor(Math.random() * 6) + 1); 
        return this.getValue();

    }

    toggleHold() {
        if(!this.getLockedIn){ this.setIsHeld(!this.getIsHeld()); }

    }

    hold() { this.setIsHeld(true) }

    lockIn(){ this.setLockedIn(true) }

    reset() {
        this.setIsHeld(false);
        this.setLockedIn(false);
        this.setValue(1);
    }

}