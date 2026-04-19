/* 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Code base provided by Brian Bird 
modified by Zoey McKee, 4/19/2026
No AI tools were used in the creation 
of this project except for researching 
how certain functions work
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

import {DiceSet} from './DiceSet.js';
import {Player} from './Player.js';

export default class Game{

    #players
    #currentPlayerIndex
    #currentPlayer
    #diceSet
    #isGameOver
    #turn
    #lastHeld

    constructor() {
    this.#players = [];
    this.#currentPlayerIndex = 0;

    this.#turn = 0;
    this.#lastHeld = 0;

    this.#diceSet = new DiceSet();

    this.#isGameOver = false;

    // Initialize turn-specific state properties
    this.resetTurnState();
    }

    //Getters
    getPlayers(){ return this.#players }
    getCurrentPlayerIndex(){ return this.#currentPlayerIndex }
    getCurrentPlayer(){  return this.#currentPlayer }
    getTurn(){ return this.#turn }
    getDiceSet(){ return this.#diceSet }
    getIsGameOver(){ return this.#isGameOver }
    getLastHeld(){ return this.#lastHeld }

    //Setters
    setPlayers(input){  this.#players = input }
    setCurrentPlayerIndex(input){  this.#currentPlayerIndex = input }
    setCurrentPlayer(input){  this.#currentPlayer = input }
    setTurn(input){  this.#turn = input }
    setDiceSet(input){  this.#diceSet = input }
    setIsGameOver(input){  this.#isGameOver = input }
    setLastHeld(input){  this.#lastHeld = input }


    //Starts new game
    //sets player names and resets turn vars
    startNewGame(playerNames){
    this.setPlayers([]);
    for (const name of playerNames) {
        this.getPlayers().push(new Player(name));
    }
    
    this.setCurrentPlayerIndex(0);
    this.setIsGameOver(false);
    this.resetTurnState(); 
    this.setCurrentPlayer(this.getPlayers()[0])
    }

    //increments turn by 1
    incrementTurn(){
        this.setTurn(this.getTurn() + 1)
    }

    //resets turn counter and dice set to start next turn
    resetTurnState() {
        this.#lastHeld = 0;
        this.setTurn(0);
        this.getDiceSet().reset();
    }

    //returns the current player
    getCurrentPlayer(){
        return this.getPlayers()[this.getCurrentPlayerIndex()];
    }

    //Returns whether or not it's the end of the fifth turn
    isTurnOver() {
        return this.getDiceSet().areAllHeld() === 5;
    }

    //Rolls all dice in dice list if turn is not over
    rollDice(){

        if(!this.isTurnOver()){

            this.getDiceSet().rollAll();
            this.incrementTurn();
        }
    }

    //Ends player turn and sets score vars, increments current player
    endTurn() {
        // Save score for current player via its setter to respect encapsulation.
        const currentPlayer = this.getCurrentPlayer();
        currentPlayer.setScore(this.getDiceSet().getCurrentScore());

        // Advance to next player or end game
        this.setCurrentPlayerIndex(this.getCurrentPlayerIndex() + 1);
        if (this.getCurrentPlayerIndex() >= this.getPlayers().length) {
            this.setIsGameOver(true);
        } else {
            this.resetTurnState();
        }
    }

    //Returns winners list based on win condition
    getWinners() {
        if (!this.getIsGameOver()) return [];
        
        let maxScore = 100;
        let winners = [];

        // Loop through all players to find the highest score. 
        // We push to an array instead of just saving one player because ties are possible
        // and we want to return all players who share the top score.
        for (const player of this.getPlayers()) {
            if (player.getScore() < maxScore) {
                maxScore = player.getScore();
                winners = [player];
            } else if (player.getScore() === maxScore) {
                winners.push(player);
            }
        }
        return winners;
    }

}