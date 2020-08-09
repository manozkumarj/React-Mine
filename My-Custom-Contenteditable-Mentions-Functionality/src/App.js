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
  const [filteredMentionableUsers, setFilteredMentionableUsers] = useState([]);
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
    if (filteredMentionableUsers && filteredMentionableUsers.length > 0) {
      let mentionsUsersList = document.getElementsByClassName(
        "individual-mention-container"
      );
      mentionsUsersList[0].classList.add("active");
      console.log("Need active first child");
    }
  }, [filteredMentionableUsers]);

  var searchableWord = "";
  var aboutToHide = false;
  var mentionsListIndex = 0;
  var mentionsListHighlightItem = 1;
  var localFilteredMentionableUsers = [...mentionableUsers];

  const mentionsContainerHider = () => {
    setShowMentionsContainer(false);
    searchableWord = "";
    mentionsListIndex = 0;
    mentionsListHighlightItem = 1;
    setFilteredMentionableUsers(mentionableUsers);
    localFilteredMentionableUsers = [...mentionableUsers];
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
            // onClick={handleIndividualUserSelection}
            onMouseDown={() => handleOnMouseDown(index)}
            onMouseOver={handleMouseHover}
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

  const handleMouseHover = () => {
    console.log("handleMouseHover triggered");
    let mentionsUsersList = document.getElementsByClassName(
      "individual-mention-container"
    );

    [].forEach.call(mentionsUsersList, function (el) {
      el.classList.remove("active");
    });
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
      setFilteredMentionableUsers(mentionableUsers);
      localFilteredMentionableUsers = [...mentionableUsers];
      generateMentionableUsers(mentionableUsers);
      document.removeEventListener("keydown", handleHighlightList);
      document.addEventListener("keydown", handleHighlightList);
    }
  };

  const handleOnMouseDown = (getIndex) => {
    console.log(getIndex);
    getWordPrecedingCaret();
    handleIndividualMention(null, null, getIndex);
    mentionsContainerHider();

    let contentEditableDiv_clone = document.getElementById("editable-div");

    let range = document.createRange();
    let sel = window.getSelection();

    range.setStart(
      contentEditableDiv_clone.childNodes[
        contentEditableDiv_clone.childNodes.length - 1
      ],
      0
    );
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
    contentEditableDiv_clone.focus();
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

    let listOfFilteredUsers = [...filteredMentionableUsers];

    if (isLetter || isNumber) {
      console.log("pressed either number or letter");
      let keyIs = e.key.toString();
      searchableWord = searchableWord + keyIs;
      console.log("searchableWord -> " + searchableWord);
      await filterMentionableUsersList(searchableWord);
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
      searchableWord = searchableWord;
      console.log("searchableWord -> " + searchableWord);
      let modifiedFilteredList = filterMentionableUsersList(searchableWord);
      if (!searchableWord && !aboutToHide) {
        console.log("searchableWord if");
        console.log(
          "searchableWord -> " +
            searchableWord +
            " && aboutToHide -> " +
            aboutToHide
        );
        aboutToHide = true;
      } else if (!searchableWord && aboutToHide) {
        console.log("searchableWord else if");
        console.log(
          "searchableWord -> " +
            searchableWord +
            " && aboutToHide -> " +
            aboutToHide
        );
        mentionsContainerHider();
        aboutToHide = null;
      }
      return false;
    }
    aboutToHide = false;

    if (e.which === 27) {
      console.log("pressed ESC");
      mentionsContainerHider();
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
    } else if (e.which === 13) {
      console.log("pressed enter");
      getWordPrecedingCaret();
      handleIndividualMention(null, listOfFilteredUsers);
      mentionsContainerHider();
    }
  };

  const getWordPrecedingCaret = () => {
    let containerEl = document.getElementById("editable-div");

    var preceding = "",
      sel,
      range,
      precedingRange;
    if (window.getSelection) {
      sel = window.getSelection();
      if (sel.rangeCount > 0) {
        range = sel.getRangeAt(0).cloneRange();
        range.collapse(true);
        range.setStart(containerEl, 0);
        preceding = range.toString();
      }
    } else if ((sel = document.selection) && sel.type != "Control") {
      range = sel.createRange();
      precedingRange = range.duplicate();
      precedingRange.moveToElementText(containerEl);
      precedingRange.setEndPoint("EndToStart", range);
      preceding = precedingRange.text;
    }

    console.log(range);

    var words = range.toString().trim().split(" "),
      lastWord = words[words.length - 1];

    console.log(words);

    if (lastWord) {
      var resultValue = " "; // this value is coming from some other function
      if (resultValue == lastWord) {
        console.log("do nothing: " + lastWord);
        // do nothing
      } else {
        console.log("replace word --> " + lastWord);

        /* Find word start and end */
        var wordStart = range.endContainer.data.lastIndexOf(lastWord);
        var wordEnd = wordStart + lastWord.length;
        console.log("pos: (" + wordStart + ", " + wordEnd + ")");

        range.setStart(range.endContainer, wordStart);
        range.setEnd(range.endContainer, wordEnd);
        range.deleteContents();
        range.insertNode(document.createTextNode(resultValue));
        // delete That specific word and replace if with resultValue

        /* Merge multiple text nodes */

        containerEl.normalize();
      }
      return lastWord;
    }
  };

  const handleIndividualMention = async (
    e,
    listOfFilteredUsers,
    selectableIndex = null
  ) => {
    console.log(filteredMentionableUsers);

    let indexoff = selectableIndex ? selectableIndex : mentionsListIndex;

    let getMentionableUserDetails = localFilteredMentionableUsers[indexoff];

    let doGeneateMentionableUser = (
      <span>
        <span data-key="1">{getMentionableUserDetails.username}</span>
      </span>
    );
    // contentEditableDiv_clone.append(doGeneateMentionableUser);
    let waitUntillPaster = await pasteHtmlAtCaret(
      `<span data-key="1" contenteditable=false class="mentioned-user-container"><span className="mentionSymbol">@</span><img src=${getMentionableUserDetails.photo} class="mentioned-user-photo primary-user" /><img src=${getMentionableUserDetails.photo} class="mentioned-user-photo secondary-user" /><span className="mentioned-user-username">${getMentionableUserDetails.username} </span></span> `
    );
  };

  const pasteHtmlAtCaret = (html, selectPastedContent = false) => {
    var sel, range;
    if (window.getSelection) {
      // IE9 and non-IE
      sel = window.getSelection();
      if (sel.getRangeAt && sel.rangeCount) {
        range = sel.getRangeAt(0);
        range.deleteContents();

        // Range.createContextualFragment() would be useful here but is
        // only relatively recently standardized and is not supported in
        // some browsers (IE9, for one)
        var el = document.createElement("div");
        el.innerHTML = html;
        var frag = document.createDocumentFragment(),
          node,
          lastNode;
        while ((node = el.firstChild)) {
          lastNode = frag.appendChild(node);
        }
        var firstNode = frag.firstChild;
        range.insertNode(frag);

        // Preserve the selection
        if (lastNode) {
          range = range.cloneRange();
          range.setStartAfter(lastNode);
          if (selectPastedContent) {
            range.setStartBefore(firstNode);
          } else {
            range.collapse(true);
          }
          sel.removeAllRanges();
          sel.addRange(range);
        }
      }
    } else if ((sel = document.selection) && sel.type != "Control") {
      // IE < 9
      var originalRange = sel.createRange();
      originalRange.collapse(true);
      sel.createRange().pasteHTML(html);
      if (selectPastedContent) {
        range = sel.createRange();
        range.setEndPoint("StartToStart", originalRange);
        range.select();
      }
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
          setFilteredMentionableUsers(filteredMentionableUsersList);
          localFilteredMentionableUsers = [...filteredMentionableUsersList];
          generateMentionableUsers(filteredMentionableUsersList);
        } else {
          mentionsContainerHider();
        }
      }
    } else {
      console.log("filterMentionableUsersList else");
      setFilteredMentionableUsers(mentionableUsers);
      localFilteredMentionableUsers = [...mentionableUsers];
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
