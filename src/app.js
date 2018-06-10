const express = require("express"),
  app = express(),
  http = require("http"),
  WebSocket = require("ws"),
  config = require("../config"),
  { getMiddlewares } = require('./middleware'),
  { getApiRoutes } = require('./route'),
  { API_PREFIX, API_V1} = require('./helpers/consts'),
  mongoConfig = config[process.env.NODE_ENV].mongo,
  serverConfig = config[process.env.NODE_ENV].server,
  mongoose = require("mongoose"),
  setWssServer = require("./websocketServer");

mongoose.connect(`${mongoConfig.url}/${mongoConfig.database}`);
mongoose.Promise = require("bluebird");

getMiddlewares().forEach(middleware => app.use(middleware));
getApiRoutes(API_V1).forEach(route => app.use(API_PREFIX + API_V1, route));

app.use("/healthcheck", require("express-healthcheck")());

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

setWssServer(wss);

server.listen(serverConfig.port, () => {
  console.log(`Server started on port ${serverConfig.port}...`);
});

module.exports = server;
