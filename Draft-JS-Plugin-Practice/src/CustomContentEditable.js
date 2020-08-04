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

  const [mentionableUsers, setMentionableUsers] = useState([
    {
      _id: 1,
      name: "Manoj Kumar",
      photo: kohli,
    },
    {
      _id: 2,
      name: "Mahesh Kumar",
      photo: zuck,
    },
    {
      _id: 3,
      name: "Raj Kumar",
      photo: avatar,
    },
    {
      _id: 4,
      name: "Mallesh",
      photo: kohli,
    },
    {
      _id: 5,
      name: "Ravi Kiran",
      photo: zuck,
    },
  ]);

  const contentEditableDiv = document.getElementById("editable-div");

  var mentionsListIndex = 0;
  var mentionsListHighlightItem = 1;
  var firstList = document.getElementsByClassName(
    "individual-mention-container"
  );

  const handleKeyUp = (e) => {
    // console.log("handleKeyUp");
    // console.log(` ${e.keyCode}`);

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

      firstList[0].classList.add("active");

      document.addEventListener("keydown", handleHightlightList);
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

  const handleHightlightList = (e) => {
    e.stopPropagation();
    e.preventDefault();
    e.returnValue = false;
    e.cancelBubble = true;
    console.log(
      "handleHightlightList is triggered - " +
        mentionsListIndex +
        " - " +
        e.which
    );

    [].forEach.call(firstList, function (el) {
      el.classList.remove("active");
    });

    if (e.which === 38) {
      if (mentionsListHighlightItem === 1) {
        mentionsListIndex = firstList.length - 1;
        mentionsListHighlightItem = firstList.length;
      }
      firstList[--mentionsListIndex].classList.add("active");
      --mentionsListHighlightItem;
    } else if (e.which === 40) {
      if (mentionsListHighlightItem === firstList.length) {
        mentionsListIndex = 0;
        mentionsListHighlightItem = 1;
      }
      firstList[++mentionsListIndex].classList.add("active");
      ++mentionsListHighlightItem;
    } else if (e.which === 13) {
      handleIndividualMention();
      setShowMentionsContainer(false);
      setShowTagsContainer(false);
      setShowEmojisContainer(false);
      document.removeEventListener("keydown", handleHightlightList);
    }

    return false;
  };

  const handleGetText = () => {
    console.log("Need to show contentEditable text");
    let wholeContent = contentEditableDiv.textContent.trim();
    console.log(wholeContent);
  };

  const handleIndividualMention = () => {
    console.log("handleIndividualMention clicked");
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
          {mentionableUsers &&
            mentionableUsers.length > 0 &&
            mentionableUsers.map((mentionableUser) => (
              <div
                className="individual-mention-container"
                id="individual-mention-container-1"
                onClick={handleIndividualMention}
                onKeyUp={handleIndividualMention}
                key={mentionableUser._id}
              >
                <img
                  src={mentionableUser.photo}
                  alt="kohli"
                  className="individual-mention-user-img"
                />
                <div className="individual-mention-user-details">
                  {mentionableUser.name}
                </div>
              </div>
            ))}
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
