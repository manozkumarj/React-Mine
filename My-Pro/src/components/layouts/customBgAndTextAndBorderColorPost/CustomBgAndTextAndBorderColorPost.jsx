import React, { useState, useEffect } from "react";
import "./customBgAndTextAndBorderColorPost.css";

const CustomBgAndTextAndBorderColorPost = (props) => {
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#000000");
  const [borderTopColor, setBorderTopColor] = useState("red");
  const [borderRightColor, setBorderRightColor] = useState("red");
  const [borderBottomColor, setBorderBottomColor] = useState("red");
  const [borderLeftColor, setBorderLeftColor] = useState("red");
  const [borderStyle, setBorderStyle] = useState("solid");
  const [borderStyleSides, setBorderStyleSides] = useState("all");

  const { postData, postTypeId } = props;
  useEffect(() => {
    console.log(props);
    setBackgroundColor("#" + postData[0].backgroundColor);
    setTextColor("#" + postData[0].textColor);
    setBorderTopColor("#" + postData[0].borderTopColor);
    setBorderRightColor("#" + postData[0].borderRightColor);
    setBorderBottomColor("#" + postData[0].borderBottomColor);
    setBorderLeftColor("#" + postData[0].borderLeftColor);
    setBorderStyle(postData[0].borderStyle);
    setBorderStyleSides(postData[0].borderStyleSides);
  }, []);
  return (
    <div
      className="post-description-div"
      style={{ backgroundColor, color: textColor }}
    >
      <div
        className="pad-12-10 border-2px"
        style={{
          borderTopColor,
          borderRightColor,
          borderBottomColor,
          borderLeftColor,
          borderStyle,
        }}
      >
        <span className="post-description">{postData[0].postContent}</span>
      </div>
    </div>
  );
};

export default CustomBgAndTextAndBorderColorPost;
