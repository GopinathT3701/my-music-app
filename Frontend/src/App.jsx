import { useEffect, useState } from "react";

import React from 'react';
import Btn from "./playbtn";
import Spotify from "./Apisearch";

export default function App() {
  const [token, setToken] = useState("");
  const [deviceId, setDeviceId] = useState("");

  // Lift state up from Btn via window events (simple quick link)
  useEffect(() => {
    const onToken = e => setToken(e.detail);
    const onDevice = e => setDeviceId(e.detail);
    window.addEventListener("SPOTIFY_TOKEN", onToken);
    window.addEventListener("SPOTIFY_DEVICE", onDevice);
    return () => {
      window.removeEventListener("SPOTIFY_TOKEN", onToken);
      window.removeEventListener("SPOTIFY_DEVICE", onDevice);
    };
  }, []);

  // Monkey-patch: emit events from Btn by intercepting setState (tiny hack for brevity)
  // If you prefer clean lifting, move Btn logic into App and pass setters.
  // For now just render Btn and read token/deviceId via global logs in Btn.

  // Simple play function used by search results
  const playUri = async (uri) => {
    if (!token || !deviceId) return alert("Login & wait for player ready");
    await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
      method: "PUT",
      headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ uris: [uri] })
    });
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Spotify Mini Player</h2>
      <p>Login → player creates a device → search & play</p>
      <Btn />
      <SpotifySearch token={token} deviceId={deviceId} onPlay={playUri} />
    </div>
  );
}
