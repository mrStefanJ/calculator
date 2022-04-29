// Change Theme

const ball = document.getElementsByClassName('ball')[0];
const nums = document.getElementsByClassName('nums');
const pack = document.getElementsByClassName('pack');
const pipe = document.getElementById('pipe');
const theme1 = ["theme-one","keypad-theme-one","clear-theme-one","eq-theme-one"];
const theme2 = ["theme-two","keypad-theme-two","clear-theme-two","eq-theme-two"];
const theme3 = ["theme-three","keypad-theme-three","clear-theme-three","eq-theme-three"];

for(const each of nums) {
    each.onclick = function() {
        switch(each.id) {
            case "one":
                themeOne();
                break;
            case "two":
                themeTwo();
                break;
            case "three":
                themeThree();
                break;
        }
        for (const i of nums) {
            i.classList.remove('active');
        }
        each.classList.add('active');
    }
}

function themeOne() {
    ball.classList.remove('one','two','three')
    ball.classList.add('one');
    manageTheme(pack,theme1)
}
function themeTwo() {
    ball.classList.remove('one','two','three')
    ball.classList.add('two');
    manageTheme(pack,theme2)
}
function themeThree() {
    ball.classList.remove('one','two','three')
    ball.classList.add('three');
    manageTheme(pack,theme3)
}


function manageTheme(nodePack,myThemeVal) {
    for (let eachElem of nodePack) {
        if(eachElem.classList.contains('set-one')) {
            eachElem.classList.remove('theme-one','theme-two','theme-three');
            eachElem.classList.add(myThemeVal[0])
        } else if (eachElem.classList.contains('set-two')) {
            eachElem.classList.remove('keypad-theme-one','keypad-theme-two','keypad-theme-three');
            eachElem.classList.add(myThemeVal[1])
        } else if (eachElem.classList.contains('set-three')) {
            eachElem.classList.remove('clear-theme-one','clear-theme-two','clear-theme-three')
            eachElem.classList.add(myThemeVal[2])
        } else if (eachElem.classList.contains('set-four')) {
            eachElem.classList.remove('eq-theme-one','eq-theme-two','eq-theme-three')
            eachElem.classList.add(myThemeVal[3])
        }
    }
}


let moveCounter = 1;
pipe.onclick = function() {
    (moveCounter > 2) ? moveCounter = 0: null;
    nums[moveCounter].click();
    moveCounter++;
}

// Calculation

class Calculater {
    constructor(previousTextEle, currentTextEle) {
        this.previousTextEle = previousTextEle;
        this.currentTextEle = currentTextEle;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(num) {
        if (num === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + num.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }

        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case 'x':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    getDisplayNum(num) {
        const stringNum = num.toString();
        const integerDigits = parseFloat(stringNum.split('.')[0]);
        const decimalDigits = stringNum.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay;
        }
    }

    updateResult() {
        this.currentTextEle.innerText = this.getDisplayNum(this.currentOperand);
        if (this.operation != null) {
            this.previousTextEle.innerText = `${this.getDisplayNum(this.previousOperand)} ${this.operation}`
        } else {
            this.previousTextEle.innerText = '';
        }
    }
}

const numberBtn = document.querySelectorAll('[data-number]');
const operationBtn = document.querySelectorAll('[data-operation]');
const deleteBtn = document.querySelector('[data-delete]');
const clearAllBtn = document.querySelector('[data-clear-all]');
const equalBtn = document.querySelector('[data-equals]');

const previousTextEle = document.querySelector('[data-previous-operand]');
const currentTextEle = document.querySelector('[data-current-operand]');

const calculator = new Calculater(previousTextEle, currentTextEle);


numberBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        calculator.appendNumber(btn.innerText)
        calculator.updateResult();
    })
})

operationBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        calculator.chooseOperation(btn.innerText);
        calculator.updateResult();
    })
})

equalBtn.addEventListener('click', btn => {
    calculator.compute();
    calculator.updateResult();
})

deleteBtn.addEventListener('click', btn => {
    calculator.delete();
    calculator.updateResult();
})

clearAllBtn.addEventListener('click', btn => {
    calculator.clear();
    calculator.updateResult();
})