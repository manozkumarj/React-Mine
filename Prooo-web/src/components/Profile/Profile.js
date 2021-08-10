import React, { useState, useEffect } from "react";
import "./profile.css";
import { withRouter, Redirect } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { getProfileUserDetailsAndPosts } from "../../redux/actionCreators";
import { store } from "react-notifications-component";

// Import Pages
import Friends from "./../Friends/Friends";
import About from "./../About/About";
import Settings from "./../Settings/Settings";

// Import Layouts
import ProfileLeftSideSection from "./../../layouts/ProfileLeftSideSection/ProfileLeftSideSection";
import MiddleSection from "./../../layouts/MiddleSection/MiddleSection";
import RightSideSection from "./../../layouts/RightSideSection/RightSideSection";
import ProfileCoverPhotoSection from "./../../layouts/ProfileCoverPhotoSection/ProfileCoverPhotoSection";

import ChangeDp from "./../ChangeDp/ChangeDp";
import Photos from "./../Photos/Photos";

const Profile = (props) => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const [urlPath, setUrlPath] = useState(props.match.path);
  const [isLoading, setIsLoading] = useState(true);
  const [userNotFound, setUserNotFound] = useState(false);
  const [currentUsername, setCurrentUsername] = useState(
    props.match.params.username
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    let username = props.match.params.username;
    console.log("username -> " + username);
    setCurrentUsername(username);
  }, [props.match.params.username]);

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log("Path is -> " + props.match.path);
    setUrlPath(props.match.path);
  }, [props.match.path]);

  useEffect(() => {
    setIsLoading(true);
    doFetProfileUserDetailsAndPosts();

    // if (!authState.profileUserDetails) {
    //   doFetProfileUserDetailsAndPosts();
    // }
  }, [currentUsername]);

  const doFetProfileUserDetailsAndPosts = async () => {
    try {
      let response = await dispatch(
        getProfileUserDetailsAndPosts(currentUsername)
      );
      console.log(response);
      if (response.success) {
        setIsLoading(false);
        setUserNotFound(false);
        console.log("Profile - doUpsertReaction is success");
      } else {
        setIsLoading(false);
        setUserNotFound(true);
        console.error("Profile - doUpsertReaction failed");
        let getErrorType = response.errorType;
        console.error(getErrorType);
        // showDangerNotification();
      }
    } catch (err) {
      setIsLoading(false);
      setUserNotFound(true);
      console.error("Profile - doUpsertReaction failed");
      console.log(JSON.stringify(err));
      showDangerNotification();
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

  if (!isLoading && userNotFound) {
    return <Redirect to="/not-found" />;
  }

  return (
    <div className="global-container">
      <div className="right-section-container" id="right-section-container">
        <div className="fixed-section">
          <RightSideSection />
        </div>
      </div>
      <div className="middle-section-container" id="middle-section-container">
        {urlPath !== "/:username/change-dp" ? (
          <ProfileCoverPhotoSection loadingFromParent={isLoading} />
        ) : null}
        {urlPath === "/:username" ? (
          <MiddleSection loadingFromParent={isLoading} />
        ) : null}
        {urlPath === "/:username/friends" ? <Friends /> : null}
        {urlPath === "/:username/settings" ? <Settings /> : null}
        {urlPath === "/:username/about" ? <About /> : null}
        {urlPath === "/:username/change-dp" ? <ChangeDp /> : null}
        {urlPath === "/:username/photos" ? <Photos /> : null}
      </div>

      <div className="left-section-container" id="left-section-container">
        <div className="fixed-section">
          <ProfileLeftSideSection loadingFromParent={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default withRouter(Profile);
