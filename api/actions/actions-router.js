// Write your "actions" router here!
const express = require("express");
const actionsDB = require("./actions-model");
const actionMiddleware = require("./actions-middlware");

const router = express.Router();

router.get("/", (req, res) => {
  actionsDB
    .get()
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((err) => {
      res.status(500).json({ message: "couldn't retrieve all actions" });
    });
});

router.get("/:id", actionMiddleware.verifyActionId, (req, res) => {
  res.status(200).json(req.action);
});

router.post("/", actionMiddleware.verifyAction, (req, res) => {
  const { project_id, description, notes } = req.body;
  const newAction = { project_id, description, notes, completed: false };
  actionsDB
    .insert(newAction)
    .then((action) => {
      console.log(action);
      // Test 19 and 20 are failing for no reason, we are storing the new action and returning the action to res correctly
      res.status(201).json(action);
    })
    .catch((err) =>
      res.status(500).json({ message: "couldn't create the new action" })
    );
});

router.put(
  "/:id",
  actionMiddleware.verifyActionId,
  actionMiddleware.verifyAction,
  (req, res) => {
    const { id } = req.params;
    const { project_id, description, notes, completed } = req.body;
    const updatedAction = { project_id, description, notes, completed };

    actionsDB
      .update(id, updatedAction)
      .then((action) => {
        res.status(200).json(action);
      })
      .catch((err) => {
        res.status(500).json({ message: "couldn't update the action" });
      });
  }
);

router.delete("/:id", actionMiddleware.verifyActionId, (req, res) => {
    const {id} = req.params;

    actionsDB.remove(id)
    .then(action => {
      res.status(200).json({})
    })
    .catch((err) => {
        res.status(500).json({ message: "couldn't delete the action" });
      })
});

module.exports = router;
