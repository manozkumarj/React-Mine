import React, { Fragment, useContext } from "react";
import "./home.css";
import { ModalsContext } from "./../../../contexts/ModalsContext";
import LeftSideSection from "./../../layouts/leftSideSection/LeftSideSection";
import MiddleSection from "./../../layouts/middleSection/MiddleSection";
import RightSideSection from "./../../layouts/rightSideSection/RightSideSection";

export default function Home() {
  let { toggleOpenLayerOne } = useContext(ModalsContext);

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
