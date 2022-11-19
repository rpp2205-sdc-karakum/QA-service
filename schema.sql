CREATE TABLE questions (
  question_id INT,
  product_id INT,
  question_body TEXT,
  question_date VARCHAR(100),
  asker_name VARCHAR(50),
  asker_email VARCHAR(100),
  question_helpfulness INT,
  reported BIT,
  PRIMARY KEY (question_id)
);

CREATE TABLE answers (
  answer_id INT,
  question_id INT,
  body TEXT,
  answer_date VARCHAR(100),
  answer_name VARCHAR(50),
  answer_email VARCHAR(100),
  answer_helpfulness INT,
  reported BIT,
  PRIMARY KEY (answer_id),
  FOREIGN KEY (question_id) REFERENCES questions(question_id)
);

CREATE TABLE photos (
  photo_id INT,
  answer_id INT,
  url VARCHAR(2000),
  PRIMARY KEY (photo_id),
  FOREIGN KEY (answer_id) REFERENCES answers(answer_id)
);