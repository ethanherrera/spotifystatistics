import React, { useEffect, useState } from "react";
import axios from "axios";

const TOP_TRACKS_ENDPOINT = "https://api.spotify.com/v1/me/top/tracks";

function GetSongs(props) {
  const [token, setToken] = useState("");
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setToken(localStorage.getItem("accessToken"));
    }
  }, []);

  function handleButton() {
    props.setTab("songs");
    axios
      .get(TOP_TRACKS_ENDPOINT, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        props.setSongsData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return <button onClick={handleButton}>Get Songs</button>;
}

export default GetSongs;
