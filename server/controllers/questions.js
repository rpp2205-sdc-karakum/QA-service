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
    // let productId = req.query.product_id;
    // let body = req.query.body;
    // let name = req.query.name;
    // let email = req.query.email;
    Question.post(req.query)
      .then((data) => {
        res.status(200).send('question added');
      })
      .catch((err) => {
        res.send(err);
      });
  },

  markQuestion: (req, res) => {

  },

  reportQuestion: (req, res) => {

  }
};