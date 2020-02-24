const express = require('express');
const router = express.Router();
const projectDB = require('../data/helpers/projectModel');
const actionRouters = require('../routers/actionsRouter');

router.use("/:id/actions", actionRouters);

// Get the projects
router.get("/", async (req,res,next) => {
   try {
     const projects = await projectDB.get();
     if(projects) {
        res.status(200).json(projects);
     }
   } catch(err) {
      next(err);
   }
});

// Get the projects by ID
router.get("/:id",validateProjectID, (req,res,next) => {
   try {
      res.status(200).json(req.project);
   } catch(err) {
      next(err);
   }
});

// Get the projects with actions
router.get("/:id", 
           validateProjectID, 
           async (req,res,next) => {
            try {
              const projectWithActions = await projectDB.getProjectActions(req.params.id);
                if(projectWithActions.id) {
                  res.status(200).json(projectWithActions);
                }              
            } catch(err) {
              next(err);
            }
});
// Posts the projects.
router.post("/", validateProject, async (req,res,next) => {
   try {
     const result = await projectDB.insert(req.project);
     if(result.id && result.name && result.description) {
         res.status(201).json(result);
     }
   } catch(err) {
      next(err);
   }
});

// UPdate the projects
router.put("/:id",
            validateProjectID,
            validateProject, 
            async (req,res,next) => {
              try {
                  const id = req.params.id;
                  const updatedProject = {...req.project, }
                  const result = await projectDB.update(id, updatedProject);
                  console.log(result);
                  if(result.id) {
                     res.status(200).json(result);
                  }

              } catch(err) {
                  next(err);
              }
});

// Delete the project
router.delete("/:id",
            validateProjectID,
            async (req,res,next) => {
            try {
              const result = await projectDB.remove(req.params.id);
              if(result > 0) {                 
                 res.status(204).end();
              }
            } catch(err) {
                next(err);
            }
});

function validateProjectID(req,res,next) {
   const id = req.params.id;
   projectDB.get(id)
            .then( (project) => {
              if(project) {
                 req.project = project;
                 next();
              } else {
                res.status(404).json({msg:`There is no project with the ID ${id}`});
              }
            })
            .catch(err => next(err));
}

function validateProject(req,res,next) {
   const {name, description, completed} = req.body;
   if(!req.body) res.status(400).json({ message: "missing project data" });
   if(!name) res.status(400).json({ message: "missing project name" });
   if(!description) res.status(400).json({ message: "missing project description" });
   req.project = {
      name: req.body.name,
      description: req.body.description,
      completed: req.body.completed
   }
   next();
}

module.exports = router;