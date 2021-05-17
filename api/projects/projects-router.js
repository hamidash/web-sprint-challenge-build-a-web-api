// Write your "projects" router here!
const express = require("express");
const projects = require("./projects-model");
const projectMiddleware = require("../middleware/projectMiddleware");

const router = express.Router();

router.get("/:id", projectMiddleware.validateProjectId, (req, res) => {
  res.status(200).json(req.projects);
});

router.get("/", (req, res) => {
  projects
    .get()
    .then((results) => {
      if(results.length === 0) {
        res.status(200).json([]); 
      }
      else{
        res.status(200).json(results);
      } 
    })
    .catch((err) => {
      res.status(500).json({ message: "Can't retrieve the projects" });
    });
});

router.post("/", (req, res)=> {
  const {name, description} = req.body;

  if(!name || !description){
      res.status(400).json({message:"Missing a new project object parameter"})
  }
  else{
      projects.insert({name, description})
      .then(result => {
         res.status(201).json(result)
      })
      .catch(err=>{
        res.status(500).json({message: "Failed to create the new object"})
      })
  }
})

module.exports = router;
