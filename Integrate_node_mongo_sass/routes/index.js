const express = require("express");
const mainRouter = express.Router();

mainRouter.use("/api", require("./api"));

module.exports = mainRouter;