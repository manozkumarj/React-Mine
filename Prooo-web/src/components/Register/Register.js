import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./register.css";

import { store } from "react-notifications-component";
import { useDispatch } from "react-redux";
import { registerAccount } from "../../redux/actionCreators";

// Import Assets
import tinyLoader from "./../../icons/tiny-loader.gif";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("Manoz@17");
  const [confirmPassword, setConfirmPassword] = useState("Manoz@17");
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [disableButtons, setDisableButtons] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Errors related
  const [fullNameError, setFullNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);
  const [genderError, setGenderError] = useState(null);

  var regex_alphabetsAndSpaces = /^[a-zA-Z ]*$/;
  var regex_email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  var regex_password = /^(?=.*[\d])(?=.*[!@#$%^&*])[\w!@#$%^&*]{6,16}$/;

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
    let getFullName = fullName.trim();
    let getEmail = email.trim();
    let getPassword = password;
    let getConfirmPassword = confirmPassword;
    let getGender = gender.trim();

    // Full Name validations
    if (!getFullName) {
      setFullNameError("Please Enter Full name");
    } else if (!regex_alphabetsAndSpaces.test(getFullName)) {
      setFullNameError("Full name should contain Alphabets and spaces");
    } else if (getFullName.length < 3 || getFullName.length > 15) {
      setFullNameError("Full name length should between 3-15 characters");
    }

    // Email validations
    if (!getEmail) {
      setEmailError("Please Enter Email");
    } else if (!regex_email.test(getEmail)) {
      setEmailError("Please enter valid email address");
    } else if (getEmail.length < 3 || getEmail.length > 30) {
      setEmailError("Email length should between 5-30 characters");
    }

    // Password validations
    if (!getPassword) {
      setPasswordError("Please Enter Password");
    } else if (!regex_password.test(getPassword)) {
      setPasswordError(
        "Password should be conbination of alphanumeric and special characters and 6-16 characters in length"
      );
    }

    // Confirm Password validations
    if (!getConfirmPassword) {
      setConfirmPasswordError("Please Re-Enter Password");
    }

    // Gender validations
    if (!getGender) {
      setGenderError("Please Select Gender");
    }
    if (getPassword !== getConfirmPassword) {
      setConfirmPasswordError("Passwords didn't match");
    }

    if (
      !getFullName ||
      !getEmail ||
      !getPassword ||
      !getConfirmPassword ||
      !getGender ||
      getPassword !== getConfirmPassword
    ) {
      setDisableButtons(false);
      setIsLoading(false);
      return false;
    }

    if (
      !fullNameError &&
      !emailError &&
      !passwordError &&
      !confirmPasswordError &&
      !genderError
    ) {
      console.log("Form submitted");
      let registerDetails = {
        fullName,
        email,
        password,
        genderId: gender === "male" ? 1 : 2,
      };
      console.log(registerDetails);
      register(registerDetails);
    } else {
      setDisableButtons(false);
      setIsLoading(false);
    }
  };

  const register = async (registerDetails) => {
    try {
      let response = await dispatch(registerAccount(registerDetails));
      console.log(response);
      if (response.success) {
        console.log("Register - Registration is success");

        store.addNotification({
          title: "Success",
          message: "Registration has been successful, please Log in now",
          type: "success",
          insert: "bottom",
          container: "bottom-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 15000,
            onScreen: true,
          },
        });

        setDisableButtons(false);
        setIsLoading(false);
        history.push(`/login`);
      } else {
        console.error("Register - Registration failed");
        let getErrorType = response.errorType;
        if (getErrorType === "inputError") {
          let getErrors = response.msg;
          console.log(getErrors);
          getErrors.forEach((element) => {
            let getFieldName = element.msg;
            if (getFieldName === "fullName") {
              setFullNameError("Please enter valid full name");
            } else if (getFieldName === "email") {
              setEmailError("Please enter valid email address");
            } else if (getFieldName === "password") {
              setPasswordError("Please enter Password");
            } else if (getFieldName === "gender") {
              setGenderError("Please select gender");
            }
            console.log(getFieldName);
          });
        } else if (getErrorType === "generalError") {
          let getErrorTag = response.errorTag;
          if (getErrorTag === "duplicateEmail") {
            setEmailError(
              "An account is already exist with an email you provided, please enter different email address"
            );
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
      console.error("Register - Registration failed");
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

  const handleFullNameChange = (val) => {
    setFullName(val);
    setFullNameError(null);
  };

  const handleEmailChange = (val) => {
    setEmail(val);
    setEmailError(null);
  };

  const handlePasswordChange = (val) => {
    setPassword(val);
    setPasswordError(null);
  };

  const handleConfirmPasswordChange = (val) => {
    setConfirmPassword(val);
    setConfirmPasswordError(null);
  };

  const handleGenderChange = (gender) => {
    setGender(gender);
    setGenderError(null);
  };

  let btnClasses = disableButtons ? "form-button disableButton" : "form-button";

  return (
    <div className="component-container">
      <div className="heading-b4-login">Register new account</div>
      <hr className="dividable-hr-primary" />

      <div className="form-holder">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className="form-field-holder">
            <input
              type="text"
              name="email"
              className="form-field"
              placeholder="Enter Full Name"
              onChange={(e) => {
                handleFullNameChange(e.target.value);
              }}
              value={fullName}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              style={{
                border: fullNameError ? "1px solid red" : "1px solid #999",
              }}
            />
            <span
              className="error-msg"
              style={{ display: fullNameError ? "block" : "none" }}
            >
              {fullNameError}
            </span>
          </div>
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
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              style={{
                border: emailError ? "1px solid red" : "1px solid #999",
              }}
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
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              style={{
                border: passwordError ? "1px solid red" : "1px solid #999",
              }}
            />
            <span
              className="error-msg"
              style={{ display: passwordError ? "block" : "none" }}
            >
              {passwordError}
            </span>
          </div>
          <div className="form-field-holder">
            <input
              type="password"
              name="confirmPassword"
              className="form-field"
              placeholder="Re-Enter Password"
              onChange={(e) => {
                handleConfirmPasswordChange(e.target.value);
              }}
              value={confirmPassword}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              style={{
                border: confirmPasswordError
                  ? "1px solid red"
                  : "1px solid #999",
              }}
            />
            <span
              className="error-msg"
              style={{ display: confirmPasswordError ? "block" : "none" }}
            >
              {confirmPasswordError}
            </span>
          </div>

          <div className="form-field-holder">
            <div
              className="gender-selection-container"
              style={{
                border: genderError ? "1px solid red" : "1px solid transparent",
              }}
            >
              <span className="gender-selection-title">Gender</span>
              <span className="gender-selection-option">
                <input
                  type="radio"
                  value={"male"}
                  name="gender"
                  className="gender-selection-option-radio"
                  id="gender-male"
                  checked={gender === "male"}
                  onChange={(e) => handleGenderChange(e.target.value)}
                />
                <label htmlFor="gender-male">Male</label>
              </span>
              <span className="gender-selection-option">
                <input
                  type="radio"
                  value={"female"}
                  name="gender"
                  className="gender-selection-option-radio"
                  id="gender-female"
                  checked={gender === "female"}
                  onChange={(e) => handleGenderChange(e.target.value)}
                />
                <label htmlFor="gender-female">Female</label>
              </span>
            </div>
            <span
              className="error-msg"
              style={{ display: genderError ? "block" : "none" }}
            >
              {genderError}
            </span>
          </div>

          <div className="form-field-holder">
            <button
              type="submit"
              className={btnClasses}
              disabled={disableButtons}
            >
              {!isLoading ? (
                "Register"
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
            onClick={() => handleBtnClick("login")}
            className={btnClasses}
            disabled={disableButtons}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
