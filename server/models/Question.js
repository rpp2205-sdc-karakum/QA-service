require('dotenv').config({path: '../../.env'});
const db = require('../../db/db.js');

module.exports = {
  get: (productId, count) => {
    return db.query(`SELECT * FROM questions WHERE product_id = ${productId} LIMIT ${count}`)
      .catch((err) => {
        console.log(err);
      });
  },

  post: ({ product_id, body, name, email }) => {
    // body, name, email, product_id
  },

  mark: (questionId) => {

  },

  report: (questionId) => {

  }
};