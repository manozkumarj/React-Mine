import React, { useState } from "react";
import { SliderPicker, SketchPicker } from "react-color";

const Clrpkr = () => {
  const [color, setColor] = useState("#4059bf");
  const handleChange = (color) => setColor(color.hex);
  return (
    <div className="App">
      <SliderPicker color={color} onChangeComplete={handleChange} />
      <div
        style={{
          backgroundColor: color,
          height: "300px",
          lineHeight: "300px",
          width: "300px",
          margin: "50px",
          color: "#fff",
          textAlign: "center",
        }}
      >
        Hellow - {color}
      </div>
    </div>
  );
};

export default Clrpkr;
