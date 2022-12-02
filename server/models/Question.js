require('dotenv').config({path: '../../.env'});
const db = require('../../db/db.js');

module.exports = {
  get: (productId, count) => {
    return db.query(`SELECT * FROM questions WHERE product_id = ${productId} LIMIT ${count}`)
      .catch((err) => {
        return err;
      });
  },

  post: ({ product_id, body, name, email }) => {
    // body, name, email, product_id
    let questionTime = Date.now();
    let timestamp = new Date(questionTime * 1000).toLocaleString();
    console.log()
    return db.query(`INSERT INTO questions (product_id, body, question_date, asker_name, asker_email, question_helpfulness, reported)
      VALUES (${product_id}, '${body}', '${timestamp}', '${name}', '${email}', 0, '0')`)
      .catch((err) => {
        return err;
      });
  },

  mark: (questionId) => {

  },

  report: (questionId) => {

  }
};