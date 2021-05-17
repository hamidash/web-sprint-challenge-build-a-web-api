const actions = require("../actions/actions-model");

function validateActionsId(req, res, next) {
  const { id } = req.params;

  actions
    .get(id)
    .then((result) => {
      if (!result) {
        res.status(404).json({ message: "Missing correct action id in query" });
      } else {
        req.actions = result;
        next();
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Failed while retrieving the requested action" });
    });
}

module.exports = validateActionsId;
