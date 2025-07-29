import { useState, useEffect } from "react";
import { IoHome } from "react-icons/io5";
import { FaSignOutAlt } from "react-icons/fa";
import { BiSolidAlbum } from "react-icons/bi";
import "./index.css";
import axios from "axios";
import SpotifySearch from "./SpotifySearch";
import { useNavigate } from "react-router-dom";

export default function MusicDashboard() {
  const [songs, setSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [spotifyResults, setSpotifyResults] = useState([]);
  const [showingSpotifyResults, setShowingSpotifyResults] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/songs")
      .then((response) => setSongs(response.data))
      .catch((error) => console.error("Error fetching songs:", error));
  }, []);

  const filteredSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const songsToShow = showingSpotifyResults ? spotifyResults : filteredSongs;

  const handlePlayClick = (song) => {
    navigate("/nowplaying", {
      state: { song, isSpotify: showingSpotifyResults },
    });
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div>
          <div className="profile">
            <img
              src="https://avatars.githubusercontent.com/u/583231?v=4"
              alt="profile"
              className="profile-img"
            />
            <h2>User</h2>
            <p>userid@gmail.com</p>
          </div>
          <nav className="nav-links">
            <a href="#" className="active"><IoHome /> Home</a>
            <a href="#">Browse</a>
            <a href="#"><BiSolidAlbum /> Album</a>
            <a href="#">Favourite</a>
            <a href="#">Recently Played</a>
          </nav>
        </div>
        <button className="logout-btn"><FaSignOutAlt /> Logout</button>
      </aside>

      {/* Main */}
      <main className="main-content">
        <div className="spotify-search">
          <h2>Search</h2>
          <SpotifySearch
            setSpotifyResults={setSpotifyResults}
            setShowingSpotifyResults={setShowingSpotifyResults}
          />
        </div>

        {!showingSpotifyResults && <h2 className="song-header">Trending Songs</h2>}

        <div className="song-grid">
          {songsToShow.map((song, i) => (
            <div
              key={i}
              className="song-card"
              onClick={() => handlePlayClick(song)}
            >
              <img
                src={showingSpotifyResults ? song.album.images[0]?.url : song.img}
                alt="cover"
              />
              <h3>{showingSpotifyResults ? song.name : song.title}</h3>
              <p>
                {showingSpotifyResults
                  ? song.artists.map((a) => a.name).join(", ")
                  : song.artist}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
