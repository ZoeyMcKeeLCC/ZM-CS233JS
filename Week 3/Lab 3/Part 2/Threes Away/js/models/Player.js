/* 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Code base provided by Brian Bird 
modified by Zoey McKee, 4/19/2026
No AI tools were used in the creation 
of this project except for researching 
how certain functions work
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

export class Player {
    #name
    #score

    constructor(name = "UnNamed Player") {
        this.#name = name;
        this.#score = 0;
    }

    // Encapsulates score updates so that only the Player controls its own data.

    //Getters
    getName(){ return this.#name; }
    getScore(){ return this.#score; }

    //Setters
    setScore(input) { this.#score = input; }
    setName(input){this.#name = input;}
}