import { Tetris } from "./tetris.js";
import {
  convertPositionToIndex,
  PLAYFIELD_ROWS,
  PLAYFIELD_COLUMNS,
} from "./utilities.js";

let timeoutID, requestID;

const tetris = new Tetris();
const cells = document.querySelectorAll(".grid>div");
const currentScore = document.querySelector(".statistics__score");
const currentLines = document.querySelector(".statistics__lines");

initKeydown();

moveDown();

function initKeydown() {
  document.addEventListener("keydown", onKeydown);
}

function onKeydown(event) {
  switch (event.code) {
    case "ArrowDown":
    case "KeyS":
      moveDown();
      break;
    case "ArrowLeft":
    case "KeyA":
      moveLeft();
      break;
    case "ArrowRight":
    case "KeyD":
      moveRight();
      break;
    case "KeyZ":
    case "KeyM":
      rotate();
      break;
    case "Space":
      dropDown();
      break;
    default:
      break;
  }
}

function moveDown() {
  tetris.moveTetrominoDown();
  draw();
  statsHandler();
  stopLoop();
  startLoop();
  if (tetris.isGameOver) {
    gameOver();
  }
}

function moveLeft() {
  tetris.moveTetrominoLeft();
  draw();
}

function moveRight() {
  tetris.moveTetrominoRight();
  draw();
}

function rotate() {
  tetris.rotateTetromino();
  draw();
}

function dropDown() {
  tetris.dropTetrominoDown();
  draw();
}

function startLoop() {
  timeoutID = setTimeout(() => (requestID = requestAnimationFrame(moveDown)), 700);
}

function stopLoop() {
  cancelAnimationFrame(requestID);
  clearTimeout(timeoutID);
}

function draw() {
  cells.forEach((cell) => cell.removeAttribute("class"));
  drawPlayfield();
  drawTetromino();
  drawGhostTetromino();
}

function statsHandler() {
  currentScore.innerHTML = tetris.stats.score;
  currentLines.innerHTML = tetris.stats.lines;
}

function drawPlayfield() {
  for (let row = 0; row < PLAYFIELD_ROWS; row++) {
    for (let column = 0; column < PLAYFIELD_COLUMNS; column++) {
      if (!tetris.playfield[row][column]) continue;
      const name = tetris.playfield[row][column];
      const cellIndex = convertPositionToIndex(row, column);
      cells[cellIndex].classList.add(name);
    }
  }
}

function drawTetromino() {
  const name = tetris.tetromino.name;
  const N = tetris.tetromino.matrix.length;
  for (let row = 0; row < N; row++) {
    for (let column = 0; column < N; column++) {
      // проверка на наличие единицы в матрице
      if (!tetris.tetromino.matrix[row][column]) continue;
      // проверка на наличие элемента за пределами поля
      if (tetris.tetromino.row + row < 0) continue;
      const cellIndex = convertPositionToIndex(
        tetris.tetromino.row + row,
        tetris.tetromino.column + column
      );
      cells[cellIndex].classList.add(name);
    }
  }
}

function drawGhostTetromino() {
  const N = tetris.tetromino.matrix.length;
  for (let row = 0; row < N; row++) {
    for (let column = 0; column < N; column++) {
      if (!tetris.tetromino.matrix[row][column]) continue;
      if (tetris.tetromino.ghostRow + row < 0) continue;
      const cellIndex = convertPositionToIndex(
        tetris.tetromino.ghostRow + row,
        tetris.tetromino.ghostColumn + column
      );
      cells[cellIndex].classList.add("ghost");
    }
  }
}

function gameOver() {
  stopLoop();
  document.removeEventListener("keydown", onKeydown);
  gameOverAnimation();
}

function gameOverAnimation() {
  const filledCells = [...cells].filter((cell) => cell.classList.length > 0);
  filledCells.forEach((cell, i) => {
    setTimeout(() => cell.classList.add("hide"), i * 10);
    setTimeout(() => cell.removeAttribute("class"), i * 25 + 1000);
  });
}
