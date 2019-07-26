const express = require("express");
//We must make a router
const mainRouter = express.Router();

//routers work much like app is used, except paths are relative to the current route
mainRouter.use("/api", require("./api"));

//If still confused see: https://www.youtube.com/watch?v=paNikhYqdz0

//And return it
module.exports = mainRouter;