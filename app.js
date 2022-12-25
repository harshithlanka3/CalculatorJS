// Operation functions
function add(num1, num2) {
    return Number(num1) + Number(num2);
}

function subtract(num1, num2) {
    return Number(num1) - Number(num2);
}

function multiply(num1, num2) {
    return Number(num1) * Number(num2);
}

function divide(num1, num2) {
    return Number(num1) / Number(num2);
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
    return Number(Math.round(Number(value)+'e'+decimals)+'e-'+decimals);
}

const lowerDisplay = document.querySelector('#lower');
const upperDisplay = document.querySelector('#upper');
const numInputs = document.querySelectorAll('.num');
const opInputs = document.querySelectorAll('.operator');
const del = document.querySelector('#del');
const eq = document.querySelector('#eq');
const ac = document.querySelector('#ac');

let currentDisplay = '';
let currentVal = '';
let operator = '';
let nextVal = '';

for (let i = 0; i < numInputs.length; i++) {
    numInputs[i].addEventListener('click', addToDisplay);
}
for (let i = 0; i < opInputs.length; i++) {
    opInputs[i].addEventListener('click', addOperator);
}
del.addEventListener('click', removeDigit);
eq.addEventListener('click', evalExpression);
ac.addEventListener('click', allClear);

function allClear(e) {
    currentDisplay = '';
    currentVal = '';
    operator = '';
    nextVal = '';
    upperDisplay.textContent = '';
    lowerDisplay.textContent =''
}

function evalExpression(e) {
    if (currentVal && nextVal && operator) {
        let endVal = operate(operator, currentVal, nextVal);
        currentDisplay = `${round(currentVal, 6)} ${operator} ${round(nextVal, 6)} =`;
        currentVal = String(endVal);
        nextVal = '';
        operator = '';
        upperDisplay.textContent = currentDisplay;
        lowerDisplay.textContent = round(currentVal,6);
    }
}

function addToDisplay(e) {
    const num = this.textContent;
    if (operator) {
        nextVal += num;
        lowerDisplay.textContent = nextVal;
    } else {
        currentVal += num;
        currentDisplay = currentVal;
        lowerDisplay.textContent = currentDisplay;
    }
}

function addOperator(e) {
    const input = this.textContent;
    if (!currentVal) {
        return;
    } 
    if (nextVal) {
        return;
    }
    operator = input;
    currentDisplay = currentVal + ` ${operator}`
    upperDisplay.textContent = round(currentDisplay, 6);
    lowerDisplay.textContent = '';
}

function removeDigit(e) {
    if (operator) {
        if (nextVal.length > 0) {
            nextVal = nextVal.slice(0,-1);
            lowerDisplay.textContent = nextVal;
            return;
        }
    } else {
        if (currentVal.length > 0) {
            currentVal = currentVal.slice(0,-1);
            lowerDisplay.textContent = currentVal;
            return;
        }
    }
}