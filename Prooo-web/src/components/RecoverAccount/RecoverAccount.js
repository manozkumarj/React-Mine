import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./recoverAccount.css";

// Import Assets
import tinyLoader from "./../../icons/tiny-loader.gif";

const RecoverAccount = (props) => {
  const [email, setEmail] = useState("");
  const [disableButtons, setDisableButtons] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const history = useHistory();

  const handleBtnClick = (redirectHref) => {
    setDisableButtons(true);
    console.log("redirectHref -> " + redirectHref);
    history.push(`/`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setDisableButtons(true);
    setShowLoader(true);
    let getEmail = email.trim();
    if (getEmail) {
      console.log("Form submitted");
      let loginDetails = {
        email,
      };
      console.log(loginDetails);
    } else {
      setDisableButtons(false);
      setShowLoader(false);
    }
  };

  let btnClasses = disableButtons ? "form-button disableButton" : "form-button";

  return (
    <div className="component-container">
      <div className="heading-b4-login">Recover account</div>
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
                setEmail(e.target.value);
              }}
              value={email}
            />
          </div>
          <div className="form-field-holder">
            <button
              type="submit"
              className={btnClasses}
              disabled={disableButtons}
            >
              {!showLoader ? (
                "Find Account"
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
            onClick={() => handleBtnClick("login")}
            className={btnClasses}
            disabled={disableButtons}
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecoverAccount;
