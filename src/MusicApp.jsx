function MusicApp() {
  const songs = [
    { title: "Song 1", url: "https://music-app088.netlify.app/songs/Avalum-Naanum.mp3" },
    { title: "Song 2", url: "/songs/song2.mp3" }
  ];

  return (
    <div>
      <h2>🎵 My Songs</h2>
      {songs.map((song, i) => (
        <div key={i}>
          <p>{song.title}</p>
          <audio controls src={song.url}></audio>
        </div>
      ))}
    </div>
  );
}

export default MusicApp;