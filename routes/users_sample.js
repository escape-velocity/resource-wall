"use strict";

const express = require('express');


module.exports = (queryLib) => {
  const router  = express.Router();

  router.get('sadfasdf', (req, res) => {
    // prepare some data out of res
    queryLib.getUserById(req.param.id, (err, data) => {
      if (err) {
        res.status(400).send("bad user");
      } else {
        // use data here
        res.send('ha ha ha');
      }
    })
  })


  return router;
}
