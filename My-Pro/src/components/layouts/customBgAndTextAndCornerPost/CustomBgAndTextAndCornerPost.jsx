import React, { useState, useEffect } from "react";
import "./customBgAndTextAndCornerPost.css";

const CustomBgAndTextAndCornerPost = (props) => {
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#000000");
  const [classes, setClasses] = useState("cornerFold cornerFoldStyle ");

  const { postData, postTypeId } = props;
  useEffect(() => {
    console.log(props);
    setBackgroundColor("#" + postData[0].backgroundColor);
    setTextColor("#" + postData[0].textColor);
    if (postData[0].cornerStyle == "cut") {
      setClasses(
        "cornerFold cornerFoldStyle cornerFoldAndCut_" +
          postData[0].cornerStyleSides +
          " remove_cornerShadow"
      );
    } else {
      setClasses(
        "cornerFold cornerFoldStyle cornerFoldAndCut_" +
          postData[0].cornerStyleSides
      );
    }
  }, []);
  return (
    <div className="post-description-div">
      <div className={classes} style={{ backgroundColor, color: textColor }}>
        <span className="post-description">{postData[0].postContent}</span>
      </div>
    </div>
  );
};

export default CustomBgAndTextAndCornerPost;
