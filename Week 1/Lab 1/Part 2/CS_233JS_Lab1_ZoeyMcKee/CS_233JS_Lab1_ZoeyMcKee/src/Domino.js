export function Domino(leftPips, rightPips) {
    this.leftPips = leftPips;
    this.rightPips = rightPips;

    Domino.prototype.getTotal = function(){

        return Number(this.leftPips)+Number(this.rightPips);

    }
}