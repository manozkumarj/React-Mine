import React, { useState, useEffect } from "react";
import "./defaultAndCustomBgAndTextColorPost.css";

const DefaultAndCustomBgAndTextColorPost = (props) => {
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#000000");

  const { postData, postTypeId } = props;
  useEffect(() => {
    // console.log(props);
    if (postTypeId === 3) {
      setBackgroundColor("#" + postData[0].backgroundColor);
      setTextColor("#" + postData[0].textColor);
    }
  }, [postData]);
  return (
    <div
      className="post-description-div"
      style={{ backgroundColor, color: textColor }}
    >
      <span className="post-description">{postData[0].postContent}</span>
    </div>
  );
};

export default DefaultAndCustomBgAndTextColorPost;
