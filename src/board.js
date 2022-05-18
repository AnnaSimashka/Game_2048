import Cell from './cell.js';
import GameManager from './index.js';

const scoreDisplay = document.querySelector('.score');

export default class Board {
  constructor() {
    this.widthBoard = 4;
    this.squares = [];
    this.wrapper = document.querySelector('.grid');
    this.gameManager = new GameManager();
  }

  init() {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < this.widthBoard * this.widthBoard; i++) {
      const cell = new Cell();

      fragment.appendChild(cell.getNewElement());
      this.squares.push(cell);
    }

    this.wrapper.appendChild(fragment);
  }

  generateNewCell() {
    const randomNumber = Math.floor(Math.random() * this.squares.length);

    if (this.squares[randomNumber].getValue() === '') {
      this.squares[randomNumber].setValue(2);
    } else {
      this.generateNewCell();
    }
  }

  movingColumn(direction) {
    for (let i = 0; i < this.widthBoard; i++) {
      this.fillColumn(i, direction === 'up');
    }
  }

  // объединение значений в столбцах
  fillColumn(indexColumn, isUp) {
    const column = [];

    for (let i = 0; i < this.widthBoard; i++) {
      column.push(this.squares[indexColumn + this.widthBoard * i].getValue());
    }

    const filteredColumn = column.filter((num) => num);
    const emptyCellInColumnSize = this.widthBoard - filteredColumn.length;

    const newColumn = this.makeNewSequence(filteredColumn, emptyCellInColumnSize, isUp);

    newColumn.forEach((value, i) => {
      this.squares[indexColumn + (this.widthBoard * i)].setValue(value);
    });
  }

  makeNewSequence(numbers, emptySequensSize, isReverse) {
    const emptySequence = Array(emptySequensSize).fill('');

    return isReverse ? numbers.concat(emptySequence) : emptySequence.concat(numbers);
  }

  // суммирование значений
  combineColumn() {
    for (let i = 15; i >= this.widthBoard; i--) {
      if ((this.squares[i].getValue() === this.squares[i - this.widthBoard].getValue()) && this.squares[i].getValue() !== '') {
        const combinedTotal = parseInt(this.squares[i].getValue()) + parseInt(this.squares[i - this.widthBoard].getValue());

        this.squares[i].setValue(combinedTotal);
        this.squares[i - this.widthBoard].setValue('');

        this.gameManager.score += combinedTotal;
        scoreDisplay.textContent = this.gameManager.score;
      }
    }
  }

  movingRow(direction) {
    for (let i = 0; i < this.widthBoard * this.widthBoard; i++) {
      if (i % this.widthBoard === 0) {
        this.fillRow(i, direction === 'left');
      }
    }
  }

  // объединение значений в строках
  fillRow(rowIndex, isLeft) {
    const row = [];

    for (let i = 0; i < this.widthBoard; i++) {
      row.push(this.squares[rowIndex + i].getValue());
    }

    const filteredRow = row.filter((num) => num);
    const emptyCellInRowSize = this.widthBoard - filteredRow.length;

    const newRow = this.makeNewSequence(filteredRow, emptyCellInRowSize, isLeft);

    newRow.forEach((value, i) => {
      this.squares[rowIndex + i].setValue(value);
    });
  }

  combineRow() {
    for (let i = 15; i > 0; i--) {
      if ((this.squares[i].getValue() === this.squares[i - 1].getValue()) && this.squares[i].getValue() !== '' && i % this.widthBoard !== 0) {
        const combinedTotal = parseInt(this.squares[i].getValue()) + parseInt(this.squares[i - 1].getValue())

        this.squares[i].setValue(combinedTotal);
        this.squares[i - 1].setValue('');

        this.gameManager.score += combinedTotal;
        scoreDisplay.textContent = this.gameManager.score;
      }
    }
  }
}
