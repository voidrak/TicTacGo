const cells = document.querySelectorAll(".parent div ");
const textHolder = document.querySelectorAll(".parent div h1");
const turnIndicator = document.querySelector(".turn-indicator span");
const popUp = document.querySelector(".pop-up");
const resultBoard = document.querySelector(".pop-up h3");
const restartBtn = document.querySelector(".pop-up button");

let isGameActive = true;
let gameBoard = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
let currentPlayer = "X";

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    masterFunction(index);
  });
});

function masterFunction(index) {
  if (gameBoard[index] != " " || !isGameActive) {
    return;
  }

  togglePlayer();
  cellUpdater(index);
  checkWinning();
}

function cellUpdater(index) {
  gameBoard[index] = currentPlayer;
  cells[index].innerHTML = `<div> <h1> ${currentPlayer}</h1></div>`;
}

function togglePlayer() {
  if (currentPlayer == "X") {
    currentPlayer = "O";
  } else if (currentPlayer === "O") {
    currentPlayer = "X";
  }
}
function checkWinning() {
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const condition of winningConditions) {
    let [a, b, c] = condition;
    if (
      gameBoard[a] != " " &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[b] === gameBoard[c]
    ) {
      isGameActive = false;
      resultBoard.textContent = `${currentPlayer} has won`;
      popUp.style.opacity = "1";
      popUp.style.zIndex = "1";
    }
  }
  if (!gameBoard.includes(" ")) {
    isGameActive = false;
    popUp.style.opacity = "1";
    popUp.style.zIndex = "1";
  }
}

function restartGame() {
  textHolder.forEach((text) => {
    text.textContent = " ";
  });
  popUp.style.opacity = "0";
  popUp.style.zIndex = "-1";
  gameBoard = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
  isGameActive = true;
}

restartBtn.addEventListener("click", () => {
  restartGame();
});
