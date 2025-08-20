// src/Apisearch.jsx
import React, { useState } from "react";

export default function SpotifySearch({ token, deviceId, onPlay }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const searchTracks = async () => {
    if (!token) return;

    const res = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const data = await res.json();
    setResults(data.tracks.items || []);
  };

  return (
    <div style={{ marginTop: 16 }}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search tracks..."
      />
      <button onClick={searchTracks}>Search</button>

      <ul>
        {results.map((track) => (
          <li key={track.id}>
            {track.name} - {track.artists.map((a) => a.name).join(", ")}
            <button onClick={() => onPlay(track.uri)}>Play</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
