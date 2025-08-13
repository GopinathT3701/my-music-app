import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MusicDashboard from "./MusicDashboard";
import NowPlaying from "./Nowplaying.jsx";
import Album from "./Album.jsx";
import ArtistSearch from "./artist.jsx";
import Btn from "./playbtn.jsx";

function App() {
  return (
    <>
    {/* <nav>
        <Link to="/Album">Album</Link>
    </nav> */}

      <Routes>
        {/* <Route path="/" element={<MusicDashboard />} /> */}
        <Route path="/" element={<Btn/>} />
        
        <Route path="/nowplaying" element={<NowPlaying/>} />
        <Route path="/album" element={<Album />} />
        <Route path="/browse" element={<ArtistSearch />} />
      </Routes>
   </>
  );
}

export default App;
