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

  const contentEditableDiv = document.getElementById("editable-div");

  var mentionsListIndex = 0;
  var mentionsListHighlightItem = 1;
  var mentionsUsersList = document.getElementsByClassName(
    "individual-mention-container"
  );

  // contentEditableDiv.addEventListener(
  //   "mousedown mouseup keydown keyup",
  //   getCaretPosition
  // );

  let getStringFromPosition;
  let getStringToPosition;
  let showMentionableContainer = false;
  const getCaretPosition = (e) => {
    let editableDiv = document.getElementById("editable-div");
    let editableDivTextContent = editableDiv.textContent;
    let currentKeyCode = e.keyCode;
    var caretPos = 0,
      sel,
      range;
    if (window.getSelection) {
      sel = window.getSelection();
      if (sel.rangeCount) {
        range = sel.getRangeAt(0);
        if (range.commonAncestorContainer.parentNode == editableDiv) {
          caretPos = range.endOffset;
        }
      }
    } else if (document.selection && document.selection.createRange) {
      range = document.selection.createRange();
      if (range.parentElement() == editableDiv) {
        var tempEl = document.createElement("span");
        editableDiv.insertBefore(tempEl, editableDiv.firstChild);
        var tempRange = range.duplicate();
        tempRange.moveToElementText(tempEl);
        tempRange.setEndPoint("EndToEnd", range);
        caretPos = tempRange.text.length;
      }
    }
    // console.log("caretPos -> " + caretPos);
    console.log(` ${currentKeyCode}`);
    let getCurrentContent = editableDiv.textContent;

    let cursorAfterElementIndex = caretPos;
    let cursorForeAfterElementIndex = caretPos + 1;
    let cursorBeforeElementIndex = caretPos - 1;
    let cursorForeBeforeElementIndex = caretPos - 2;

    let cursorAfterElement = getCurrentContent[cursorAfterElementIndex];
    let cursorForeAfterElement = getCurrentContent[cursorForeAfterElementIndex];
    let cursorBeforeElement = getCurrentContent[cursorBeforeElementIndex];
    let cursorForeBeforeElement =
      getCurrentContent[cursorForeBeforeElementIndex];

    // console.log("cursorBeforeElementIndex -> " + cursorBeforeElementIndex);

    // if (currentKeyCode !== 16) {
    //   console.log(
    //     "cursorForeBeforeElement -> " +
    //       getCurrentContent[cursorForeBeforeElementIndex]
    //   );
    //   console.log(
    //     "cursorBeforeElement -> " + getCurrentContent[cursorBeforeElementIndex]
    //   );
    //   console.log(
    //     "cursorAfterElement -> " + getCurrentContent[cursorAfterElementIndex]
    //   );
    //   console.log(
    //     "cursorForeAfterElement -> " +
    //       getCurrentContent[cursorForeAfterElementIndex]
    //   );
    // }

    if (
      (cursorForeBeforeElement === " " ||
        cursorForeBeforeElement === undefined) &&
      cursorBeforeElement === "@" &&
      (cursorAfterElement === " " || cursorAfterElement === undefined)
    ) {
      console.log("need to show Friends suggessions container");
      getStringFromPosition = cursorBeforeElementIndex;
      getStringToPosition = cursorAfterElementIndex;
      showMentionableContainer = true;
    }

    if (showMentionableContainer && currentKeyCode != 32) {
      getStringToPosition = cursorAfterElementIndex;
      // console.log("---");
    } else {
      showMentionableContainer = false;
      getStringFromPosition = null;
      getStringToPosition = null;
      // console.log("**");
    }

    // console.log(
    //   "showMentionableContainer -> " +
    //     showMentionableContainer +
    //     " && getStringFromPosition -> " +
    //     getStringFromPosition +
    //     " && getStringToPosition -> " +
    //     getStringToPosition
    // );

    if (showMentionableContainer) {
      let searchedFor = editableDivTextContent.slice(
        getStringFromPosition + 1,
        getStringToPosition
      );
      console.log("searchedFor --> " + searchedFor);
    }

    return caretPos;
  };

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

      mentionsUsersList[0].classList.add("active");

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

  const handleIndividualMention = async () => {
    console.log("handleIndividualMention clicked");
    console.log(mentionableUsers[mentionsListIndex]);

    let getMentionableUserDetails = mentionableUsers[mentionsListIndex];

    let doGeneateMentionableUser = (
      <span>
        <span data-key="1">{getMentionableUserDetails.username}</span>
      </span>
    );
    // contentEditableDiv.append(doGeneateMentionableUser);
    let waitUntillPaster = await pasteHtmlAtCaret(
      `<span data-key="1" contenteditable=false class="mentioned-user-container"><span className="mentionSymbol">@</span><img src=${getMentionableUserDetails.photo} class="mentioned-user-photo primary-user" /><img src=${getMentionableUserDetails.photo} class="mentioned-user-photo secondary-user" /><span className="mentioned-user-username">${getMentionableUserDetails.username}</span></span>`
    );

    var range = document.createRange();
    var sel = window.getSelection();

    // range.setStart(
    //   contentEditableDiv.childNodes[contentEditableDiv.childNodes.length - 1],
    //   0
    // );
    // range.collapse(true);
    // sel.removeAllRanges();
    // sel.addRange(range);
    // contentEditableDiv.focus();
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

  return (
    <div className="holderrr">
      <div
        className="editable-div"
        id="editable-div"
        spellCheck={false}
        contentEditable={true}
        onKeyUp={getCaretPosition}
        onMouseUp={getCaretPosition}
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
      <div style={{ margin: "50px auto" }}>{mentionsPlainText}</div>
      <div style={{ margin: "50px auto" }}>{mentionsHTMLContent}</div>
    </div>
  );
}
