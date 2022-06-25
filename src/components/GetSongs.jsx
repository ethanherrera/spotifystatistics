import React, { useEffect, useState, useContext } from "react";
import { SelectedTabContext } from "../App";
import axios from "axios";

const TOP_TRACKS_ENDPOINT = "https://api.spotify.com/v1/me/top/tracks";

function GetSongs(props) {
  const [token, setToken] = useState("");
  const [data, setData] = useState({});
  const selectedTab = useContext(SelectedTabContext);
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setToken(localStorage.getItem("accessToken"));
    }
  }, []);

  const handleButton = () => {
    props.setTab("songs");
    axios
      .get(TOP_TRACKS_ENDPOINT, {
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
    console.log(data);
  };
  return (
    <>
      <button onClick={handleButton}>Get Songs</button>
      {data?.items && selectedTab === "songs"
        ? data.items.map((item, index) => (
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
    </>
  );
}

export default GetSongs;
