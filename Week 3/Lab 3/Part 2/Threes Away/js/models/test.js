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
dice.getDice()[3].setIsHeld(true);
console.log(dice.printDice())

const str = "helllllo world";
const count = str.split('l').length - 1; 
console.log(count); 


console.log("~~~~~~~~~~~~~~~")
const newDice = [1,1,4,6,4,1,1,1,1,1,1,2,2,3,3,45,5,3,6,5,6,6,6,5]

function countDice(list, input){
 return list.filter((v) => (v === input)).length;

}
console.log(countDice(newDice, 5))