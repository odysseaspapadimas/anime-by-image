import React, { useState, useEffect } from "react";
import ImageUploader from "react-images-upload";
import { fetchAnime } from "./fetchAnime";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVolumeMute,
  faVolumeUp,
  faHistory,
} from "@fortawesome/free-solid-svg-icons";

function ImageUpload(props) {
  const [picture, setPicture] = useState(null);
  //eslint-disable-next-line
  const [anime, setAnime] = useState({});
  const [video, setVideo] = useState();
  const [muted, setMuted] = useState(true);
  const [fetching, setFetching] = useState(false);

  var ctx;
  let canvas;
  const onDrop = (upload) => {
    setPicture(URL.createObjectURL(upload[0]));

    const timer = setInterval(() => {
      const img = document.querySelector(".image");
      const preview = document.querySelector(".preview");
      preview.width = img.naturalWidth;
      preview.height = img.naturalHeight;

      canvas = document.querySelector("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      clearInterval(timer);
    }, 50);
  };
  useEffect(() => {
    const { anilist_id, filename, at, tokenthumb } = anime;

    if (anilist_id !== undefined) {
      const videoSrc = `https://media.trace.moe/video/${anilist_id}/${encodeURIComponent(
        filename
      )}?t=${at}&token=${tokenthumb}`;
      setVideo(videoSrc);
      const vid = document.querySelector("video");
      const vidContainer = document.querySelector(".video-container");
      vidContainer.style.display = "block";
      const canvas = document.querySelector("canvas");
      canvas.style.display = "none";
      // eslint-disable-next-line
      const muteBtn = (document.querySelector(".mute-btn").style.display =
        "block");
      // eslint-disable-next-line
      const restartBtn = (document.querySelector(".restart-btn").style.display =
        "block");
      vid.muted = true;

      const vidPromise = vid.play();

      if (vidPromise !== undefined) {
        vidPromise.then(() => {}).catch((error) => {});
      }
    }
  }, [video, anime]);

  useEffect(() => {
    const { anilist_id, filename, at, tokenthumb } = anime;

    if (anilist_id !== undefined) {
      const imgSrc = `https://trace.moe/thumbnail.php?anilist_id=${anilist_id}&file=${encodeURIComponent(
        filename
      )}&t=${at}&token=${tokenthumb}`;
      setPicture(imgSrc);
    }
  }, [picture, anime]);

  const handleClick = async () => {
    setFetching(true);
    canvas = document.querySelector("canvas");
    const animeFetched = await fetchAnime(canvas);
    setFetching(false);
    const {
      title_romaji,
      episode,
      anilist_id,
      filename,
      similarity,
      at,
      from,
      tokenthumb,
      mal_id,
    } = animeFetched.docs[0];
    console.log(animeFetched.docs[0]);
    setAnime({
      title_romaji,
      anilist_id,
      at,
      filename,
      similarity,
      tokenthumb,
      mal_id,
    });

    props.onFetch({
      title_romaji,
      episode,
      anilist_id,
      at,
      from,
      filename,
      similarity,
      tokenthumb,
      mal_id,
    });

    setPicture();
  };

  const handleMute = () => {
    const vid = document.querySelector("video");
    if (muted) {
      vid.muted = false;
      setMuted(false);
    } else {
      vid.muted = true;
      setMuted(true);
    }
  };

  const handleRestart = () => {
    const vid = document.querySelector("video");
    vid.currentTime = 0;
    vid.play();
  };
  return (
    <div className="upload-container">
      <div className="preview" style={{}}>
        <canvas ref={ctx}></canvas>

        <div className="video-container">
          <video src={`${video}`}></video>
          {muted ? (
            <FontAwesomeIcon
              icon={faVolumeMute}
              onClick={handleMute}
              className="mute-btn"
            />
          ) : (
            <FontAwesomeIcon
              icon={faVolumeUp}
              onClick={handleMute}
              className="mute-btn"
            />
          )}

          <FontAwesomeIcon
            icon={faHistory}
            onClick={handleRestart}
            className="restart-btn"
          />

          <button onClick={handleRestart} className="restart-btn">
            Restart
          </button>
        </div>
      </div>
      <br />
      <img
        className="image"
        src={`${picture}`}
        alt=""
        style={{ display: "none" }}
      />

      <ImageUploader
        singleImage={true}
        withLabel={false}
        withIcon={false}
        buttonText="Upload image"
        onChange={onDrop}
      />
      <button className="search" onClick={handleClick}>
        {!fetching ? (
          "Search"
        ) : (
          <div className="lds-default">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
      </button>
    </div>
  );
}

export default ImageUpload;
