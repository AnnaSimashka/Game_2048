'use strict';

import Board from './board.js';

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
        document.addEventListener('keyup', this.clickControl);
    }

    checkIsGameOver() {
        console.log('checkIsGameOver')
    }
    
    clickControl(event) {
        if (event.key === 'ArrowUp') {
            console.log(event.key)
        } else if (event.key === 'ArrowDown') {
            console.log(event.key)
        } else if (event.key === 'ArrowLeft') {
            console.log(event.key)
        } else if (event.key === 'ArrowRight') {
            console.log(event.key)
        }
    }
}

const start = new GameManager();
start.init();

