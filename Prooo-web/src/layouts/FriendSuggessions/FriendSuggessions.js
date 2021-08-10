import React, { Fragment } from "react";
import "./friendSuggessions.css";
import { Link } from "react-router-dom";

const FriendSuggessions = () => {
  return (
    <Fragment>
      <div className="friends-suggessions-container">
        <div className="friends-suggessions-title-container">
          <div className="friends-suggessions-title">Friend suggessions</div>
          <Link
            to="/"
            className="friends-suggessions-seeAll highlight-a-tag-on-hover"
          >
            See All
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default FriendSuggessions;
