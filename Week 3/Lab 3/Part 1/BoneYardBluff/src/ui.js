// -------------------- UI --------------------
// The ui object handles all interaction with the HTML document.
// It only modifies visual elements and relies on game logic for data.

// PIP_LAYOUTS maps one half of a domino numerical value (array indicies 0-6) to the specific
// spots in a 3 x 3 grid where pips (dots) should be placed to represent that number.

// The values in the array represent pip locations in the grid:
//   1 2 3  (top row)
//   4 5 6  (middle row)
//   7 8 9  (bottom row)
const PIP_LAYOUTS = {
  0: [],
  1: [5],
  2: [3, 7],
  3: [3, 5, 7],
  4: [1, 3, 7, 9],
  5: [1, 3, 5, 7, 9],
  6: [1, 3, 4, 6, 7, 9],
};

export class UI {

  #leftDominoElement
  #rightDominoElement
  #statusElement
  #highButton
  #lowButton
  #resetButton

  constructor(){
  this.#leftDominoElement = null;
  this.#rightDominoElement = null;
  this.#statusElement = null;
  this.#highButton = null;
  this.#lowButton = null;
  this.#resetButton = null;
  }
  /**
   * Caches references to DOM elements used frequently in the UI,
   * assigning them to properties of the ui object to improve performance.
   * 
   */

  //Getters
  getLeftDominoElement(){ return this.#leftDominoElement; }
  getRightDominoElement(){ return this.#rightDominoElement; }
  getStatusElement(){ return this.#statusElement; }
  getHighButton(){ return this.#highButton; }
  getLowButton(){ return this.#lowButton; }
  getResetButton(){ return this.#resetButton; }


  //Setters
  setLeftDominoElement(input){ this.#leftDominoElement = input; }
  setRightDominoElement(input){ this.#rightDominoElement = input; }
  setStatusElement(input){ this.#statusElement = input; }
  setHighButton(input){ this.#highButton = input; }
  setLowButton(input){ this.#lowButton = input; }
  setResetButton(input){ this.#resetButton = input; }

  cacheDominoElements() {
    this.setLeftDominoElement(document.getElementById("left-domino"));
    this.setRightDominoElement(document.getElementById("right-domino"));
    this.setStatusElement(document.getElementById("status"));
    this.setHighButton(document.getElementById("high-btn"));
    this.setLowButton(document.getElementById("low-btn"));
    this.setResetButton(document.getElementById("reset-btn"));
  }

  /**
   * Builds the HTML for one half of a domino, generating the grid cells.
   * Based on the pipCount, it adds a "pip" class to the correct cell positions.
   * - Total number of pips required (usually 0 to 6).
   *  The raw HTML string representing half of a domino.
   */
  // converted to use default parameters and template literals
  buildHalfHTML(pipCount) {
    let html = '<div class="domino-half">';
    for (let pos = 1; pos <= 9; pos++) {
      const hasPip = PIP_LAYOUTS[pipCount].includes(pos);
      html += `<span class="pip-cell${hasPip ? " pip" : ""}"></span>`;
    }
    html += "</div>";
    return html;
  }

  /**
   * Builds the complete HTML layout structure of a face-up domino.
   * It takes a domino object to generate the pip counts for both halves,
   * and inserts a divider line between them.
*/
  buildDominoFaceHTML(domino) {
    // converted to use destructuring assignment and template literals

    return `
      <div class="domino-face">
        ${this.buildHalfHTML(domino.getLeftPips())}
        <div class="domino-divider"></div>
        ${this.buildHalfHTML(domino.getRightPips())}
      </div>`;
  }

  /**
   * Shows a domino face up in the left domino element slot.
   * @param {Object} domino - The domino object to reveal.
   * @returns {void}
   */
  showLeftDomino(domino) {
    this.getLeftDominoElement().innerHTML = this.buildDominoFaceHTML(domino);
    this.getLeftDominoElement().classList.remove("back");
  }

  /**
   * Displays the right-side domino face down (its back cover).
   * @returns {void}
   */
  showRightDominoBack() {
    this.getRightDominoElement().innerHTML = '<div class="domino-back"></div>';
    this.getRightDominoElement().classList.add("back");
  }

  /**
   * Dispays the right-side domino face up, revealing its actual pips.
   * @param {Object} domino - The domino object to reveal.
   * @returns {void}
   */
  showRightDominoFace(domino) {
    this.getRightDominoElement().innerHTML = this.buildDominoFaceHTML(domino);
    this.getRightDominoElement().classList.remove("back");
  }

  /**
   * Dispays the left-side domino face up, revealing its actual pips.
   * @param {Object} domino - The domino object to reveal.
   * @returns {void}
   */
  showLeftDominoFace(domino) {
    this.getLeftDominoElement().innerHTML = this.buildDominoFaceHTML(domino);
    this.getLeftDominoElement().classList.remove("back");
  }

  /**
   * Disables the interaction of high/low buttons during round resolution.
   * @returns {void}
   */
  disableGuessButtons() {
    this.getHighButton().disabled = true;
    this.getLowButton().disabled = true;
  }

  /**
   * Enables the interaction of high/low guess buttons.
   * @returns {void}
   */
  enableGuessButtons() {
    this.getHighButton().disabled = false;
    this.getLowButton().disabled = false;
  }

  updateStatus(score, lives, remaining, message = "") {
    // converted to use template literals
    let text = `Score: ${score} | Lives: ${lives} | Remaining: ${remaining}`;
    if (message !== "") {
      text += ` | ${message}`;
    }
    this.getStatusElement().textContent = text;
  }
};

