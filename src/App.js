import React, { useEffect, useState } from "react";
import "./App.css";
import LoginButton from "./components/LoginButton";
import GetArtists from "./GetArtists";
import GetSongs from "./components/GetSongs";
import { getReturnedParamsFromSpotifyAuth } from "./components/LoginButton";

export const SelectedTabContext = React.createContext();
function App() {
  const [loggedIn, setloggedIn] = useState(false);
  useEffect(() => {
    if (window.location.hash) {
      const { access_token, expires_in, token_type } =
        getReturnedParamsFromSpotifyAuth(window.location.hash);
      localStorage.clear();
      console.log(access_token);
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("expiresIn", expires_in);
      localStorage.setItem("tokenType", token_type);
      setloggedIn(true);
    }
  }, []);
  const [tab, setTab] = useState("artists");
  return (
    <div className="App">
      <SelectedTabContext.Provider value={tab}>
        {!loggedIn ? <LoginButton setTab={setTab} /> : null}
        {loggedIn ? <GetSongs setTab={setTab} /> : null}
        {loggedIn ? <GetArtists setTab={setTab} /> : null}
      </SelectedTabContext.Provider>
      <div id="content"></div>
    </div>
  );
}

export default App;
