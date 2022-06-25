import { useEffect, useState } from "react";
import "./App.css";
import LoginButton from "./components/LoginButton";
import GetArtists from "./GetArtists";
import { getReturnedParamsFromSpotifyAuth } from "./components/LoginButton";

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
  });
  return (
    <div className="App">
      {!loggedIn ? <LoginButton /> : null}
      {loggedIn ? <GetArtists /> : null}
    </div>
  );
}

export default App;
