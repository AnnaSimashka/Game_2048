'use strict';

import Board from './board.js';
import Cell from './cell.js';

const scoreDisplay = document.querySelector('.score');
const resultDisplay = document.querySelector('.result');

class GameManager {
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
    }

    checkIsGameOver() {
        console.log('checkIsGameOver')
    }

    clickControl(event) {
        if (event.key === 'ArrowUp') {
            this.board.movingColumn('up');
            this.board.combineColumn();
            this.board.movingColumn('up');
            this.board.generateNewCell();
        } else if (event.key === 'ArrowDown') {
            this.board.movingColumn();
            this.board.combineColumn();
            this.board.movingColumn();
            this.board.generateNewCell();
        } else if (event.key === 'ArrowLeft') {
            this.board.movingRow('left');
            this.board.combineRow();
            this.board.movingRow('left');
            this.board.generateNewCell();
        } else if (event.key === 'ArrowRight') {
            this.board.movingRow();
            this.board.combineRow();
            this.board.movingRow();
            this.board.generateNewCell();
        }
    }
}

const start = new GameManager();
start.init();

