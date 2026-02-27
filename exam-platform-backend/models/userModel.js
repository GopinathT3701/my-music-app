const db = require("../config/db");

async function findByEmail(email) {
  const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
  return rows[0] || null;
}

async function createUser({ name, email, password, role = "USER" }) {
  const [result] = await db.execute(
    `INSERT INTO users (name, email, password, role)
     VALUES (?, ?, ?, ?)`,
    [name, email, password, role],
  );

  return { id: result.insertId, name, email, role };
}

async function findById(id) {
  const [rows] = await db.execute(
    "SELECT id, name, email, role, subscription_active, created_at FROM users WHERE id = ?",
    [id],
  );
  return rows[0] || null;
}

module.exports = {
  findByEmail,
  createUser,
  findById,
};
