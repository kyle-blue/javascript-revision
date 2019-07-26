//window.onload = init;
document.addEventListener("DOMContentLoaded", function(){init();});
function init() {

    let buttons = document.getElementsByTagName("button");
    for(let x in buttons){
        buttons[x].innerText = "Button " + (Number(x) + 1);
    }

    initEventHandlers();
}


function changeColor()  {
    this.style.backgroundColor = "#"+(Math.random()*0xFFFFFF<<0).toString(16);
}

function initEventHandlers(){
    let wrapperChildren = document.getElementById("wrapper").childNodes;

    for(let i = 0; i < wrapperChildren.length; ++i){
        if(wrapperChildren[i].tagName === "DIV"){
            wrapperChildren[i].addEventListener("click", changeColor);
        }
    }


    let box4 = document.getElementById("box4");
    box4.addEventListener("click", button4);

    document.getElementById("box6").addEventListener("click", button6);
    document.getElementById("box5").addEventListener("click", button5);
    document.getElementById("box7").addEventListener("click", button7);
}

function button4 (){
    let x = 20;
    taggedTemplateLiterals `add${30} ${2222}`;
    taggedTemplateLiterals `sub${1002} ${x}`;
}

function taggedTemplateLiterals(strings, ...values){
    switch(strings[0]){
        case ("add"):
            console.log(`${values[0]} + ${values[1]} = ${values[0] + values[1]}`);
            break;
        case ("sub"):
            console.log(`${values[0]} - ${values[1]} = ${values[0] - values[1]}`);
            break;
        default:
            console.log(`strings length: ${strings.length} --- strings[1]: "${strings[1]}"`);
            break;
    }
}



function button5()   {
    let person = makePerson("Greg", 91, 170);
    person.printInfo();
    //Getting isGay and weight using [] computed key
    console.log(`${person.name} is${(person.isGay ? "" : " not")} gay, and has a weight of ${person.weight}`);


    let {name: pName, age: pAge} = person; //This makes two separate vars from elements in person. Can get more elements if wanted
    console.log(`Name of destructured person is ${pName} and is ${pAge} years old...`);

    let myMap = new Map();
    myMap.set("name", "Johnny");
    myMap.set("speed", 100);
    myMap.forEach((val, key) => console.log(`${key} : ${val}`));

}

//This is a factory function that returns an "Object Literal" using es6 features
function makePerson (name, age, height) {
    let x = "weight";
    return {
        name, //Here we can use "name" (es6) instead of "name: name" (es5)
        age,
        height,
        [x]: 100, //es6 allow computed key names using [] syntax.
        ["is" + "Gay"]: true,
        printInfo(){ //Here we can use "printInfo(){}" (es6) instead of "printInfo: function(){}" (es5)
           console.log(`My name is ${name} aged ${age}. I am ${height} cm tall.`);
        }
    }
}


function button6 () {

    //We must pass a function which has 2 params (which are themselves function).
    //We call the first param function in success, the second in failure to resolve the promise.
    //Both functions have 1 param as resolution value
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            let check = Math.round(7 + Math.random());
            if(check === 7){
                resolve("SUCCESS:::Check is indeed 7");
            }else{
                reject(`FAILURE:::Check is NOT 7. It is ${check}...`);
            }
        }, 5000);

    });

    //We call the function passed to "then" on success, and "catch" on failure.
    //"then" returns itself, so we can call catch separately if we want.
    promise.then((message) => {
        console.log(`then block --- ${message}`);
    }).catch((message) => {
        console.log(`catch block --- ${message}`);
    });

    console.log("Greg");
}