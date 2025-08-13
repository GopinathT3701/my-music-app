import React, { useEffect, useState } from "react";
import Btn from "./playbtn";
import Spotify from "./Apisearch"; // ✅ Corrected import name

export default function App() {
  const [token, setToken] = useState("");
  const [deviceId, setDeviceId] = useState("");

  // Listen for token & deviceId events
  useEffect(() => {
    const onToken = (e) => setToken(e.detail);
    const onDevice = (e) => setDeviceId(e.detail);

    window.addEventListener("SPOTIFY_TOKEN", onToken);
    window.addEventListener("SPOTIFY_DEVICE", onDevice);

    return () => {
      window.removeEventListener("SPOTIFY_TOKEN", onToken);
      window.removeEventListener("SPOTIFY_DEVICE", onDevice);
    };
  }, []);

  // Play a track on the Spotify player
  const playUri = async (uri) => {
    if (!token || !deviceId) {
      alert("Login & wait for player ready");
      return;
    }
    await fetch(
      `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uris: [uri] }),
      }
    );
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Spotify Mini Player</h2>
      <p>Login → player creates a device → search & play</p>
      <Btn />
      {/* ✅ Pass props correctly */}
      <Spotify token={token} deviceId={deviceId} onPlay={playUri} />
    </div>
  );
}
