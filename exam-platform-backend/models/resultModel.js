const db = require("../config/db");

async function createResult({ user_id, exam_id, score, percentage }) {
  const [result] = await db.execute(
    `INSERT INTO results (user_id, exam_id, score, percentage)
     VALUES (?, ?, ?, ?)`,
    [user_id, exam_id, score, percentage],
  );

  return {
    id: result.insertId,
    user_id,
    exam_id,
    score,
    percentage,
  };
}

async function getResultsByUserId(userId) {
  const [rows] = await db.execute(
    `SELECT r.*, e.title AS exam_title
     FROM results r
     INNER JOIN exams e ON e.id = r.exam_id
     WHERE r.user_id = ?
     ORDER BY r.attempted_at DESC`,
    [userId],
  );

  return rows;
}

async function countTodaysAttemptsByUserId(userId) {
  const [rows] = await db.execute(
    `SELECT COUNT(*) AS attempts
     FROM results
     WHERE user_id = ?
       AND DATE(attempted_at) = CURDATE()`,
    [userId],
  );

  return Number(rows[0]?.attempts || 0);
}

module.exports = {
  createResult,
  getResultsByUserId,
  countTodaysAttemptsByUserId,
};
