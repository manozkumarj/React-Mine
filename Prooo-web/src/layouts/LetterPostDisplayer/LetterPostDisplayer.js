import React, { Fragment } from "react";
import "./letterPostDisplayer.css";

import letterIcon from "./../../icons/letterIcon.png";

const LetterPostDisplayer = (props) => {
  const { postData, postId } = props;

  const handleOpenLetter = () => {
    props.openLetter(postId, postData[0].letterContent);
  };
  return (
    <Fragment>
      {postData[0].postContent && (
        <div className="post-description-container">
          <div className="post-description">{postData[0].postContent}</div>
        </div>
      )}

      <div className="greet-section-container">
        <div className="greet-section-item greet-icon-container">
          <img
            src={letterIcon}
            alt="greet avatar"
            className="greetIcon pointer"
            onClick={handleOpenLetter}
          />
          <span className="open-letter-text" onClick={handleOpenLetter}>
            Click to open Letter
          </span>
        </div>
        {/* <div className="greet-section-item greet-views-count-section">
          <div className="greet-view-text">Views</div>
          <hr className="greet-hr" />
          <span className="greet-count pointer">xxx</span>
        </div> */}
      </div>
    </Fragment>
  );
};

export default LetterPostDisplayer;
