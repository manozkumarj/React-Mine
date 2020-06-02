import React, { useEffect } from "react";
import "./about.css";

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-container">
      <div className="about-container-header">About</div>
      <div className="about">
        <div className="individual-setting-div">
          <div className="about-heading">Username</div>
          <div className="about-heading">-</div>
          <div className="about-edit">manoz</div>
        </div>

        <div className="individual-setting-div">
          <div className="about-heading">Full Name</div>
          <div className="about-heading">-</div>
          <div className="about-edit">Manoj Kumar</div>
        </div>

        <div className="individual-setting-div">
          <div className="about-heading">Gender</div>
          <div className="about-heading">-</div>
          <div className="about-edit">Male</div>
        </div>

        <div className="individual-setting-div">
          <div className="about-heading">Joined Date</div>
          <div className="about-heading">-</div>
          <div className="about-edit">25th March 2020</div>
        </div>
      </div>
    </div>
  );
}
