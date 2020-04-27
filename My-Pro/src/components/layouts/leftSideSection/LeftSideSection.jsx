import React from "react";
import "./leftSideSection.css";
import zuck from "../../../images/zuck.jpg";
import mark from "../../../images/mark.jpg";

const LeftSideSection = () => {
  return (
    <div className="fixed-div" id="left-fixed-div">
      <div className="profileSection">
        <div className="profileDpsSection">
          <img
            src={zuck}
            alt="User name"
            className="primary-dp"
            width="120px"
          />
          <img
            src={mark}
            alt="User name"
            className="secondary-dp"
            width="120px"
          />
        </div>

        <div class="userFullnameDiv">
          <a href="#" className="hover-ul">
            Manoj Kumar
          </a>
        </div>

        <div class="animateLinksDiv">
          <ul class="nav">
            <li>
              <a href="#">View Profile</a>
            </li>
            <li>
              <a href="#">Settings</a>
            </li>
            <li>
              <a href="#">Advanced Posts</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LeftSideSection;
