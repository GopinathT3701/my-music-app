// src/SpotifyPlayer.jsx
import React, { useEffect } from "react";

export default function SpotifyPlayer({ token, onDeviceReady }) {
  useEffect(() => {
    if (!token) return;

    // Define the Spotify Web Playback SDK callback
    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "My Web Player",
        getOAuthToken: cb => cb(token),
        volume: 0.5,
      });

      // When the player is ready
      player.addListener("ready", async ({ device_id }) => {
        console.log("Device ID ready:", device_id);
        if (onDeviceReady) onDeviceReady(device_id);

        // Transfer playback to this device (makes it active)
        try {
          await fetch("https://api.spotify.com/v1/me/player", {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              device_ids: [device_id],
              play: false, // false = don't autoplay
            }),
          });
          console.log("Device activated for playback!");
        } catch (err) {
          console.error("Error activating device:", err);
        }
      });

      // Player went offline
      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device went offline:", device_id);
      });

      // Connect the player
      player.connect();
    };

    // Dynamically load the Spotify Web Playback SDK
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);

    // Cleanup
    return () => document.body.removeChild(script);
  }, [token, onDeviceReady]);

  return null;
}
