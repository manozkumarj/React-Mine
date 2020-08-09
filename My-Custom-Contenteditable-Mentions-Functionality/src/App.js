import React, { useState, useEffect } from "react";
import "./App.css";

import avatar from "./images/avatar.png";
import zuck from "./images/zuck.jpg";
import kohli from "./images/kohli.jpg";

const App = () => {
  const [mentionsPlainText, setMentionsPlainText] = useState("");
  const [mentionsHTMLContent, setMentionsHTMLContent] = useState("");
  const [showMentionsContainer, setShowMentionsContainer] = useState(false);
  const [showMentionableUsers, setShowMentionableUsers] = useState("");
  const [fiteredMentionableUsers, setFiteredMentionableUsers] = useState([]);
  const [mentionableUsers, setMentionableUsers] = useState([
    {
      _id: 1,
      username: "ManozKumarj",
      name: "Manoj Kumar",
      photo: kohli,
    },
    {
      _id: 2,
      username: "MaheshKumarj",
      name: "Mahesh Kumar",
      photo: zuck,
    },
    {
      _id: 3,
      username: "Rajj",
      name: "Raj Kumar",
      photo: avatar,
    },
    {
      _id: 4,
      username: "Malli",
      name: "Mallesh",
      photo: kohli,
    },
    {
      _id: 5,
      username: "Ravi",
      name: "Ravi Kiran",
      photo: zuck,
    },
    {
      _id: 6,
      username: "Kranthi",
      name: "Kranthi Kiran",
      photo: kohli,
    },
  ]);

  useEffect(() => {
    if (fiteredMentionableUsers && fiteredMentionableUsers.length > 0) {
      let mentionsUsersList = document.getElementsByClassName(
        "individual-mention-container"
      );
      mentionsUsersList[0].classList.add("active");
      console.log("Need active first child");
    }
  }, [fiteredMentionableUsers]);

  var searchableWord = "";
  var aboutToHide = false;
  var mentionsListIndex = 0;
  var mentionsListHighlightItem = 1;

  const mentionsContainerHider = () => {
    setShowMentionsContainer(false);
    searchableWord = "";
    mentionsListIndex = 0;
    mentionsListHighlightItem = 1;
    setFiteredMentionableUsers(mentionableUsers);
    document.removeEventListener("keydown", handleHighlightList);
  };

  const generateMentionableUsers = (getMentionableUsers) => {
    setShowMentionableUsers("");
    let loopId = 0;
    let generatingMentionableUsers =
      getMentionableUsers &&
      getMentionableUsers.length > 0 &&
      getMentionableUsers.map((getMentionableUser, index) => {
        loopId++;
        return (
          <div
            className={
              loopId === 0
                ? "individual-mention-container active"
                : "individual-mention-container"
            }
            id="individual-mention-container-1"
            key={getMentionableUser._id}
            onClick={handleIndividualUserSelection}
          >
            <img
              src={getMentionableUser.photo}
              alt="kohli"
              className="individual-mention-user-img"
            />
            <div className="individual-mention-user-details">
              {getMentionableUser.name}
            </div>
          </div>
        );
      });
    setShowMentionableUsers(generatingMentionableUsers);
    setShowMentionsContainer(true);
  };

  // OnFocus
  const handleFocus = () => {
    console.log("handleFocus");
  };

  // OnFocus
  const handleKeyUp = (e) => {
    // console.log(` ${e.keyCode}`);
    if (!showMentionsContainer && e.keyCode === 50) {
      console.log("@ symbol triggered");
      setFiteredMentionableUsers(mentionableUsers);
      generateMentionableUsers(mentionableUsers);
      document.removeEventListener("keydown", handleHighlightList);
      document.addEventListener("keydown", handleHighlightList);
    }
  };

  const handleHighlightList = async (e) => {
    console.log("e -> " + e.keyCode);
    if (
      e.keyCode === 13 ||
      e.keyCode === 27 ||
      e.keyCode === 37 ||
      e.keyCode === 38 ||
      e.keyCode === 39 ||
      e.keyCode === 40
    ) {
      e.stopPropagation();
      e.preventDefault();
      e.returnValue = false;
      e.cancelBubble = true;
    }

    const isLetter = /^[a-z]$/i.test(e.key);
    const isNumber = /^[0-9]$/i.test(e.key);

    if (isLetter || isNumber) {
      console.log("pressed either number or letter");
      let keyIs = e.key.toString();
      searchableWord = searchableWord + keyIs;
      console.log("searchableWord -> " + searchableWord);
      let modifiedFilteredList = await filterMentionableUsersList(
        searchableWord
      );
    }

    let mentionsUsersList = document.getElementsByClassName(
      "individual-mention-container"
    );

    [].forEach.call(mentionsUsersList, function (el) {
      el.classList.remove("active");
    });

    // If presses backspace
    if (e.which === 8) {
      searchableWord = searchableWord.slice(0, -1);
      searchableWord = searchableWord.trim();
      console.log("searchableWord -> " + searchableWord);
      if (!searchableWord) {
        console.log("searchableWord if");
        aboutToHide = true;
        let modifiedFilteredList = await filterMentionableUsersList(
          searchableWord
        );
        if (aboutToHide) {
          console.log("searchableWord else if");
          mentionsContainerHider();
          aboutToHide = false;
          return false;
        }
        return false;
      }
      let modifiedFilteredList = await filterMentionableUsersList(
        searchableWord
      );
    }

    if (e.which === 27) {
      console.log("pressed ESC");
      handleIndividualUserSelection();
      return false;
    } else if (e.which === 38) {
      console.log("pressed 38");
      if (mentionsListHighlightItem === 1) {
        mentionsListIndex = mentionsUsersList.length - 1;
        mentionsListHighlightItem = mentionsUsersList.length;
        mentionsUsersList[mentionsListIndex].classList.add("active");
      } else {
        mentionsUsersList[--mentionsListIndex].classList.add("active");
        --mentionsListHighlightItem;
      }
      return false;
    } else if (e.which === 40) {
      console.log("pressed 40");
      if (mentionsListHighlightItem === mentionsUsersList.length) {
        mentionsListIndex = 0;
        mentionsListHighlightItem = 1;
        mentionsUsersList[mentionsListIndex].classList.add("active");
      } else {
        mentionsUsersList[++mentionsListIndex].classList.add("active");
        ++mentionsListHighlightItem;
      }
      return false;
    } else if (e.which === 13) {
      console.log("pressed enter");
      handleIndividualUserSelection();
      return false;
    }
  };

  const filterMentionableUsersList = (searchFor) => {
    if (searchFor && searchFor.trim()) {
      console.log("filterMentionableUsersList if & searchFor -> " + searchFor);
      searchFor = searchFor.toLocaleLowerCase();
      let filteredMentionableUsersList;
      if (mentionableUsers.length > 0) {
        filteredMentionableUsersList = mentionableUsers.filter(
          (mentionableUser) => {
            return mentionableUser.name.toLocaleLowerCase().includes(searchFor);
          }
        );
        if (filteredMentionableUsersList.length > 0) {
          setFiteredMentionableUsers(filteredMentionableUsersList);
          generateMentionableUsers(filteredMentionableUsersList);
        } else {
          mentionsContainerHider();
        }
      }
    } else {
      console.log("filterMentionableUsersList else");
      setFiteredMentionableUsers(mentionableUsers);
      generateMentionableUsers(mentionableUsers);
    }
  };

  const handleIndividualUserSelection = () => {
    setShowMentionableUsers("");
    setShowMentionsContainer(false);
    document.removeEventListener("keydown", handleHighlightList);
  };

  const handleGetText = () => {
    let contentEditableDiv = document.getElementById("editable-div");
    console.log("Need to show contentEditable text");
    let wholeContent = contentEditableDiv.textContent.trim();
    let wholeHTMLContent = contentEditableDiv.innerHTML;
    let mentionedHtmlParts = contentEditableDiv.getElementsByClassName(
      "mentioned-user-container"
    );
    let mentionedHtmlPartsLength = mentionedHtmlParts.length;
    console.log(wholeContent);
    setMentionsPlainText(wholeContent);
    // setMentionsHTMLContent(wholeHTMLContent);
    // console.log(mentionedHtmlPartsLength);

    if (mentionedHtmlPartsLength > 0) {
      console.log(mentionedHtmlParts);

      for (let i = 0; i < mentionedHtmlPartsLength; i++) {
        let mentionedHtmlPartInnerHTML = mentionedHtmlParts[i].innerHTML;
        // console.log(mentionedHtmlPartInnerHTML);
        console.log(mentionedHtmlParts[i].textContent);
      }
    }
  };

  return (
    <div className="holderrr">
      <div
        className="editable-div"
        id="editable-div"
        spellCheck={false}
        contentEditable={true}
        onFocus={handleFocus}
        onKeyUp={handleKeyUp}
      ></div>

      {/* Starts */}
      <div
        style={{
          display: showMentionsContainer ? "block" : "none",
        }}
        contentEditable={false}
      >
        <div className="whole-mentions-container" id="whole-mentions-container">
          {showMentionableUsers}
        </div>
      </div>
      {/* Ends */}

      <button
        className="button"
        onClick={handleGetText}
        style={{ marginTop: "20px" }}
      >
        Get Text
      </button>
      <div style={{ margin: "50px auto" }}>{mentionsPlainText}</div>
      <div style={{ margin: "50px auto" }}>{mentionsHTMLContent}</div>
    </div>
  );
};

export default App;
