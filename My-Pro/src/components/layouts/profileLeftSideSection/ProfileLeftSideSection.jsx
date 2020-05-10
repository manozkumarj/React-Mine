import React from "react";
import { Link } from "react-router-dom";
import "./profileLeftSideSection.css";
import zuck from "../../../images/zuck.jpg";
import mark from "../../../images/mark.jpg";

const ProfileLeftSideSection = () => {
  return (
    <div className="fixed-div" id="left-fixed-div">
      <div className="profileSection">
        <div className="profileDpsSection">
          <div
            className="dp-div primary-dp"
            id="change-dp"
            data-type="Primary"
            data-file-type="dp"
          >
            <span>change</span>
            <img id="primary-dp-src" src={zuck} alt="User name" width="120px" />
          </div>
          <div
            className="dp-div secondary-dp"
            id="change-dp"
            data-type="Secondary"
            data-file-type="dp"
          >
            <span>change</span>
            <img
              id="secondary-dp-src"
              src={mark}
              alt="User name"
              width="120px"
            />
          </div>
        </div>

        <div className="userFullnameDiv">
          <Link to="/profile" className="hover-ul">
            Manoj Kumar
          </Link>
        </div>

        <div className="animateLinksDiv">
          <ul className="profileRelatedLinks">
            <li>
              <Link to="/profile">Timeline</Link>
            </li>
            <li>
              <Link to="/photos">Photos</Link>
            </li>
            <li>
              <Link to="/friends">Friends</Link>
            </li>
            <li>
              <Link to="/profile">View Profile</Link>
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/post-types">Advanced Posts</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileLeftSideSection;
