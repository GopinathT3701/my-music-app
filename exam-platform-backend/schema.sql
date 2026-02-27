CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  role ENUM('USER','ADMIN') DEFAULT 'USER',
  subscription_active BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE exams (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200),
  category VARCHAR(50),
  duration_minutes INT,
  total_marks INT
);

CREATE TABLE questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  exam_id INT,
  question_text TEXT,
  option_a TEXT,
  option_b TEXT,
  option_c TEXT,
  option_d TEXT,
  correct_option CHAR(1),
  language ENUM('TA','EN'),
  FOREIGN KEY (exam_id) REFERENCES exams(id)
);

CREATE TABLE results (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  exam_id INT,
  score INT,
  percentage DECIMAL(5,2),
  attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
