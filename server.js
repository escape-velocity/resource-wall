"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');
const makeUsersRouter = require("./routes/users");
const makeUrlsRouter = require("./routes/urls");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));
const usersRoutes = require("./routes/users");

// app.use("/api/users", makeUsersRouter(knex));
app.use("/api/urls", makeUrlsRouter(knex));
app.use("/api/users", usersRoutes(knex));
// Mount all resource routes

// Home page
app.get("/", (req, res) => {
  console.log("IN GET /");
  res.render("pages/homepage");
});

app.get("/url_create", (req, res) => {
  res.render("pages/url_create");
});

// app.get("/oneUrl", (req, res) => {
//   res.render("pages/one_url");
// });

app.post('url_create', (req, res) => {
  console.log("IN POST");
});

app.get('/allUrls', (req,res)=>{
  //to get all the urls from the table
  var urls = [];
  knex.select().from('urls')
  .then(function(rows){
    for(var x=0; x<rows.length; x++){
      var temp = {user_id: rows[x].user_id, category: rows[x].category, url: rows[x].url, description:rows[x].description, title:rows[x].title, image:rows[x].image};
      urls.push(temp);
    }
    res.json({result:urls});
  }); //then function ends;
});


// app.post('/comments/', (req, res) => {
//   console.log("IN COMMENTS");
// });


//GET create url page
app.get('/url_create', (req, res) => {
  res.render('url_create');
});

//POST one url to urls table
app.post('/url_create', (req, res) => {
  knex('urls')
  .insert ({
    user_id: 1,
    url: req.body.longURL,
    category: req.body.category,
    title: req.body.title,
    image: req.body.image,
    description: req.body.description
  })
  .then(() => {
    res.redirect('/');
  })
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});


