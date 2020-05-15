import React, { useState, useEffect } from "react";
import "./login.css";
import { useHistory } from "react-router-dom";
import tinyLoader from "./../../../icons/tiny-loader.gif";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disableButtons, setDisableButtons] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    setDisableButtons(true);
    setShowLoader(true);
    console.log("Form submitted");
    let loginDetails = {
      email,
      password,
    };
    console.log(loginDetails);
  };

  const handleBtnClick = (redirectHref) => {
    setDisableButtons(true);
    console.log("redirectHref -> " + redirectHref);
    history.push(`/${redirectHref}`);
  };

  return (
    <div className="three-divs-container">
      <div id="login-main-container">
        <div className="login-title">Log In to Existing Account</div>

        <hr className="dividable-hr" />

        <div className="login-form-holder">
          <form autoComplete="off" onSubmit={handleSubmit}>
            <div className="login-form-field-holder">
              <input
                type="text"
                name="email"
                className="login-form-field"
                placeholder="Enter Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
              />
            </div>
            <div className="login-form-field-holder">
              <input
                type="password"
                name="password"
                className="login-form-field"
                placeholder="Enter password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
              />
            </div>
            <div className="login-form-field-holder">
              <button
                type="submit"
                className="login-form-btn"
                style={{ background: disableButtons ? "#0066ff" : "#003d99" }}
                disabled={disableButtons}
              >
                Log In
                <img
                  style={{ display: showLoader ? "inline" : "none" }}
                  src={tinyLoader}
                  alt="Loader"
                  className="tinyLoader"
                />
              </button>
            </div>
          </form>
          <hr className="dividable-hr" />
          <div className="login-container">
            <button
              type="button"
              onClick={() => handleBtnClick("find-account")}
              className="reg-form-btn"
              style={{ background: disableButtons ? "#0066ff" : "#003d99" }}
              disabled={disableButtons}
            >
              Forgotten Account?
            </button>
          </div>
        </div>
        <div className="width-75">
          <hr className="dividable-hr" />
        </div>
        <div className="login-form-holder">
          <button
            type="button"
            onClick={() => handleBtnClick("register")}
            className="reg-form-btn"
            style={{ background: disableButtons ? "#0066ff" : "#003d99" }}
            disabled={disableButtons}
          >
            Register an Account
          </button>
        </div>
      </div>
    </div>
  );
};
export default Login;
