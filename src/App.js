import React, { useEffect, useState } from "react";
import "./App.css";
import LoginButton from "./components/LoginButton";
import GetArtists from "./GetArtists";
import GetSongs from "./components/GetSongs";
import { getSpotifyParams } from "./components/LoginButton";

export const SelectedTabContext = React.createContext();
function App() {
  useEffect(() => {
    if (window.location.hash) {
      const { access_token, expires_in, token_type } = getSpotifyParams(
        window.location.hash
      );
      localStorage.clear();
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("expiresIn", expires_in);
      localStorage.setItem("tokenType", token_type);
      setloggedIn(true);
    }
  }, []);

  const [loggedIn, setloggedIn] = useState(false);
  const [tab, setTab] = useState("artists");
  const [artistsData, setArtistsData] = useState({});
  const [songsData, setSongsData] = useState({});

  return (
    <div className="App">
      <SelectedTabContext.Provider value={tab}>
        {!loggedIn ? <LoginButton setTab={setTab} /> : null}
        {loggedIn ? (
          <GetSongs setTab={setTab} setSongsData={setSongsData} />
        ) : null}
        {loggedIn ? (
          <GetArtists setTab={setTab} setArtistsData={setArtistsData} />
        ) : null}
      </SelectedTabContext.Provider>
      <div id="content">
        {artistsData?.items && tab === "artists"
          ? artistsData.items.map((item, index) => (
              <>
                <p>
                  {index + 1}. {item.name}
                </p>
                <img
                  src={item.images[0].url}
                  width="300px"
                  height="300px"
                  alt={item.name + " image"}
                />
              </>
            ))
          : null}
        {songsData?.items && tab === "songs"
          ? songsData.items.map((item, index) => (
              <>
                <p>
                  {index + 1}. {item.name}
                </p>
                <img
                  src={item.album.images[0].url}
                  width="300px"
                  height="300px"
                  alt={item.name + " image"}
                />
              </>
            ))
          : null}
      </div>
    </div>
  );
}

export default App;
