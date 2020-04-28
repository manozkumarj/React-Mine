import React from "react";
import { Link } from "react-router-dom";
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

        <div className="userFullnameDiv">
          <Link to="/" className="hover-ul">
            Manoj Kumar
          </Link>
        </div>

        <div className="animateLinksDiv">
          <ul className="nav">
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/">View Profile</Link>
            </li>
            <li>
              <Link to="/">Settings</Link>
            </li>
            <li>
              <Link to="/">Advanced Posts</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LeftSideSection;
