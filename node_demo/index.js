//EXAMPLE STUFF
// //Node Imports
// const Person = require("./js/person.js");
//
// let person = new Person("Greg", 19, 199);
// person.printInfo();
// Person.scream();
//
// //LOGGER
// console.log("\n\nTesting Logger:");
// const logger = require("./js/logger.js");
// logger.log("WOW THIS IS A EVENT MESSAGE");

//Using a framework (such as express) makes things a lot easier.
//THIS IS BRINGING ALL THINGS IN REFERENCE ALL TOGETHER

const http = require("http");
const path = require("path");
const fs = require("fs-extra");

const server = http.createServer();
server.on("request", async (req, res) => {
    const FILE_PATH = path.join(
        __dirname,
        "public",
        (req.url === "/" ? "index.html" :
            (path.extname(req.url) === "" ? `${req.url}.html` : req.url)));

    const FILE_EXT = path.extname(FILE_PATH);

    console.log("EXT:" + FILE_EXT);
    console.log("PATH:" + FILE_PATH);
    let contentType = "text/html"; //By default
    if(FILE_EXT === ".json")
        contentType = "application/json";
    else if(FILE_EXT === ".js")
        contentType = "text/javascript"
    else if(FILE_EXT === ".css")
        contentType = "text/css";
    else if(FILE_EXT === ".png")
        contentType = "image/png";
    else if(FILE_EXT === ".jpg")
        contentType = "image/jpg";



    await fs.readFile(FILE_PATH, "utf-8")
        .then(data => {
            res.writeHead(200, {"Content-Type": contentType});
            res.end(data);
        })
        .catch(err => {
            if(err.code === "ENOENT"){
                fs.readFile(path.join(__dirname, "public", "404.html"), "utf-8")
                    .then(data => {
                        res.writeHead("404", {"Content-Type": "text/html"});
                        res.end(data);
                    });
            }else{
                res.writeHead(500);
                res.end("Error 500. SERVER ERROR --- " + err);
            }
        });


});

//Load any page sending correct content type (css jpeg png html etc) depends on ext name. (if no ext name make it html)
//404 Page err code ENOENT

//process is a global object (dont need require) which provide info and control over the current node process
const PORT = process.env.port || 8000; //This means use process.env.PORT, but use 8000 if its undefined
server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));


//TODO: Learn Clustering!
//TODO: Search essential NPM packages such as "ForeverNPM" (restarts server if it goes down)