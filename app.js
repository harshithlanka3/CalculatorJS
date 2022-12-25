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
const numInputs = document.querySelectorAll('.num');
const opInputs = document.querySelectorAll('.operand');
const del = document.querySelector('#del');

let currentVal = '';
let operatorTaken = false;
let operator = '';
let nextVal = '';

for (let i = 0; i < numInputs.length; i++) {
    numInputs[i].addEventListener('click', addToDisplay);
}

for (let i = 0; i < opInputs.length; i++) {
    opInputs[i].addEventListener('click', addOperand);
}

del.addEventListener('click', removeDigit);

function addToDisplay(e) {
    const num = this.textContent;
    if (operatorTaken) {
        nextVal += num;
        display.textContent = nextVal;
    } else {
        currentVal += num;
        display.textContent = currentVal;
    }
}

function addOperand(e) {
    const operand = this.textContent;
    if (!currentVal) {
        return;
    } 
    if (nextVal) {
        return;
    }
    operator = operand;
    operatorTaken = true;
}

function removeDigit(e) {
    if (nextVal.length === 0 && operatorTaken) {
        return;
    }
    if (nextVal.length > 0) {
        nextVal = nextVal.slice(0,-1);
        display.textContent = nextVal;
        return;
    }
    if (currentVal && currentVal.length > 0) {
        currentVal = currentVal.slice(0,-1);
        display.textContent = currentVal;
        return;
    }
}