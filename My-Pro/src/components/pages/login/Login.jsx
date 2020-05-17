import React, { useState, useEffect } from "react";
import "./login.css";
import { Redirect, useHistory } from "react-router-dom";
import tinyLoader from "./../../../icons/tiny-loader.gif";
import { setToken, getAuthState } from "./../../../redux/actions/authActions";
import { connect } from "react-redux";
import { loginUser, resetState } from "./../../../redux/actions/loginActions";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disableButtons, setDisableButtons] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    console.log(props);
    let isLoginSuccess = props.loginState.isLoginSuccess;
    if (isLoginSuccess) {
      let loginSuccessToken = props.loginState.loginSuccessToken;
      props.setToken(loginSuccessToken);
      props.resetLoginState();
    } else {
      props.getAuthState();
    }
    setDisableButtons(false);
    setShowLoader(false);
  }, [props.loginState]);

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
    props.loginUser(loginDetails);
  };

  const handleBtnClick = (redirectHref) => {
    setDisableButtons(true);
    console.log("redirectHref -> " + redirectHref);
    history.push(`/${redirectHref}`);
  };

  let btnClasses = disableButtons ? "reg-form-btn disableBtn" : "reg-form-btn";

  if (props.authState.authToken) return <Redirect to="/" />;

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
                className={btnClasses}
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
              className={btnClasses}
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
            className={btnClasses}
            disabled={disableButtons}
          >
            Register an Account
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loginState: state.login,
    authState: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (loginDetails) => dispatch(loginUser(loginDetails)),
    getAuthState: () => dispatch(getAuthState()),
    setToken: (token) => dispatch(setToken(token)),
    resetLoginState: () => dispatch(resetState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
