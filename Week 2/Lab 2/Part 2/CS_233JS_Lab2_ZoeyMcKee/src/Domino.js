
/** 
~~~~~~~~~~~~~~~~~~ Code Written by Zoey McKee | CS 233JS | 4/6/2026 ~~~~~~~~~~~~~~~~~~
AI Policy:  Generative tools were used for explaining usage of certain functions.
            No code was reviewed or written by an AI Model
**/
export function Domino(leftPips, rightPips) {
    this.leftPips = leftPips;
    this.rightPips = rightPips;

    Domino.prototype.getTotal = function(){

        return Number(this.leftPips)+Number(this.rightPips);

    }
}