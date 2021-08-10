import React, { useState, useEffect } from "react";
import "./viewLetter.css";

const ViewLetter = (props) => {
  const [bgColor, setBgColor] = useState("#ffffff");
  const [brdrColor, setBrdrColor] = useState("transparent");
  const [textColor, setTextColor] = useState("#000000");
  const [letterContent, setLetterContent] = useState(props.letterContent);

  useEffect(() => {
    setBgColor(bgColor);
    setBrdrColor(brdrColor);
    setTextColor(textColor);
    setLetterContent(letterContent);
    // console.log("props.bgColor -> " + props.brdrColor);
  }, [bgColor, brdrColor, textColor, letterContent]);

  let padding;
  if (brdrColor) {
    padding = "8px";
  } else {
    padding = "0px";
  }
  return (
    <div
      style={{
        padding: "12px",
        backgroundColor: bgColor,
        borderRadius: "5px",
      }}
    >
      <div
        style={{
          padding,
          backgroundColor: bgColor,
          border: "2px solid " + brdrColor,
          color: textColor,
          fontSize: "15px",
          borderRadius: "5px",
        }}
      >
        {letterContent}
      </div>
    </div>
  );
};

export default ViewLetter;
