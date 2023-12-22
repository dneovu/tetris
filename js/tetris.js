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
    this.isGameOver = false;
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
    const row = -2;

    this.tetromino = {
      name,
      matrix,
      column,
      row,
      ghostColumn: column,
      ghostRow: row,
    };

    this.calculateGhostPosition();
  }

  moveTetrominoDown() {
    this.tetromino.row += 1;
    if (!this.isValid()) {
      this.tetromino.row -= 1;
      this.placeTetromino();
    }
  }

  moveTetrominoLeft() {
    this.tetromino.column -= 1;
    if (!this.isValid()) {
      this.tetromino.column += 1;
    } else {
      this.calculateGhostPosition();
    }
  }

  moveTetrominoRight() {
    this.tetromino.column += 1;
    if (!this.isValid()) {
      this.tetromino.column -= 1;
    } else {
      this.calculateGhostPosition();
    }
  }

  rotateTetromino() {
    const oldMatrix = this.tetromino.matrix;
    const rotatedMatrix = rotateMatrix(this.tetromino.matrix);
    this.tetromino.matrix = rotatedMatrix;
    if (!this.isValid()) {
      this.tetromino.matrix = oldMatrix;
    } else this.calculateGhostPosition();
  }

  dropTetrominoDown() {
    this.tetromino.row = this.tetromino.ghostRow
    this.placeTetromino()
  }

  isValid() {
    const N = this.tetromino.matrix.length;
    for (let row = 0; row < N; row++) {
      for (let column = 0; column < N; column++) {
        if (!this.tetromino.matrix[row][column]) continue;
        if (this.isOutsideOfPlayfield(row, column)) return false;
        if (this.isCollides(row, column)) return false;
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
  // проверка наложения на другие фигуры
  isCollides(row, column) {
    return this.playfield[this.tetromino.row + row]?.[this.tetromino.column + column];
  }

  placeTetromino() {
    const N = this.tetromino.matrix.length;
    for (let row = 0; row < N; row++) {
      for (let column = 0; column < N; column++) {
        if (!this.tetromino.matrix[row][column]) continue;
        if (this.isOutsideOfTopBoard(row)) {
          this.isGameOver = true;
          return;
        }
        this.playfield[this.tetromino.row + row][this.tetromino.column + column] =
          this.tetromino.name;
      }
    }
    this.processFilledRows();
    this.generateTetromino();
  }

  isOutsideOfTopBoard(row) {
    return this.tetromino.row + row < 0;
  }

  processFilledRows() {
    const filledRows = this.findFilledRows();
    this.removefilledRows(filledRows);
  }

  findFilledRows() {
    const filledRows = [];
    for (let row = 0; row < PLAYFIELD_ROWS; row++) {
      // каждый элемент строки === 1
      if (this.playfield[row].every((cell) => cell)) {
        filledRows.push(row);
      }
    }
    return filledRows;
  }

  removefilledRows(filledRows) {
    filledRows.forEach((row) => {
      this.dropRowsAbove(row);
    });
  }

  dropRowsAbove(rowToDelete) {
    for (let row = rowToDelete; row > 0; row--) {
      this.playfield[row] = this.playfield[row - 1];
    }
    this.playfield[0] = new Array(PLAYFIELD_COLUMNS).fill(0);
  }

  calculateGhostPosition() {
    const realTetrominoRow = this.tetromino.row;
    while (this.isValid()) {
      this.tetromino.row++;
    }
    this.tetromino.ghostRow = this.tetromino.row - 1;
    this.tetromino.ghostColumn = this.tetromino.column;
    this.tetromino.row = realTetrominoRow;
  }
}
