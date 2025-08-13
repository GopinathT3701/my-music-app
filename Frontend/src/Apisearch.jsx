import { useState } from "react";
import React from 'react';

export default function Spotify({ token, deviceId, onPlay }) {
  const [q, setQ] = useState("");
  const [tracks, setTracks] = useState([]);

  const search = async () => {
    if (!token) return alert("Login first");
    const res = await fetch(
      `https://api.spotify.com/v1/search?type=track&limit=10&q=${encodeURIComponent(q)}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const data = await res.json();
    setTracks(data?.tracks?.items || []);
  };

  return (
    <div style={{ marginTop: 16 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search songs…" />
        <button onClick={search}>Search</button>
      </div>

      <ul style={{ marginTop: 12 }}>
        {tracks.map(t => (
          <li key={t.id} style={{ marginBottom: 8 }}>
            {t.name} — {t.artists.map(a => a.name).join(", ")}
            <button style={{ marginLeft: 8 }} onClick={() => onPlay(t.uri)}>
              Play
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
