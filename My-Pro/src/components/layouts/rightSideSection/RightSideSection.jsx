import React from "react";
import "./rightSideSection.css";
import { Link } from "react-router-dom";
import zuck from "../../../images/zuck.jpg";
import mark from "../../../images/mark.jpg";
import kohli from "../../../images/kohli.jpg";

const RightSideSection = () => {
  return (
    <div className="fixed-div" id="right-fixed-div">
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
      <button className="openLayerOneModal">Click me</button>
    </div>
  );
};

export default RightSideSection;
