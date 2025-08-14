import React, { useEffect, useState } from "react";

export default function Btn() {
  const [token, setToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [deviceId, setDeviceId] = useState("");

  const BACKEND_URL = "https://spotify-backend-b3un.onrender.com";

  // Step 1: Get tokens from backend after login
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      fetch(`${BACKEND_URL}/callback?code=${code}`)
        .then(res => res.json())
        .then(data => {
          setToken(data.access_token);
          setRefreshToken(data.refresh_token); // store refresh token
          console.log("Access Token:", data.refresh_token);
        })
        .catch(err => console.error("Token fetch error:", err));
    }
  }, []);

  // Step 2: Function to refresh access token
  const refreshAccessToken = () => {
    if (!refreshToken) return;
    fetch(`${BACKEND_URL}/refresh_token?refresh_token=${refreshToken}`)
      .then(res => res.json())
      .then(data => {
        setToken(data.access_token);
        // console.log("New Access Token:", data.access_token);
      })
      .catch(err => console.error("Refresh token failed:", err));
  };

  // Step 3: Load Spotify Player
useEffect(() => {
  if (!token) return;

  window.onSpotifyWebPlaybackSDKReady = () => {
    const player = new Spotify.Player({
      name: "Isai Player",
      getOAuthToken: cb => cb(token),
      volume: 0.5
    });

    player.addListener("initialization_error", ({ message }) => console.error(message));
    player.addListener("authentication_error", ({ message }) => console.error(message));
    player.addListener("account_error", ({ message }) => console.error(message));
    player.addListener("playback_error", ({ message }) => console.error(message));

    player.addListener("ready", ({ device_id }) => {
      console.log("Ready with Device ID", device_id);
      setDeviceId(device_id); // store in state
    });

    player.connect();
  };
}, [token]);


  // Step 4: Play track
  const playTrack = async (uri = "spotify:track:4uLU6hMCjMI75M1A2tKUQC") => {
    if (!token || !deviceId) return alert("Player not ready yet");
    await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
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
        <>
          <button onClick={playTrack}>Play Sample Track</button>
          <button onClick={refreshAccessToken}>Refresh Token</button>
        </>
      )}
    </div>
  );
}
