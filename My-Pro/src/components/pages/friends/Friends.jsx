import React from "react";
import "./friends.css";
import RightSideSection from "./../../layouts/rightSideSection/RightSideSection";
import ProfileLeftSideSection from "./../../layouts/profileLeftSideSection/ProfileLeftSideSection";
import wow2 from "../../../images/wow_2.jpg";

export default function Friends() {
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
              <div className="individual-setting-div">
                <div className="friends-heading">Full Name</div>
                <div className="friends-edit">
                  <input type="text" value="Manoj Kumar" />
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
