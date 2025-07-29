import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MusicDashboard from "./MusicDashboard";
import NowPlayingPage from "./Nowplayingpage";

function App() {
  return (
    <>
    {/* <nav>
        <Link to="/home">Home</Link>
    </nav> */}

      <Routes>
        <Route path="/" element={<MusicDashboard />} />
        <Route path="/nowplaying" element={<NowPlayingPage />} />
      </Routes>
   </>
  );
}

export default App;
