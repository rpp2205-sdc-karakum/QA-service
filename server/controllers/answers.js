const Answer = require('../models/Answer.js');

module.exports = {
  getAnswers: (req, res) => {
    let count = req.query.count || 50;
 
    Answer.get(req.params.question_id, count)
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.send(err);
      })
  },

  postAnswer: (req, res) => {
    Answer.post(req.params.question_id, req.query)
      .then((data) => {
        res.status(201).send(data);
      })
      .catch((err) => {
        res.send(err);
      })
  },

  markAnswer: (req, res) => {

  },

  reportAnswer: (req, res) => {

  }
};