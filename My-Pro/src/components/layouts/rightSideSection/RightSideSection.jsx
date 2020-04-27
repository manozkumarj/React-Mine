import React, { useContext } from "react";
import "./rightSideSection.css";
import zuck from "../../../images/zuck.jpg";
import mark from "../../../images/mark.jpg";
import { ModalsContext } from "./../../../contexts/ModalsContext";

const RightSideSection = () => {
  let { toggleOpenLayerOne } = useContext(ModalsContext);

  return (
    <div className="fixed-div" id="right-fixed-div">
      <p style={{ margin: "20px 10px" }}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </p>

      <button id="openSamplePopup">Click me</button>
    </div>
  );
};

export default RightSideSection;
