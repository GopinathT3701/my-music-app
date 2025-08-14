import React, { useEffect, useState } from "react";

export default function Btn() {
  const [token, setToken] = useState("");
  const [deviceId, setDeviceId] = useState("");

  // Replace with your Render backend URL
  const BACKEND_URL = "https://spotify-backend-b3un.onrender.com";

  // Get access token from backend using ?code=...
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (code) {
      fetch(`${BACKEND_URL}/callback?code=${code}`)
        .then(res => res.json())
        .then(data => {
          setToken(data.access_token);
          console.log("Access Token:", data.access_token);
        })
        .catch(err => console.error("Token fetch error:", err));
    }
  }, []);

  // Load Spotify Web Playback SDK and create device
  useEffect(() => {
    if (!token) return;

    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "My Spotify Player",
        getOAuthToken: cb => cb(token),
        volume: 0.5
      });

      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
        setDeviceId(device_id);
      });

      player.addListener("initialization_error", ({ message }) => console.error(message));
      player.addListener("authentication_error", ({ message }) => console.error(message));
      player.addListener("account_error", ({ message }) => console.error(message));
      player.addListener("playback_error", ({ message }) => console.error(message));

      player.connect();
    };
  }, [token]);

  // Play a track on this device
  const playTrack = async (uri = "spotify:track:4uLU6hMCjMI75M1A2tKUQC") => {
    if (!token || !deviceId) return alert("Player not ready yet");
    await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ uris: [uri] })
    });
  };

  return (
    <div style={{ display: "flex", gap: 12 }}>
      {!token ? (
        <a href={`${BACKEND_URL}/login`}>Login with Spotify</a>
      ) : (
        <button onClick={() => playTrack()}>Play Sample Track</button>
      )}
    </div>
  );
}
