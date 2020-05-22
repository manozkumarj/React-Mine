import React from "react";
import "./customBgAndTextAndCornerPost.css";

const CustomBgAndTextAndCornerPost = (props) => {
  return (
    <div className="post-description-div">
      <div className="cornerFold cornerFoldStyle cornerFold_topRight_bottomLeft remove_cornerShadow">
        <span className="post-description">
          This is my first test for updates div. Just to check whether it's
          working or not.This is my first test for updates div. Just to check
          whether it's working or not.
        </span>
      </div>
    </div>
  );
};

export default CustomBgAndTextAndCornerPost;
