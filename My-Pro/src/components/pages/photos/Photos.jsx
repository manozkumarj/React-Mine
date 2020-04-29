import React from "react";
import "./photos.css";
import RightSideSection from "./../../layouts/rightSideSection/RightSideSection";
import ProfileLeftSideSection from "./../../layouts/profileLeftSideSection/ProfileLeftSideSection";

import zuck from "../../../images/zuck.jpg";
import mark from "../../../images/mark.jpg";
import kohli from "../../../images/kohli.jpg";
import bikee from "../../../images/bikee.jpg";
import wow1 from "../../../images/wow_1.jpg";
import wow2 from "../../../images/wow_2.jpg";

export default function Photos() {
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
          <div className="all-photos-container">
            <div className="individual-pic-div">
              <img src={bikee} alt="individual" className="individual-pic" />
            </div>
            <div className="individual-pic-div">
              <img src={wow1} alt="individual" className="individual-pic" />
            </div>
            <div className="individual-pic-div">
              <img src={wow2} alt="individual" className="individual-pic" />
            </div>
            <div className="individual-pic-div">
              <img src={kohli} alt="individual" className="individual-pic" />
            </div>
            <div className="individual-pic-div">
              <img src={zuck} alt="individual" className="individual-pic" />
            </div>
            <div className="individual-pic-div">
              <img src={mark} alt="individual" className="individual-pic" />
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
