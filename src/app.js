const express = require("express"),
  app = express(),
  config = require("../config"),
  mongoConfig = config[process.env.NODE_ENV].mongo,
  serverConfig = config[process.env.NODE_ENV].server;
mongoose = require("mongoose");

mongoose.connect(`${mongoConfig.url}/${mongoConfig.database}`);
mongoose.Promise = require("bluebird");

app.use("/healthcheck", require("express-healthcheck")());

const server = app.listen(serverConfig.port);
console.log(`Listening to PORT ${serverConfig.port}`);

module.exports = server;
