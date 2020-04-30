import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./friends.css";
import RightSideSection from "./../../layouts/rightSideSection/RightSideSection";
import ProfileLeftSideSection from "./../../layouts/profileLeftSideSection/ProfileLeftSideSection";
import wow2 from "../../../images/wow_2.jpg";

export default function Friends() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="three-divs-container" id="main">
      <div className="left-and-middle-divs-container">
        <div className="left-section">
          <ProfileLeftSideSection />
        </div>

        <div className="middle-section">
          <div className="timeline-pic-div">
            <img src={wow2} alt="timeline view" />
            <span className="absolute-bottom-right">Change image</span>
          </div>
          <div className="left-right-holders">
            <div className="total-friends-count">Friends - 15</div>
            <div className="interact-with-current-user">
              <button className="request-friendshp-btn">
                Request Friendship
              </button>
            </div>
          </div>

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
                  <div class="dropdown-content" id="dropd-1">
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
                  <div class="dropdown-content" id="dropd-2">
                    <a href="#home">aaa</a>
                    <a href="#about">bbb</a>
                    <a href="#contact">ccc</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="right-section">
        <RightSideSection />
      </div>
    </div>
  );
}
