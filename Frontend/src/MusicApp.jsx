import { useState } from "react";

// Song data
const allSongs = [
  { title: "Avalum Naanum", url: "https://res.cloudinary.com/dbrx4jxwv/video/upload/v1753185421/Avalum-Naanum_lurg3v.mp3" },
  { title: "Dhandiya", url: "https://res.cloudinary.com/dbrx4jxwv/video/upload/v1753186004/Dhandiya_qlyuaz.mp3" },
  { title: "Anbil Avan", url: "/songs/Anbil-Avan.mp3" },
  { title: "Ennadi Maayavi", url: "/songs/Ennadi-Maayavi.mp3" },
];

function MusicApp() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSongs = allSongs.filter((song) =>
    song.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Navbar */}
      <nav className="bg-white shadow flex justify-between items-center px-6 py-4 mb-6">
        <h1 className="text-2xl font-bold text-blue-600">🎵 MusicApp</h1>
        <div className="space-x-6 text-gray-700 font-medium">
          <a href="#home" className="hover:text-blue-500">Home</a>
          <a href="#songs" className="hover:text-blue-500">Songs</a>
          <a href="#about" className="hover:text-blue-500">About</a>
          <a href="#settings" className="hover:text-blue-500">Settings</a>
        </div>
      </nav>

      {/* Home Section */}
      <section id="home" className="px-6 mb-10">
        <h2 className="text-3xl font-bold mb-2">🎧 Welcome to MusicApp</h2>
        <p className="text-gray-600">Listen to trending Tamil songs anytime, anywhere!</p>
      </section>

      {/* Songs Section */}
      <section id="songs" className="px-6 mb-10">
        <h2 className="text-2xl font-semibold mb-4">🎶 Songs List</h2>

        {/* Search bar */}
        <input
          type="text"
          placeholder="Search songs..."
          className="px-4 py-2 mb-6 rounded-lg border border-gray-300 w-full md:w-1/2 focus:outline-none focus:ring focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Song cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSongs.length > 0 ? (
            filteredSongs.map((song, index) => (
              <div key={index} className="bg-white rounded-xl p-4 shadow">
                <h3 className="text-xl font-medium mb-2">{song.title}</h3>
                <audio controls className="w-full">
                  <source src={song.url} type="audio/mp3" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No songs found.</p>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="px-6 mb-10">
        <h2 className="text-2xl font-semibold mb-2">ℹ️ About</h2>
        <p className="text-gray-600">
          This is a sample React + Tailwind CSS Tamil Music App. Search and play songs easily!
        </p>
      </section>

      {/* Settings Section */}
      <section id="settings" className="px-6 mb-10">
        <h2 className="text-2xl font-semibold mb-2">⚙️ Settings</h2>
        <p className="text-gray-600">Coming soon: Theme toggle, playlist customization and more.</p>
      </section>
    </div>
  );
}

export default MusicApp;
