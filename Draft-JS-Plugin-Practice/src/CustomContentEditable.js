import React, { useState } from "react";
import "./customContentEditable.css";

import avatar from "./images/avatar.png";
import zuck from "./images/zuck.jpg";
import kohli from "./images/kohli.jpg";

export default function CustomContentEditable() {
  const [mentionsPlainText, setMentionsPlainText] = useState("");
  const [mentionsHTMLContent, setMentionsHTMLContent] = useState("");
  const [isItSpace, setIsItSpace] = useState(false);
  const [showMentionsContainer, setShowMentionsContainer] = useState(false);
  const [showTagsContainer, setShowTagsContainer] = useState(false);
  const [showEmojisContainer, setShowEmojisContainer] = useState(false);
  const [geneateMentionableUser, setGeneateMentionableUser] = useState(null);

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
  const [filteredMentionableUsers, setFilteredMentionableUsers] = useState(
    mentionableUsers
  );

  const contentEditableDiv = document.getElementById("editable-div");

  var mentionsListIndex = 0;
  var mentionsListHighlightItem = 1;
  var searchFor = "";
  var mentionsUsersList = document.getElementsByClassName(
    "individual-mention-container"
  );

  // contentEditableDiv.addEventListener(
  //   "mousedown mouseup keydown keyup",
  //   getCaretPosition
  // );

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

    if (e.keyCode === 50) {
      // console.log("It's SPACE then @");
      setShowMentionsContainer(true);
      setShowTagsContainer(false);
      setShowEmojisContainer(false);

      searchFor = "";
      // mentionsUsersList[0].classList.add("active");

      document.addEventListener("keydown", handleHighlightList);
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

  const handleOnMouseDown = async (index) => {
    let modifiedFilteredList = await filterMentionableUsersList(searchFor);
    console.log("index -> " + index);
    getWordPrecedingCaret();
    handleIndividualMention(null, modifiedFilteredList, index);
    setShowMentionsContainer(false);
    setShowTagsContainer(false);
    setShowEmojisContainer(false);
    document.removeEventListener("keydown", handleHighlightList);
    // searchFor = "";
    setFilteredMentionableUsers(mentionableUsers);
    console.log("Ended");
  };

  const handleHighlightList = async (e) => {
    if (
      e.which === 13 ||
      e.which === 16 ||
      e.which === 17 ||
      e.which === 18 ||
      e.which === 37 ||
      e.which === 38 ||
      e.which === 39 ||
      e.which === 40 ||
      e.which === undefined
    ) {
      e.stopPropagation();
      e.preventDefault();
      e.returnValue = false;
      e.cancelBubble = true;
    } else {
      // if (!showMentionsContainer && e.which === 8) {
      //   e.stopPropagation();
      //   e.preventDefault();
      //   e.returnValue = false;
      //   e.cancelBubble = true;
      // }
      if (e.which !== 8) searchFor = searchFor + e.key;
      else if (e.which === 8) searchFor = searchFor.slice(0, -1);
      mentionsListIndex = 0;
      mentionsListHighlightItem = 1;
    }

    console.log("e -> " + e.key);
    // console.log(e);
    console.log("searchFor -> " + searchFor);
    let modifiedFilteredList = await filterMentionableUsersList(searchFor);

    if (e.key === undefined) {
      contentEditableDiv.focus();
    }

    // console.log(
    //   "handleHighlightList is triggered - " +
    //     mentionsListIndex +
    //     " - " +
    //     e.which
    // );

    [].forEach.call(mentionsUsersList, function (el) {
      el.classList.remove("active");
    });

    if (e.which === 38) {
      if (mentionsListHighlightItem === 1) {
        mentionsListIndex = mentionsUsersList.length - 1;
        mentionsListHighlightItem = mentionsUsersList.length;
        mentionsUsersList[mentionsListIndex].classList.add("active");
      } else {
        mentionsUsersList[--mentionsListIndex].classList.add("active");
        --mentionsListHighlightItem;
      }
    } else if (e.which === 40) {
      if (mentionsListHighlightItem === mentionsUsersList.length) {
        mentionsListIndex = 0;
        mentionsListHighlightItem = 1;
        mentionsUsersList[mentionsListIndex].classList.add("active");
      } else {
        mentionsUsersList[++mentionsListIndex].classList.add("active");
        ++mentionsListHighlightItem;
      }
    } else if (e.which === 13 || e.which === undefined) {
      getWordPrecedingCaret();
      handleIndividualMention(null, modifiedFilteredList);
      setShowMentionsContainer(false);
      setShowTagsContainer(false);
      setShowEmojisContainer(false);
      document.removeEventListener("keydown", handleHighlightList);
      searchFor = "";
      setFilteredMentionableUsers(mentionableUsers);
      console.log("Ended");
    }

    if (showMentionsContainer) {
      mentionsUsersList[0].classList.add("active");
    }

    return false;
  };

  const handleIndividualMention = async (e, listt, selectableIndex = null) => {
    // console.log("handleIndividualMention clicked");
    // console.log(mentionableUsers[mentionsListIndex]);

    if (!listt) {
      listt = filteredMentionableUsers;
    }

    console.log(listt);

    let contentEditableDiv_clone = document.getElementById("editable-div");

    let indexoff = selectableIndex ? selectableIndex : mentionsListIndex;

    let getMentionableUserDetails = listt[indexoff];

    let doGeneateMentionableUser = (
      <span>
        <span data-key="1">{getMentionableUserDetails.username}</span>
      </span>
    );
    // contentEditableDiv_clone.append(doGeneateMentionableUser);
    let waitUntillPaster = await pasteHtmlAtCaret(
      `<span data-key="1" contenteditable=false class="mentioned-user-container"><span className="mentionSymbol">@</span><img src=${getMentionableUserDetails.photo} class="mentioned-user-photo primary-user" /><img src=${getMentionableUserDetails.photo} class="mentioned-user-photo secondary-user" /><span className="mentioned-user-username">${getMentionableUserDetails.username} </span></span> `
    );

    // var range = document.createRange();
    // var sel = window.getSelection();

    // range.setStart(contentEditableDiv_clone.childNodes[2], 0);
    // range.collapse(true);
    // sel.removeAllRanges();
    // sel.addRange(range);
    // contentEditableDiv_clone.focus();
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

        if (/\s/.test(lastWord)) {
          // lastWord = lastWord.toString();
          // console.log(typeof lastWord[6]);
          // console.log(lastWord[6]);
          // console.log(lastWord.lastIndexOf(/\s/));
          // let splitLastWord = lastWord.toString().split(" ");
          // let getLastword = lastWord.split(" ").pop();
          // console.log("getLastword -> " + getLastword);

          // console.log(splitLastWord);
          // lastWord = splitLastWord[1];
          // console.log(lastWord);
          lastWord = "@" + searchFor;
        }

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
    if (searchFor.trim()) {
      searchFor = searchFor.toLocaleLowerCase();
      let filteredMentionableUsersList;
      if (mentionableUsers.length > 0) {
        filteredMentionableUsersList = mentionableUsers.filter(
          (mentionableUser) => {
            return mentionableUser.name.toLocaleLowerCase().includes(searchFor);
          }
        );
        setFilteredMentionableUsers(filteredMentionableUsersList);
      }
      return filteredMentionableUsersList;
    } else {
      return mentionableUsers;
    }
  };

  const handleGetText = () => {
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
        onKeyUp={handleKeyUp}
      ></div>

      <div style={{ display: showMentionsContainer ? "block" : "none" }}>
        Showing Mentions Container
        <div
          className="individual-mentions-container"
          id="individual-mentions-container"
        >
          {filteredMentionableUsers &&
            filteredMentionableUsers.length > 0 &&
            filteredMentionableUsers.map((mentionableUser, index) => (
              <div
                className="individual-mention-container"
                id="individual-mention-container-1"
                onMouseDown={() => handleOnMouseDown(index)}
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
      <div style={{ margin: "50px auto" }}>{mentionsPlainText}</div>
      <div style={{ margin: "50px auto" }}>{mentionsHTMLContent}</div>
    </div>
  );
}
