import React, { useEffect } from "react";
import "./register.css";
import { Link } from "react-router-dom";

const Register = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="three-divs-container">
      <div id="register-main-container">
        <div className="reg-title">
          Register an account, It's free and always will be
        </div>

        <hr className="dividable-hr" />

        <div className="reg-form-holder">
          <form autoComplete="off">
            <div className="reg-form-field-holder">
              <input
                type="text"
                name="fullName"
                className="reg-form-field"
                placeholder="Enter Fullname"
              />
            </div>
            <div className="reg-form-field-holder">
              <input
                type="text"
                name="email"
                className="reg-form-field"
                placeholder="Enter Email"
              />
            </div>
            <div className="reg-form-field-holder">
              <input
                type="text"
                name="password"
                className="reg-form-field"
                placeholder="New password"
              />
            </div>
            <div className="reg-form-field-holder">
              <button type="button" className="reg-form-btn">
                Register
              </button>
            </div>
          </form>
        </div>
        <div className="width-75">
          <hr className="dividable-hr" />
        </div>
        <div className="login-container">
          <Link to="/login" className="global-aTag-style">
            Log In to Existing Account
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Register;
