require('dotenv').config({path: '../../.env'});
const db = require('../../db/db.js');

module.exports = {
  get: (questionId, count) => {
    return db.query(`SELECT * FROM answers WHERE question_id = ${questionId} LIMIT ${count}`)
      .catch((err) => {
        return err;
      });
  },
  
  post: (questionId, {body, name, email, photos}) => {
    let questionTime = Date.now();
    let timestamp = new Date(questionTime * 1000).toLocaleString();
    let photosArray = photos;

    return db.query(`INSERT INTO answers (question_id, body, answer_date, answer_name, answer_email, answer_helpfulness, reported) 
      VALUES (${questionId}, '${body}', '${timestamp}', '${name}', '${email}', 0, '0') RETURNING answer_id`)
      .then((id) => {
        for (var i = 0; i < photosArray.length; i++) {
          db.query(`INSERT INTO photos (answer_id, url)
          VALUES (${id[0].answer_id}, '${photosArray[i]}')`)
          .catch((err) => {
            return err;
          })
        }
      })
      .catch((err) => {
        return err;
      })
  },

  mark: (answerId) => {

  },

  report: (answerId) => {

  }
};