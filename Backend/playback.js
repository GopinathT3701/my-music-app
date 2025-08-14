import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());

// Spotify credentials from environment
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = "https://spotify-backend-b3un.onrender.com/callback";
const FRONTEND_URI = "http://localhost:5173"; // replace with your frontend URL

const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");

// Step 1: Redirect user to Spotify login
app.get("/login", (req, res) => {
  const scopes = [
    "streaming",
    "user-read-email",
    "user-read-private",
    "user-modify-playback-state"
  ].join(" ");

  const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
  res.redirect(authUrl);
});

// Step 2: Callback - exchange code for access token
app.get("/callback", async (req, res) => {
  const code = req.query.code || null;

  if (!code) return res.status(400).json({ error: "Missing code" });

  try {
    const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Basic ${auth}`
      },
      body: new URLSearchParams({
        code,
        redirect_uri: REDIRECT_URI,
        grant_type: "authorization_code"
      })
    });

    const tokenData = await tokenRes.json();

    if (tokenData.error) {
      return res.status(400).json({ error: tokenData.error_description || "Token exchange failed" });
    }

    // Redirect to frontend with token as query params (optional)
    const redirectUrl = `${FRONTEND_URI}/?access_token=${tokenData.access_token}&refresh_token=${tokenData.refresh_token}&expires_in=${tokenData.expires_in}`;
    res.redirect(redirectUrl);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Token exchange failed" });
  }
});

// Step 3: Refresh token
app.get("/refresh_token", async (req, res) => {
  const refreshToken = req.query.refresh_token;
  if (!refreshToken) return res.status(400).json({ error: "Missing refresh_token" });

  try {
    const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Basic ${auth}`
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken
      })
    });

    const tokenData = await tokenRes.json();
    if (tokenData.error) {
      return res.status(400).json({ error: tokenData.error_description || "Refresh token failed" });
    }

    res.json(tokenData);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to refresh token" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
