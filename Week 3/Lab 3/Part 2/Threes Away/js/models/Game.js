import {DiceSet} from './DiceSet.js';
import {Player} from './Player.js';

export default class Game{

    #players
    #currentPlayerIndex
    #diceSet
    #isGameOver
    #turn

    constructor() {
    this.#players = [];
    this.#currentPlayerIndex = 0;

    this.#turn = 0;

    this.#diceSet = new DiceSet();

    this.#isGameOver = false;

    // Initialize turn-specific state properties
    this.resetTurnState();
    }

    //Getters
    getPlayers(){ return this.#players }
    getCurrentPlayerIndex(){ return this.#currentPlayerIndex }
    getTurn(){ return this.#turn }
    getDiceSet(){ return this.#diceSet }
    getIsGameOver(){ return this.#isGameOver }

    //Setters
    setPlayers(input){  this.#players = input }
    setCurrentPlayerIndex(input){  this.#currentPlayerIndex = input }
    setTurn(input){  this.#turn = input }
    setDiceSet(input){  this.#diceSet = input }
    setIsGameOver(input){  this.#isGameOver = input }


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
    }

    //increments turn by 1
    incrementTurn(){
        this.setTurn(this.getTurn() + 1)
    }

    //resets turn counter and dice set to start next turn
    resetTurnState() {
        this.setTurn(0);
        this.getDiceSet().reset();
    }

    //returns the current player
    getCurrentPlayer(){

        return this.getPlayers()[this.currentPlayerIndex];

    }

        isTurnOver() {
        return this.diceSet.getAllHeld === 5;
    }

    //Rolls all dice in dice list if turn is not over
    rollDice(){

        if(!this.isTurnOver()){

            this.getDiceSet().rollAll();
            this.incrementTurn();
        }
    }

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

    getWinners() {
        if (!this.getIsGameOver()) return [];
        
        let maxScore = -1;
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