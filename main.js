const cells = document.querySelectorAll(".parent div ");
const textHolder = document.querySelectorAll(".parent div h1");
const turnIndicator = document.querySelector(".turn-indicator span");
const popUp = document.querySelector(".pop-up");
const resultBoard = document.querySelector(".pop-up h3");
const restartBtn = document.querySelector(".pop-up button");
const movableDiv = document.getElementById("movableDiv");

let isDragging = false;
let offsetX = 0;
let offsetY = 0;

movableDiv.addEventListener("mousedown", startDrag);
movableDiv.addEventListener("mousemove", drag);
movableDiv.addEventListener("mouseup", stopDrag);
movableDiv.addEventListener("mouseleave", stopDrag);

function startDrag(e) {
  isDragging = true;
  offsetX = e.offsetX;
  offsetY = e.offsetY;
}

function drag(e) {
  if (isDragging) {
    movableDiv.style.left = `${e.pageX - offsetX}px`;
    movableDiv.style.top = `${e.pageY - offsetY}px`;
  }
}

function stopDrag() {
  isDragging = false;
}

/***************************************************/

let isGameActive = true;
let gameBoard = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
let currentPlayer = "X";

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    masterFunction(index);
  });
});

restartBtn.addEventListener("click", () => {
  restartGame();
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
  turnIndicator.textContent = currentPlayer;
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
  cells.forEach((cell) => {
    cell.innerHTML = "<h1></h1>";
    popUp.style.opacity = "0";
    popUp.style.zIndex = "-1";
    gameBoard = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    isGameActive = true;
  });
}
