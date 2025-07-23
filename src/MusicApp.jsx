import { useState } from "react";

// Song list
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
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md p-4 mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">🎵 Music App</h1>
        <div className="space-x-4">
          <a href="#home" className="text-gray-700 hover:text-blue-500 font-medium">Home</a>
          <a href="#songs" className="text-gray-700 hover:text-blue-500 font-medium">Songs</a>
          <a href="#about" className="text-gray-700 hover:text-blue-500 font-medium">About</a>
          <a href="#settings" className="text-gray-700 hover:text-blue-500 font-medium">Settings</a>
        </div>
      </nav>

      <div className="px-6 pb-10" id="songs">
        <h2 className="text-3xl font-bold mb-6">🎶 Tamil Music App with Search</h2>

        {/* Search Input */}
        <input
          type="text"
          placeholder="🔍 Search songs..."
          className="px-4 py-2 mb-6 rounded-lg border border-gray-300 w-full md:w-1/2 focus:outline-none focus:ring focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Songs List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSongs.length > 0 ? (
            filteredSongs.map((song, index) => (
              <div key={index} className="bg-white p-4 rounded-xl shadow">
                <h3 className="text-xl font-semibold mb-2">{song.title}</h3>
                <audio controls className="w-full">
                  <source src={song.url} type="audio/mp3" />
                  Your browser does not support the audio tag.
                </audio>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No songs found.</p>
          )}
        </div>
      </div>

      {/* About & Settings Sections (optional) */}
      <div className="p-6" id="about">
        <h2 className="text-2xl font-semibold mb-2">About</h2>
        <p className="text-gray-600">This is a simple React music app where you can play and search Tamil songs.</p>
      </div>

      <div className="p-6" id="settings">
        <h2 className="text-2xl font-semibold mb-2">Settings</h2>
        <p className="text-gray-600">No settings available right now 😅.</p>
      </div>
    </div>
  );
}

export default MusicApp;
