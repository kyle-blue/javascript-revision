const express = require("express");
const router = express.Router();

const URL = "mongodb://localhost:27017";
const mongo = require("mongodb").MongoClient;

router.get("/", getAll);
router.post("/", insertUsers);
router.put("/", updateUsers);
router.delete("/", deleteUsers);



async function getAll(request, response, next) {
    let data = [];

    const client = await mongo.connect(URL, {useNewUrlParser: true});
    const db = client.db("test_db");
    const users = db.collection("users");

    await users.find().forEach(doc => data.push(doc));
    await client.close();

    response.json(data);
}

async function insertUsers(request, response, next) {
    const newUsers = request.body;

    const client = await mongo.connect(URL, {useNewUrlParser: true});
    const db = client.db("test_db");
    const users = db.collection("users");

    const insertResponse = await users.insertMany(newUsers);

    response.json(await users.find().toArray());

    await client.close();
}

//request.body should be the query object for find() (NOT ARRAY)
async function deleteUsers(request, response, next) {

    const client = await mongo.connect(URL, {useNewUrlParser: true});
    const db = client.db("test_db");
    const users = db.collection("users");

    const delResponse = await users.deleteMany(request.body);

    response.json(await users.find().toArray());

    await client.close();

}

async function updateUsers(request, response, next) {
    const client = await mongo.connect(URL, {useNewUrlParser: true});
    const db = client.db("test_db");
    const users = db.collection("users");

    //request body has bot the update and filter object
    await users.updateMany(request.body.filter, request.body.update);

    response.json(await users.find().toArray());

    await client.close();

}

module.exports = router;