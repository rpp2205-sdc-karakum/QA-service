require('dotenv').config({path: '../../.env'});
const db = require('../../db/db.js');

module.exports = {
  get: (productId, count) => {
    return db.query(`SELECT * FROM questions WHERE product_id = ${productId} LIMIT ${count}`)
      .catch((err) => {
        console.log(err);
      });
  },

  post: (question) => {

  },

  mark: (questionId) => {

  },

  report: (questionId) => {

  }
};