const express = require("express");
const path = require("path");
const nunjucks = require("nunjucks");
const app = express();

nunjucks.configure("views", {
    express: app,
    autoescape: true
});

//This sets the default extension for your views
app.set("view engine", "njk");

//Set root directory as env var
process.env.rootDir = __dirname;

app.get("/example", (req, res) => {
    res.send("This page will end the http response before middleware can be called");
});

//In this case, sendAll() is also (unnecessarily) middleware just for demonstration purposes
// app.get("/api/users", users.sendAll);
//
// app.get("/api/users/:id", users.sendOne);


app.use(express.json()); //Since the body of request is essentially binary, we need a body parser. This allows parsing JSON
app.use(express.urlencoded({ extended: false})); //This is for bodyParsing form POST
//Auto includes index.js in routes
app.use(require("./routes"));


//To setup static folder (uses middleware function "static")
//The use middleware function is called upon EVERY request. Order also matters. If use is after get root /
//and the index is loaded, the http response will end() before use, and it wont be called.
app.use(express.static(path.join(__dirname, "public"))); //It seems next() only called here when not found (to allow for search of matching request in proceeding middleware functions
app.use((req, res, next) => {
    console.log(`MIDDLEWARE CALLED FOR URL: ${req.protocol}://${req.get("host")}${req.url}`);
    req.someProperty = "greg"; //Defining a new property in middleware for res or req will bake them available for later middleware functions (or any with req or res passed)
    next();
});
const PORT = process.env.port || 8000;
app.listen(PORT, () => console.log(`Running server on port: ${PORT}`));