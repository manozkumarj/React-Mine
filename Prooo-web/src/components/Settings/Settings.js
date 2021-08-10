import React, { useState, useEffect, Fragment } from "react";
import "./settings.css";

import { useSelector, useDispatch } from "react-redux";
import { store } from "react-notifications-component";

import { updateProfile } from "../../redux/actionCreators";
import { Redirect } from "react-router-dom";

const Settings = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  const [fullName, setFullName] = useState("");

  // Errors related
  const [fullNameError, setFullNameError] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [profileUserDetails, setprofileUserDetails] = useState();
  const [profileUserUsername, setprofileUserUsername] = useState();

  const [disableButtons, setDisableButtons] = useState(false);
  const [isAuthUserAlsoProfileUser, setIsAuthUserAlsoProfileUser] = useState(
    null
  );

  var regex_alphabetsAndSpaces = /^[a-zA-Z ]*$/;

  useEffect(() => {
    if (authState.profileUserDetails) {
      // setIsLoading(true);
      setprofileUserDetails(authState.profileUserDetails);
      setFullName(authState.profileUserDetails.fullName);
      setprofileUserUsername(authState.profileUserDetails.username);

      let getIsAuthUserAlsoProfileUser =
        authState.profileUserDetails.username ===
        authState.authUserDetails.username
          ? true
          : false;
      setIsAuthUserAlsoProfileUser(getIsAuthUserAlsoProfileUser);

      setIsLoading(false);
    }
  }, [authState.profileUserDetails]);

  const handleFullNameChange = (val) => {
    setFullName(val);
    setFullNameError(null);
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    console.log("handleSaveChanges");
    setDisableButtons(true);
    let getFullName = fullName.trim();

    let errorsCount = 0;

    // Full Name validations
    if (!getFullName) {
      ++errorsCount;
      setFullNameError("Please Enter Full name");
    } else if (!regex_alphabetsAndSpaces.test(getFullName)) {
      setFullNameError("Full name should contain Alphabets and spaces");
      ++errorsCount;
    } else if (getFullName.length < 3 || getFullName.length > 15) {
      ++errorsCount;
      setFullNameError("Full name length should between 3-15 characters");
    }

    if (errorsCount) {
      setDisableButtons(false);
      setIsLoading(false);
      return false;
    }

    if (!fullNameError) {
      console.log("Form submitted");
      let profileDetails = {
        fullName,
      };
      console.log(profileDetails);
      doUpdateProfile(profileDetails);
    } else {
      setDisableButtons(false);
      setIsLoading(false);
    }
  };

  const doUpdateProfile = async (profileDetails) => {
    try {
      let response = await dispatch(updateProfile(profileDetails));
      console.log(response);
      if (response.success) {
        console.log("Settings - doUpdateProfile is success");
        store.addNotification({
          title: "Success",
          message: "Profile details have been updated",
          type: "success",
          insert: "bottom",
          container: "bottom-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true,
          },
        });
        // window.reload();
      } else {
        console.error("Settings - doUpdateProfile failed");
        let getErrorType = response.errorType;
      }

      setDisableButtons(false);
      setIsLoading(false);
    } catch (err) {
      console.error("Settings - doUpdateProfile failed");
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

  let btnClasses = disableButtons ? "form-button disableButton" : "form-button";

  if (!isLoading && !isAuthUserAlsoProfileUser) {
    return <Redirect to={`/${profileUserUsername}`} />;
  }

  return (
    <div className="about-container">
      {isLoading && (
        <div className="padding-5">
          <div className="contextPreloader">
            <div className="contextPreloader-item no-border-and-shadow-and-padding">
              <div className="animationLoading">
                <div className="animationLoadingContent height-40"></div>
              </div>
            </div>
            <div className="contextPreloader-item no-border-and-shadow-and-padding">
              <div className="animationLoading">
                <div className="animationLoadingContent height-40"></div>
              </div>
            </div>
            <div className="contextPreloader-item no-border-and-shadow-and-padding">
              <div className="animationLoading">
                <div className="animationLoadingContent height-40"></div>
              </div>
            </div>
            <div className="contextPreloader-item no-border-and-shadow-and-padding">
              <div className="animationLoading">
                <div className="animationLoadingContent height-40"></div>
              </div>
            </div>
            <div className="contextPreloader-item no-border-and-shadow-and-padding">
              <div className="animationLoading">
                <div className="animationLoadingContent height-40"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {!isLoading && (
        <Fragment>
          <div className="about-header">Settings</div>
          <form autoComplete="off" onSubmit={handleSaveChanges}>
            <div className="profile-user-details-container">
              <div className="user-details-field-container">
                <span className="user-details-field-label">Full name</span>
                <div className="user-details-field">
                  <input
                    className="settings-input-field"
                    type="text"
                    placeholder="Enter Full Name"
                    placeholder="Enter Full Name"
                    onChange={(e) => {
                      handleFullNameChange(e.target.value);
                    }}
                    value={fullName}
                    autoComplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                  />
                  <span
                    className="error-msg customize-settings-error"
                    style={{ display: fullNameError ? "block" : "none" }}
                  >
                    {fullNameError}
                  </span>
                </div>
              </div>

              <div className="user-details-field-container">
                <button type="submit" className={btnClasses}>
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        </Fragment>
      )}
    </div>
  );
};

export default Settings;
