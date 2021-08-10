import React, { useState, useEffect, Fragment } from "react";
import "./profileLeftSideSection.css";
import { Link, withRouter } from "react-router-dom";

// Import images
import defaultAvatar from "./../../images/avatar.png";

import { serverPhotoUrl } from "./../../helpers/helpers";
import { useSelector } from "react-redux";

const ProfileLeftSideSection = (props) => {
  const authState = useSelector((state) => state.auth);

  const [isLoading, setIsLoading] = useState(props.loadingFromParent);
  const [urlPath, setUrlPath] = useState(props.match.path);
  const [authUserUsername, setAuthUserUsername] = useState(
    authState.authUserDetails.username
  );
  const [profileUserFullName, setProfileUserFullName] = useState(null);
  const [profileUserPrimaryDp, setProfileUserPrimaryDp] = useState(
    defaultAvatar
  );
  const [profileUserSecondaryDp, setProfileUserSecondaryDp] = useState(
    defaultAvatar
  );
  const [profileUserUsername, setProfileUserUsername] = useState(
    props.match.params.username
  );
  const [isAuthUserAlsoProfileUser, setIsAuthUserAlsoProfileUser] = useState(
    false
  );

  useEffect(() => {
    console.log("props.loadingFromParent -> " + props.loadingFromParent);
    setIsLoading(props.loadingFromParent);
  }, [props.loadingFromParent]);

  useEffect(() => {
    let username = props.match.params.username;
    console.log("username -> " + username);
    setAuthUserUsername(username);
  }, [props.match.params.username]);

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log("Path is -> " + props.match.path);
    setUrlPath(props.match.path);
  }, [props.match.path]);

  useEffect(() => {
    console.log("Path is -> " + props.match.path);
    setUrlPath(props.match.path);
    // console.log(authState.profileUserDetails);
    if (!authState.isLoadingPosts && authState.profileUserDetails) {
      setProfileUserFullName(authState.profileUserDetails.fullName);

      if (authState.profileUserDetails.primaryDp)
        setProfileUserPrimaryDp(
          serverPhotoUrl + authState.profileUserDetails.primaryDp
        );
      else setProfileUserPrimaryDp(defaultAvatar);

      if (authState.profileUserDetails.secondaryDp)
        setProfileUserSecondaryDp(
          serverPhotoUrl + authState.profileUserDetails.secondaryDp
        );
      else setProfileUserSecondaryDp(defaultAvatar);

      setProfileUserUsername(authState.profileUserDetails.username);

      let getIsAuthUserAlsoProfileUser =
        authState.profileUserDetails.username ===
        authState.authUserDetails.username
          ? true
          : false;
      setIsAuthUserAlsoProfileUser(getIsAuthUserAlsoProfileUser);
    }
  }, [authState.profileUserDetails]);

  return (
    <Fragment>
      {!isLoading && (
        <Fragment>
          <div className="auth-user-dps-lg-container profile-auth-user-dps-lg-container">
            <Link to={`/${profileUserUsername}/change-dp`}>
              {isAuthUserAlsoProfileUser && (
                <span className="dp-change-text primary-dp-change-text">
                  Change
                </span>
              )}
            </Link>
            <Link to={`/${profileUserUsername}/change-dp`}>
              {isAuthUserAlsoProfileUser && (
                <span className="dp-change-text secondary-dp-change-text">
                  Change
                </span>
              )}
            </Link>
            <img
              src={profileUserPrimaryDp}
              alt="avatar-primary"
              className="auth-user-dp-primary auth-user-dp-lg"
            />
            <img
              src={profileUserSecondaryDp}
              alt="avatar-secondary"
              className="auth-user-dp-secondary auth-user-dp-lg"
            />
          </div>
          <div className="auth-user-fullName-container">
            <Link
              className="highlight-a-tag-on-hover auth-user-fullName-lg"
              to={`/${profileUserUsername}`}
            >
              {profileUserFullName}
            </Link>
          </div>
          <div>
            <ul className="form">
              <li>
                <Link className="profile" to={`/${profileUserUsername}`}>
                  <i className="icon-user"></i>Timeline
                </Link>
              </li>
              <li>
                <Link
                  className="messages"
                  to={`/${profileUserUsername}/photos`}
                >
                  <i className="icon-envelope-alt"></i>Photos
                </Link>
              </li>
              <li>
                <Link
                  className="messages"
                  to={`/${profileUserUsername}/friends`}
                >
                  <i className="icon-envelope-alt"></i>Friends
                </Link>
              </li>
              <li>
                <Link className="logout" to={`/${profileUserUsername}/about`}>
                  <i className="icon-signout"></i>About
                </Link>
              </li>
              {isAuthUserAlsoProfileUser && (
                <li>
                  <Link
                    className="settings"
                    to={`/${profileUserUsername}/settings`}
                  >
                    <i className="icon-cog"></i>Settings
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </Fragment>
      )}

      {isLoading && (
        <Fragment>
          <div className="auth-user-dps-lg-container profile-auth-user-dps-lg-container">
            <img
              src={defaultAvatar}
              alt="avatar-primary"
              className="auth-user-dp-primary auth-user-dp-lg"
            />
            <img
              src={defaultAvatar}
              alt="avatar-secondary"
              className="auth-user-dp-secondary auth-user-dp-lg"
            />
          </div>
          <div className="auth-user-fullName-container">
            <Link
              className="highlight-a-tag-on-hover auth-user-fullName-lg"
              style={{ color: "#000" }}
              to={`/`}
            >
              Loading...
            </Link>
          </div>
          <div>
            <ul className="form" style={{ background: "transparent" }}>
              <div className="contextPreloader">
                <div className="contextPreloader-item no-border-and-shadow-and-padding remove-margin-ani">
                  <div className="animationLoading">
                    <div className="animationLoadingContent height-40"></div>
                  </div>
                </div>
              </div>
              <div className="contextPreloader">
                <div className="contextPreloader-item no-border-and-shadow-and-padding remove-margin-ani">
                  <div className="animationLoading">
                    <div className="animationLoadingContent height-40"></div>
                  </div>
                </div>
              </div>
              <div className="contextPreloader">
                <div className="contextPreloader-item no-border-and-shadow-and-padding remove-margin-ani">
                  <div className="animationLoading">
                    <div className="animationLoadingContent height-40"></div>
                  </div>
                </div>
              </div>
              <div className="contextPreloader">
                <div className="contextPreloader-item no-border-and-shadow-and-padding remove-margin-ani">
                  <div className="animationLoading">
                    <div className="animationLoadingContent height-40"></div>
                  </div>
                </div>
              </div>
            </ul>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default withRouter(ProfileLeftSideSection);
