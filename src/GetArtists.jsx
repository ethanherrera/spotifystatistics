import React, { useEffect, useState } from "react";
import axios from "axios";

const TOP_ARTISTS_ENDPOINT = "https://api.spotify.com/v1/me/top/artists";

function GetArtists() {
  const [token, setToken] = useState("");
  const [data, setData] = useState({});
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setToken(localStorage.getItem("accessToken"));
    }
  }, []);

  const handleButton = () => {
    axios
      .get(TOP_ARTISTS_ENDPOINT, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <button onClick={handleButton}>Get Artists</button>
      {data?.items
        ? data.items.map((item) => (
            <>
              <p>{item.name}</p>
              <img src={item.images[0].url} />
            </>
          ))
        : null}
    </>
  );
}

export default GetArtists;
