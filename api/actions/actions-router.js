// Write your "actions" router here!
const express = require("express");
const actions = require("./actions-model");
const validateActionsId = require("../middleware/actionMiddleware");

const router = express.Router();

router.get("/:id", validateActionsId, (req, res) => {
  res.status(200).json(req.actions);
});

router.get("/", (req, res) => {
  actions
    .get()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ message: "Couldn't retrieve all actions" });
    });
});

router.post("/", (req, res) => {
  const { description, notes, project_id } = req.body;

  if (!description || !notes || project_id) {
    res
      .status(400)
      .json({ message: "Actions object is missing a required parameter" });
  } else {
    actions
      .insert({ description, notes, project_id })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({ message: "Failed to create new action " });
      });
  }
});

router.delete("/:id", validateActionsId, (req, res) => {
  actions
    .remove(req.actions.id)
    .then((result) => {
      res.status(200).end();
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to delete the provided action" });
    });
});

router.put("/:id", validateActionsId, (req, res) => {
  const { description, notes } = req.body;
  const project_id = req.actions.project_id;
  const actionId = req.actions.id;

  if (!description || !notes || !project_id) {
    res
      .status(400)
      .json({ message: "Actions object is missing a required parameter" });
  } else {
    actions
      .update(actionId, { description, notes, project_id })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res
          .status(500)
          .json({ message: "Failed to update the provided action" });
      });
  }
});

module.exports = router;
