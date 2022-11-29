require('dotenv').config({path: '../.env'});
const fs = require('fs');
const csv = require('fast-csv');
const pgp = require('pg-promise')();

const connection = {
  host: process.env.DB_HOST,
  port: 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  max: 20
};

const db = pgp(connection);

db.connect()
  .then(() => {
    console.log('Connected to Postgresql database.');
  })
  .then(() => {
    return db.query(
      `CREATE TABLE IF NOT EXISTS questions (
        question_id INT,
        product_id INT,
        body TEXT,
        question_date VARCHAR(100),
        asker_name VARCHAR(50),
        asker_email VARCHAR(100),
        question_helpfulness INT,
        reported BIT,
        PRIMARY KEY (question_id)
      );
      
      CREATE TABLE IF NOT EXISTS answers (
        answer_id INT,
        question_id INT,
        body TEXT,
        answer_date VARCHAR(500),
        answer_name VARCHAR(500),
        answer_email VARCHAR(500),
        answer_helpfulness INT,
        reported BIT,
        PRIMARY KEY (answer_id),
        FOREIGN KEY (question_id) REFERENCES questions(question_id)
      );
      
      CREATE TABLE IF NOT EXISTS photos (
        photo_id INT,
        answer_id INT,
        url VARCHAR(2000),
        PRIMARY KEY (photo_id),
        FOREIGN KEY (answer_id) REFERENCES answers(answer_id)
      )`
    );
  })
  .catch((err) => {
    console.log(err);
  });


  
module.exports = db;  
