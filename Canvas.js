

module.exports = class Canvas {
  constructor(rows, cols) {
    this.matrix = new Array(rows).fill(null)
      .map(_ => new Array(cols).fill(''));
  }
}