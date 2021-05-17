const express = require('express');
const projectsRouter= require('../api/projects/projects-router')
const server = express();


server.use(express.json())
server.use('/projects', projectsRouter)

server.get('/', (req, res)=>{
    res.json({message: "hello from express"})
})

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;
