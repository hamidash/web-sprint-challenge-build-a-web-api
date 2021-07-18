// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!
const express = require("express");
const projectsRouter = require("../api/projects/projects-router");
const actionsRouter = require("../api/actions/actions-router");
const server = express();

server.use(express.json());
server.use("/projects", projectsRouter);
server.use("/actions", actionsRouter);

//Setup server
server.get("/", (req, res) => {
  res.json({ message: "hello from express" });
});

module.exports = server;
