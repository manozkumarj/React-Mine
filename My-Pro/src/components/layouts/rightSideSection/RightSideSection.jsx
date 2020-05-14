import React, { useState } from "react";
import "./rightSideSection.css";
import { Link } from "react-router-dom";
import zuck from "../../../images/zuck.jpg";
import mark from "../../../images/mark.jpg";
import kohli from "../../../images/kohli.jpg";

const RightSideSection = () => {
  const [showAdBanner, setShowAdBanner] = useState(true);
  const [showFriendSuggessions, setShowFriendSuggessions] = useState(true);

  // useEffect(() => {
  //   setInterval(() => {
  //     console.log("Logging from setInterval func every minute...");
  //   }, 10000);
  //   // eslint-disable-next-line
  // }, []);

  let showable = showAdBanner ? (
    <div className="ad-banner-container">
      <div className="ad-banner">
        <span className="itemm">Contact Us @</span>
        <span className="itemm contact-email">felebsweb@gmail.com</span>
        <span className="itemm">for ads</span>
      </div>
    </div>
  ) : showFriendSuggessions ? (
    <div className="friend-suggessions-container">
      <div className="friend-suggessions-title">Friend Suggessions</div>

      {/* List of friend suggessions - starts */}
      <div className="friend-suggession">
        <div className="friend-suggession-dps-container">
          <img
            src={zuck}
            alt="User name"
            className="friend-suggession-dps friend-suggession-primary-dp"
          />
          <img
            src={mark}
            alt="User name"
            className="friend-suggession-dps friend-suggession-secondary-dp"
          />
        </div>
        <div className="friend-suggession-user-details-div">
          <div className="friend-suggession-user-name">
            <Link to="/" className="global-aTag-style">
              Manoj Kumar
            </Link>
          </div>
          <div className="friend-suggession-button">
            <button className="suggession-request-friendshp-btn">
              Request Friendship
            </button>
          </div>
        </div>
      </div>
      <div className="friend-suggession">
        <div className="friend-suggession-dps-container">
          <img
            src={kohli}
            alt="User name"
            className="friend-suggession-dps friend-suggession-primary-dp"
          />
          <img
            src={mark}
            alt="User name"
            className="friend-suggession-dps friend-suggession-secondary-dp"
          />
        </div>
        <div className="friend-suggession-user-details-div">
          <div className="friend-suggession-user-name">
            <Link to="/" className="global-aTag-style">
              Manoj Kumar
            </Link>
          </div>
          <div className="friend-suggession-button">
            <button className="suggession-request-friendshp-btn">
              Request Friendship
            </button>
          </div>
        </div>
      </div>
      <div className="friend-suggession">
        <div className="friend-suggession-dps-container">
          <img
            src={zuck}
            alt="User name"
            className="friend-suggession-dps friend-suggession-primary-dp"
          />
          <img
            src={kohli}
            alt="User name"
            className="friend-suggession-dps friend-suggession-secondary-dp"
          />
        </div>
        <div className="friend-suggession-user-details-div">
          <div className="friend-suggession-user-name">
            <Link to="/" className="global-aTag-style">
              Manoj Kumar
            </Link>
          </div>
          <div className="friend-suggession-button">
            <button className="suggession-request-friendshp-btn">
              Request Friendship
            </button>
          </div>
        </div>
      </div>
      <div className="friend-suggession">
        <div className="friend-suggession-dps-container">
          <img
            src={mark}
            alt="User name"
            className="friend-suggession-dps friend-suggession-primary-dp"
          />
          <img
            src={zuck}
            alt="User name"
            className="friend-suggession-dps friend-suggession-secondary-dp"
          />
        </div>
        <div className="friend-suggession-user-details-div">
          <div className="friend-suggession-user-name">
            <Link to="/" className="global-aTag-style">
              Manoj Kumar
            </Link>
          </div>
          <div className="friend-suggession-button">
            <button className="suggession-request-friendshp-btn">
              Request Friendship
            </button>
          </div>
        </div>
      </div>
      <div className="friend-suggession">
        <div className="friend-suggession-dps-container">
          <img
            src={zuck}
            alt="User name"
            className="friend-suggession-dps friend-suggession-primary-dp"
          />
          <img
            src={mark}
            alt="User name"
            className="friend-suggession-dps friend-suggession-secondary-dp"
          />
        </div>
        <div className="friend-suggession-user-details-div">
          <div className="friend-suggession-user-name">
            <Link to="/" className="global-aTag-style">
              Manoj Kumar
            </Link>
          </div>
          <div className="friend-suggession-button">
            <button className="suggession-request-friendshp-btn">
              Request Friendship
            </button>
          </div>
        </div>
      </div>
      {/* List of friend suggessions - ends */}
    </div>
  ) : null;

  return (
    <div className="fixed-div" id="right-fixed-div">
      {showable}
      <div id="site-footer-container">
        All rights reserved - &copy; 2020
        <button className="openLayerOneModal">Click me</button>
      </div>
    </div>
  );
};

export default RightSideSection;
