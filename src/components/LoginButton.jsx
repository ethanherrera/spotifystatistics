/** Released Version */
const CLIENT_ID = "fa60583b5fcf419693fa909755dfcd7a";
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URL_AFTER_LOGIN =
  "https://ethanherrera.github.io/spotifystatistics/loggedin";
const SCOPES = ["user-top-read"];
const SCOPES_URL_PARAM = SCOPES.join("%20");

/** Testing Version */
// const CLIENT_ID = "906bb27bccc240f68dab234af46f3356";
// const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
// const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/loggedin";
// const SCOPES = ["user-top-read"];
// const SCOPES_URL_PARAM = SCOPES.join("%20");

function handleLogin() {
  window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
}

export function getSpotifyParams(hash) {
  const stringAfterHashtag = hash.substring(1);
  const paramsInUrl = stringAfterHashtag.split("&");
  const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
    const [key, value] = currentValue.split("=");
    accumulater[key] = value;
    return accumulater;
  }, {});
  return paramsSplitUp;
}

function LoginButton() {
  return (
    <>
      <button onClick={handleLogin}>Login</button>
    </>
  );
}

export default LoginButton;
