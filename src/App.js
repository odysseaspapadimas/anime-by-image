import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import ImageUpload from "./ImageUpload";
import { fetchAnimeMAL } from "./fetchAnimeMAL";
import mal from "./img/mal.png";

function App() {
  const [info, setInfo] = useState({});
  const [malInfo, setMalInfo] = useState({});
  const [link, setLink] = useState("");
  const [fetched, setFetched] = useState(false);
  const [time, setTime] = useState("");

  const onFetch = (val) => {
    setInfo(val);
  };

  useEffect(() => {
    async function getMalInfo() {
      let res = await fetchAnimeMAL(info.mal_id);
      setMalInfo(res);
    }

    if (didMountRef.current) {
      getMalInfo();
      setFetched(true);
    } else {
      didMountRef.current = true;
    }

    const seconds = Math.floor(info.from) - 7; //
    const minutes = Math.floor(seconds / 60);
    let secs = seconds % 60;
    if (secs < 10) secs = `0${secs}`;
    setTime(`${minutes}:${secs}`);
  }, [info]);

  const didMountRef = useRef(false);
  useEffect(() => {
    console.log(didMountRef.current, 'ηι');
  });

  useEffect(() => {
    if (malInfo) setLink(malInfo.url);
  }, [malInfo]);

  return (
    <div className="App">
      <h1>
        Upload an image to find the sauce{" "}
        <span role="img" aria-label="sauce">
          🥫
        </span>{" "}
      </h1>
      <ImageUpload onFetch={onFetch} />
      <p className="result">
        {fetched &&
          `Anime: ${info.title_romaji} - Episode: ${info.episode} - Timestamp: ${time}`}
      </p>

      {fetched && (
        <a href={link} target="_blank" rel="noopener noreferrer">
          <img src={mal} alt="" />
        </a>
      )}
    </div>
  );
}

export default App;
