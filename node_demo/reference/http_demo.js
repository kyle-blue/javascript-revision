const http = require("http");

//Create server object. Callback called when a http request is received
const server = http.createServer();
server.listen(8000, () => console.log("Server is running!\nCtrl+c to stop server!"));

server.on("request", (req, res) => {
    //Write response
    res.write("<h1>Request headers:</h1>\n" + Object.entries(req.headers).join("<br />"));
    res.write("<h1>Request trailers:</h1>" + Object.entries(req.trailers));
    res.end();
});