require('dotenv').config({path: './.env'});
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const db = require('../db/db.js');
const { getQuestions } = require('./controllers/questions.js');
const { getAnswers } = require('./controllers/answers.js');

app.use(express.json());

// get questions
app.get('/qa/questions/:product_id', getQuestions);

// get answers
app.get('/qa/questions/:question_id/answers', getAnswers);

// post a question
app.post('/qa/questions', (req, res) => {
  res.send('post a question')
});

// post an answer
app.post('/qa/questions/:question_id/answers', (req, res) => {
  res.send('post an answer')
});

// mark question helpful
app.put('/qa/questions/:question_id/helpful', (req, res) => {
  res.send('mark a question')
});

// mark answer helpful
app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  res.send('mark an answer')
});

// report question
app.put('/qa/questions/:question_id/report', (req, res) => {
  res.send('report a question')
})

// report answer
app.put('/qa/answers/:answer_id/report', (req, res) => {
  res.send('report an answer')
});


if (!module.parent) {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
};

module.exports = app;