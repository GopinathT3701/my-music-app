import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const clientId = "7fb52a62c4d249c9b024fa433d390c0e";
const clientSecret = "5cfb9129c1ac4cf6ba230aa88622eadb";

function ArtistSearch() {
  const [accessToken, setAccessToken] = useState('');
  const [artistName, setArtistName] = useState('');
  const [artist, setArtist] = useState(null);
  const [albums, setAlbums] = useState([]);
    const navigate = useNavigate();
      <button onClick={() => navigate("/")}></button>

  const getToken = async () => {
    const result = await axios.post(
      'https://accounts.spotify.com/api/token',
      'grant_type=client_credentials',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization:
            'Basic ' + btoa(clientId + ':' + clientSecret),
        },
      }
    );

    setAccessToken(result.data.access_token);
    return result.data.access_token;
  };

  const searchArtist = async () => {
    const token = accessToken || (await getToken());

    const result = await axios.get(
      `https://api.spotify.com/v1/search?q=${artistName}&type=artist&limit=1`,
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );

    if (result.data.artists.items.length > 0) {
      const foundArtist = result.data.artists.items[0];
      setArtist(foundArtist);

      // Fetch albums now
      const albumsResult = await axios.get(
        `https://api.spotify.com/v1/artists/${foundArtist.id}/albums?include_groups=album&market=IN&limit=5`,
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );

      setAlbums(albumsResult.data.items);
    } else {
      setArtist(null);
      setAlbums([]);
    }
  };

  return (

    
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>🎵 Spotify Artist Search</h2>
      <input
        type="text"
        placeholder="Enter artist name (e.g., A.R. Rahman)"
        value={artistName}
        onChange={(e) => setArtistName(e.target.value)}
        style={{ padding: '8px', width: '300px', marginRight: '10px' }}
      />
      <button onClick={searchArtist} style={{ padding: '8px 15px' }}>
        Search
      </button>

      <button className="back" onClick={() => navigate("/")}>
        ⬅ Back
      </button>

      {artist && (
        <div style={{ marginTop: '20px' }}>
          <img src={artist.images[0]?.url} alt={artist.name} width="250" />
          <h3>{artist.name}</h3>
          <p>🎧 Genres: {artist.genres.join(', ')}</p>
          <p>👥 Followers: {artist.followers.total.toLocaleString()}</p>
          <p>🔥 Popularity: {artist.popularity} / 100</p>
        </div>
        
      )}

      {albums.length > 0 && (
        <div style={{ marginTop: '30px' }}>
          <h3>🎼 Albums:</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {albums.map((album) => (
              <div key={album.id} style={{ width: '200px' }}>
                <img
                  src={album.images[0]?.url}
                  alt={album.name}
                  width="200"
                />
                <p><strong>{album.name}</strong></p>
                <p>📅 {album.release_date}</p>
                <p>🎵 Tracks: {album.total_tracks}</p>
                 
              </div>
            ))}
           
          </div>
        </div>
      )}
    </div>
  );
}

export default ArtistSearch;
