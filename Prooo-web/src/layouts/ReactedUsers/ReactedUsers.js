import React, { useState, useEffect, Fragment } from "react";
import "./reactedUsers.css";
import { Link } from "react-router-dom";

// Import images
import defaultAvatar from "./../../images/avatar.png";

import { serverPhotoUrl } from "./../../helpers/helpers";
import { useSelector, useDispatch } from "react-redux";

const ReactedUsers = (props) => {
  const getLoggedInUserDetails = useSelector(
    (state) => state.auth.authUserDetails
  );
  const [postId, setPostId] = useState(props.postId);
  const [isLoading, setIsLoading] = useState(true);
  const [reactedUsers, setReactedUsers] = useState();

  const getFetchedPosts = useSelector((state) => state.central.fetchedPosts);

  useEffect(() => {
    doFilterPostReactions();
  }, []);

  const doFilterPostReactions = async () => {
    console.log("getFetchedPosts are below");
    console.log(getFetchedPosts);
    let getPost = await getFetchedPosts.filter((post) => post._id === postId);
    console.log("getPost is below");
    console.log(getPost);
    let getReactedUsers = getPost[0].reactions;
    console.log(getReactedUsers);
    let getMappedReactedUsers = getReactedUsers.map((reactedUser) => {
      return {
        ...reactedUser,
        isRequested: false,
        isDeleted: false,
        isAccepted: false,
        status: "none",
      };
    });
    setReactedUsers(getMappedReactedUsers);
    setIsLoading(false);
  };

  const cancelRequest = (friendId) => {
    console.log("friendId -> " + friendId);

    let mapper = reactedUsers.map((friend) => {
      if (friend._id === friendId) {
        return { ...friend, isCancelling: false, isCancelled: true };
      } else {
        return friend;
      }
    });

    setReactedUsers(mapper);
  };

  const deleteRequest = (friendId) => {
    console.log("friendId -> " + friendId);

    let mapper = reactedUsers.map((friend) => {
      if (friend._id === friendId) {
        return { ...friend, isDeleting: false, isDeleted: true };
      } else {
        return friend;
      }
    });

    setReactedUsers(mapper);
  };

  const acceptRequest = (friendId) => {
    console.log("friendId -> " + friendId);

    let mapper = reactedUsers.map((friend) => {
      if (friend._id === friendId) {
        return { ...friend, isAccepting: false, isAccepted: true };
      } else {
        return friend;
      }
    });

    setReactedUsers(mapper);
  };

  const sendRequest = (friendId) => {
    console.log("friendId -> " + friendId);

    let mapper = reactedUsers.map((friend) => {
      if (friend._id === friendId) {
        return { ...friend, isRequesting: false, isRequested: true };
      } else {
        return friend;
      }
    });

    setReactedUsers(mapper);
  };

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
    var idDropdowns = document.getElementById("dropdown-container-frnd-" + id);
    if (!idDropdowns.classList.contains("show")) {
      idDropdowns.classList.add("show");
    }
  };

  return (
    <Fragment>
      {isLoading && (
        <div>
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

      {!isLoading && reactedUsers.length === 0 && (
        <div className="single-item">
          <div className="emptyRecords"> No Reactions yet </div>
        </div>
      )}

      {!isLoading && reactedUsers.length > 0 && (
        <div className="search-component-container">
          <div className="friends-container no-border-shadow-margin-top-10">
            {reactedUsers &&
              reactedUsers.length > 0 &&
              reactedUsers.map((reactedUser) => {
                let singleReactedUserDetails = reactedUser.reactedBy;
                let reactedUserPrimaryDp = singleReactedUserDetails.primaryDp
                  ? serverPhotoUrl + singleReactedUserDetails.primaryDp
                  : defaultAvatar;

                let reactedUserSecondaryDp = singleReactedUserDetails.secondaryDp
                  ? serverPhotoUrl + singleReactedUserDetails.secondaryDp
                  : defaultAvatar;

                let reactedUserFullname = singleReactedUserDetails.fullName;
                let reactedUserUsername = singleReactedUserDetails.username;

                let isSelf = false;
                if (singleReactedUserDetails._id === getLoggedInUserDetails._id)
                  isSelf = true;

                return (
                  <div
                    className="individual-friend-user-details-container"
                    key={reactedUser._id}
                  >
                    <div className="individual-friend-user-dps-container">
                      <Link
                        to={`/${reactedUserUsername}`}
                        className="individual-friend-user-dp-primary-a"
                      >
                        <img
                          className="individual-friend-user-dp individual-friend-user-dp-primary"
                          src={reactedUserPrimaryDp}
                          alt="avatar"
                        />
                      </Link>
                      <Link to={`/${reactedUserUsername}`}>
                        <img
                          className="individual-friend-user-dp individual-friend-user-dp-secondary"
                          src={reactedUserSecondaryDp}
                          alt="avatar"
                        />
                      </Link>
                    </div>
                    <div className="individual-friend-details-div">
                      <div className="post-details-div individual-friend-div">
                        <Link to={`/${reactedUserUsername}`}>
                          {reactedUserFullname}
                        </Link>
                      </div>
                    </div>

                    {/* Sent Request related - starts */}
                    {reactedUser.status === "sent" && !reactedUser.isCancelled && (
                      <div
                        className="action-items-dropdown"
                        onClick={() => dropdownOpener(reactedUser._id)}
                      >
                        <button className="activityButton friends-actions contains">
                          Request Sent <i className="arrow down"></i>
                        </button>
                        <div
                          id={"dropdown-container-frnd-" + reactedUser._id}
                          className="dropdown-action-items-container"
                        >
                          <ul>
                            <li>View Profile</li>
                            <li onClick={() => cancelRequest(reactedUser._id)}>
                              Cancel Request
                            </li>
                          </ul>
                        </div>
                      </div>
                    )}
                    {reactedUser.status === "sent" && reactedUser.isCancelled && (
                      <div className="action-items-dropdown">
                        <button
                          className="activityButton friends-actions deleted-button"
                          disabled={true}
                        >
                          Request Cancelled
                        </button>
                      </div>
                    )}
                    {/* Sent Request related - ends */}

                    {/* Pending Request related - starts */}
                    {reactedUser.status === "pending" &&
                      !reactedUser.isDeleted &&
                      !reactedUser.isAccepted && (
                        <div
                          className="action-items-dropdown"
                          onClick={() => dropdownOpener(reactedUser._id)}
                        >
                          <button className="activityButton friends-actions contains">
                            Respond to Request <i className="arrow down"></i>
                          </button>
                          <div
                            id={"dropdown-container-frnd-" + reactedUser._id}
                            className="dropdown-action-items-container"
                          >
                            <ul>
                              <li>View Profile</li>
                              <li
                                onClick={() => deleteRequest(reactedUser._id)}
                              >
                                Delete Request
                              </li>
                              <li
                                onClick={() => acceptRequest(reactedUser._id)}
                              >
                                Accept Request
                              </li>
                            </ul>
                          </div>
                        </div>
                      )}
                    {reactedUser.status === "pending" && reactedUser.isDeleted && (
                      <div className="action-items-dropdown">
                        <button
                          className="activityButton friends-actions deleted-button"
                          disabled={true}
                        >
                          Request Deleted
                        </button>
                      </div>
                    )}
                    {reactedUser.status === "pending" &&
                      reactedUser.isAccepted && (
                        <div className="action-items-dropdown">
                          <button
                            className="activityButton friends-actions default-cursor"
                            disabled={true}
                          >
                            Friend
                          </button>
                        </div>
                      )}
                    {/* Pending Request related - ends */}

                    {/* Add Friend related -starts */}
                    {reactedUser.status === "none" &&
                      !reactedUser.isRequested &&
                      !isSelf && (
                        <div
                          className="action-items-dropdown"
                          onClick={() => sendRequest(reactedUser._id)}
                        >
                          <button className="activityButton friends-actions">
                            +Add Friend
                          </button>
                        </div>
                      )}
                    {reactedUser.status === "none" && reactedUser.isRequested && (
                      <div className="action-items-dropdown">
                        <button
                          className="activityButton friends-actions accepted-button"
                          disabled={true}
                        >
                          Request Sent
                        </button>
                      </div>
                    )}

                    {/* Self related -starts */}
                    {reactedUser.status === "none" && isSelf && (
                      <div className="action-items-dropdown">
                        <button className="create-flipcard-front-photo-upload-button default-cursor">
                          You
                        </button>
                      </div>
                    )}
                    {/* Self related -ends */}

                    {/* Already Friend related -starts */}
                    {reactedUser.status === "friend" && (
                      <div className="action-items-dropdown">
                        <button className="activityButton friends-actions">
                          Friend
                        </button>
                      </div>
                    )}
                    {/* Already Friend related -ends */}
                  </div>
                );
              })}
            ;
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ReactedUsers;
