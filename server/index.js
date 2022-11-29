require('dotenv').config({path: './.env'});
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const db = require('../db/db.js');

app.use(express.json());

// get questions
app.get('/qa/questions/:product_id', (req, res) => {
  
});

// get answers
app.get('/qa/questions/:question_id/answers', (req, res) => {
  
});

// post a question
app.post('/qa/questions', (req, res) => {
  
});

// post an answer
app.post('/qa/questions/:question_id/answers', (req, res) => {
  
});

// mark question helpful
app.put('/qa/questions/:question_id/helpful', (req, res) => {
  
});

// mark answer helpful
app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  
});

// report question
// app.put('/qa/questions/:question_id/report', (req, res) => {
// })

// report answer
app.put('/qa/answers/:answer_id/report', (req, res) => {

});


if (!module.parent) {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
};

module.exports = app;