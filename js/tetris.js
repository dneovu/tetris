import {
  PLAYFIELD_ROWS,
  PLAYFIELD_COLUMNS,
  TETROMINO_NAMES,
  TETROMINOES,
  getRandomElement,
  rotateMatrix,
} from "./utilities.js";

export class Tetris {
  constructor() {
    this.playfield;
    this.tetromino;
    this.init();
  }

  init() {
    this.generatePlayfield();
    this.generateTetromino();
  }

  generatePlayfield() {
    this.playfield = new Array(PLAYFIELD_ROWS)
      .fill()
      .map(() => new Array(PLAYFIELD_COLUMNS).fill(0));
  }

  generateTetromino() {
    const name = getRandomElement(TETROMINO_NAMES);
    const matrix = TETROMINOES[name];
    // начальная позиция в центре
    const column = PLAYFIELD_COLUMNS / 2 - Math.floor(matrix.length / 2);
    // const row = -2
    const row = 2;

    this.tetromino = {
      name,
      matrix,
      column,
      row,
    };
  }

  moveTetrominoDown() {
    this.tetromino.row += 1;
    if (!this.isValid()) {
      this.tetromino.row -= 1;
    }
  }

  moveTetrominoLeft() {
    this.tetromino.column -= 1;
    if (!this.isValid()) {
      this.tetromino.column += 1;
    }
  }

  moveTetrominoRight() {
    this.tetromino.column += 1;
    if (!this.isValid()) {
      this.tetromino.column -= 1;
    }
  }

  rotateTetromino() {
    const oldMatrix = this.tetromino.matrix;
    const rotatedMatrix = rotateMatrix(this.tetromino.matrix);
    this.tetromino.matrix = rotatedMatrix;
    if (!this.isValid()) {
      this.tetromino.matrix = oldMatrix;
    }
  }

  isValid() {
    const N = this.tetromino.matrix.length;
    for (let row = 0; row < N; row++) {
      for (let column = 0; column < N; column++) {
        if (!this.tetromino.matrix[row][column]) continue;
        if (this.isOutsideOfPlayfield(row, column)) return false;
      }
    }
    return true;
  }

  isOutsideOfPlayfield(row, column) {
    return (
      this.tetromino.column + column < 0 ||
      this.tetromino.column + column >= PLAYFIELD_COLUMNS ||
      this.tetromino.row + row >= PLAYFIELD_ROWS
    );
  }
}
