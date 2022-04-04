import Board from './board.js';

const colorCell = [
  '#afa192',
  '#eee4da',
  '#ede0c8',
  '#f2b179',
  '#ffcea4',
  '#e8c064',
  '#ffab6e',
  '#fd9982',
  '#ead79c',
  '#76daff',
  '#beeaa5',
  '#d7d4f0',
];

export default class Cell {
  constructor(value, dom) {
    this.value = '';
    this.dom = null;
  }

  getValue() {
    return this.value;
  }

  setValue(value) {
    this.value = value;
    this.dom.textContent = value;
    this.dom.style.backgroundColor = colorCell[Math.trunc(Math.sqrt(value))];
  }

  getNewElement() {
    if (this.dom !== null) {
      throw new Error('Cell уже существует!');
    }
    const square = document.createElement('div');
    square.innerHTML = '';
    square.className = 'cell';
    this.dom = square;

    return square;
  }
}
