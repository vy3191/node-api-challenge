const express = require('express');
const router = express.Router();
const projectDB = require('../data/helpers/projectModel');

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

// Posts the projects.
router.post("/", (req,res,next) => {
   try {

   } catch(err) {
      next(err);
   }
});

// UPdate the projects
router.put("/:id", (req,res,next) => {
   try {

   } catch(err) {
      next(err);
   }
});

// Delete the project
router.delete("/", (req,res,next) => {
   try {

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

module.exports = router;