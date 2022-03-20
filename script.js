'use strict';

document.addEventListener('keyup', clickControl);

const scoreDisplay = document.querySelector('.score');
const resultDisplay = document.querySelector('.result');
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

class GameManager {
    constructor(isGameOver, score, board) {
        this.isGameOver = false;
        this.score = 0;
        this.board = null;
    }

    init() {
        this.board = new Board();
        this.board.init();
        document.addEventListener('keyup', clickControl);
    }

    checkIsGameOver() {
        console.log('checkIsGameOver')
    }
}

class Board {
    constructor(widthBoard, squares, wrapper) {
        this.widthBoard = 4;
        this.squares = [];
        this.wrapper = document.querySelector('.grid');
    }

    init() {
        const fragment = document.createDocumentFragment();
        
        for (let i = 0; i < this.widthBoard * this.widthBoard; i++) {
            const square = document.createElement('div');
            square.innerHTML = '';
            square.className = 'cell';

            fragment.appendChild(square);
            this.squares.push(square);
        }

        this.wrapper.appendChild(fragment);

        const oneCell = Math.floor(Math.random() * (this.widthBoard * this.widthBoard));
        this.squares[oneCell].innerHTML = '2';
    }

    generateNewCell() {
        console.log('generateNewCell')
    }
    
    addColours() {
        console.log('addColours')
    }
}

class Cell {
    constructor(value, dom) {
        this.value = '';
        this.dom = null;
    }

    getValue() {
        return this.value;
    }

    setValue() {
        console.log('setValue')
    }

    getNewElement() {
        console.log('getNewElement')
    }
}

const start = new GameManager();
start.init();

function clickControl(event) {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        console.log(event.key)
    }
}