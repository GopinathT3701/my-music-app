const db = require("../config/db");

async function getAllExams() {
  const [rows] = await db.execute("SELECT * FROM exams ORDER BY id DESC");
  return rows;
}

async function getExamById(id) {
  const [rows] = await db.execute("SELECT * FROM exams WHERE id = ?", [id]);
  return rows[0] || null;
}

async function createExam({ title, category, duration_minutes, total_marks }) {
  const [result] = await db.execute(
    `INSERT INTO exams (title, category, duration_minutes, total_marks)
     VALUES (?, ?, ?, ?)`,
    [title, category, duration_minutes, total_marks],
  );

  return {
    id: result.insertId,
    title,
    category,
    duration_minutes,
    total_marks,
  };
}

module.exports = {
  getAllExams,
  getExamById,
  createExam,
};
