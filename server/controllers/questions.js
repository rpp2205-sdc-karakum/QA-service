const Question = require('../models/Question.js');

module.exports = {
  getQuestions: (req, res) => {
    let count = req.query.count || 50;

    Question.get(req.params.product_id, count)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.send(err);
      })
  },

  postQuestion: (req, res) => {

  },

  markQuestion: (req, res) => {

  },

  reportQuestion: (req, res) => {

  }
};