import React, { useEffect, useState, useContext } from "react";
import { SelectedTabContext } from "./App";
import axios from "axios";

const TOP_ARTISTS_ENDPOINT = "https://api.spotify.com/v1/me/top/artists";

function GetArtists(props) {
  const [token, setToken] = useState("");
  const [data, setData] = useState({});
  const selectedTab = useContext(SelectedTabContext);
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setToken(localStorage.getItem("accessToken"));
    }
  }, []);

  const handleButton = () => {
    props.setTab("artists");
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
      {data?.items && selectedTab === "artists"
        ? data.items.map((item, index) => (
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
    </>
  );
}

export default GetArtists;
