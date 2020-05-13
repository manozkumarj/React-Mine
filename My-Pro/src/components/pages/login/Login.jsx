import React, { useEffect } from "react";
import "./login.css";
import { Link } from "react-router-dom";

const Login = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="three-divs-container">
      <div id="login-main-container">
        <div className="login-title">Log In to Existing Account</div>

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
              <input
                type="password"
                name="password"
                className="login-form-field"
                placeholder="Enter password"
              />
            </div>
            <div className="login-form-field-holder">
              <button type="button" className="login-form-btn">
                Log In
              </button>
            </div>
          </form>
          <hr className="dividable-hr" />
          <div className="login-container">
            <Link to="/register" className="global-aTag-style">
              Forgotten account?
            </Link>
          </div>
        </div>
        <div className="width-75">
          <hr className="dividable-hr" />
        </div>
        <div className="login-container">
          <Link to="/register" className="global-aTag-style">
            Register an Account
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Login;
