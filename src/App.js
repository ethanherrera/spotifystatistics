import { useEffect } from "react";
import "./App.css";
import GetArtists from "./GetArtists";

const CLIENT_ID = "fa60583b5fcf419693fa909755dfcd7a";
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URL_AFTER_LOGIN =
  "https://ethanherrera.github.io/spotifystatistics";
const SCOPES = ["user-top-read"];
const SCOPES_URL_PARAM = SCOPES.join("%20");

function handleLogin() {
  window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
}

const getReturnedParamsFromSpotifyAuth = (hash) => {
  const stringAfterHashtag = hash.substring(1);
  const paramsInUrl = stringAfterHashtag.split("&");
  const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
    const [key, value] = currentValue.split("=");
    accumulater[key] = value;
    console.log(accumulater);
    return accumulater;
  }, {});
  console.log(paramsSplitUp);
  return paramsSplitUp;
};

function App() {
  useEffect(() => {
    if (window.location.hash) {
      const { access_token, expires_in, token_type } =
        getReturnedParamsFromSpotifyAuth(window.location.hash);
      localStorage.clear();
      console.log(access_token);
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("expiresIn", expires_in);
      localStorage.setItem("tokenType", token_type);
    }
  });
  return (
    <div className="App">
      <button onClick={handleLogin}>Login</button>
      <GetArtists />
    </div>
  );
}

export default App;
