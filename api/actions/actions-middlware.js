// add middlewares here related to actions
const actionsDb = require('./actions-model');


const verifyActionId = (req, res, next) => {
    const {id} = req.params;

    actionsDb.get(id)
    .then(action => {
        if(!action){
            res.status(404).json({message: "can't find the action with the provided id"})
        }
        else{
            req.action = action;
            next();
        }
    })
    .catch()
   
}

const verifyAction = (req, res, next) => {
    const {project_id, description, notes, completed} = req.body;

    if(!project_id || !description || !notes || !completed){
        res.status(400).json({message: "Missing project_id, description, notes or completed"})
    }else{
        next()
    }
}



module.exports = {verifyActionId, verifyAction};