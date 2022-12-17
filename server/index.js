require('dotenv').config({path: './.env'});
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3001;
const db = require('../db/db.js');
const { getQuestions, postQuestion, markQuestion, reportQuestion } = require('./controllers/questions.js');
const { getAnswers, postAnswer, markAnswer, reportAnswer } = require('./controllers/answers.js');

app.use(express.json());

// get questions
app.get('/qa/questions/:product_id', getQuestions);

// get answers
app.get('/qa/questions/:question_id/answers', getAnswers);

// post a question
app.post('/qa/questions', postQuestion);

// post an answer
app.post('/qa/questions/:question_id/answers', postAnswer);

// mark question helpful
app.put('/qa/questions/:question_id/helpful', markQuestion);

// mark answer helpful
app.put('/qa/answers/:answer_id/helpful', markAnswer);

// report question
app.put('/qa/questions/:question_id/report', reportQuestion)

// report answer
app.put('/qa/answers/:answer_id/report', reportAnswer);

app.get('/loaderio-30bf00790c5520359c8cfa110cda6338.txt', (req, res) => {
  res.sendFile('../loaderio-30bf00790c5520359c8cfa110cda6338.txt')
});

if (!module.parent) {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
};

module.exports = app;