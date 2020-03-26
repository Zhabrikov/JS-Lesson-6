
let buttons = document.getElementsByClassName('buttons');
let outputLacation = document.getElementById('outputLocation');
let outputLacationMini = document.getElementById('outputLocationMini');
let text = document.getElementById('text');
let radChecked = document.getElementById('radioButton1');
let variable1 = 0;
let variable2 = 0;
let operation;
let history = [];
let afterOperation = false;
let сlearHistory = false;
let secondParameter = false;

receiptOfOperation = (operationCode) => {
    if (outputLacation.value !== ""){
        variable1 = outputLocation.value;
    }   
    operation = operationCode;
    if (secondParameter === false){
        outputLocationMini.value = outputLocation.value + " " + operation;  
    } else {
        outputLocationMini.value += " " + variable2 + " " + operation;  
    }
    
    afterOperation = true;  
}

factorial = (n) => {
    return n ? n * factorial(n - 1) : 1;
}

var operations = {
    '+': (variable1, variable2) => (variable1 * 10 + variable2 * 10) / 10,  
    '-': (variable1, variable2) => (variable1 * 10 - variable2 * 10) / 10,    
    '*': (variable1, variable2) => (variable1 * 10 * variable2 * 10) / 100,    
    '/': (variable1, variable2) => (variable1 * 10 / variable2 * 10) / 100,    
    '%': (variable1, variable2) => variable1 % variable2,    
    '^': (variable1, variable2) => Math.pow(variable1, variable2),

    'Sin': (variable1) => Math.sin(Number(variable1)),  
    'Cos': (variable1) => Math.cos(Number(variable1)),    
    'Tan': (variable1) => Math.tan(Number(variable1)),    
    'Ctg': (variable1) => 1/Math.tan(Number(variable1)),    
    'Sqrt': (variable1) => Math.sqrt(Number(variable1)),    
    '!': (variable1) => factorial(Number(variable1)) 
};



makeOperation = (operationCode) => {

    switch (operationCode){   
        case "H": 
            if (сlearHistory === false){
                for (let i = 0; i < history.length; i ++){
                    text.innerHTML += `<p>${history[i]}</p>`;
                }
                сlearHistory = true;
            } else {
                text.innerHTML = "";
                сlearHistory = false;
            }            
                
            break;
        case "Clear":    
            outputLocation.value = 0;
            outputLocationMini.value = "";
            variable1 = 0;
            variable2 = 0;
            break;
        case "Back":    
            outputLocation.value = outputLocation.value.substring(0, outputLocation.value.length - 1);
            if (outputLocation.value === ""){
                outputLocation.value = 0;
            }
            break;
        case "+-":   
            outputLocation.value *= -1;
            break;
        case ".":
            if (outputLocation.value.includes(".") === false){
                outputLocation.value += ".";
            }            
            break
        case "+":
        case "-":
        case "*":
        case "/":
        case "%": 
        case "^":  
            if (secondParameter === true){
                variable2 = outputLocation.value;
                outputLocation.value = operations[operation](Number(variable1), Number(variable2)); 
            }
            receiptOfOperation(operationCode);
            secondParameter = true;
            break;
        case "Sin":
        case "Cos":
        case "Tan":
        case "Ctg":
        case "Sqrt":
        case "!":
            receiptOfOperation(operationCode);
        case "=":
            secondParameter = false;
            
            if (outputLacation.value !== ""){
                variable2 = outputLocation.value;
            }
            
            switch (operation){
                
                case "+":
                case "-":
                case "*":
                case "/":
                case "%": 
                case "^":                 
                    outputLocation.value = operations[operation](Number(variable1), Number(variable2)); 
                    if (operation == '/' && variable2 == 0){
                        outputLocation.value = "Деление на 0";
                    }   
                    if (history.length > 2){
                        history.shift();
                    }                
                    history.push(outputLocationMini.value + ' ' + variable2 + ' = ' + outputLocation.value);    
                    text.innerHTML = "";
                    сlearHistory = false;                             
                    break; 
                 
                case "Sin":
                case "Cos":
                case "Tan":
                case "Ctg":       
                // outputLocation.value = operations[operation](Number(variable1), Number(variable2));          
                    if (radChecked.checked === true){
                        outputLocation.value = operations[operation](Number(variable1)).toFixed(4);      
                    } else {
                        outputLocation.value = operations[operation](Number(variable1)*Math.PI/180).toFixed(4); 
                    }
                    if (history.length > 2){
                        history.shift();
                    }                
                    history.push(operation + " " + variable1 + ' = ' + outputLocation.value);  
                    text.innerHTML = "";
                    сlearHistory = false;     
                    break; 
                case "Sqrt": 
                    outputLocation.value = operations[operation](Number(variable1));
                    history.push(operation + " " + variable1 + ' = ' + outputLocation.value);  
                    text.innerHTML = "";
                    сlearHistory = false;     
                    break; 
                case "!":
                    outputLocation.value = factorial(Number(variable1));                    
                    if (history.length > 2){
                        history.shift();
                    }                
                    history.push(operation + variable1 + ' = ' + outputLocation.value);  
                    text.innerHTML = "";
                    сlearHistory = false;  
                    break;    
            }
            outputLocationMini.value = "";
            variable1 = variable2;            
            afterOperation = true;
            break;
            
        default:
            if (outputLocation.value === "0" || afterOperation === true){
                outputLocation.value = "";
                afterOperation = false;
            }
            outputLocation.value += operationCode;
            break;
    }
}

onOperationButtonClick = (event) => makeOperation(event.currentTarget.innerHTML);

for (let i = 0; i < buttons.length; i++){
    buttons[i].addEventListener('click', onOperationButtonClick);
}

