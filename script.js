const screen = document.getElementById('display-content');
const buttons = document.getElementsByTagName('button');
const numbers = document.getElementsByClassName('numbtn');
const operators = document.getElementsByClassName('operator');
const decimal = document.getElementById('decimal-btn');

//displaying numbers on screen
for(let i=0; i<buttons.length; i++){
    buttons[i].addEventListener('click', display);
    if(buttons[i].className == 'numbtn') buttons[i].addEventListener('click', addnumber);
    if(buttons[i].className == 'operator') buttons[i].addEventListener('click', addoperator);
}

//expression string on screen
function display(){
    if(this.id == 'delete-btn' || this.id == 'sqr-btn') ;
    else if(this.className == 'operator'){
        if(screen.innerHTML[screen.innerHTML.length-1] == '+' ||screen.innerHTML[screen.innerHTML.length-1] == '-'||screen.innerHTML[screen.innerHTML.length-1] == 'x'||
        screen.innerHTML[screen.innerHTML.length-1] == '/'){
        dlt();
        screen.innerHTML +=this.innerHTML;
        }else{
            screen.innerHTML +=this.innerHTML;
        }
    } 
    else{
        screen.innerHTML += this.innerHTML;
    }
    
    
}

let number = "";
function addnumber(){
    
    number += this.innerHTML;
    
}

var args = [];                      // CAlCulation numbers array
var operatorsArr = ['+'];            // Operator tracker  
function addoperator(){
    decimal.disabled = false;
    if(number.length!=0){args.push(number); number="";}
    if(args.length == 2){
        if(operatorsArr[0] == '+') add();
        if(operatorsArr[0] == '-') sub();
        if(operatorsArr[0] == 'x') mul();
        if(operatorsArr[0] == '/') div();
        if(this.innerHTML != '=') screen.innerHTML += this.innerHTML;
    }
    // else if(this.innerHTML == '=');
    
    operatorsArr[0] = this.innerHTML;
    
    
    console.log(args);
    console.log("operators:"+operatorsArr);
}


//Clear Button
const clearbtn = document.getElementById('clear-btn');
clearbtn.addEventListener('click', clearall);
function clearall(){
    screen.innerHTML = "";
    operatorsArr = [];
    args = [];
    number = "";
    decimal.disabled = false;
}


//Delete Button
const deletebtn = document.getElementById('delete-btn');
deletebtn.addEventListener('click', dlt);
function dlt(){
    if(screen.innerHTML.length == 1 || screen.innerHTML == 'Syntax Error') clearall();
    else{
        let text = screen.innerHTML.slice(0, -1);
        screen.innerHTML = text;
    
        if(screen.innerHTML[screen.innerHTML.length-1] == '+' ||screen.innerHTML[screen.innerHTML.length-1] == '-'||screen.innerHTML[screen.innerHTML.length-1] == 'x'||
            screen.innerHTML[screen.innerHTML.length-1] == '/'){
                operatorsArr.pop();
            }
        else if(operatorsArr.length == 0){
            args.pop();
            clearall();
        }
        else if(screen.innerHTML[screen.innerHTML.length-1] == '.'){
            decimal.disabled = false;
           clearall();
        }
        else {
            
                number = number.slice(0, number.length-1);
           
        }
    }
    
   
}

//Equals Button
const eqlbtn = document.getElementById('eql-btn');
eqlbtn.addEventListener('click', function(){
    
    if(operatorsArr[0] == '+') add();
    else if(operatorsArr[0] == '-') sub();
    else if(operatorsArr[0] == 'x') mul();
    else if(operatorsArr[0] == '/') div();
    else if(args.length == 1) screen.innerHTML = args[0];
    else (screen.innerHTML = "Syntax Error");
   
} )

//Decimal
decimal.addEventListener('click', decimalFun);
function decimalFun(){
    decimal.disabled = true;
}

//Calculations
let result = 0;
function add(){
    result = Number(args[0]) + Number(args[1]);
    if(Number.isInteger(result) == false) result = result.toPrecision(4);
    args = [];
    args.push(result);
    screen.innerHTML = result;
}

function sub(){
    result = Number(args[0]) - Number(args[1]);
    if(Number.isInteger(result) == false) result = result.toPrecision(4);
    args = [];
    args.push(result);
    screen.innerHTML = result;
}

function mul(){
    result = Number(args[0]) * Number(args[1]);
    if(Number.isInteger(result) == false) result = result.toPrecision(4);
    args = [];
    args.push(result);
    screen.innerHTML = result;
}

function div(){
    if(Number(args[1] == 0)){
        screen.innerHTML = "Division by 0 not allowed!";
        clearall();
        return;
    }
    else{
        result = Number(args[0]) / Number(args[1]);
         if(Number.isInteger(result) == false) result = result.toPrecision(3);
        args = [];
        args.push(result);
        screen.innerHTML = result;
    }
    
}





























