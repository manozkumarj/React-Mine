import React, { useState, useEffect } from "react";
import "./profileCoverPhotoSection.css";
import { Link, withRouter } from "react-router-dom";

// Import images
import wow from "./../../images/wow.jpg";
import { useSelector, useDispatch } from "react-redux";
import { store } from "react-notifications-component";

import { friendshipAction } from "./../../redux/actions/authActions";

const ProfileCoverPhotoSection = (props) => {
  const authState = useSelector((state) => state.auth);

  const [isLoadingFromParent, setIsLoadingFromParent] = useState(
    props.loadingFromParent
  );
  const [isLoading, setIsLoading] = useState(true);
  const [urlPath, setUrlPath] = useState(props.match.path);
  const [authUserUsername, setAuthUserUsername] = useState(
    authState.authUserDetails.username
  );
  const [isAuthUserAlsoProfileUser, setIsAuthUserAlsoProfileUser] = useState(
    false
  );
  const [authUserFriends, setAuthUserFriends] = useState(
    authState.authUserDetails.friends
  );
  const [profileUserFriends, setProfileUserFriends] = useState([]);
  const [relationStatus, setRelationStatus] = useState(null);
  const [authUserId, setAuthUserId] = useState(authState.authUserDetails._id);
  const [profileUserId, setProfileUserId] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log("Path is -> " + props.match.path);
    setUrlPath(props.match.path);
  }, [props.match.path]);

  useEffect(() => {
    console.log("isLoadingFromParent -> " + isLoadingFromParent);
    setIsLoadingFromParent(props.loadingFromParent);
  }, [props.loadingFromParent]);

  useEffect(() => {
    if (authState.profileUserDetails) {
      let getIsAuthUserAlsoProfileUser =
        authState.profileUserDetails.username === authUserUsername
          ? true
          : false;
      setIsAuthUserAlsoProfileUser(getIsAuthUserAlsoProfileUser);
      setAuthUserFriends(authState.authUserDetails.friends);
      setProfileUserFriends(authState.profileUserDetails.friends);
      setAuthUserId(authState.authUserDetails._id);
      setProfileUserId(authState.profileUserDetails._id);
    }
  }, [authState.profileUserDetails]);

  useEffect(() => {
    if (authState.profileUserDetails && authUserFriends) {
      console.log("authUserFriends are below");
      console.log(authUserFriends);
      console.log("profileUserFriends are below");
      console.log(profileUserFriends);
      if (authUserFriends.length > 0) {
        console.log("Have friends");

        let getProfileUserIdFromAuthUserFriendsList = authUserFriends.filter(
          (friend) => {
            return friend.friendId._id === profileUserId;
          }
        );

        console.log(getProfileUserIdFromAuthUserFriendsList);

        getProfileUserIdFromAuthUserFriendsList =
          getProfileUserIdFromAuthUserFriendsList[0];

        console.log(getProfileUserIdFromAuthUserFriendsList);

        if (!getProfileUserIdFromAuthUserFriendsList) {
          setRelationStatus("none");
        } else {
          let getStatus = getProfileUserIdFromAuthUserFriendsList.status;
          console.log(getStatus);
          setRelationStatus(getStatus);
        }
      } else {
        setRelationStatus("none");
      }
      setIsLoading(false);
    }
  }, [authUserFriends]);

  var dropdowns = document.getElementsByClassName(
    "dropdown-action-items-container"
  );
  const dropdownOpener = (id) => {
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
    var idDropdowns = document.getElementById("dropdown-container-" + id);
    if (!idDropdowns.classList.contains("show")) {
      idDropdowns.classList.add("show");
    }
  };

  const handleFriendAction = (actionType) => {
    console.log("actionType --> " + actionType);
    console.log("authUserId --> " + authUserId);
    console.log("profileUserId --> " + profileUserId);

    let getAuthUserFriends = authUserFriends;
    let getProfileUserFriends = profileUserFriends;

    console.log("authUserFriends are below - before");
    console.log(getAuthUserFriends);

    console.log("profileUserFriends are below - before");
    console.log(profileUserFriends);

    if (actionType === "sendRequest") {
      let authUserStatus = "sent";
      let profileUserStatus = "pending";

      getAuthUserFriends = [
        ...getAuthUserFriends,
        {
          status: authUserStatus,
          friendId: { _id: profileUserId },
        },
      ];
      getProfileUserFriends = [
        ...getProfileUserFriends,
        {
          status: profileUserStatus,
          friendId: { _id: authUserId },
        },
      ];
      setAuthUserFriends(getAuthUserFriends);
      setProfileUserFriends(getProfileUserFriends);
    } else if (
      actionType === "cancelRequest" ||
      actionType === "deleteRequest" ||
      actionType === "unfriend"
    ) {
      let removedSentRequestFromLoggedInUserFriends = getAuthUserFriends.filter(
        (friend) => {
          console.log("friend.friendId --> " + friend.friendId);
          return friend.friendId._id !== profileUserId;
        }
      );
      let removedReceivedRequestFromProfileUserFriends = profileUserFriends.filter(
        (friend) => {
          console.log("friend.friendId --> " + friend.friendId);
          return friend.friendId._id !== authUserId;
        }
      );
      // console.log(removedSentRequestFromLoggedInUserFriends);
      let newGetAuthUserFriends = [
        ...removedSentRequestFromLoggedInUserFriends,
      ];
      let getProfileUserFriends = [
        ...removedReceivedRequestFromProfileUserFriends,
      ];
      setAuthUserFriends(newGetAuthUserFriends);
      setProfileUserFriends(getProfileUserFriends);
    } else if (actionType === "acceptRequest") {
      let status = "friend";

      let removedSentRequestFromLoggedInUserFriends = authUserFriends.filter(
        (friend) => {
          console.log("friend.friendId --> " + friend.friendId);
          return friend.friendId._id !== profileUserId;
        }
      );
      let removedReceivedRequestFromProfileUserFriends = profileUserFriends.filter(
        (friend) => {
          console.log("friend.friendId --> " + friend.friendId);
          return friend.friendId._id !== authUserId;
        }
      );

      let newGetLoggedInUserFriends = [
        ...removedSentRequestFromLoggedInUserFriends,
        { _id: profileUserId, status, friendId: { _id: profileUserId } },
      ];
      let getProfileUserFriends = [
        ...removedReceivedRequestFromProfileUserFriends,
        { _id: authUserId, status, friendId: { _id: authUserId } },
      ];
      setAuthUserFriends(newGetLoggedInUserFriends);
      setProfileUserFriends(getProfileUserFriends);
    } else {
      alert("Invalid actionType to handle friendshipAction");
      return false;
    }

    makeFriendshipAction(profileUserId, actionType);
  };

  const makeFriendshipAction = async (profileUserId, actionType) => {
    try {
      let response = await dispatch(
        friendshipAction(profileUserId, actionType)
      );
      console.log(response);
      if (response.success) {
        console.log(
          "ProfileCoverPhotoSection - makeFriendshipAction is success"
        );
      } else {
        console.error("ProfileCoverPhotoSection - makeFriendshipAction failed");
        let getErrorType = response.errorType;
        console.error(getErrorType);
        showDangerNotification();
      }
    } catch (err) {
      console.error("ProfileCoverPhotoSection - makeFriendshipAction failed");
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

  return (
    <div className="cover-photo-section-container">
      <div className="cover-photo-container">
        {!isLoadingFromParent && (
          <img id="profile-timeline-src" src={wow} alt="timeline view" />
        )}
        {isLoadingFromParent && (
          <div className="contextPreloader">
            <div className="contextPreloader-item no-border-and-shadow-and-padding remove-margin-ani">
              <div className="animationLoading">
                <div className="animationLoadingContent animation-height-240"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="activities-container">
        {isLoadingFromParent && "Loading..."}

        {!isLoadingFromParent && isAuthUserAlsoProfileUser && (
          <button className="activityButton">View Activity</button>
        )}

        {!isLoadingFromParent &&
          !isAuthUserAlsoProfileUser &&
          relationStatus === "none" && (
            <button
              className="activityButton friends-actions"
              onClick={() => handleFriendAction("sendRequest")}
            >
              +Add Friend
            </button>
          )}

        {!isLoadingFromParent && relationStatus === "sent" && (
          <div className="interact-with-current-user">
            <button
              type="button"
              className="activityButton friends-actions danger-button"
              onClick={() => handleFriendAction("cancelRequest")}
            >
              Cancel Request
            </button>
          </div>
        )}

        {!isLoadingFromParent && relationStatus === "pending" && (
          <div
            className="action-items-dropdown"
            onClick={() => dropdownOpener("opt-1")}
          >
            <button className="activityButton friends-actions contains">
              Respond to Request <i className="arrow down"></i>
            </button>
            <div
              id="dropdown-container-opt-1"
              className="dropdown-action-items-container"
            >
              <ul>
                <li
                  className="positive-li"
                  onClick={() => handleFriendAction("acceptRequest")}
                >
                  Accept Request
                </li>
                <li
                  className="negative-li"
                  onClick={() => handleFriendAction("deleteRequest")}
                >
                  Delete Request
                </li>
              </ul>
            </div>
          </div>
        )}

        {!isLoadingFromParent && relationStatus === "friend" && (
          <div
            className="action-items-dropdown"
            onClick={() => dropdownOpener("opt-1")}
          >
            <button className="activityButton friends-actions contains">
              Friend <i className="arrow down"></i>
            </button>
            <div
              id="dropdown-container-opt-1"
              className="dropdown-action-items-container"
            >
              <ul>
                <li
                  className="negative-li"
                  onClick={() => handleFriendAction("unfriend")}
                >
                  Unfriend
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default withRouter(ProfileCoverPhotoSection);
