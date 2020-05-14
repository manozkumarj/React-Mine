import React, { useEffect, useState } from "react";
import "./register.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { registerAccount } from "./../../../redux/actions/registerAccountActions";
// import { Redirect } from "react-router-dom";

const Register = (props) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [fullNameErrorMsg, setFullNameErrorMsg] = useState(null);
  // const [emailErrorMsg, setEmailErrorMsg] = useState(null);
  // const [passwordErrorMsg, setPasswordErrorMsg] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    console.log(props);
  }, [props]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
    let registrationDetails = {
      fullName,
      email,
      password,
    };
    console.log(registrationDetails);
    props.registerAccount(registrationDetails);
  };

  // let {} = props;

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
              <button type="submit" className="reg-form-btn">
                Register
              </button>
            </div>
          </form>
        </div>
        <div className="width-75">
          <hr className="dividable-hr" />
        </div>
        <div className="login-container">
          <Link to="/find-account" className="global-aTag-style">
            Forgotten account?
          </Link>
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

const mapDispatchToProps = (dispatch) => {
  return {
    registerAccount: (registrationDetails) =>
      dispatch(registerAccount(registrationDetails)),
  };
};

export default connect(null, mapDispatchToProps)(Register);
