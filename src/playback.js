import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config(); // load .env

const app = express();
app.use(cors());

const keyId = process.env.VITE_CLIENT_ID;
const keySecret = process.env.VITE_CLIENT_SECRET;
const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");

app.get("/login", (req, res) => {
  const scopes = [
    "streaming",
    "user-read-email",
    "user-read-private",
    "user-modify-playback-state"
  ].join(" ");

  const redirect_uri = encodeURIComponent("https://isai-app.netlify.app");

  const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${keyId}&scope=${encodeURIComponent(scopes)}&redirect_uri=${redirect_uri}`;
  res.redirect(authUrl);
});

app.get("/callback", async (req, res) => {
  const code = req.query.code || null;

  const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": `Basic ${auth}`
    },
    body: new URLSearchParams({
      code,
      redirect_uri: "https://isai-app.netlify.app",
      grant_type: "authorization_code"
    })
  });

  const tokenData = await tokenRes.json();
  res.json(tokenData);
});

app.listen(3000, () => console.log("Backend running on http://localhost:3000"));
