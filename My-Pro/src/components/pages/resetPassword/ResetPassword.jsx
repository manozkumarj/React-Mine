import React, { useEffect } from "react";
import "./resetPassword.css";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="three-divs-container">
      <div id="reset-main-container">
        <div className="reset-title">Reset Password</div>

        <hr className="dividable-hr" />

        <div className="reset-form-holder">
          <form autoComplete="off">
            <div className="reset-form-field-holder">
              <input
                type="password"
                name="password"
                className="reset-form-field"
                placeholder="Enter new password"
              />
            </div>
            <div className="reset-form-field-holder">
              <input
                type="password"
                name="password"
                className="reset-form-field"
                placeholder="Re-Enter password"
              />
            </div>
            <div className="reset-form-field-holder">
              <button type="button" className="reset-form-btn">
                Reset Password
              </button>
            </div>
          </form>
        </div>
        <div className="width-75">
          <hr className="dividable-hr" />
        </div>
        <div className="reset-container">
          <Link to="/home" className="global-aTag-style">
            Go back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
