
export class Domino {

  #leftPips
  #rightPips
  
  constructor(leftPips, rightPips){
  this.#leftPips = leftPips;
  this.#rightPips = rightPips;
  }

  //Getters
  getLeftPips(){ return this.#leftPips }
  getRightPips(){ return this.#rightPips }

  //Returns left pips plus right pips
  getTotal(){ return Number(this.getLeftPips())+Number(this.getRightPips())}
}