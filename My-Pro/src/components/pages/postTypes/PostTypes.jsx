import React, { useEffect } from "react";
import "./postTypes.css";
import RightSideSection from "./../../layouts/rightSideSection/RightSideSection";

export default function PostTypes() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="three-divs-container" id="main">
      <div className="left-and-middle-divs-container advanced-posts-container">
        <div className="advanced-posts-header">Select a post type</div>
      </div>

      <div className="right-section">
        <RightSideSection />
      </div>
    </div>
  );
}
