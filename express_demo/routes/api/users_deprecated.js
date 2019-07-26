//Otherwise it will load on a function call...
const path = require("path");
const fs = require("fs-extra");

//We can load modules anywhere. If we load outside the function, it will load upon startup
class Users{

    //This is actually a middleware function (used in app.js) Then callback called after execution
    static async sendAll (req, res, next) {
        const FILE_PATH = path.join(__dirname, "..", "public", "json", "users.json");
        //Pretend this json was extracted from your database. The premise is the same, except that this is hardcoded...
        await fs.readFile(FILE_PATH)
            .then(data => res.json(JSON.parse(data)))
            .catch(err => console.log(err));

        //Since this is a middleware function with next() at the end, should this be called, all others in the stack will be too. (all others that call next at least)
        next();
    }


    static async sendOne (req, res) {
        const FILE_PATH = path.join(__dirname, "..", "public", "json", "users.json");
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

}
module.exports = Users;