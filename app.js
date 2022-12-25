// Operation functions
function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(operator, num1, num2) {
    if (operator === '+') {
        return add(num1, num2);
    }
    if (operator === '-') {
        return subtract(num1, num2);
    }
    if (operator === '*') {
        return multiply(num1, num2);
    }
    if (operator === '/') {
        return divide(num1, num2);
    }
}

// Taken from: https://www.jacklmoore.com/notes/rounding-in-javascript/
function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

const display = document.querySelector('.display');
const inputs = document.querySelectorAll('.button');

let currentVal = '';

for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('click', addToCalc);
}

function addToCalc(e) {
    const input = this.textContent;
    if (!'ACDEL%/*-+=+/-.'.includes(input, 0)) {
        currentVal += input;
        display.textContent = currentVal;
    }
}

