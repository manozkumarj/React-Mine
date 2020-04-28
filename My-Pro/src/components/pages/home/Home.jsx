import React, { Fragment } from "react";
import "./home.css";
import LeftSideSection from "./../../layouts/leftSideSection/LeftSideSection";
import MiddleSection from "./../../layouts/middleSection/MiddleSection";
import RightSideSection from "./../../layouts/rightSideSection/RightSideSection";

export default function Home() {
  return (
    <Fragment>
      <div className="three-divs-container" id="main">
        <div className="left-section">
          <LeftSideSection />
        </div>

        <div className="middle-section">
          <MiddleSection />
        </div>

        <div className="right-section">
          <RightSideSection />
        </div>
      </div>
    </Fragment>
  );
}
