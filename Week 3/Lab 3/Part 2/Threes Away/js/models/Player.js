export class Player {
    #name
    #score

    constructor(name) {
        this.#name = name;
        this.#score = 0;
    }

    // Encapsulates score updates so that only the Player controls its own data.
    getName(){ return this.#name; }
    getScore(){ return this.#score; }

    setScore(input) { this.#score = input; }
    setName(input){this.#name = input;}
}