require('dotenv').config({path: '../../.env'});
const db = require('../../db/db.js');

module.exports = {
  get: (questionId, count) => {
    return db.query(`SELECT * FROM answers WHERE question_id = ${questionId} LIMIT ${count}`)
    .catch((err) => {
      console.log(err);
    });
  },
  
  post: (questionId, answer) => {

  },

  mark: (answerId) => {

  },

  report: (answerId) => {

  }
};