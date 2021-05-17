// Write your "projects" router here!
const express = require("express");
const projects = require("./projects-model");
const validateProjectId = require("../middleware/projectMiddleware");

const router = express.Router();

router.get("/:id/actions", validateProjectId, (req, res) => {
  projects
    .getProjectActions(req.projects.id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ message: "Couldn't retreieve the requested id" });
    });
});

router.get("/:id", validateProjectId, (req, res) => {
  res.status(200).json(req.projects);
});

router.get("/", (req, res) => {
  projects
    .get()
    .then((results) => {
      if (results.length === 0) {
        res.status(200).json([]);
      } else {
        res.status(200).json(results);
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Can't retrieve the projects" });
    });
});

router.post("/", (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    res.status(400).json({ message: "Missing a new project object parameter" });
  } else {
    projects
      .insert({ name, description })
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((err) => {
        res.status(500).json({ message: "Failed to create the new object" });
      });
  }
});

router.delete("/:id", validateProjectId, (req, res) => {
  projects
    .remove(req.projects.id)
    .then((result) => {
      res.status(200).end();
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Failed to delete the provided project" });
    });
});

router.put('/:id', validateProjectId, (req, res) => {
    
    const { name, description } = req.body;

    if (!name || !description) {
        res.status(400).json({ message: "Missing a new project object parameter" });
      }
    else{
        projects.update(req.projects.id, {name, description})
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json({message: "Failed to edit the requested project"})
        })
    }

})

module.exports = router;
