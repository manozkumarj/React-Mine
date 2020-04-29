import React from "react";
import "./settings.css";
import RightSideSection from "./../../layouts/rightSideSection/RightSideSection";
import ProfileLeftSideSection from "./../../layouts/profileLeftSideSection/ProfileLeftSideSection";
import wow2 from "../../../images/wow_2.jpg";

export default function Settings() {
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

          <div className="settings-container">
            <div className="settings-container-header">Settings</div>
            <div className="settings">
              <div className="individual-setting-div">
                <div className="settings-heading">Full Name</div>
                <div className="settings-edit">
                  <input type="text" value="Manoj Kumar" />
                </div>
              </div>
              <div className="individual-setting-div">
                <div className="settings-heading">Username</div>
                <div className="settings-edit">
                  <input type="text" value="manoz" />
                </div>
              </div>
              <div className="individual-setting-div">
                <div className="settings-heading">Gender</div>
                <div className="settings-edit">
                  <select className="settings-edit">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Only Other</option>
                  </select>
                </div>
              </div>
              <div className="individual-setting-div">
                <button className="request-friendshp-btn">Save Changes</button>
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
