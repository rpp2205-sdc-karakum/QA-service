const fs = require('fs');
const csv = require('fast-csv');
const questionData = [];
const answerData = [];
const photos = [];
const loadCheck = false;

const csvLoad = (loadCheck) => {
  if (!loadCheck) {
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
      .on('end', () => console.log(questionData));

    fs.createReadStream('/Users/blake/Desktop/QA-data/answers.csv')
      .pipe(csv.parse({ headers: true }))
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
      .on('data', row => answerData.push(row))
      .on('end', () => console.log(answerData));

    fs.createReadStream('/Users/blake/Desktop/QA-data/answers_photos.csv')
      .pipe(csv.parse({ headers: true }))
      .on('error', error => console.error(error))
      .on('data', row => photos.push(row))
      .on('end', () => console.log(photos));
    
    loadCheck = true;  
  } else {
    console.log('Data has been staged for load.');
  } 
};


