import { useState, useEffect } from "react";
import axios from "axios";



const clientId = process.env.CLIENT_ID;
const  clientSecret = process.env.CLIENT_SECRET;

// const clientId = "7fb52a62c4d249c9b024fa433d390c0e";
// const clientSecret = "5cfb9129c1ac4cf6ba230aa88622eadb";

export default function SpotifySearch({ setSpotifyResults, setShowingSpotifyResults }) {
  const [accessToken, setAccessToken] = useState("");
  const [searchTerm, setSearchTerm] = useState(" ");




  useEffect(() => {
    const getToken = async () => {
      const res = await axios.post(
        "https://accounts.spotify.com/api/token",
        new URLSearchParams({ grant_type: "client_credentials" }),
        {
          headers: {
            Authorization: "Basic " + btoa(`${clientId}:${clientSecret}`),
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      setAccessToken(res.data.access_token);
    };
    getToken();
  }, []);

  const searchTracks = async () => {
    const res = await axios.get("https://api.spotify.com/v1/search", {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: {
        q: searchTerm,
        type: "track",
        limit: 50,
      },
    });
    setSpotifyResults(res.data.tracks.items);
    setShowingSpotifyResults(true);
  };

  return (
       <div className="search-bar">
          <input
            type="text"
            placeholder="Search songs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
<button onClick={searchTracks} >
        Search
      </button>
      </div> 
  );
}
