require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const Stack = require('./stack')
const Queue = require('./queue')

//Drill 1
let starTrekStack = new Stack('starTrek');
starTrekStack.push('Kirk');
starTrekStack.push('Spock');
starTrekStack.push('McCoy');
starTrekStack.push('Scotty');

//Drill 2
function peek(stack){
    console.log(stack.top);
}

function isEmpty(stack){
    if(stack.top === null){
	return true;
    }
    return false;
}

function displayStack(stack){
    let currNode = stack.top;
    let str = "";
    while( currNode !== null ){
	str = str + currNode.data;
	currNode = currNode.next;
	if( currNode !== null){
	    str = str + ' -> ';
	}
    }
    console.log(str);
}

//remove McCoy
function removeItem(toRemove,stack){
    let currNode = stack.top;

    while(currNode.next !== null){
	if(currNode.data === toRemove){
	    stack.pop();
            displayStack(stack);
            break;
	}else if( currNode.next === null ){
	    console.log(toRemove+' not found!');
	}else{
	    stack.pop();
	}
	currNode = stack.top;
    }
    return;
}

//displayStack(starTrekStack);

//removeItem('McCoy',starTrekStack);



//Drill 3
function is_palindrome(s) {
    s = s.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");

    let palStack = new Stack;
    for(let i = 0; i < s.length; i++){
	palStack.push(s[i]);
    }

    let getStack = "";
    currNode = palStack.top;
    while(currNode !== null){
	getStack = getStack + currNode.data;
	currNode = currNode.next;
    }

    if( s === getStack){
	return true;
    }else{
	return false;
    }
}


//console.log(is_palindrome("dad"));
//console.log(is_palindrome("A man, a plan, a canal: Panama"));
//console.log(is_palindrome("1001"));
//console.log(is_palindrome("Tauhida"));


//Drill 4
function matchParens(str){
    let stack = new Stack;

    let openBrackets = ['(','{','['];
    let closeBrackets = [')','}',']'];

    for(let i = 0; i < str.length; i++){
	if(openBrackets.indexOf(str[i]) !== -1){
	    stack.push(str[i]);
	}else if( closeBrackets.indexOf(str[i]) !== -1 ){
	    if( str[i] === ')' && stack.top.data === '(' ){
		stack.pop();
	    }else if( str[i] === '}' && stack.top.data === '{' ){
		stack.pop();
	    }else if( str[i] === ']' && stack.top.data === '['){
		stack.pop();
	    }else{
		console.log('missing a closing bracket at place '+ i);
		return false;
	    }
	}else{
	    console.log('invalid character');
	    return false;
	}
    }
    return true;
}

/*
console.log(matchParens('()'));
console.log(matchParens('(]'));
console.log(matchParens('({)}'));
console.log(matchParens('{[]}'));
console.log(matchParens('()[]{}'));
console.log(matchParens('(){[]}'));
*/


//Drill 5

function sortStack(inputs){
    let inputStack = new Stack;

    for( let i = 0; i < inputs.length; i++ ){
	inputStack.push(inputs[i]);
    }

    let sortedStack = new Stack;
	sortedStack.push(inputStack.pop());
    let tempNode = inputStack.pop();

    while(tempNode > 0){
	if(tempNode > sortedStack.top.data){
	    while( sortedStack.top.data < tempNode ){
		let subNode = sortedStack.pop();
		inputStack.push(subNode);
	    }
	}
            sortedStack.push(tempNode);
	if( inputStack.top === null){
	    break;
	}else{
            tempNode = inputStack.pop();
	}
    }

    displayStack(sortedStack);

}

//sortStack([2,5,1,3,7]);



//Drill 6
let starTrekQ = new Queue('starTrek');
starTrekQ.enqueue('Kirk');
starTrekQ.enqueue('Spock');
starTrekQ.enqueue('Uhura');
starTrekQ.enqueue('Sulu');
starTrekQ.enqueue('Checkov');
console.log(starTrekQ);

//Drill 2
function peek(queue){
    console.log(queue.first);
}

function isEmpty(queue){
    if(queue.first === null){
        return true;
    }
    return false;
}

function displayQueue(queue){
    let currNode = queue.first;
    let str = "";
    while( currNode !== null ){
        str = str + currNode.value;
        currNode = currNode.next;
        if( currNode !== null){
            str = str + ' <- ';
        }
    }
    console.log(str);
}

//remove Spock
function removeItemQ(toRemove,queue){
    let currNode = queue.first;

    while(currNode.next !== null){
        if(currNode.value === toRemove){
            queue.dequeue();
            displayQueue(queue);
            break;
        }else if( currNode.next === null ){
            console.log(toRemove+' not found!');
        }else{
            queue.dequeue();
        }
        currNode = queue.first;
    }
    return;
}

displayQueue(starTrekQ);

//removeItemQ('Spock',starTrekQ);



//Drill 8

let stackA = new Stack();
stackA.push('D');
stackA.push('C');
stackA.push('B');
stackA.push('A');

let stackB = new Stack();


if(stackB.top === null){
	let tfrNode = stackA.pop();
	stackB.push(tfrNode);
}

//displayStack(stackB);



//Drill 9
function matchDancers(dancers){
    let f = new Queue;
    let m = new Queue;

    let f_count = 0;
    let m_count = 0;

    let gender = "";
    let tmp_dancer = "";

    for(let i = 0; i < dancers.length; i++){
	tmp_dancer = dancers[i]; 
	gender = tmp_dancer.substring(0,2);

	if( gender === "F " ){
	    f_count++;
	    f.enqueue(tmp_dancer);
	}else{
	    m_count++;
	    m.enqueue(tmp_dancer);
	}
    }

    let f_dancer = "";
    let m_dancer = "";

    if( f_count < m_count){
	while( f.first !== null ){
		f_dancer = f.dequeue();
		m_dancer = m.dequeue();
	    console.log('Female dancer is '+f_dancer+' and male dancer is '+m_dancer);
	    f_count--;
	    m_count--;
	}
    }else{
        while( m !== null ){
                f_dancer = f.dequeue();
                m_dancer = m.dequeue();
            console.log('Female dancer is '+f_dancer+' and male dancer is '+m_dancer);
            f_count--;
            m_count--;
        }
    }

    if( f_count > 0 ){
	console.log('There are '+f_count+' female dancers waiting to dance');
    }else if( m_count > 0 ){
	console.log('There are '+m_count+' male dancers waiting to dance');
    }

}

//matchDancers(['F Jane','M Frank','M John','M Sherlock','F Madonna','M David','M Christopher','F Beyonce']);



//Drill 10

function ophidianBank(customers){
    let line = new Queue;

    for(let i = 0; i < customers.length; i++){
	line.enqueue(customers[i]);
    }

    while(line.first !== null){
	let chance = Math.floor(Math.random() * 4) + 1; 
	let tmpCustomer = null;

	if( chance === 2){
	    tmpCustomer = line.dequeue();
		console.log('uho! poor '+tmpCustomer);
	    line.enqueue(tmpCustomer);
	}else{
		line.dequeue();
	}
	displayQueue(line);
    }

}


//ophidianBank(['bob','mary','george','luna','liath','walter','eve','mark']);

/*
let emptyStack = new Stack('empty');

peek(starTrekStack);

let emptyTest = isEmpty(emptyStack);
console.log(emptyTest);

emptyTest = isEmpty(starTrekStack);
console.log(emptyTest);
*/





const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())

app.get('/', (req, res) => {
   res.send('Hello, boilerplate!')
})

app.use(function errorHandler(error, req, res, next) {
  let response
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } }
  } else {
    console.error(error)
    response = { message: error.message, error }
  }
  res.status(500).json(response)
})

module.exports = app
