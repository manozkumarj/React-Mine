import React from "react";
import "./customBgAndTextAndBorderColorPost.css";

const CustomBgAndTextAndBorderColorPost = (props) => {
  return (
    <div
      className="post-description-div"
      style={{ background: "#006600", color: "#fff" }}
    >
      <div
        className="pad-12-10 dashed border-2px"
        style={{
          borderColor: "yellow",
        }}
      >
        <span className="post-description">
          This is my first test for updates div. Just to check whether it's
          working or not.This is my first test for updates div. Just to check
          whether it's working or not. Lorem Ipsum is simply dummy text of the
          printing and typesetting industry.
        </span>
      </div>
    </div>
  );
};

export default CustomBgAndTextAndBorderColorPost;
