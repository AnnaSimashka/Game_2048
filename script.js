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
        this.board.generateNewCell();
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
            const cell = new Cell();

            fragment.appendChild(cell.getNewElement());
            this.squares.push(cell.dom);
        }

        this.wrapper.appendChild(fragment);
    }

    generateNewCell() {
        const randomNumber = Math.floor(Math.random() * this.squares.length);

        if (this.squares[randomNumber].innerHTML === '') {
            this.squares[randomNumber].innerHTML = 2;
            this.addColours();
            // проверить на GameOver
        } else {
            this.generateNewCell();
        }
    }

    addColours() {
        for (let i = 0; i < this.squares.length; i++) {
            this.squares[i].style.backgroundColor = colorCell[Math.trunc(Math.sqrt(this.squares[i].innerHTML))];
        }
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
        const square = document.createElement('div');
        square.innerHTML = '';
        square.className = 'cell';
        this.dom = square;
        
        return square;
    }
}

const start = new GameManager();
start.init();

function clickControl(event) {
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