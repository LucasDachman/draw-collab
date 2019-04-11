

module.exports = class Canvas {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.matrix = this.initMatrix(rows, cols);
  }

  initMatrix(rows, cols) {
    return new Array(rows).fill(null)
      .map(_ => new Array(cols).fill(''));
  }

  clear() {
    this.matrix = this.initMatrix(this.rows, this.cols);
  }
}