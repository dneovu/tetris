import { Tetris } from "./tetris.js";
import { convertPositionToIndex } from "./utilities.js";

const tetris = new Tetris();
const cells = document.querySelectorAll(".grid>div");

initKeydown();

draw();

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
    default:
      break;
  }
}

function moveDown() {
  tetris.moveTetrominoDown();
  draw();
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

function draw() {
  cells.forEach((cell) => cell.removeAttribute("class"));
  drawTetromino();
}

function drawTetromino() {
  const name = tetris.tetromino.name;
  const tetrominoMatrixSize = tetris.tetromino.matrix.length;
  for (let row = 0; row < tetrominoMatrixSize; row++) {
    for (let column = 0; column < tetrominoMatrixSize; column++) {
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
