import  { useEffect, useState } from "react";




function Btn() {
  const [token, setToken] = useState("");
  const [deviceId, setDeviceId] = useState("");

  // 1. Get token after login
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("code")) {
      fetch(`https://music-app088.netlify.app/?code=${params.get("code")}`)
        .then(res => res.json())
        .then(data => setToken(data.access_token));
         console.log("Fetched Token:", data.access_token); 
       
    }
  }, []);

  // 2. Load Spotify SDK
  useEffect(() => {
    if (!token) return;

    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "My Spotify Player",
        getOAuthToken: cb => cb(token)
      });

      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
        setDeviceId(device_id);
      });

      player.connect();
    };
  }, [token]);

  // 3. Play Song
  const playTrack = async () => {
    await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        uris: ["spotify:track:4uLU6hMCjMI75M1A2tKUQC"] // Rick Astley 😄
      })
    });
  };

  return (
    <div>
      {!token ? (
        <a href="http://localhost:3000/login">Login with Spotify</a>
      ) : (
        <button onClick={playTrack}>Play Song</button>
      )}
    </div>
  );
}

export default Btn;
