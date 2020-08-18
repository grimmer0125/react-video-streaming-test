import React from "react";
import ReactPlayer from "react-player";

import logo from "./logo.svg";
import "./App.css";

function App() {
  // const url =
  //   "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"; //URL.createObjectURL("video_1_v1575525544.mp4");

  // https://test-videos.co.uk/bigbuckbunny/mp4-h264
  const url = "Big_Buck_Bunny_1080_10s_10MB.mp4";

  // ref:
  // https://bitmovin.com/mpeg-dash-hls-examples-sample-streams/
  // https://jsfiddle.net/99ee3atp/2/
  // https://developer.apple.com/streaming/examples/
  const hlsURL = [
    "https://devimages.apple.com.edgekey.net/streaming/examples/bipbop_4x3/bipbop_4x3_variant.m3u8",
    "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8",
    "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8",
    // 1. 1.ts
    // 2.
  ];
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      {/* https://github.com/CookPete/react-player/issues/120 */}
      {/* try https://github.com/zhihu/griffith/search?q=typescript&type=Issues */}
      {/* Local file:
      <ReactPlayer playing url={url} />
      HLS: (https://jsfiddle.net/99ee3atp/2/) */}
      <ReactPlayer
        url={hlsURL[2]}
        playing
        width="100%"
        height="100%"
        className="player"
      />
    </div>
  );
}

export default App;
