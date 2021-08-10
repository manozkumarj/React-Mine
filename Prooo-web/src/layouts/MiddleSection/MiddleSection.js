import React, { Fragment } from "react";
import "./middleSection.css";

// Import Layouts
import PostMenu from "./../../layouts/PostMenu/PostMenu";
import Posts from "../Posts/Posts";

const MiddleSection = () => {
  return (
    <Fragment>
      <div className="post-menu-container">
        <PostMenu />
      </div>

      {/* <div className="single-item">
        <div className="greet-div">
          <div className="greet">Welcome</div>
          <div className="greet-name">
            <span>Manoj Kumar</span>
          </div>
        </div>
      </div> */}
      <Posts />
    </Fragment>
  );
};

export default MiddleSection;
