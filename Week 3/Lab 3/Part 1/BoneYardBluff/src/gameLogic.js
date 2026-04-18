// -------------------- Core Logic --------------------
// Domino object constructor used in gameLogic object
import {Domino} from './Domino.js'

const STARTING_LIVES = 5;

export class GameLogic {

  #boneyard
  #currentDomino 
  #nextDomino 
  #score 
  #lives 
  #isResolving 
  #isGameOver 

  constructor(){
  this.#boneyard = [];
  this.#currentDomino = null;
  this.#nextDomino = null;
  this.#score = 0;
  this.#lives = STARTING_LIVES;
  this.#isResolving = false;
  this.#isGameOver = false;
  }

  //Getters
  getBoneyard(){ return this.#boneyard; }
  getCurrentDomino(){ return this.#currentDomino; }
  getNextDomino(){ return this.#nextDomino; }
  getScore(){ return this.#score; }
  getLives(){ return this.#lives; }
  getIsResolving(){ return this.#isResolving; }
  getIsGameOver(){ return this.#isGameOver; }


  //Setters
  setBoneyard(input){ this.#boneyard = input; }
  setCurrentDomino(input){ this.#currentDomino = input; }
  setNextDomino(input){ this.#nextDomino = input; }
  setScore(input){ this.#score = input; }
  setLives(input){ this.#lives = input; }
  setIsResolving(input){ this.#isResolving = input; }
  setIsGameOver(input){ this.#isGameOver = input; }

  //Methods
  fillBoneyard() {
    this.setBoneyard([]);

    for (let left = 0; left <= 6; left++) {
      for (let right = left; right <= 6; right++) {
        this.getBoneyard().push(new Domino(left, right));
      }
    }

    this.setCurrentDomino(null)
    this.setNextDomino(null);
    this.setScore(0)
    this.setLives(STARTING_LIVES);
    this.setIsResolving(false);
    this.setIsGameOver(false);
  }

  shuffleBoneyard() {
    for (let i = this.getBoneyard().length - 1; i > 0; i--) {
      const randomIndex = Math.trunc(Math.random() * (i + 1));
      const temp = this.getBoneyard()[i];
      this.getBoneyard()[i] = this.getBoneyard()[randomIndex];
      this.getBoneyard()[randomIndex] = temp;
    }
  }

  dealStartingDominos() {
    this.setCurrentDomino(this.getBoneyard().pop());
    this.setNextDomino(this.getBoneyard().pop());
  }

  getTotalPips(domino) {
    // converted to use destructuring assignment
    return domino.getTotal();
  }

  evaluateGuess(guess) {
    const currentTotal = this.getTotalPips(this.getCurrentDomino());
    const nextTotal = this.getTotalPips(this.getNextDomino());

    let isCorrect = false;

    if (guess === "high") {
      isCorrect = nextTotal >= currentTotal;
    } 
    
    else if (guess === "low") {
      isCorrect = nextTotal <= currentTotal;
    }

    return isCorrect;
  }

  advanceRound() {
    this.setCurrentDomino(this.getNextDomino());
    this.setNextDomino(this.getBoneyard().length > 0 ? this.getBoneyard().pop() : null);
  }
}
