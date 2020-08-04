import React, { useState } from "react";
import "./customContentEditable.css";

import avatar from "./images/avatar.png";
import zuck from "./images/zuck.jpg";
import kohli from "./images/kohli.jpg";

export default function CustomContentEditable() {
  const [isItSpace, setIsItSpace] = useState(false);
  const [showMentionsContainer, setShowMentionsContainer] = useState(false);
  const [showTagsContainer, setShowTagsContainer] = useState(false);
  const [showEmojisContainer, setShowEmojisContainer] = useState(false);

  const contentEditableDiv = document.getElementById("editable-div");

  const handleKeyUp = (e) => {
    // console.log("handleKeyUp");
    console.log(` ${e.keyCode}`);

    if (e.keyCode === 32 || e.key === " ") {
      //   console.log("It's space");
      setIsItSpace(true);
      setShowMentionsContainer(false);
      setShowTagsContainer(false);
      setShowEmojisContainer(false);
    } else {
      setIsItSpace(false);
    }

    if (isItSpace && e.keyCode === 50) {
      console.log("It's SPACE then @");
      setShowMentionsContainer(true);
      setShowTagsContainer(false);
      setShowEmojisContainer(false);

      document.getElementById("individual-mentions-container").focus();
    }
    if (isItSpace && e.keyCode === 51) {
      console.log("It's SPACE then #");
      setShowTagsContainer(true);
      setShowMentionsContainer(false);
      setShowEmojisContainer(false);
    }
    if (isItSpace && e.keyCode === 186) {
      console.log("It's SPACE then :");
      setShowTagsContainer(true);
      setShowMentionsContainer(false);
      setShowEmojisContainer(false);
    }
  };

  const handleGetText = () => {
    console.log("Need to show contentEditable text");
    let wholeContent = contentEditableDiv.textContent.trim();
    console.log(wholeContent);
  };

  return (
    <div className="holderrr">
      <div
        className="editable-div"
        id="editable-div"
        spellCheck={false}
        contentEditable={true}
        onKeyUp={handleKeyUp}
      ></div>

      <div style={{ display: showMentionsContainer ? "block" : "none" }}>
        Showing Mentions Container
        <div
          className="individual-mentions-container"
          id="individual-mentions-container"
        >
          <div className="individual-mention-container">
            <img
              src={kohli}
              alt="kohli"
              className="individual-mention-user-img"
            />
            <div className="individual-mention-user-details">Manoj Kumar</div>
          </div>
          <div className="individual-mention-container">
            <img
              src={zuck}
              alt="zuck"
              className="individual-mention-user-img"
            />
            <div className="individual-mention-user-details">Mahesh Kumar</div>
          </div>
        </div>
      </div>
      <div style={{ display: showTagsContainer ? "block" : "none" }}>
        Showing Tags Container
      </div>
      <div style={{ display: showEmojisContainer ? "block" : "none" }}>
        Showing Emojis Container
      </div>

      <button className="button" onClick={handleGetText}>
        Get Text
      </button>
    </div>
  );
}
