'use strict';

import Board from './board.js';
import '../style.css';

const resultDisplay = document.querySelector('.best-result');
const buttonNewGame = document.querySelector('.restart-button');
const url = 'https://api.kazanina-online.ru/api/point';

export default class GameManager {
  constructor(isGameOver, score, board) {
    this.isGameOver = false;
    this.score = 0;
    this.board = null;
  }

  init() {
    this.board = new Board();
    this.board.init();
    this.board.generateNewCell();
    this.board.generateNewCell();
    document.addEventListener('keyup', this.clickControl.bind(this));
    buttonNewGame.addEventListener('click', this.newGame.bind(this));
    this.getData();
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

    if (counter === 16) {
      alert('Игра окончена!');
      this.isGameOver = true;
      this.fetchApi(this.board.gameManager.score);

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

  getData() {
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        const record = data.reduce((prev, current) => prev.count > current.count ? prev : current);
        resultDisplay.textContent = record.count;
      })
      .catch(error => console.error(error));
  }


  newGame() {
    const cellAll = document.querySelectorAll('.cell');
    const scoreDisplay = document.querySelector('.score');

    this.isGameOver = false;
    this.score = 0;
    for (let i = 0; i < this.board.widthBoard * this.board.widthBoard; i++) {
      this.board.squares[i].setValue('');
    }
    this.board = null;

    for (let i = 0; i < cellAll.length; i++) {
      if (cellAll.length === 16) {
        cellAll[i].remove();
      }
    }

    scoreDisplay.textContent = '0';
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
