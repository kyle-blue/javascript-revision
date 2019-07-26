const express = require("express");
//We must get the router
const router = express.Router();

//The router works much like app, except directories are relative to the route they were called from in the previous .use
//So any router.get or router.use in ./users.js is relative to ./api/users
router.use("/users", require("./users.js"));

//We must return the router
module.exports = router;