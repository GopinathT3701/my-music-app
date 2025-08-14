import React, { useEffect, useState } from "react";

export default function SpotifyPlayer({ token }) {
  const [player, setPlayer] = useState(null);
  const [deviceId, setDeviceId] = useState("");

  useEffect(() => {
    if (!token) return;

    // Spotify Web Playback SDK ready
    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "My Web Player",
        getOAuthToken: cb => { cb(token); },
        volume: 0.5
      });

      setPlayer(player);

      // Ready
      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
        setDeviceId(device_id);
      });

      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      player.connect();
    };
  }, [token]);

  // Play a track
  const playTrack = async (uri) => {
    if (!deviceId) return;
    await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
      method: "PUT",
      body: JSON.stringify({ uris: [uri] }),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });
  };

  return (
    <div>
      <button onClick={() => playTrack("spotify:track:3n3Ppam7vgaVa1iaRUc9Lp")}>
        Play Song
      </button>
    </div>
  );
}
