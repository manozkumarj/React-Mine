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
          <div className="dp-div primary-dp">
            <span>change</span>
            <img src={zuck} alt="User name" width="120px" />
          </div>
          <div className="dp-div secondary-dp">
            <span>change</span>
            <img src={mark} alt="User name" width="120px" />
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
              <Link to="/register">Timeline</Link>
            </li>
            <li>
              <Link to="/login">Photos</Link>
            </li>
            <li>
              <Link to="/">Friends</Link>
            </li>
            <li>
              <Link to="/profile">View Profile</Link>
            </li>
            <li>
              <Link to="/">Settings</Link>
            </li>
            <li>
              <Link to="/">About</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileLeftSideSection;
