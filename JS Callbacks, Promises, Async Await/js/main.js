document.addEventListener("DOMContentLoaded", function(){init();});
function init() {
    initEventHandlers();
}

function changeColor()  {
    this.style.backgroundColor = "#"+(Math.random()*0xFFFFFF<<0).toString(16);
}

function initEventHandlers(){
    let wrapperChildren = document.getElementById("wrapper").childNodes;
    wrapperChildren.forEach((child) => {
        if(child.tagName === "DIV")
            child.addEventListener("click", changeColor);
    });

    document.getElementById("box4").addEventListener("click", button4);
    document.getElementById("box5").addEventListener("click", button5);
    document.getElementById("box6").addEventListener("click", button6);
    document.getElementById("box7").addEventListener("click", button7);
}

let serverData = [
    {title: "Post 1", description: "Description for Post 1"},
    {title: "Post 2", description: "Description for Post 2"},
    {title: "Post 3", description: "Description for Post 3"}
];



//////////////  CALLBACKS  ////////////////

//A callback function is a function you want to be called after finishing something that usually blocks exectuion
// (such as adding data to server in this example
//In this case we cant to log the data recieved
function addToServerData (data, callback){
    setTimeout(() => {
        serverData.push(data);
        if(typeof callback === "function"){
            callback();
        }
    }, 1000);
}

function printServerData(){
    serverData.forEach(({title, description} = {}, index) => {
        console.log(`Title: ${title} --- Desc: ${description}`);
    });
}

function button4 () {
    //But it isn't necessarily clear from this scope the callback is called after data is added.
    //Promises clear this up -- and also prevents callback hell (through multiple then's), which is where callbacks are nested, and called consecutively
    //E.g the callback returns recieved data, then gets more data, which calls back and restructures the data... Etc.
    addToServerData({title: "Added Post 4", description: "Added Description for Post 4"},
        printServerData);

    console.log("Showing that this is asynchronous...\n\n");
}



//////////////  PROMISES  ////////////////
//p for promise version

function pAddToServerData(data, offset = 0) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const error = Math.round(Math.random() + offset);
            if(!error){
                serverData.push(data);
                resolve();
            }else{
                reject("Error, could not add data to server...");
            }
        }, 1000);
    });
}

function button5() {
    pAddToServerData({title: "pAdded Post 4", description: "pAdded Description for Post 4"})
        .then(() => printServerData())
        .catch(message => console.log(message));

    console.log("Showing that this is asynchronous...\n\n");
}



/////////////// PROMISE ALL /////////////////

function button6() {
    let promiseArray = [];
    promiseArray.push(Promise.resolve("SUCCESS"));
    promiseArray.push(new Promise((resolve, reject) => resolve("SUCCESS 2.0")));
    promiseArray.push(new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.round(Math.random()))
                resolve("SUCCESS in 2 seconds");
            else
                reject("Error NO SUCCESS in 2 seconds");
        }, 2000);
    }));
    promiseArray.push(fetch("https://jsonplaceholder.typicode.com/users")
        .then(result => result.json())); //The return value of the function inside a then is passed to the next then


    //All promises in the array will be handled by the same then and catch. This will be done at the same time (upon last promise resolve / reject)
    //The passed in param to resolve is now an array of all the resolved callback arguments from each function.
    //Should one reject, catch is immediately called (with the single argument value for the promise that caused rejection; no array)
    Promise.all(promiseArray)
        .then(values => console.log(values))
        .catch(singleVal => console.log("ERR: " + singleVal));

    //In other words... The Promise.all() method returns a single Promise that resolves when all of the promises passed as an iterable
    //have resolved or when the iterable contains no promises. It rejects with the reason of the first promise that rejects.


}


////////////// ASYNC AWAIT ////////////////

//Async await functions always implicitly return a promise. This allows us to wrap them in a try catch as seen below
//We must use try catch instead since we do not use .then and .catch;
async function addMultipleToServerDataThenPrint(...data){
    try{
        await tryAddMultipleToServerDataThenPrint(...data);
    }catch(err) {
        //Put in object to allow to see property names in console
        console.log({err});
        //Or could display object or array as a table (works best when a lot of them share similar properties)
        console.table({err});
    }
}
async function tryAddMultipleToServerDataThenPrint(...data){
    for(let i in data){
        if(data.hasOwnProperty(i))
            //In async await we still work with promises, but instead of chaining then's, we use await.
            //So .then.then.then would be the same as
            //let a = await x();
            //let b = await y();
            //let c = await z();
            //console.log({a, b, c});
            //This makes things A LOT cleaner
            await pAddToServerData(data[i], -0.4);
    }

printServerData();
}


function button7 () {
    addMultipleToServerDataThenPrint(
        {title: "GREGGO", description: "GREGGO IS FATTY"},
        {title: "DOOGGO", description: "DOGOGG IS twat"},
        {title: "bigup", description: "bigup IS gay"},
        {title: "MISSY", description: "MISSY IS gei"},
    );

    console.log("Showing that this is asynchronous...\n\n");


    let thread = new Worker
}