const db = require("../config/db");

async function getQuestionsByExamId(examId) {
  const [rows] = await db.execute(
    `SELECT id, exam_id, question_text, option_a, option_b, option_c, option_d, correct_option, language
     FROM questions WHERE exam_id = ?`,
    [examId],
  );
  return rows;
}

module.exports = {
  getQuestionsByExamId,
};
