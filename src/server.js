const apiRouter = require("./api/router");
const express = require("express");
const server = express();

server.use("/api", apiRouter);

module.exports = server;
