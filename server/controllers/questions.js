const Question = require('../models/Question.js');

module.exports = {
  getQuestions: (req, res) => {
    Question.get(req.params.product_id, 50)
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