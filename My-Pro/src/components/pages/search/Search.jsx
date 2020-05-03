import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./search.css";
import RightSideSection from "./../../layouts/rightSideSection/RightSideSection";
import LeftSideSection from "./../../layouts/leftSideSection/LeftSideSection";

const Search = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    console.log("props are below");
    console.log(props);
    let searchWord = props.match.params.word;
    console.log(`Current searched word is -> ${searchWord}`);
  }, [props]);

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
};

export default Search;
