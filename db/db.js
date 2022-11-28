const fs = require('fs');
const csv = require('fast-csv');
require('dotenv').config();
const pgp = require('pg-promise')();

const connection = {
  host: process.env.DB_HOST,
  port: 5432,
  database: "question_answer",
  user: process.env.DB_USER,
  password: "mercury1",
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

const questionLoader = () => {
  const questionLoad = new Promise((resolve, reject) => {
    let questionData = [];
    const parser = csv.parse({ headers: true });
    const qcs = new pgp.helpers.ColumnSet([
      'question_id', 
      'product_id', 
      'body', 
      'question_date', 
      'asker_name', 
      'asker_email', 
      'question_helpfulness', 
      'reported'], 
      {table: 'questions'});
  
    fs.createReadStream('/Users/blake/Desktop/QA-data/questions.csv')
      .pipe(parser)
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
      .on('data', row => {
        questionData.push(row);
        if (questionData === 2000) {
          parser.pause();
          const query = pgp.helpers.insert(questionData, qcs);
          db.none(query).then(() => {
              questionData = [];
              parser.resume();
            })  
        }
      })
      .on('end', () => {
        const query = pgp.helpers.insert(questionData, qcs);
        db.none(query).then(() => {
          console.log('all question data loaded to db');
        });
      });
  });
};  

const answerLoader = () => {
  const answerLoad = new Promise((resolve, reject) => {
    let answerData = [];
    const parser = csv.parse({ headers: true });
    const acs = new pgp.helpers.ColumnSet([
      'answer_id',
      'question_id',
      'body',
      'answer_date',
      'answer_name',
      'answer_email',
      'answer_helpfulness',
      'reported'],
      {table: 'answers'});
  
    fs.createReadStream('/Users/blake/Desktop/QA-data/answers.csv')
      .pipe(parser)
      .transform(data => ({
        answer_id: data.answer_id,
        question_id: data.question_id,
        body: data.body,
        answer_date: new Date(data.answer_date * 1000).toLocaleString(),
        answer_name: data.answer_name,
        answer_email: data.answer_email,
        answer_helpfulness: data.answer_helpfulness,
        reported: data.reported
      }))
      .on('error', error => console.error(error))
      .on('data', row => {
        answerData.push(row)
        if (answerData.length === 20000) {
          parser.pause();
          const query = pgp.helpers.insert(answerData, acs);
          db.none(query).then(() => {
            answerData = [];
            parser.resume();
          });  
        };
      })
      .on('end', () => {
        const query = pgp.helpers.insert(answerData, acs);
        db.none(query).then(() => {
          console.log('all answer data loaded to db');
        });
      });
  });
};

const photoLoader = () => {
  const photosLoad = new Promise((resolve, reject) => {
    let photos = [];
    const parser = csv.parse({ headers: true });
    const pcs = new pgp.helpers.ColumnSet([
      'photo_id',
      'answer_id',
      'url'],
      {table: 'photos'});

    fs.createReadStream('/Users/blake/Desktop/QA-data/answers_photos.csv')
      .pipe(parser)
      .on('error', error => console.error(error))
      .on('data', row => {
        photos.push(row);
        if (photos.length === 20000) {
          parser.pause()
          console.log(photos.length);
        const query = pgp.helpers.insert(photos, pcs);
        db.none(query).then(() => {
            photos = [];
            parser.resume();
          })  
        }
      })
      .on('end', () => {
        const query = pgp.helpers.insert(photos, pcs);
        db.none(query).then(() => {
          console.log('all photos data loaded to db');
        });
      });
  });
};

// questionLoader();
// answerLoader();
photoLoader();