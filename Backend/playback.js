import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());

// Spotify credentials
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = "https://spotify-backend-b3un.onrender.com/callback"; // must match Spotify dashboard
const FRONTEND_URI = "http://localhost:5173"; // frontend React dev

// Encode client_id + client_secret
const authHeader = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");

// ✅ Step 1: Login
app.get("/login", (req, res) => {
  const scopes = [
    "streaming",
    "user-read-email",
    "user-read-private",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing"
  ].join(" ");

  const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;

  console.log("Redirecting to Spotify auth:", authUrl);
  res.redirect(authUrl);
});

// ✅ Step 2: Callback
app.get("/callback", async (req, res) => {
  const code = req.query.code || null;

  const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": `Basic ${authHeader}`
    },
    body: new URLSearchParams({
      code: code,
      redirect_uri: REDIRECT_URI,
      grant_type: "authorization_code"
    })
  });

  const data = await tokenResponse.json();
  console.log("Spotify token response:", data);

  // Send token back to frontend (including refresh + expiry)
  res.redirect(
    `${FRONTEND_URI}/?access_token=${data.access_token}&refresh_token=${data.refresh_token}&expires_in=${data.expires_in}`
  );
});

// ✅ Step 3: Refresh token
app.get("/refresh_token", async (req, res) => {
  const refreshToken = req.query.refresh_token;

  if (!refreshToken) {
    return res.status(400).json({ error: "Missing refresh_token" });
  }

  try {
    const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Basic ${authHeader}`
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken
      })
    });

    const tokenData = await tokenRes.json();
    console.log("Refresh token response:", tokenData);

    if (tokenData.error) {
      return res.status(400).json({
        error: tokenData.error,
        details: tokenData.error_description || "Refresh token failed"
      });
    }

    res.json(tokenData);

  } catch (err) {
    console.error("Refresh error:", err);
    res.status(500).json({ error: "Failed to refresh token" });
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`✅ Backend running on http://localhost:${PORT}`));
