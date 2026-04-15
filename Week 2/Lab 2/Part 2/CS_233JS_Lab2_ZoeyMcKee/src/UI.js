export const ui = {
    leftDominoElement: null,
    rightDominoElement: null,
    statusElement: null,
    highButton: null,
    lowButton: null,
    resetButton: null,

    cacheDominoElements: function () {
        this.leftDominoElement = document.getElementById('left-domino');
        this.rightDominoElement = document.getElementById('right-domino');
        this.statusElement = document.getElementById('status');
        this.messageElement = document.getElementById('message');

        this.highButton = document.getElementById('high-btn');
        this.lowButton = document.getElementById('low-btn');
        this.resetButton = document.getElementById('reset-btn');
    },

    renderFilenameAsText: function (filename) {
        const parts = filename.split('_');
        return parts[1] + ' | ' + parts[2];
    },

    //Updates shown domino
    showLeftDomino: function (filename) {
        // TODO: show the face of the left domino.
        this.leftDominoElement.innerHTML = this.renderFilenameAsText(filename)

    },

    //Changes the hidden domino to hidden
    showRightDominoBack: function () {
        // TODO: show the back of the right domino.
        this.rightDominoElement.innerHTML = "? | ?"
        this.rightDominoElement.className = "domino-card back"
    },

    //Changes the hidden domino to visible
    showRightDominoFace: function (filename) {
        // TODO: show the face of the right domino.
        this.rightDominoElement.innerHTML = this.renderFilenameAsText(filename)
        this.rightDominoElement.className = "domino-card"
    },

    bindGuessButtons: function (clickHandler) {
        this.highButton.dataset.guess = 'high';
        this.lowButton.dataset.guess = 'low';
        this.highButton.onclick = clickHandler;
        this.lowButton.onclick = clickHandler;
    },

    bindResetButton: function (clickHandler) {
        this.resetButton.onclick = clickHandler;
    },

    disableGuessButtons: function () {
        // TODO: disable the guess buttons.
        this.highButton.disabled = true;
        this.lowButton.disabled = true;
    },

    enableGuessButtons: function () {
        this.highButton.disabled = false;
        this.lowButton.disabled = false;
    },

    //Updates User info via input values
    updateStatus: function (uiElementList = [0, 0, 0, 0]) {
        // TODO: show score, lives, remaining dominos, and optional message in the status element.'

        // ~~~~~~~~~~~~~~ SPREAD OPERATOR ~~~~~~~~~~~~~~
        // I know that this code isn't very useful and doesn't really build
        // to the rest of the project in any meaningful way but there wasn't
        // really any good places else to put a spread operator in this
        // assignment the way it was built.
        const bufferList = [...uiElementList]

        // ~~~~~~~~~~~~~~ DESTRUCTURING ASSIGNMENT ~~~~~~~~~~~~~~
        const [score, lives, remaining, message] = bufferList;
        this.statusElement.innerHTML = `Score: ${score} | Lives: ${lives} | Remaining: ${remaining}`;

        this.messageElement.innerHTML = message;
        console.log(message)

    }
};