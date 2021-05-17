const projects = require('../projects/projects-model');

function validateProjectId(req, res, next){

 const {id} = req.params;

 projects.get(id)
 .then(result => {
     if(!result){
         res.status(404).json({message: "Missing correct project id in query"})
     }
     else{
        req.projects = result;
        next();
     }
 })
 .catch(err=> {
     res.status(500).json({message: "Failed while retrieving the requested project"})
 })
}



module.exports = validateProjectId;
