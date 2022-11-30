const Answer = require('../models/Answer.js');

module.exports = {
  getAnswers: (req, res) => {
    let count = req.params.count || 50;
 
    Answer.get(req.params.question_id, count)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.send(err);
      })
  },

  postAnswer: (req, res) => {

  },

  markAnswer: (req, res) => {

  },

  reportAnswer: (req, res) => {

  }
};