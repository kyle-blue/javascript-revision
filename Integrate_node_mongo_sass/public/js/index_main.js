const URL = "http://localhost:8000/api/users";

window.addEventListener("DOMContentLoaded", init);
function init(){
    document.getElementById("btnPOST").addEventListener("click", postJsonInput);
    document.getElementById("btnPUT").addEventListener("click", putJsonInput);
    document.getElementById("btnDELETE").addEventListener("click", deleteJsonInput);
}


async function getUsers(){
    const response = await fetch(URL, {method: "GET"});

    let userData = await response.json();

    document.getElementById("leftBar").innerText = JSON.stringify(userData, null, 2);
}


async function postJsonInput(){
    const textBox = document.getElementById("jsonInput");
    //jsonInput is an array...
    let jsonInput = JSON.parse(textBox.value);


}

async function putJsonInput(){
    const textBox = document.getElementById("jsonInput");
    //jsonInput is an object with two other objects inside (filter and update)...
    let jsonInput = JSON.parse(textBox.value);


}

async function deleteJsonInput(){
    const textBox = document.getElementById("jsonInput");
    //jsonInput is an object (filter)...
    let jsonInput = JSON.parse(textBox.value);
}