const fs = require('fs');
const csv = require('fast-csv');
const dotenv = require("dotenv");
const pgp = require('pg-promise')();
const questionData = [];
const answerData = [];
const photos = [];

dotenv.config();

const connection = {
  host: process.env.DB_HOST,
  port: 5432,
  database: "question_answer",
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  max: 20
}

const db = pgp(connection);

db.connect()
  .then(() => {
    console.log('Connected!');
  })
  .catch((err) => {
    console.log(err);
  });

const questionLoad = new Promise((resolve, reject) => {
  fs.createReadStream('/Users/blake/Desktop/QA-data/questions.csv')
  .pipe(csv.parse({ headers: true }))
  .transform(data => ({
    question_id: data.question_id,
    product_id: data.product_id,
    body: data.body,
    question_date: new Date(data.question_date * 1000).toLocaleString(),
    asker_name: data.asker_name,
    asker_email: data.asker_email,
    question_helpfulness: data.question_helpfulness,
    reported: data.reported
  }))
  .on('error', error => console.error(error))
  .on('data', row => questionData.push(row))
  .on('end', () => resolve(questionData));
});


const bulkLoader = (loadCheck) => {
  questionLoad
    .then( async questionData => {
      console.log('querying questions has begun');
      const cs = new pgp.helpers.ColumnSet(['question_id', 'product_id', 'body', 'question_date', 'asker_name', 'asker_email', 'question_helpfulness', 'reported'], {table: 'questions'});
      const query = pgp.helpers.insert(questionData, cs);
      await db.none(query);
    })
    .catch((err) => {
      console.log(err);
    });
  };

bulkLoader();

  // fs.createReadStream('/Users/blake/Desktop/QA-data/answers.csv')
  //   .pipe(csv.parse({ headers: true }))
  //   .transform(data => ({
  //     answer_id: data.answer_id,
  //     question_id: data.question_id,
  //     body: data.body,
  //     answer_date: new Date(data.answer_date * 1000).toLocaleString(),
  //     answer_name: data.answer_name,
  //     answer_email: data.answer_email,
  //     answer_helpfulness: data.answer_helpfulness,
  //     reported: data.reported
  //   }))
  //   .on('error', error => console.error(error))
  //   .on('data', row => answerData.push(row))
  //   .on('end', () => console.log(answerData));

  // fs.createReadStream('/Users/blake/Desktop/QA-data/answers_photos.csv')
  //   .pipe(csv.parse({ headers: true }))
  //   .on('error', error => console.error(error))
  //   .on('data', row => photos.push(row))
  //   .on('end', () => console.log(photos));
// };

// const load


