window.addEventListener("DOMContentLoaded", init);
function init() {
    let box = document.getElementById("textBox");


    if(typeof(Worker) === "undefined")
        throw Error ("Browser does not support web workers!");

    let worker = new Worker("js/worker.js");
    worker.postMessage("DO WORK");
    box.innerHTML = "<b>DOING WORK</b>";

    worker.addEventListener("message", (message) => {
        if(message.data.toString().includes("ERROR"))
            console.log(message.data);
        else if(message.data === "CLOSE"){
            worker.terminate();
            worker = undefined;
            box.innerHTML = "Worker has been <b>terminated...</b>"
            console.log("Worker has been terminated...");
        }else{
            //To get underlying message data use message.data
            box.innerHTML = "<b>Final Count: </b>" + message.data;
        }
    });

}