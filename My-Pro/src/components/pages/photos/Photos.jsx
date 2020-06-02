import React, { useEffect } from "react";
import "./photos.css";

import zuck from "../../../images/zuck.jpg";
import mark from "../../../images/mark.jpg";
import kohli from "../../../images/kohli.jpg";
import bikee from "../../../images/bikee.jpg";
import wow1 from "../../../images/wow_1.jpg";
import wow2 from "../../../images/wow_2.jpg";

export default function Photos() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="all-photos-container">
      <div className="individual-pic-div">
        <img src={bikee} alt="individual" className="individual-pic" />
      </div>
      <div className="individual-pic-div">
        <img src={wow1} alt="individual" className="individual-pic" />
      </div>
      <div className="individual-pic-div">
        <img src={wow2} alt="individual" className="individual-pic" />
      </div>
      <div className="individual-pic-div">
        <img src={kohli} alt="individual" className="individual-pic" />
      </div>
      <div className="individual-pic-div">
        <img src={zuck} alt="individual" className="individual-pic" />
      </div>
      <div className="individual-pic-div">
        <img src={mark} alt="individual" className="individual-pic" />
      </div>
      <div className="individual-pic-div">
        <img src={bikee} alt="individual" className="individual-pic" />
      </div>
      <div className="individual-pic-div">
        <img src={wow1} alt="individual" className="individual-pic" />
      </div>
      <div className="individual-pic-div">
        <img src={wow2} alt="individual" className="individual-pic" />
      </div>
      <div className="individual-pic-div">
        <img src={kohli} alt="individual" className="individual-pic" />
      </div>
      <div className="individual-pic-div">
        <img src={zuck} alt="individual" className="individual-pic" />
      </div>
      <div className="individual-pic-div">
        <img src={mark} alt="individual" className="individual-pic" />
      </div>
    </div>
  );
}
