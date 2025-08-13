import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());

const keyId = process.env.CLIENT_ID;
const keySecret = process.env.CLIENT_SECRET;
const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");

// Step 1: send user to Spotify auth
app.get("/login", (req, res) => {
  const scopes = [
    "streaming",
    "user-read-email",
    "user-read-private",
    "user-modify-playback-state"
  ].join(" ");

  const redirect_uri = encodeURIComponent("https://isai-app.netlify.app/callback");
  const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${keyId}&scope=${encodeURIComponent(scopes)}&redirect_uri=${redirect_uri}`;
  res.redirect(authUrl);
});

// Step 2: exchange code for token
app.get("/callback", async (req, res) => {
  try {
    const code = req.query.code || null;

    const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Basic ${auth}`
      },
      body: new URLSearchParams({
        code,
        redirect_uri: "https://isai-app.netlify.app/callback",
        grant_type: "authorization_code"
      })
    });

    const tokenData = await tokenRes.json();
    res.json(tokenData);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Token exchange failed" });
  }
});

app.listen(3000, () => console.log("Backend running on http://localhost:3000"));
