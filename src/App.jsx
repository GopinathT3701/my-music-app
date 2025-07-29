import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MusicDashboard from "./MusicDashboard";
import Nowplayingpage from "./Nowplayingpage.jsx";

function App() {
  return (
    <>
    {/* <nav>
        <Link to="/home">Home</Link>
    </nav> */}

      <Routes>
        <Route path="/" element={<MusicDashboard/>} />
        <Route path="/nowplaying" element={<Nowplayingpage/>} />
      </Routes>
   </>
  );
}

export default App;
