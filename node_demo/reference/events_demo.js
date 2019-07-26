const EventEmitter = require("events");

//Need to inherit EventEmitter to make your own emitter
class MyEmitter extends EventEmitter {}

let myEmitter = new MyEmitter();

//Must create a listener which calls a callback function when it detects an event emitted
myEmitter.on("someEvent", () => console.log("Emitted event fired!"));


//Now when we emit / fire an event, the callback is called
myEmitter.emit("someEvent");


//Events is shown better through an example . See logger.js