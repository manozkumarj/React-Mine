import React, { useEffect, useState } from "react";
import "./register.css";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { registerAccount } from "./../../../redux/actionCreators";

import tinyLoader from "./../../../icons/tiny-loader.gif";

const Register = (props) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disableButtons, setDisableButtons] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  // const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);
  // const [fullNameErrorMsg, setFullNameErrorMsg] = useState(null);
  // const [emailErrorMsg, setEmailErrorMsg] = useState(null);
  // const [passwordErrorMsg, setPasswordErrorMsg] = useState(null);

  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    console.log(props);
    setDisableButtons(false);
    setShowLoader(false);
  }, [props]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setDisableButtons(true);
    setShowLoader(true);
    console.log("Form submitted");
    let registrationDetails = {
      fullName,
      email,
      password,
    };
    console.log(registrationDetails);
    props.registerAccount(registrationDetails);
  };

  const handleBtnClick = (redirectHref) => {
    setDisableButtons(true);
    console.log("redirectHref -> " + redirectHref);
    history.push(`/${redirectHref}`);
  };

  let btnClasses = disableButtons ? "reg-form-btn disableBtn" : "reg-form-btn";

  if (props.centralState.authToken) return <Redirect to="/login" />;

  return (
    <div className="three-divs-container">
      <div id="register-main-container">
        <div className="reg-title">
          Register an account, It's free and always will be
        </div>

        <hr className="dividable-hr" />

        <div className="reg-form-holder">
          <form autoComplete="off" onSubmit={handleSubmit}>
            <div className="reg-form-field-holder">
              <input
                type="text"
                name="fullName"
                className="reg-form-field"
                placeholder="Enter Fullname"
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
                value={fullName}
              />
            </div>
            <div className="reg-form-field-holder">
              <input
                type="text"
                name="email"
                className="reg-form-field"
                placeholder="Enter Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
              />
            </div>
            <div className="reg-form-field-holder">
              <input
                type="password"
                name="password"
                className="reg-form-field"
                placeholder="New password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
              />
            </div>
            <div className="reg-form-field-holder">
              <button type="submit" className={btnClasses}>
                Register
                <img
                  style={{ display: showLoader ? "inline" : "none" }}
                  src={tinyLoader}
                  alt="Loader"
                  className="tinyLoader"
                />
              </button>
            </div>
          </form>
        </div>
        <div className="width-75">
          <hr className="dividable-hr" />
        </div>
        <div className="reg-form-holder">
          <button
            type="button"
            onClick={() => handleBtnClick("find-account")}
            className={btnClasses}
            disabled={disableButtons}
          >
            Forgotten Account?
          </button>
        </div>
        <div className="width-75">
          <hr className="dividable-hr" />
        </div>
        <div className="reg-form-holder">
          <button
            type="button"
            onClick={() => handleBtnClick("login")}
            className={btnClasses}
            disabled={disableButtons}
          >
            Log In to Existing Account
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    centralState: state.central,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    registerAccount: (registrationDetails) =>
      dispatch(registerAccount(registrationDetails)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
