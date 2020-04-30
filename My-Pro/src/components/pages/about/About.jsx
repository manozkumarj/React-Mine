import React, { useEffect } from "react";
import "./about.css";
import RightSideSection from "./../../layouts/rightSideSection/RightSideSection";
import ProfileLeftSideSection from "./../../layouts/profileLeftSideSection/ProfileLeftSideSection";
import wow2 from "../../../images/wow_2.jpg";

export default function About() {
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

          <div className="about-container">
            <div className="about-container-header">About</div>
            <div className="about">
              <div className="individual-setting-div">
                <div className="about-heading">Username</div>
                <div className="about-heading">-</div>
                <div className="about-edit">manoz</div>
              </div>

              <div className="individual-setting-div">
                <div className="about-heading">Full Name</div>
                <div className="about-heading">-</div>
                <div className="about-edit">Manoj Kumar</div>
              </div>

              <div className="individual-setting-div">
                <div className="about-heading">Gender</div>
                <div className="about-heading">-</div>
                <div className="about-edit">Male</div>
              </div>

              <div className="individual-setting-div">
                <div className="about-heading">Joined Date</div>
                <div className="about-heading">-</div>
                <div className="about-edit">25th March 2020</div>
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
