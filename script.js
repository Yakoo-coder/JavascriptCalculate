
const display = document.querySelector('.calculator-input');
const keys = document.querySelector('.calculator-keys');

let displayValue = '0';
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

//Bunu burda çağırmamızın sebebi her yenilendiğinde başlasın
updateDisplay();

function updateDisplay() {
    display.value = displayValue; //Burası sıfır 
}

//Bütün butonlara tıklama yeri !! Click evete 
keys.addEventListener('click', function (e) {

    //Targete üzerine tıklama
    const element = e.target;
    const value = element.value;

    //matches -varmı yokmuya bakar ! 
    if (!element.matches('button')) return; // Sadece butona tılayabilir 


    switch (value) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
            handleOperator(value);
            break;
        case '.':
            inputDecimal();
            break;
        case 'clear':
            clear();
            break;
        default:
            inputNumber(element.value);
    }
    // //Operatorse operator yazacak
    // if (element.classList.contains('operator')) {
    //     //console.log('Operator', element.value);
    //     handleOperator(element.value)
    //     updateDisplay();
    //     return;
    // }

    // //decimal operator yazacak
    // if (element.classList.contains('decimal')) {
    //     // console.log('decimal', element.value);
    //     inputDecimal();
    //     updateDisplay();
    //     return;
    // }

    // //clear operator yazacak
    // if (element.classList.contains('clear')) {
    //     //console.log('clear', element.value);
    //     clear();
    //     updateDisplay();
    //     return;
    // }
    updateDisplay();

})

function handleOperator(nextOperator) {
    const value = parseFloat(displayValue);
    if (operator && waitingForSecondValue) {
        operator = nextOperator;
        return;
    }
    if (firstValue === null) {
        firstValue = value;
    } else if (operator) {
        const result = calculate(firstValue, value, operator)
        displayValue = `${parseFloat(result.toFixed(7))}`;
        firstValue = result;
    }

    waitingForSecondValue = true;
    operator = nextOperator;
    console.log(displayValue, firstValue, operator, waitingForSecondValue);
}

//İşlemlerin yapıldğı yer 
function calculate(first, second, operator) {
    if (operator === '+') {
        return first + second;
    } else if (operator === '-') {
        return first - second;
    } else if (operator === '*') {
        return first * second;
    } else if (operator === '/') {
        return first / second;
    }
    return second;
}

//Ardı ardına numara ekleme yeri
function inputNumber(num) {
    if (waitingForSecondValue) {
        displayValue = num;
        waitingForSecondValue = false;
    } else {
        displayValue = displayValue === '0' ? num : displayValue + num;
    }

    console.log(displayValue, firstValue, operator, waitingForSecondValue);
}


//Noktadan sonra bir daha nokta yapmaz!
function inputDecimal() {
    if (!displayValue.includes('.')) {
        displayValue += '.';
    }
}

//içini temizler 
function clear() {
    displayValue = '0';
}


