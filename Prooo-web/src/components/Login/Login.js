import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./login.css";

import { store } from "react-notifications-component";
import { useDispatch } from "react-redux";
import { authenticate } from "../../redux/actionCreators";

// Import Assets
import tinyLoader from "./../../icons/tiny-loader.gif";

const Login = (props) => {
  const [email, setEmail] = useState("manoj@gmail.com");
  const [password, setPassword] = useState("Manoz@17");
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [disableButtons, setDisableButtons] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  let regex_email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const history = useHistory();
  const dispatch = useDispatch();

  const handleBtnClick = (redirectHref) => {
    setDisableButtons(true);
    console.log("redirectHref -> " + redirectHref);
    history.push(`/${redirectHref}`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setDisableButtons(true);
    setIsLoading(true);
    let getEmail = email.trim();
    let getPassword = password;

    // Email validations
    if (!getEmail) {
      setEmailError("Please Enter Email");
    } else if (!regex_email.test(getEmail)) {
      setEmailError("Please enter valid email address");
      console.log(getEmail);
    }

    // Password validations
    if (!getPassword) {
      setPasswordError("Please Enter Password");
    }

    if (!getEmail || !regex_email.test(getEmail) || !getPassword) {
      setDisableButtons(false);
      setIsLoading(false);
      return false;
    }

    if (!emailError && !passwordError) {
      console.log("Form submitted");
      let loginDetails = {
        email,
        password,
      };
      console.log(loginDetails);
      login(loginDetails);
    } else {
      setDisableButtons(false);
      setIsLoading(false);
    }
  };

  const login = async (loginDetails) => {
    try {
      let response = await dispatch(authenticate(loginDetails));
      console.log(response);
      if (response.success) {
        console.log("Login - Login is success");
      } else {
        console.error("Login - Login failed");
        let getErrorType = response.errorType;
        if (getErrorType === "inputError") {
          let getErrors = response.msg;
          console.log(getErrors);
          getErrors.forEach((element) => {
            let getFieldName = element.msg;
            console.log(getFieldName);
            if (getFieldName === "email") {
              setEmailError("Please enter valid email address");
            } else if (getFieldName === "password") {
              setPasswordError("Please Enter Password");
            }
          });
        } else if (getErrorType === "generalError") {
          let getErrorTag = response.errorTag;
          if (getErrorTag === "emailNotFound") {
            setEmailError(
              "No account exist with an email you provided, please check"
            );
          } else if (getErrorTag === "wrongPassword") {
            setPasswordError("Incorrect Password is provided, please check");
          } else {
            showDangerNotification();
          }
        } else if (getErrorType === "serverError") {
          showDangerNotification();
        }
        setDisableButtons(false);
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Login - Login failed");
      console.log(JSON.stringify(err));
      showDangerNotification();
      setDisableButtons(false);
      setIsLoading(false);
    }
  };

  const showDangerNotification = () => {
    store.addNotification({
      title: "Notice",
      message: "Something went wrong, please try again after sometime",
      type: "danger",
      insert: "bottom",
      container: "bottom-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: true,
      },
    });
  };

  const handleEmailChange = (val) => {
    setEmail(val);
    setEmailError(null);
  };

  const handlePasswordChange = (val) => {
    setPassword(val);
    setPasswordError(null);
  };

  let btnClasses = disableButtons ? "form-button disableButton" : "form-button";

  return (
    <div
      className="component-container"
      style={{
        width: props.width ? "inherit" : "50%",
        margin: props.margin ? "inherit" : "70px auto",
        background: props.margin ? "transparent" : "#fff",
        border: props.margin ? "none" : "1px solid #cccccc",
        padding: props.margin ? "0px" : "30px 15px",
        boxShadow: props.margin ? "none" : "0 0 1px 1px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="heading-b4-login">Login to existing account</div>
      <hr className="dividable-hr-primary" />

      <div className="form-holder">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className="form-field-holder">
            <input
              type="text"
              name="email"
              className="form-field"
              placeholder="Enter Email"
              onChange={(e) => {
                handleEmailChange(e.target.value);
              }}
              value={email}
            />
            <span
              className="error-msg"
              style={{ display: emailError ? "block" : "none" }}
            >
              {emailError}
            </span>
          </div>
          <div className="form-field-holder">
            <input
              type="password"
              name="password"
              className="form-field"
              placeholder="Enter Password"
              onChange={(e) => {
                handlePasswordChange(e.target.value);
              }}
              value={password}
            />
            <span
              className="error-msg"
              style={{ display: passwordError ? "block" : "none" }}
            >
              {passwordError}
            </span>
          </div>
          <div className="form-field-holder">
            <button
              type="submit"
              className={btnClasses}
              disabled={disableButtons}
            >
              {!isLoading ? (
                "Log In"
              ) : (
                <img src={tinyLoader} alt="Loader" className="tinyLoader" />
              )}
            </button>
          </div>
        </form>
      </div>
      <hr className="dividable-hr-secondary" />
      <div className="form-holder">
        <div className="form-field-holder">
          <button
            type="button"
            onClick={() => handleBtnClick("recover-account")}
            className={btnClasses}
            disabled={disableButtons}
          >
            Forgot Password?
          </button>
        </div>
        <div className="form-field-holder">
          <button
            type="button"
            onClick={() => handleBtnClick("register")}
            className={btnClasses}
            disabled={disableButtons}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
