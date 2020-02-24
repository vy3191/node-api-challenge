const express = require('express');
const router = express.Router({mergeParams:true});
const projectDB = require('../data/helpers/projectModel');
const actionDB = require('../data/helpers/actionModel');

// Get the actions
router.get("/", async (req,res,next) => {
   try {
      const actions = await actionDB.get();
      if(actions) {
         res.status(200).json(actions);
      }
   } catch(err) {
      next(err);
   }
});

// Get the actionss by ID
router.get("/:id",
             validateProjectID, 
            async (req,res,next) => {
            try {
              res.status(200).json(req.action);
            } catch(err) {
                next(err);
            }
});

// Posts the actions.
router.post("/",
       validateActions,
       async (req,res,next) => {
        try {
          const action = actionDB.insert(req.action);
          if(action.id) {
             res.status(201).json(action)
          }
        } catch(err) {
            next(err);
        }
});

// UPdate the actions
router.put("/:id", (req,res,next) => {
   try {

   } catch(err) {
      next(err);
   }
});

// Delete the actions
router.delete("/", (req,res,next) => {
   try {

   } catch(err) {
      next(err);
   }
});

function validateProjectID(req,res,next) {
  const id = req.params.id;
  actionDB.get(id)
           .then( (action) => {
             if(action) {
                req.action = action;
                next();
             } else {
               res.status(404).json({msg:`There is no project with the ID ${id}`});
             }
           })
           .catch(err => next(err));
}

function validateActions(req,res,next) {
  const {notes, description, completed} = req.body;
  if(!req.body) res.status(400).json({ message: "missing project data" });
  if(!notes) res.status(400).json({ message: "missing project notes" });
  if(!description) res.status(400).json({ message: "missing project description" });
  req.action = { project_id: req.params.id, description,  notes, completed }
     next();
}

module.exports = router;

