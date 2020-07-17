import React from "react";
import logo from "./logo.svg";
import "./App.css";
import ReactPlayer from "react-player";
import FacebookReactions from "./Facebook-Reactions.mkv";

function App() {
  return (
    <div className="App">
      <ReactPlayer playing={true} controls={true} url={FacebookReactions} />
    </div>
  );
}

export default App;
