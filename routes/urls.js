"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  // GET list urls in homepage
  router.get("/", (req, res) => {
    knex
    .select("*")
    .from("urls")
    .then((result) => {
      res.json(result);

    })
  });

// GET one url from DB and display it
  router.get("/:url_id", (req, res) => {
    const url_id = req.params.url_id;
    knex('urls')
    .join('comments', 'urls.id', '=', 'comments.url_id')
    .select("urls.url","urls.description", "urls.image", "urls.title", "comments.comment")
    .then((result) => {
      res.json(result);
    })
  });


// //  create a resource (aka save a link)
//   router.post("/", (req, res) => {
//     //res.json({ message: 'post resource TODO'})
//     knex('urls')
//     .insert({
//       id: req.body.id,
//       user_id: req.body.user_id,
//       category: req.body.category,
//       url: req.body.url,
//       description: req.body.description,
//       title: req.body.title,
//       image: req.body.image,
//     })
//     .then(() => {
//       res.json({ message: 'crate resource worked'})
//       //res.redirect('/');
//     })
//   });

//   // create a comments
//   router.post("/", (req, res) => {
//     res.json({ message: 'post commet TODO'})
//     knex('urls')
//     .insert({
//       id: req.body.id,
//       user_id: req.body.user_id,
//       url_id: req.body.url_id,
//       comment: req.body.comment,
//     })
//     .then(() => {
//       res.redirect('/:url_id/');
//     })
//   });

//   //create post rating
//   router.post("/", (req, res) => {
//     res.json({ message: 'post rating'})
//     knex('urls')
//     .insert({
//       id: req.body.id,
//       user_id: req.body.user_id,
//       url_id: req.body.url_id,
//       rating: req.body.rating,
//     })
//       .then(() => {
//         res.redirect('/:url_id/');
//       })
//   });

  return router;
}




