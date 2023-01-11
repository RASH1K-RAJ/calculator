function add(a, b){
    return a+b;
}

function substract(a, b){
    return a-b;
}

function multiply(a, b){
    return a*b;
}

function divide(a, b){
    return a/b;
}

function operate(operator, a, b){
   return system[operator](a, b);
}

var system = {
    "add": add,
    "substract": substract,
    "multiply": multiply,
    "divide": divide,
};

var totalNo = 0;
var currentNo = 0;
var operator = ``;
var operatorUsed = false;

const total = document.querySelector('#total');

const current = document.querySelector('#current');
current.textContent = `${currentNo}`;

const numbers = Array.from(document.querySelectorAll('.number'));
numbers.forEach((number) =>{
    number.addEventListener('click', (event) =>{
        if(current.textContent === '0') current.textContent = ``;
        if(operatorUsed) {
            current.textContent = ``;
            operatorUsed = false;
            currentNo = 0;
        };
        current.textContent += event.target.id;
        currentNo = parseInt(current.textContent);
    });
});

const operatorBtns = Array.from(document.querySelectorAll('.operator'));
operatorBtns.forEach((operatorBtn)=>{
    operatorBtn.addEventListener('click',(event) => {
        //perform operation stored in operator if none then don't
        //update operator
        //update totalNo
        if(!operator) {
            operator = event.target.id;
            totalNo = currentNo
        }else{
           totalNo = operate(operator, parseInt(totalNo), parseInt(currentNo));
           operator = event.target.id;
        }

         //update TopDisplay
        total.textContent = `${totalNo} ${event.target.textContent}`;
        //update operatorUsed
        operatorUsed = true;
    });
});

const equals = document.querySelector('#equals');
equals.addEventListener('click', (event)=>{
    if(operatorUsed) return;
    if(!operator) return;
    operatorUsed = false;
    //Update UpperDisplay
    total.textContent += ` ${currentNo} =`;
    //Call operate function
    totalNo = operate(operator, parseInt(totalNo), parseInt(currentNo));
    //Update LowerDisplay
    current.textContent = `${totalNo}`;
    //Update Operator
    operator = ``;
    //Update currentNo
    currentNo = totalNo;
});


const clearAll = document.querySelector('#clearAll');
clearAll.addEventListener('click', (event) =>{
    current.textContent = ``;
    total.textContent = ``;
    totalNo = 0;
    currentNo = 0;
    operator = ``;
    operatorUsed = false;
    //FIX ME: see what else we need to do
})

const clear = document.querySelector('#clear');
clear.addEventListener('click', (event)=>{
    current.textContent = current.textContent.slice(0, -1);
    currentNo = parseInt(current.textContent);
    if(!current.textContent) currentNo = 0;
});

