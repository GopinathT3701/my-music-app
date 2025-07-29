import { useLocation, useNavigate } from "react-router-dom";

export default function NowPlayingpage() {
  const location = useLocation();
  const navigate = useNavigate();
  const song = location.state?.song;
  const isSpotify = location.state?.isSpotify;

  if (!song) {
    return (
      <div>
        <p>No song selected.</p>
        <button onClick={() => navigate("/")}>Back</button>
      </div>
    );
  }

  return (
    <div className="now-playing">
    <div className="song-card1">
      <h2> Now Playing</h2>
      
      <img
        src={isSpotify ? song.album.images[0]?.url : song.img}
        alt="cover"
        width="250"
        style={{ borderRadius: "10px" }}
      />
      <h3>{isSpotify ? song.name : song.title}</h3>
      <p>{isSpotify ? song.artists.map(a => a.name).join(", ") : song.artist}</p>

      {isSpotify && song.preview_url ? (
        <audio src={song.preview_url} controls autoPlay />
      ) : !isSpotify ? (
        <audio src={song.url} controls autoPlay />
      ) : (
        <p>No Preview Available</p>
      )}
      </div>

      <button style={{ marginTop: "20px" }} onClick={() => navigate("/")}>
        ⬅ Back
      </button>
    </div>
  );
}
