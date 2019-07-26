const EventEmitter = require("events");
const uuid = require("uuid");

class Logger extends EventEmitter{
    log(message){
        const id = uuid.v4(); //v1 uuid could track back location of mac address of computer (because of how its generated)
        this.emit("log", {id, message});
    }
}

const logger = new Logger();
logger.on("log", data => console.log(`${data.id.toString()}: ${data.message}`));

module.exports = logger;