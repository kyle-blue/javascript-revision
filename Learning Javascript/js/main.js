//window.onload = init;
document.addEventListener("DOMContentLoaded", function(){init();});
function init() {

    let buttons = document.getElementsByTagName("button");
    for(let x in buttons){
        buttons[x].innerText = "Button " + (Number(x) + 1);
    }

    initEventHandlers();
}

let numPressed = 0.9;
function button1Clicked() {
    console.log("Button pressed " + Math.floor((++numPressed)).toFixed(0) + " Times");
    document.getElementById("box1").innerHTML = "Hello";

    let greg = ["dawd","daw","daw","daw","dw","ad","wda","wdwa"];

    for(x in greg){
        console.log(greg[x]);
        greg[x] = "GREGGG";
    }
    for (let x of greg){
        console.log(x);
    }

    let ANIMAL_COW = Symbol("Cow");
    console.log("The typeof(" + ANIMAL_COW.toString() + ") is " + typeof(ANIMAL_COW));
}


function button2Clicked ()  {
    // let x = {val: 10};
    // console.log("x value: " + x.val);
    // increment(x);
    // console.log("x value: " + x.val);

    let numbers = [1, 2, -3];

    numbers[3] = 5;
    numbers.push(2132);
    numbers[6] = -1111;
    numbers[9] = 0;

    // delete numbers[4]; //Just sets undefined
    // numbers[3] = undefined;
    numbers.splice(3, 2); //This actually removes values and compacts;
    numbers.splice(2, 1, 9000, 100, 12908); //This deletes 1 and also adds 9000 100 and 12908


    // numbers.sort(function (x, y) { return x - y; }); //Swaps when > 0 so this is ascending
    // numbers.sort(function (x, y) { return Math.random() - 0.5; }); //Randomise the order

    numbers.shift();
    numbers.unshift(69);


    console.log(numbers.join(", "));
    console.log("Array length: " + numbers.length);

}

function increment(x){
    ++x;
}

function button3Clicked(){

    let args = [];
    while(true){
        let ans = prompt("Please enter an arg or nothing to stop");
        if(ans === "")
            break;
        args.push(ans);
    }

    multiParam(...args);
}


function multiParam(...params)   {
    let args = "";


    for(let i = 0; i < params.length; ++i){
        args += params[i] + ", ";
    }

    console.log("Args: " + args);
}

function initEventHandlers(){
    let wrapperChildren = document.getElementById("wrapper").childNodes;

    for(let i = 0; i < wrapperChildren.length; ++i){
        if(wrapperChildren[i].tagName === "DIV"){
            wrapperChildren[i].onclick = function(mouseEvent){
                    this.style.backgroundColor = "#"+(Math.random()*0xFFFFFF<<0).toString(16);
            }
        }
    }

    document.body.onmousemove = function(mouseEvent){
        const text = "Mouse X: " + mouseEvent.pageX + "\nMouse Y: " + mouseEvent.pageY;
        document.getElementById("box7").innerText = text;
    };

    document.getElementById("box4").onclick = function (e){
        // window.location.href = "www.google.com";
        this.style.border = "5px solid black";
        let button4 = document.createElement("button")
        button4.innerText = "Button 4";
        // document.getElementById("wrapper").appendChild(button4);
        document.getElementById("wrapper").insertBefore(button4, document.getElementById("wrapper").lastElementChild.nextSibling);
        let type = document.getElementById("wrapper").lastChild.nodeType;
        let name = document.getElementById("wrapper").lastChild.nodeName;
        console.log(`Node Type: ${type} --- Node Name: ${name}`);
    };

    document.getElementById("box5").onclick = function (e){
        objectOriented(e);
    }
}


function Person(name, _age){
    //Age is private amd jobTitle is private
    var jobTitle = "Software Developer";

    this.name = name;
    this._age = _age;
    this.printInfo = function(){
        console.log(`My name is ${this.name} and I am ${this._age} years old. I work as a ${jobTitle}`);
    };

    this.prototype = {
        get age(){
            return this._age;
        },
        set age(ageParam){
            this._age = ageParam;
        }
    };
}


function objectOriented(e){
    let person = new Person("Derek", 190);
    if(person instanceof Person){
        person.printInfo();
        //We can change class as we go along? Fking awesome
        let x = "Hello ";
        Person.prototype.printName = function () {console.log(x + this.name + ", " + this.age)};
        person.printName();
    }

    for(key in person){
        if(person.hasOwnProperty(key)){
            console.log(`XXX ${key}: ${person[key]}`);

        }
    }
}