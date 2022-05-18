'use strict';

import Board from './board.js';
import '../style.css';

const resultDisplay = document.querySelector('.best-result');
const buttonNewGame = document.querySelector('.restart-button');
const url = 'https://api.kazanina-online.ru/api/point';
const numberOfCells = 16;
let contextclickControl = null;
let contextNewGame = null;

export default class GameManager {
  constructor() {
    this.isGameOver = false;
    this.score = 0;
    this.board = null;
  }

  init() {
    this.board = new Board();
    this.board.init();
    this.board.generateNewCell();
    this.board.generateNewCell();

    contextclickControl = this.clickControl.bind(this);
    contextNewGame = this.newGame.bind(this);
    document.addEventListener('keyup', contextclickControl);
    buttonNewGame.addEventListener('click', contextNewGame);

    this.getData(this.board.gameManager.score);
  }

  checkForGameOver() {
    let counter = 0;

    for (let square of this.board.squares) {
      if (square.value !== '') {
        counter++;
      }

      if (square.value === 2048) {
        alert('Вы победили!');
        this.isGameOver = true;

        return false;
      }
    }

    if (counter === numberOfCells) {
      alert('Игра окончена!');
      this.isGameOver = true;
      this.fetchApi(this.board.gameManager.score);
      this.getData(this.board.gameManager.score);

      return false;
    }

    return true;
  }

  fetchApi(score) {
    const data = {
      userName: 'Анна',
      count: score
    }

    const fetchData = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json;charset=utf-8' }
    }

    fetch(url, fetchData)
      .then(resp => resp.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));

  }

  getData(score) {
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        const record = data.reduce((prev, current) => prev.count > current.count ? prev : current);
        score > record.count ? resultDisplay.textContent = score : resultDisplay.textContent = record.count;
      })
      .catch(error => console.error(error));
  }

  newGame() {
    const cells = document.querySelectorAll('.cell');
    const scoreDisplay = document.querySelector('.score');

    this.isGameOver = false;
    this.score = 0;
    for (let i = 0; i < numberOfCells; i++) {
      this.board.squares[i].setValue('');
    }
    this.board = null;
    cells.forEach(cell => cell.remove());
    scoreDisplay.textContent = '0';

    document.removeEventListener('keyup', contextclickControl);
    buttonNewGame.removeEventListener('click', contextNewGame);

    this.init();
  }

  clickControl(event) {
    if (event.key === 'ArrowUp') {
      this.board.movingColumn('up');
      this.board.combineColumn();
      this.board.movingColumn('up');
      if (!this.checkForGameOver()) {
        return
      }
      this.board.generateNewCell();
    } else if (event.key === 'ArrowDown') {
      this.board.movingColumn();
      this.board.combineColumn();
      this.board.movingColumn();
      if (!this.checkForGameOver()) {
        return
      }
      this.board.generateNewCell();
    } else if (event.key === 'ArrowLeft') {
      this.board.movingRow('left');
      this.board.combineRow();
      this.board.movingRow('left');
      if (!this.checkForGameOver()) {
        return
      }
      this.board.generateNewCell();
    } else if (event.key === 'ArrowRight') {
      this.board.movingRow();
      this.board.combineRow();
      this.board.movingRow();
      if (!this.checkForGameOver()) {
        return
      }
      this.board.generateNewCell();
    }
  }
}

const start = new GameManager();
start.init();
