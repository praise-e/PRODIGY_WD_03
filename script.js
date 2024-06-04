const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("statusText");
const restartBtn = document.getElementById("restartBtn");

let draws = document.getElementById("draws");
let drawsScore = 0;
let X = document.getElementById("XScore");
let XScore = 0;
let O = document.getElementById("OScore");
let OScore = 0;

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [0, 4, 8],
];

let currentPlayer = "X";
let running = false;
let options = ["", "", "", "", "", "", "", "", ""];

initializeGame();

function initializeGame() {
  cells.forEach(cell => cell.addEventListener("click", cellClicked));
  restartBtn.addEventListener("click", restartGame);
  statusText.textContent = `${currentPlayer}'s turn`;
  running = true;
}


function cellClicked() {
  const cellIndex = this.getAttribute("cellIndex");

  if (options[cellIndex] !== "" || !running) {
    return;
  }

  updateCell(this, cellIndex);
  checkWinner();
}

function updateCell(cell, index) {
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
}

function changePlayer() {
  currentPlayer = (currentPlayer == "X") ? "O" : "X";
  statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
  let roundWon = false;

  for (i = 0; i < winConditions.length; i++) {
    let condition = winConditions[i];

    let cellA = options[condition[0]];
    let cellB = options[condition[1]];
    let cellC = options[condition[2]];

    if (cellA == "" || cellB == "" || cellC == "") {
      continue;
    }
    if (cellA == cellB && cellB == cellC) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    if (currentPlayer == "X") {
        XScore++;
        X.textContent = XScore;
        currentPlayer = "O"
    } else {
        OScore++;
        O.textContent = OScore;
        currentPlayer = "X"
    }
    running = false;
  } else if (!options.includes("")) {
    statusText.textContent = `Draw!`;
    drawsScore++;
    draws.textContent = drawsScore;
  } else {
    changePlayer();
  }
}
function restartGame() {
  options = ["", "", "", "", "", "", "", "", ""];
  running = true;
  cells.forEach(cell => cell.textContent = "");
  initializeGame();
}
