require('dotenv').config({path: './.env'});
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT;
const db = require('../db/db.js');

app.use(express.json());



if (!module.parent) {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
};

module.exports = app;