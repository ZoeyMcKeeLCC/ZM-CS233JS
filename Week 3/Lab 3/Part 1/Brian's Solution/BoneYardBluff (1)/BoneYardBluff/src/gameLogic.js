// -------------------- Core Logic --------------------
// Domino object constructor used in gameLogic object
function Domino(leftPips, rightPips) {
  this.leftPips = leftPips;
  this.rightPips = rightPips;
}

const STARTING_LIVES = 5;

const gameLogic = {
  boneyard: [],
  currentDomino: null,
  nextDomino: null,
  score: 0,
  lives: STARTING_LIVES,
  isResolving: false,
  isGameOver: false,

  fillBoneyard: function () {
    this.boneyard = [];

    for (let left = 0; left <= 6; left++) {
      for (let right = left; right <= 6; right++) {
        this.boneyard.push(new Domino(left, right));
      }
    }

    this.currentDomino = null;
    this.nextDomino = null;
    this.score = 0;
    this.lives = STARTING_LIVES;
    this.isResolving = false;
    this.isGameOver = false;
  },

  shuffleBoneyard: function () {
    for (let i = this.boneyard.length - 1; i > 0; i--) {
      const randomIndex = Math.trunc(Math.random() * (i + 1));
      const temp = this.boneyard[i];
      this.boneyard[i] = this.boneyard[randomIndex];
      this.boneyard[randomIndex] = temp;
    }
  },

  dealStartingDominos: function () {
    this.currentDomino = this.boneyard.pop();
    this.nextDomino = this.boneyard.pop();
  },

  getTotalPips: function (domino) {
    // converted to use destructuring assignment
    const { leftPips, rightPips } = domino;
    return leftPips + rightPips;
  },

  evaluateGuess: function (guess) {
    const currentTotal = this.getTotalPips(this.currentDomino);
    const nextTotal = this.getTotalPips(this.nextDomino);

    let isCorrect = false;

    if (guess === "high") {
      isCorrect = nextTotal >= currentTotal;
    } else if (guess === "low") {
      isCorrect = nextTotal <= currentTotal;
    }

    return isCorrect;
  },

  advanceRound: function () {
    this.currentDomino = this.nextDomino;
    this.nextDomino = this.boneyard.length > 0 ? this.boneyard.pop() : null;
  },
};

// Linter note: export/module warnings can be ignored in this browser ES module file.
export { gameLogic };
