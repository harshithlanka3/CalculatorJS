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
const dec = document.querySelector('#dec');
const sign = document.querySelector('#sign');

let currentDisplay = '';
let currentVal = '';
let operator = '';
let nextVal = '';

for (let i = 0; i < numInputs.length; i++) {
    numInputs[i].addEventListener('click', addClick);
}
for (let i = 0; i < opInputs.length; i++) {
    opInputs[i].addEventListener('click', operatorClick);
}
del.addEventListener('click', removeDigit);
eq.addEventListener('click', evalExpression);
ac.addEventListener('click', allClear);
dec.addEventListener('click', addDecimal);
sign.addEventListener('click', changeSign);

function changeSign(e) {
    if (operator) {
        if (nextVal) {
            nextVal = String(Number(nextVal) * -1);
            lowerDisplay.textContent = round(nextVal, 6);
        }
    } else {
        if (currentVal) {
            currentVal = String(Number(currentVal) * -1);
            lowerDisplay.textContent = round(currentVal, 6);
        }
    }
}

function addDecimal(e) {
    if (operator) {
        if (nextVal.length > 0 && !nextVal.includes('.', 0)) {
            nextVal += '.';
            lowerDisplay.textContent = nextVal;
        }
    } else {
        if (currentVal.length > 0 && !currentVal.includes('.', 0)) {
            currentVal += '.';
            lowerDisplay.textContent = currentVal;
        }
    }
}

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
        if (operator === '/' && nextVal == '0') {
            alert("Please don't divide by 0 :)");
            return;
        }
        let endVal = operate(operator, currentVal, nextVal);
        currentDisplay = `${round(currentVal, 6)} ${operator} ${round(nextVal, 6)} =`;
        currentVal = String(endVal);
        nextVal = '';
        operator = '';
        upperDisplay.textContent = currentDisplay;
        lowerDisplay.textContent = round(currentVal,6);
    }
}

function addClick(e) {
    addToDisplay(this.textContent);
}

function addToDisplay(input) {
    const num = input;
    if (operator) {
        nextVal += num;
        lowerDisplay.textContent = nextVal;
    } else {
        currentVal += num;
        currentDisplay = currentVal;
        lowerDisplay.textContent = currentDisplay;
    }
}

function operatorClick(e) {
    addOperator(this.textContent);
}

function addOperator(input) {
    if (!currentVal) {
        return;
    } 
    if (nextVal) {
        return;
    }
    operator = input;
    currentDisplay = round(currentVal, 6) + ` ${operator}`
    upperDisplay.textContent = currentDisplay;
    lowerDisplay.textContent = '';
}

function removeDigit(e) {
    if (operator) {
        if (nextVal.length > 0) {
            nextVal = nextVal.slice(0,-1);
            if (nextVal.length == 1 && nextVal.charAt(0) === '-') {
                nextVal = '';
            }
            lowerDisplay.textContent = nextVal;
            return;
        }
    } else {
        if (currentVal.length > 0) {
            currentVal = currentVal.slice(0,-1);
            if (currentVal.length == 1 && currentVal.charAt(0) === '-') {
                currentVal = '';
            }
            lowerDisplay.textContent = currentVal;
            return;
        }
    }
}

document.addEventListener('keydown', (e) => {
    const name = e.key;
    if (!isNaN(name)) {
        addToDisplay(name);
    } else if (name === '.') {
        addDecimal(e);
    } else if ('+-/*'.includes(name)) {
        addOperator(name);
    } else if (name === '=' || name === 'Enter') {
        evalExpression(e);
    } else if (name === 'Backspace') {
        removeDigit(e);
    }
  });