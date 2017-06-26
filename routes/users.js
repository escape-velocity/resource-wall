"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .then((results) => {
        res.json(results);
    });
  });

// Add a user to Database
  router.post("/", (req, res) => {
    res.json({ message: 'you did it'})
  })


//GET a user page, containing all the categories
  router.get("/:user_id", (req, res) => {
    res.json({ message: 'user page has all categories'})
  })

//GET all urls in one category for one user
  router.get("/:user_id/:categoryName", (req, res) => {
    res.json({ message: "urls in one category"})
  })


  return router;
}
