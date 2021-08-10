import React from "react";
import "./backDrop.css";

const BackDrop = ({ close }) => {
  return <div onClick={close} className="backdrop" />;
};

export default BackDrop;
