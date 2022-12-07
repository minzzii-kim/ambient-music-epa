//const SmartApp = require('@smartthings/smartapp');
const express = require("express");

const amServiceRouter = require("./execute/am-service-router");
const photoServiceRouter = require("./execute/photo-service-router");

const server = express();
//const SERVER_CONFIG = require('./server-config/constants');
const PORT = 8080;

const AmbientMusicService = require("./services/ambient-music-service");

server.use(express.json());
server.use(require("cors")());
server.use("/", amServiceRouter);
server.use("/photo", photoServiceRouter);
server.use((req, res, next) => {
  res.status(404).send("Not Found");
});

server.listen(PORT, () =>
  console.log(`Server is up and running on port ${PORT}`)
);
