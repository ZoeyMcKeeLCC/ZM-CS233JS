import {Domino} from './Domino.js'
import {GameLogic} from './gameLogic.js'

let Larry = new GameLogic();
Larry.fillBoneyard();
Larry.shuffleBoneyard();
Larry.dealStartingDominos();
console.log(Larry.getBoneyard())
/*console.log(Larry.getBoneyard()[0].getRightPips())
console.log(Larry.getBoneyard()[0].getLeftPips())
console.log(Larry.getBoneyard()[0].getTotal())*/

console.log(Larry.getDominoFilename(Larry.getCurrentDomino()))
