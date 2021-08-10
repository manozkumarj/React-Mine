import React, { useState, useEffect } from "react";
import "./home.css";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

// Import pages
import Login from "./../Login/Login";

// Import Layouts
import GlobalLeftSideSection from "../../layouts/GlobalLeftSideSection/GlobalLeftSideSection";
import MiddleSection from "./../../layouts/MiddleSection/MiddleSection";
import RightSideSection from "./../../layouts/RightSideSection/RightSideSection";
import Search from "./../Search/Search";
import Welcome from "./../Welcome/Welcome";

const Home = (props) => {
  const [urlPath, setUrlPath] = useState(props.match.path);
  useEffect(() => {
    // console.log("Path is -> " + props.match.path);
    setUrlPath(props.match.path);
  }, [props.match.path]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [urlPath]);

  const authToken = useSelector((state) => state.auth.authToken);
  // console.log("authToken --> " + authToken);

  if (!authToken) {
    return <Welcome />;
  }
  if (authToken) {
    return (
      <div className="global-container">
        <div className="right-section-container" id="right-section-container">
          <div className="fixed-section">
            <RightSideSection />
          </div>
        </div>
        <div className="middle-section-container" id="middle-section-container">
          {urlPath === "/search" ? <Search /> : null}
          {urlPath === "/" ? <MiddleSection /> : null}
        </div>

        <div className="left-section-container" id="left-section-container">
          <div className="fixed-section">
            <GlobalLeftSideSection />
          </div>
        </div>
      </div>
    );
  }
};

export default withRouter(Home);
