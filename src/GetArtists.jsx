import React, { useEffect, useState } from "react";
import axios from "axios";

const TOP_ARTISTS_ENDPOINT = "https://api.spotify.com/v1/me/top/artists";

function GetArtists(props) {
  const [token, setToken] = useState("");
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setToken(localStorage.getItem("accessToken"));
    }
  }, []);

  function handleButton() {
    props.setTab("artists");
    axios
      .get(TOP_ARTISTS_ENDPOINT, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        props.setArtistsData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <button onClick={handleButton}>Get Artists</button>
    </>
  );
}

export default GetArtists;
