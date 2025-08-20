// src/App.jsx
import React, { useEffect, useState } from "react";
import Btn from "./playbtn";
import SpotifyPlayer from "./SpotifyPlayer";
import SpotifySearch from "./Apisearch";

export default function App() {
  const [token, setToken] = useState("");
  const [deviceId, setDeviceId] = useState("");
  const [currentTrack, setCurrentTrack] = useState(null); // Optional: show current track

  // Get token from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const access_token = params.get("access_token");
    if (access_token) setToken(access_token);
  }, []);

  useEffect(() => {
  const checkScopes = async () => {
    if (!token) return;
    const res = await fetch("https://api.spotify.com/v1/me/player/devices", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Devices response:", await res.json());
  };
  checkScopes();
}, [token]);


  // Play a track
  const playUri = async (uri) => {
    if (!token || !deviceId) {
      alert("Login & wait for player ready");
      return;
    }

    await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uris: [uri] }),
    });

    getPlayback(); // update current track after playing
  };

  // Get current playback
  const getPlayback = async () => {
    if (!token) return;
    const res = await fetch("https://api.spotify.com/v1/me/player", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    console.log("Currently playing:", data);
    setCurrentTrack(data?.item || null); // store current track info
  };

  const checkToken = async () => {
  if (!token) return;
  const res = await fetch("https://api.spotify.com/v1/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  console.log("Logged in as:", data.display_name);
};
useEffect(() => { checkToken(); }, [token]);


  return (
    <div style={{ padding: 16 }}>
      <h2>Spotify Mini Player</h2>
      <p>Login → player ready → search & play tracks</p>

      <Btn />
      <SpotifyPlayer token={token} onDeviceReady={setDeviceId} />
      <SpotifySearch token={token} deviceId={deviceId} onPlay={playUri} />

      {/* Optional: display current track */}
      {currentTrack && (
        <div style={{ marginTop: 16 }}>
          <strong>Now Playing:</strong> {currentTrack.name} -{" "}
          {currentTrack.artists.map((a) => a.name).join(", ")}
        </div>
      )}
    </div>
  );
}
