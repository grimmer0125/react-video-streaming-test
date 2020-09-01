import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";

import logo from "./logo.svg";
import "./App.css";

function App() {
  const [playing, setPlaying] = useState(true);

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
    "http://localhost:8001/stream/index.m3u8",
    // 1. 1.ts
    // 2.
  ];

  // https://github.com/video-dev/hls.js/issues/2468
  const handleProgress = (state) => {
    console.log("onProgress", state);
    const hlsInstance = inputEl.current.player.getInternalPlayer("hls");
    const { levels } = hlsInstance;
    console.log("hls:", hlsInstance);
    console.log("hls endSN:", levels[0].details.endSN); // startSN
    // setPlaying(true);

    // OR USE .TS MPEG2 transport stream clocks (PTS)?
    // https://github.com/video-dev/hls.js/search?q=pts&unscoped_q=pts
    // https://stackoverflow.com/questions/13606023/mpeg2-presentation-time-stamps-pts-calculation
    // We only want to update time slider if we are not currently seeking
    // if (!this.state.seeking) {
    //   this.setState(state)
    // }
  };

  const handleDuration = (duration) => {
    console.log("onDuration", duration);
    // this.setState({ duration })
    // setPlaying(true);
  };

  const inputEl = useRef(null);

  // ready, duration
  // (optional) start/ play
  // onProgress
  return (
    <div className="App">
      {/* <header className="App-header">
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
      </header> */}
      {/* https://github.com/CookPete/react-player/issues/120 */}
      {/* try https://github.com/zhihu/griffith/search?q=typescript&type=Issues */}
      {/* Local file:
      <ReactPlayer playing url={url} />
      HLS: (https://jsfiddle.net/99ee3atp/2/) */}
      ReactPlayer
      <ReactPlayer
        ref={inputEl}
        url={hlsURL[3]}
        playing={playing}
        onBuffer={() => {
          console.log("onBuffer<- print only when sometimes autplay works");
        }}
        controls={true}
        width="100%"
        height="100%"
        className="player"
        config={{
          file: {
            // attributes: {
            //   preload: 'none',
            //   //forceHLS: true,
            // },
            // hlsOptions: {
            //   autoStartLoad: true, /// seems not take effect
            //   // startLevel: 3
            // },
          },
        }}
        onReady={() => {
          // https://hls-js.netlify.app/api-docs/
          // https://stackoverflow.com/questions/55060676/using-video-js-is-it-possible-to-get-current-hls-timestamp ????
          // https://github.com/CookPete/react-player/issues/757
          // https://github.com/CookPete/react-player/issues/393
          // https://github.com/video-dev/hls.js/blob/cb8e12206ec95e366ebc4d1b1e8423ac3c22e86a/src/events.js

          const hlsInstance = inputEl.current.player.getInternalPlayer("hls");
          console.log("ready:", hlsInstance);
          // not callbacked
          hlsInstance.on(window.Hls.Events.MANIFEST_PARSED, function () {
            console.log("event MANIFEST_PARSED");
            // hlsInstance.play();
          });
          // callbacked
          hlsInstance.on(window.Hls.Events.FRAG_LOADED, function () {
            console.log("event FRAG_LOADED");
            // TODO: figure it out how to use native hls.js to play and pause
          });
          // not callbacked
          hlsInstance.on("hlsManifestParsed", function (event, data) {
            console.log("event hlsManifestParsed e");
          });

          // setPlaying(true); // take effect sometimes
        }}
        muted={true}
        onPause={() => console.log("onPause")}
        onProgress={handleProgress}
        onStart={() => console.log("onStart")}
        onDuration={handleDuration}
        onPlay={() => console.log("onPlay")}
      />
      ReactPlayer bottom
      {/* <div className="overlay"> */}
      {/* This will overlay the player */}
      {/* <canvas
        id="myCanvas"
        width="100%"
        height="100%"
        className="overlay"
      ></canvas> */}
      {/* </div> */}
    </div>
  );
}

export default App;
