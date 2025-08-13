import { useNavigate } from "react-router-dom";
import "/src/css/album.css";

function Album() {
  const navigate = useNavigate();   
  
  <button onClick={() => navigate("/")}></button>
  
  return (

<>
{/* <div className="album-container">
  <h2>Album Page</h2>
  <p>This is the album page content.</p>
    <img src="https://via.placeholder.com/150" alt="Album Cover" className="album-cover" /> 
</div> */}
<div className="nav-bar">

    <aside className="album-sidebar">
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
              
             
                <a href="#"> Album</a>
                <a href="#">Favourite</a>
                <a href="#">Recently Played</a>
              </nav>
            </div>
             <button className="back" onClick={() => navigate("/")}>
        ⬅ Back
      </button>
          </aside>

<main className="main-cont">


  <h2>Trending Album</h2>
 

<div className="album-grid">
<div className="album-card">
  
<img className="album-cover"
        src={"data:image/jpeg;base64,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"}
        alt="cover"
      /><h3><strong>Album Title</strong></h3>
   
    <p>Song Name</p>
    <p>Artist Name</p><br/>
 
  <div className="album-audio">
    <audio controls>
      <source src="your-audio-url.mp3" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
     </div>
  </div>
</div>

</main>

</div>






</>
    
    );
}

export default Album;