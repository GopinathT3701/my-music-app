import express from "express"; 
import mysql from "mysql2";
import cors from "cors"; 

const app = express();
app.use(cors());
app.use(express.json());

// ✅ DB Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",  // 🔐 Change this if needed
  database: "music-app"
});

// ✅ Test DB Connection
db.connect((err) => {
  if (err) {
    console.error("❌ DB connection failed:", err.message);
  } else {
    console.log("✅ Connected to MySQL!");
  }
});

// ✅ GET All Songs
app.get("/songs", (req, res) => {
  db.query("SELECT * FROM songs", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// ✅ POST - Add a New Song
app.post("/songs", (req, res) => {
  const { title, artist, url, img, duration } = req.body;

  if (!title || !artist || !url || !img || !duration) {
    return res.status(400).json({ message: "❌ All fields are required" });
  }

  const sql = `
    INSERT INTO songs (title, artist, url, img, duration)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [title, artist, url, img, duration], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ message: "✅ Song added successfully", id: result.insertId });
  });
});

// ✅ PUT - Update Existing Song
app.put("/songs/:id", (req, res) => {
  const { id } = req.params;
  const { title, artist, url, img, duration } = req.body;

  if (!title || !artist || !url || !img || !duration) {
    return res.status(400).json({ message: "❌ All fields are required" });
  }

  const sql = `
    UPDATE songs 
    SET title = ?, artist = ?, url = ?, img = ?, duration = ? 
    WHERE id = ?
  `;

  db.query(sql, [title, artist, url, img, duration, id], (err, result) => {
    if (err) return res.status(500).json({ message: "❌ Update failed", error: err });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "❌ Song not found" });
    }

    res.json({ message: "✅ Song updated successfully" });
  });
});

// ✅ Start Server
app.listen(3001, () => {
  console.log("🚀 Server running on http://localhost:3001");
});
