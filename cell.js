export default class Cell {
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