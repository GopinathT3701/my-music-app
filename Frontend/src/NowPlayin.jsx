import React, { useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { IoPlaySkipBack, IoPlaySkipForward } from "react-icons/io5";
import "./NowPlaying.css";

const NowPlayin = ({
  songs,
  isPlaying,
  togglePlay,
  playNext,
  playPrev,
  setIsPlaying,
  audioRef
}) => {
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [songs]);

  return (
    <div className="now-playing-card">
      <p className="np-label">Now Playing</p>
      <img src={songs.img} alt="current" className="np-cover" />
      <h3 className="np-title">{songs.title}</h3>
      <p className="np-artist">{songs.artist}</p>

      <div className="np-controls">
        <button onClick={playPrev}><IoPlaySkipBack /></button>
        <button onClick={togglePlay} className="np-play">
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button onClick={playNext}><IoPlaySkipForward /></button>
      </div>

      <audio
        ref={audioRef}
        onEnded={playNext}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src={songs.url} type="audio/mp3" />
      </audio>

      <input type="range" min="0" max="100" defaultValue="30" className="np-slider" />
    </div>
  );
};

export default NowPlayin;
