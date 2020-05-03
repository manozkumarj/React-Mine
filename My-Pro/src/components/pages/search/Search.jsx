import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./search.css";
import RightSideSection from "./../../layouts/rightSideSection/RightSideSection";
import LeftSideSection from "./../../layouts/leftSideSection/LeftSideSection";

export default function Search() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="three-divs-container" id="main">
      <div className="left-and-middle-divs-container">
        <div className="left-section">
          <LeftSideSection />
        </div>

        <div className="middle-section">
          <div className="friends-container">
            <div className="friends-container-header">Search Results</div>
            <div className="friends">
              <div className="individual-friend-div" id="individual-friend-div">
                <div className="friend-name">
                  <Link to="/profile" className="global-aTag-style">
                    Manoj Kumar
                  </Link>
                </div>
                <div className="friendship-status-div">
                  <div
                    className="friends-list-individual request-friendshp-btn"
                    id="1"
                  >
                    Friends
                  </div>
                </div>
              </div>

              <div className="individual-friend-div">
                <div className="friend-name">
                  <Link to="/profile" className="global-aTag-style">
                    Mahesh Kumar
                  </Link>
                </div>
                <div className="friendship-status-div">
                  <div
                    className="friends-list-individual request-friendshp-btn"
                    id="2"
                  >
                    Friends
                  </div>
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
