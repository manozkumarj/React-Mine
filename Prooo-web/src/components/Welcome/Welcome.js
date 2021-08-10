import React, { useState, useEffect } from "react";
import "./welcome.css";

import Login from "./../Login/Login";
import Register from "./../Register/Register";

const Welcome = () => {
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="welcome-container">
      <div className="welcome-item welcome-left-section">
        <h1 className="wcl-title">Mightyyy welcomes you</h1>
        <div className="wcl-content-container">
          <div className="wcl-sub-title">Mightyyy offers,</div>
          <div className="wcl-sub-title">
            <ul className="wcl-ul">
              <li>Two DPs per Profile</li>
              <li>Customise your post with favourite colours</li>
              <li>Letter post</li>
              <li>Flipcard</li>
              <li>Different kind of reactions to a post</li>
              <li>More features coming soon...</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="welcome-item welcome-right-section">
        {/* <div className="wcr-titles-container">
          <span
            className={showLogin ? "wcr-title wcr-highlight" : "wcr-title"}
            onClick={() => {
              setShowLogin(true);
            }}
          >
            Login
          </span>
          <span
            className={!showLogin ? "wcr-title wcr-highlight" : "wcr-title"}
            onClick={() => {
              setShowLogin(false);
            }}
          >
            Register
          </span>
        </div> */}
        {showLogin && <Login width="100%" margin="10% auto" />}
        {!showLogin && <Register width="100%" margin="10% auto" />}
      </div>
    </div>
  );
};

export default Welcome;
