import React, { useState, useEffect, useRef } from "react";
import "./profile.css";
import { withRouter } from "react-router-dom";
import MiddleSection from "./../../layouts/middleSection/MiddleSection";
import RightSideSection from "./../../layouts/rightSideSection/RightSideSection";
import ProfileLeftSideSection from "./../../layouts/profileLeftSideSection/ProfileLeftSideSection";
import Photos from "./../photos/Photos";
import Friends from "./../friends/Friends";
import Settings from "./../settings/Settings";
import About from "./../about/About";

import wow2 from "../../../images/wow_2.jpg";

import overlayClose from "../../../images/overlay-close.png";
import fancyClose from "../../../images/fancy-close.png";
import { connect } from "react-redux";
import {
  getAllUsersPosts,
  getIndividualUserPosts,
  getProfileUserDetailsAndPosts,
  friendshipAction,
} from "./../../../redux/actionCreators";

const Profile = (props) => {
  const [imagesUrl, setImagesUrl] = useState("http://localhost:8088/photo/");
  const [timelinePhoto, setTimelinePhoto] = useState(wow2);
  const [urlPath, setUrlPath] = useState(props.match.path);
  const [friendshipStatus, setFriendshipStatus] = useState(null);
  const [profileUserFriendsCount, setProfileUserFriendsCount] = useState(
    "Loading..."
  );
  const [profilePageUserDetails, setProfilePageUserDetails] = useState(
    props.centralState.profilePageUserDetails
  );
  const [loggedInUserFriends, setLoggedInUserFriends] = useState(
    props.centralState.loggedInUserDetails.friends
  );
  const [profileUserFriends, setProfileUserFriends] = useState(null);
  const [
    isSessionAndProfileUserSame,
    setIsSessionAndProfileUserSame,
  ] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [props.match.path]);

  useEffect(() => {
    console.log("Path is -> " + props.match.path);
    setUrlPath(props.match.path);
    if (props.match.path === "/:username") {
      const script = document.createElement("script");
      script.src = "/js/croppie.js";
      script.async = true;
      document.body.appendChild(script);

      const script_1 = document.createElement("script");
      script_1.src = "/js/dp-change.js";
      script_1.async = true;
      document.body.appendChild(script_1);
    }

    let username = props.match.params.username;
    console.log("Path is -> " + props.match.path);

    if (username === props.centralState.loggedInUserDetails.username) {
      props.centralState.profilePageUserDetails =
        props.centralState.loggedInUserDetails;
      props.getIndividualUserPosts(props.centralState.loggedInUserDetails._id);
    } else {
      props.getProfileUserDetailsAndPosts(username);
    }
  }, [props.match]);

  useEffect(() => {
    setImagesUrl("http://localhost:8088/photo/");
    if (
      props.centralState.authToken &&
      props.centralState.profilePageUserDetails
    ) {
      setTimelinePhoto(
        props.centralState.profilePageUserDetails.profileCoverPhoto
          ? imagesUrl +
              props.centralState.profilePageUserDetails.profileCoverPhoto
          : wow2
      );

      if (
        props.centralState.profilePageUserDetails.username ===
        props.centralState.loggedInUserDetails.username
      ) {
        setIsSessionAndProfileUserSame(true);
      } else {
        setIsSessionAndProfileUserSame(false);
      }

      let loggedInUserFriends = props.centralState.loggedInUserDetails.friends;
      console.log(loggedInUserFriends);
      setLoggedInUserFriends(loggedInUserFriends);

      if (loggedInUserFriends.length === 0) {
        setFriendshipStatus("sendRequest");
      } else {
        console.log(props.centralState.profilePageUserDetails);
        let profileUserId = props.centralState.profilePageUserDetails._id;
        let getProfileUserIdFromSessionFriendsList = loggedInUserFriends.filter(
          (friend) => {
            return friend.friendId === profileUserId;
          }
        );

        console.log(getProfileUserIdFromSessionFriendsList);

        getProfileUserIdFromSessionFriendsList =
          getProfileUserIdFromSessionFriendsList[0];

        console.log(getProfileUserIdFromSessionFriendsList);

        if (!getProfileUserIdFromSessionFriendsList) {
          setFriendshipStatus("sendRequest");
        } else {
          let getStatus = getProfileUserIdFromSessionFriendsList.status;
          if (getStatus === "sent") setFriendshipStatus("cancelRequest");
          else if (getStatus === "pending")
            setFriendshipStatus("acceptRequest");
          else if (getStatus === "friend") setFriendshipStatus("friend");
          else alert("Friendship status is invalid");
        }
      }
    }

    if (props.centralState.isRequestSucceeded) {
      alert("Friend request action success");
    }
    if (props.centralState.hasRequestError) {
      alert("Friend request action failed");
    }

    console.log(props);
  }, [props]);

  useEffect(() => {
    // console.log(props);
    if (props.centralState.profilePageUserDetails) {
      setProfilePageUserDetails(props.centralState.profilePageUserDetails);
      setProfileUserFriends(props.centralState.profilePageUserDetails.friends);
      let getCount = props.centralState.profilePageUserDetails.friends.filter(
        (friend) => friend.status === "friend"
      );
      setProfileUserFriendsCount(getCount.length);
    }
  }, [props.centralState.profilePageUserDetails]);

  const filesPickerRef = useRef();

  const pickImagesHandler = () => {
    filesPickerRef.current.click();
    console.log("Input file triggered");
  };

  const handleFriendAction = (actionType) => {
    let loggedInUserId = props.centralState.loggedInUserId;
    let profileUserId = props.centralState.profilePageUserDetails._id;

    console.log("loggedInUserId --> " + loggedInUserId);
    console.log("profileUserId --> " + profileUserId);

    let loggedInUserFriends = props.centralState.loggedInUserDetails.friends;
    let profileUserFriends = props.centralState.profilePageUserDetails.friends;

    console.log("loggedInUserFriends are below - before");
    console.log(loggedInUserFriends);

    if (actionType === "sendRequest") {
      let loggedInUserStatus = "sent";
      let profileUserStatus = "pending";

      loggedInUserFriends = [
        ...loggedInUserFriends,
        { friendId: profileUserId, status: loggedInUserStatus },
      ];
      profileUserFriends = [
        ...profileUserFriends,
        { friendId: loggedInUserId, status: profileUserStatus },
      ];
      setLoggedInUserFriends(loggedInUserFriends);
    } else if (
      actionType === "cancelRequest" ||
      actionType === "deleteRequest"
    ) {
      let removedSentRequestFromLoggedInUserFriends = loggedInUserFriends.filter(
        (friend) => {
          console.log("friend.friendId --> " + friend.friendId);
          return friend.friendId != profileUserId;
        }
      );
      // console.log(removedSentRequestFromLoggedInUserFriends);
      loggedInUserFriends = [...removedSentRequestFromLoggedInUserFriends];
      setLoggedInUserFriends(loggedInUserFriends);
    } else if (actionType === "acceptRequest") {
      let status = "friends";

      loggedInUserFriends = [
        ...loggedInUserFriends,
        { friendId: profileUserId, status },
      ];
      profileUserFriends = [
        ...profileUserFriends,
        { friendId: loggedInUserId, status },
      ];
      setLoggedInUserFriends(loggedInUserFriends);
    } else {
      alert("Invalid actionType to handle friendshipAction");
    }

    console.log("loggedInUserFriends are below - after");
    console.log(loggedInUserFriends);

    console.log("actionType --> " + actionType);
    console.log("profileUserId --> " + profileUserId);
    props.friendshipAction(profileUserId, actionType);
  };

  return (
    <div className="three-divs-container" id="main">
      <div className="left-and-middle-divs-container">
        <div className="left-section">
          <ProfileLeftSideSection />
        </div>

        <div className="middle-section">
          <div className="timeline-pic-and-friendStatus-div">
            <div className="timeline-pic-div">
              <img
                id="profile-timeline-src"
                src={timelinePhoto}
                alt="timeline view"
              />
              {isSessionAndProfileUserSame && (
                <span
                  className="absolute-bottom-right"
                  id="change-timeline"
                  data-file-type="timeline"
                >
                  Change image
                </span>
              )}
            </div>
            <div className="left-right-holders">
              <div className="total-friends-count">
                Friends - {profileUserFriendsCount}
              </div>

              {!isSessionAndProfileUserSame &&
                profilePageUserDetails &&
                friendshipStatus === "sendRequest" && (
                  <div className="interact-with-current-user">
                    <button
                      type="button"
                      className="request-friendshp-btn"
                      onClick={() => handleFriendAction("sendRequest")}
                    >
                      + Add Friend
                    </button>
                  </div>
                )}

              {!isSessionAndProfileUserSame &&
                profilePageUserDetails &&
                friendshipStatus === "cancelRequest" && (
                  <div className="interact-with-current-user">
                    <button
                      type="button"
                      className="request-friendshp-btn"
                      onClick={() => handleFriendAction("cancelRequest")}
                    >
                      Cancel Request
                    </button>
                  </div>
                )}

              {!isSessionAndProfileUserSame &&
                profilePageUserDetails &&
                friendshipStatus === "acceptRequest" && (
                  <div className="interact-with-current-user">
                    <button
                      type="button"
                      className="request-friendshp-btn"
                      onClick={() => handleFriendAction("acceptRequest")}
                    >
                      Accept Request
                    </button>

                    <button
                      type="button"
                      className="request-friendshp-btn"
                      onClick={() => handleFriendAction("deleteRequest")}
                    >
                      Delete Request
                    </button>
                  </div>
                )}

              {!isSessionAndProfileUserSame &&
                profilePageUserDetails &&
                friendshipStatus === "friend" && (
                  <div className="interact-with-current-user">
                    <button type="button" className="request-friendshp-btn">
                      Friend
                    </button>
                  </div>
                )}
            </div>
          </div>

          {urlPath === "/:username" || urlPath === "/profile" ? (
            <MiddleSection />
          ) : null}

          {urlPath === "/:username/photos" ? <Photos /> : null}
          {urlPath === "/:username/friends" ? <Friends /> : null}
          {urlPath === "/:username/settings" ? <Settings /> : null}
          {urlPath === "/:username/about" ? <About /> : null}
        </div>
      </div>

      <div className="right-section">
        <RightSideSection />
      </div>

      <input
        style={{ display: "none" }}
        type="text"
        id="hidden-popup-type-holder"
        value=""
        readOnly
      />

      {/* DPs change popups - starts */}
      <div
        id="dp_change_layerOneModalContainer"
        tabIndex="1"
        className="dp_change_layerOneModalContainer"
      >
        <span className="overlay_close layerOneCloser" title="close">
          <img height="20" src={overlayClose} alt="closer" />
        </span>

        <div className="dp_change_layerOneModalInner">
          <div className="dp_change_main">
            <span className="fancyCloseIcon layerOneCloser" title="close">
              <img height="30" src={fancyClose} alt="closer" />
            </span>
            <h2 className="global-style">
              <span id="dp-and-timeline-change-title">
                Primary profile change
              </span>
            </h2>
            <hr className="dividable-hr" />

            <div className="modal-dialog" id="dp_img_change_croppie_modal">
              <div className="modal-content">
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-8 text-center">
                      <div id="dp_image_cropper_view"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="modal-dialog"
              id="timeline_img_change_croppie_modal"
            >
              <div className="modal-content">
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-8 text-center">
                      <div id="timeline_image_cropper_view"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="upload-new-dp-container">
              <input
                type="file"
                id="dp-upload"
                style={{ display: "none" }}
                accept=".png, .jpg, .jpeg"
                ref={filesPickerRef}
              />
              <div id="upload-new-dp" onClick={pickImagesHandler}>
                Upload an Image
              </div>
            </div>

            <hr className="dividable-hr" />

            <div className="layerOne-post-actions-div">
              <button className="layerOne-close-btn layerOneCloser">
                Cancel
              </button>
              <button id="update-dp" className="post-button">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* DPs change popups - ends */}
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
    getIndividualUserPosts: (token, userId) =>
      dispatch(getIndividualUserPosts(token, userId)),
    getAllUsersPosts: () => dispatch(getAllUsersPosts()),
    getProfileUserDetailsAndPosts: (username) =>
      dispatch(getProfileUserDetailsAndPosts(username)),
    friendshipAction: (friendId, actionType) =>
      dispatch(friendshipAction(friendId, actionType)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Profile)
);
