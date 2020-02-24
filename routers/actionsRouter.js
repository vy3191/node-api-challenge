const express = require('express');
const router = express.Router();
const projectDB = require('../data/helpers/projectModel');
const actionDB = require('../data/helpers/actionModel');

// Get the actions
router.get("/", (req,res,next) => {
   try {

   } catch(err) {
      next(err);
   }
});

// Get the actionss by ID
router.get("/:id", (req,res,next) => {
   try {

   } catch(err) {
      next(err);
   }
});

// Posts the actions.
router.post("/", (req,res,next) => {
   try {

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

module.exports = router;

