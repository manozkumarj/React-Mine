import React, { useEffect } from "react";
import "./findAccount.css";
import { Link } from "react-router-dom";

const FindAccount = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="three-divs-container">
      <div id="login-main-container">
        <div className="login-title">Find Account</div>

        <hr className="dividable-hr" />

        <div className="login-form-holder">
          <form autoComplete="off">
            <div className="login-form-field-holder">
              <input
                type="text"
                name="email"
                className="login-form-field"
                placeholder="Enter Email"
              />
            </div>
            <div className="login-form-field-holder">
              <button type="button" className="login-form-btn">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="width-75">
          <hr className="dividable-hr" />
        </div>
        <div className="login-container">
          <Link to="/register" className="global-aTag-style">
            Go back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FindAccount;
