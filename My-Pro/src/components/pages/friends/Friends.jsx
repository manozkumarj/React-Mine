import React, { useEffect } from "react";
import "./friends.css";

import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

const Friends = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="friends-container">
      <div className="friends-container-header">Friends list</div>
      <div className="friends">
        <div className="individual-friend-div">
          <div className="friend-name">
            <Link to="/profile" className="global-aTag-style">
              Manoj Kumar
            </Link>
          </div>
          <div className="friendship-status-div">
            <div
              className="friends-list-individual request-friendshp-btn"
              id="1"
            >
              Friends
              <span> &#8595;</span>
            </div>
            <div className="dropdown-content" id="dropd-1">
              <a href="#home">Home</a>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
            </div>
          </div>
        </div>

        <div className="individual-friend-div">
          <div className="friend-name">
            <Link to="/profile" className="global-aTag-style">
              Mahesh Kumar
            </Link>
          </div>
          <div className="friendship-status-div">
            <div
              className="friends-list-individual request-friendshp-btn"
              id="2"
            >
              Friends <span> &#8595;</span>
            </div>
            <div className="dropdown-content" id="dropd-2">
              <a href="#home">aaa</a>
              <a href="#about">bbb</a>
              <a href="#contact">ccc</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    centralState: state.central,
  };
};

export default withRouter(connect(mapStateToProps, null)(Friends));
