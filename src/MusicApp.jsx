const songs = [
  { title: "Avalum Naanum", url: "/songs/Avalum-Naanum.mp3" }
];

function MusicApp() {
  return (
    <div>
      <h2>🎵 Tamil Songs</h2>
      {songs.map((song, i) => (
        <div key={i}>
          <p>{song.title}</p>
          <audio controls>
            <source src={song.url} type="audio/mp3" />
            Your browser does not support the audio tag.
          </audio>
        </div>
      ))}
    </div>
  );
}

export default MusicApp;