import { useState, useRef, useEffect } from "react";
import {
  IoPlaySkipBackCircleOutline,
  IoPlaySkipForwardCircleOutline,
  IoHome,
} from "react-icons/io5";
import { FaHeart, FaPlay, FaPause, FaSignOutAlt } from "react-icons/fa";
import { BiSolidAlbum } from "react-icons/bi";
import "./index.css";
import axios from "axios";

export default function MusicDashboard() {
  const [songs, setSongs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const audioRef = useRef(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/songs")
      .then((response) => {
        setSongs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching songs:", error);
      });
  }, []);

  const currentSong = songs[currentIndex] || {};
  const filteredSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const playNext = () => {
    const nextIndex = (currentIndex + 1) % filteredSongs.length;
    setCurrentIndex(nextIndex);
  };

  const playPrev = () => {
    const prevIndex = (currentIndex - 1 + filteredSongs.length) % filteredSongs.length;
    setCurrentIndex(prevIndex);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentIndex]);

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
            <a href="#" className="active">
              <IoHome /> Home
            </a>
            <a href="#">Browse</a>
            <a href="#">
              <BiSolidAlbum /> Album
            </a>
            <a href="#">Favourite</a>
            <a href="#">Recently Played</a>
          </nav>
        </div>
        <button className="logout-btn">
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search songs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Song Grid */}
        <div className="song-grid">
          {filteredSongs.map((song, i) => (
            <div
              key={i}
              className="song-card"
              onClick={() => {
                setCurrentIndex(i);
                setIsPlaying(true);
              }}
            >
              <img src={song.img} alt="img" />
              <h3>{song.title}</h3>
              <p>{song.artist}</p>
            </div>
          ))}
        </div>

        {/* Now Playing */}
        {filteredSongs.length > 0 && (
          <div className="now-playing">
            <img src={currentSong.img} alt="Now Playing" />
            <div className="now-playing-info">
              <h4>{currentSong.title}</h4>
              <p>{currentSong.artist}</p>
              <audio ref={audioRef} onEnded={playNext}>
                <source src={currentSong.url} type="audio/mp3" />
              </audio>
            </div>
            <div className="controls-btn">
              <button onClick={playPrev}>
                <IoPlaySkipBackCircleOutline />
              </button>
              <button className="play-btn" onClick={togglePlay}>
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
              <button onClick={playNext}>
                <IoPlaySkipForwardCircleOutline />
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
