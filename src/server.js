import express from "express"; 
import mysql from "mysql2";
import cors from "cors"; 


const app = express();
app.use(cors());
app.use(express.json());

// DB Connection
let db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root", // your password
  database: "music-app"
});

// Test DB connection
db.connect((err) => {
  if (err) {
    console.error("❌ DB connection failed:", err.message);
  } else {
    console.log("✅ Connected to MySQL!");
  }
});

// Get all songs
app.get("/songs", (req, res) => {
  db.query("SELECT * FROM songs", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});


app.put("/songs/:id", (req, res) => {
  const { id } = req.params;
  const { title, artist, url, img, duration } = req.body;

  // Check for missing fields (optional but good)
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





// Add a new song
app.post("/songs", (req, res) => {
  const { title, artist, url, img, duration } = req.body;
  db.query(
    "INSERT INTO songs (title, artist, url, img, duration) VALUES (?, ?, ?, ?, ?)",
    [title, artist, url, img, duration],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(201).json({ message: "✅ Song added successfully" });
    }
  );
});

app.listen(3001, () => console.log("🚀 Server running on http://localhost:3001"));
