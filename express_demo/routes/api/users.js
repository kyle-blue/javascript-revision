//Otherwise it will load on a function call...
const path = require("path");
const fs = require("fs-extra");
const express = require("express");
const router = express.Router();
const debug = require("debug")("users");


//Since this file these are only called when router.use("/users", ...) from index.js is called, we already know we are in /api/users
//So these file paths are relative to /api.users
router.get("/", sendAll);
//router.get("/:id", sendOne); //Temporarily commented out to allow the use of template

//Return template
router.get("/:id", sendOneView);


router.post("/", addOne);

//Usually to update in a database, its going to be a put request.
router.put("/:id", updateOne);

router.delete("/:id", deleteOne);

//More comments for these functions in users_deprecated.js
async function sendAll (req, res, next) {
    const FILE_PATH = path.join(process.env.rootDir, "public/json/users.json");
    await fs.readFile(FILE_PATH)
        .then(data => res.json(JSON.parse(data)))
        .catch(err => console.log(err));
    next();
}


async function sendOne (req, res, next) {
    const FILE_PATH = path.join(process.env.rootDir, "public/json/users.json");
    const JSON_STRING = await fs.readFile(FILE_PATH, "utf-8");
    const JSON_DATA = JSON.parse(JSON_STRING);

    const USER = JSON_DATA.filter(val => val.id === parseInt(req.params.id));
    if(USER.length !== 0)
        res.json(USER);
    else{
        res.status(400);
        res.json({err: `User with id ${req.params.id} is not found...`});
    }
}

async function addOne(req, res, next)   {
    const FILE_PATH = path.join(process.env.rootDir, "public/json/users.json");
    let fileData = JSON.parse(await fs.readFile(FILE_PATH, "utf-8"));

    fileData.push(req.body);

    await fs.writeFile(FILE_PATH, JSON.stringify(fileData, null, 2)); //Third stringify arg allows pretty printing with spacing of 2

    console.log(`Successfully written to: ${FILE_PATH}`);

    res.type("text");
    res.write("Successfully added data");
}

async function updateOne (req, res, next) {
    const FILE_PATH = path.join(process.env.rootDir, "public/json/users.json");
    let fileData = JSON.parse(await fs.readFile(FILE_PATH, "utf-8"));

    const filteredFileData =  fileData.filter(val => val.id !== parseInt(req.params.id));

    filteredFileData.push(req.body);

    await fs.writeFile(FILE_PATH, JSON.stringify(filteredFileData, null, 2));

    res.type("text");
    res.write("Successfully updated id: " + req.params.id);
}


async function deleteOne(req, res, next) {
    const FILE_PATH = path.join(process.env.rootDir, "public/json/users.json");
    let fileData = JSON.parse(await fs.readFile(FILE_PATH, "utf-8"));

    let filteredFileData = fileData.filter(val => val.id !== parseInt(req.params.id));

    await fs.writeFile(FILE_PATH, JSON.stringify(filteredFileData, null, 2));

    res.write("Successfully deleted id: " + req.params.id);
}

//I NOW WANT TO KMS





async function sendOneView (req, res, next) {
    const FILE_PATH = path.join(process.env.rootDir, "public/json/users.json");
    const JSON_STRING = await fs.readFile(FILE_PATH, "utf-8");
    const JSON_DATA = JSON.parse(JSON_STRING);

    const USER = JSON_DATA.filter(val => val.id === parseInt(req.params.id));
    if(USER.length !== 0){
        res.render("userpage", {
            "user": USER[0]
        });
    }else{
        res.status(400);
        res.json({err: `User with id ${req.params.id} is not found...`});
    }
}


module.exports = router;