import {Die} from './Die.js'
import {DiceSet} from './DiceSet.js'

/*
const larry = new Die()
larry.roll()
console.log(larry);
*/

const dice = new DiceSet();

console.log(dice)
dice.rollAll();
console.log(dice.printDice())
