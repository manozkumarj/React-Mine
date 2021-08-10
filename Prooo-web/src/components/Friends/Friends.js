import React, { useState, useEffect } from "react";
import "./friends.css";
import { Link } from "react-router-dom";

// Import images
import defaultAvatar from "./../../images/avatar.png";

import { serverPhotoUrl } from "./../../helpers/helpers";
import { useSelector, useDispatch } from "react-redux";

const Friends = (props) => {
  const authState = useSelector((state) => state.auth);

  const [isLoading, setIsLoading] = useState(true);
  const [authUserFriends, setAuthUserFriends] = useState(
    authState.authUserDetails.friends
  );
  const [profileUserFriends, setProfileUserFriends] = useState([]);

  const [authUserId, setAuthUserId] = useState(authState.authUserDetails._id);
  const [profileUserId, setProfileUserId] = useState(null);

  const dispatch = useDispatch();

  // const [friends, setFriends] = useState([
  //   { id: 10, name: "Manoj Kumar" },
  //   { id: 11, name: "Mahesh Kumar" },
  //   { id: 12, name: "Kranthi" },
  //   { id: 13, name: "Mallesh" },
  //   { id: 14, name: "Ramesh" },
  // ]);

  useEffect(() => {
    if (authState.profileUserDetails) {
      setIsLoading(true);

      setAuthUserId(authState.authUserDetails._id);

      setProfileUserId(authState.profileUserDetails._id);
      setAuthUserFriends(authState.authUserDetails.friends);

      let getAuthUserId = authState.authUserDetails._id;
      let getProfileUserId = authState.profileUserDetails._id;

      let getAuthUserFriends = authState.authUserDetails.friends;

      let getProfileUserAllFriends = authState.profileUserDetails.friends;

      let getProfileUserFriends = getProfileUserAllFriends.filter(
        (singleFriend) => singleFriend.status === "friend"
      );

      let mapProfileFriends = getProfileUserFriends.map((user) => {
        console.log(user);

        let profileFriendsLoopUser = user.friendId._id;
        let relationshipStatus = "none";

        if (getAuthUserFriends.length > 0) {
          let getProfileUserIdFromAuthUserFriendsList = getAuthUserFriends.filter(
            (friend) => {
              return friend.friendId._id === profileFriendsLoopUser;
            }
          );

          console.log(getProfileUserIdFromAuthUserFriendsList);

          getProfileUserIdFromAuthUserFriendsList =
            getProfileUserIdFromAuthUserFriendsList[0];

          console.log(getProfileUserIdFromAuthUserFriendsList);

          if (getProfileUserIdFromAuthUserFriendsList) {
            let getStatus = getProfileUserIdFromAuthUserFriendsList.status;
            console.log(getStatus);
            relationshipStatus = getStatus;
          }
        }

        return {
          ...user,
          isRequested: false,
          isDeleted: false,
          isAccepted: false,
          status: relationshipStatus,
        };
      });

      setProfileUserFriends(mapProfileFriends);
      setIsLoading(false);
    }
  }, [authState.profileUserDetails]);

  const cancelRequest = (friendId) => {
    console.log("friendId -> " + friendId);

    let mapper = profileUserFriends.map((friend) => {
      if (friend._id === friendId) {
        return { ...friend, isCancelling: false, isCancelled: true };
      } else {
        return friend;
      }
    });

    setProfileUserFriends(mapper);
  };

  const deleteRequest = (friendId) => {
    console.log("friendId -> " + friendId);

    let mapper = profileUserFriends.map((friend) => {
      if (friend._id === friendId) {
        return { ...friend, isDeleting: false, isDeleted: true };
      } else {
        return friend;
      }
    });

    setProfileUserFriends(mapper);
  };

  const acceptRequest = (friendId) => {
    console.log("friendId -> " + friendId);

    let mapper = profileUserFriends.map((friend) => {
      if (friend._id === friendId) {
        return { ...friend, isAccepting: false, isAccepted: true };
      } else {
        return friend;
      }
    });

    setProfileUserFriends(mapper);
  };

  const sendRequest = (friendId) => {
    console.log("friendId -> " + friendId);

    let mapper = profileUserFriends.map((friend) => {
      if (friend._id === friendId) {
        return { ...friend, isRequesting: false, isRequested: true };
      } else {
        return friend;
      }
    });

    setProfileUserFriends(mapper);
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
    <div className="friends-container">
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
      {!isLoading && profileUserFriends && profileUserFriends.length === 0 && (
        <div className="emptyRecords"> No Friends to show </div>
      )}
      {!isLoading && profileUserFriends.length > 0 && (
        <div className="friends-header">
          Friends - {profileUserFriends.length}
        </div>
      )}
      {!isLoading &&
        profileUserFriends &&
        profileUserFriends.length > 0 &&
        profileUserFriends.map((profileUserFriend) => {
          console.log(profileUserFriend);

          let singleProfileUserFriend = profileUserFriend.friendId;

          let profileUserFriendPrimaryDp = singleProfileUserFriend.primaryDp
            ? serverPhotoUrl + singleProfileUserFriend.primaryDp
            : defaultAvatar;

          let profileUserFriendSecondaryDp = singleProfileUserFriend.secondaryDp
            ? serverPhotoUrl + singleProfileUserFriend.secondaryDp
            : defaultAvatar;

          let profileUserFriendFullname = singleProfileUserFriend.fullName;
          let profileUserFriendUsername = singleProfileUserFriend.username;

          let isSelf = false;
          if (singleProfileUserFriend._id === authUserId) isSelf = true;

          return (
            <div
              className="individual-friend-user-details-container"
              key={singleProfileUserFriend._id}
            >
              <div className="individual-friend-user-dps-container">
                <Link
                  to={`/${profileUserFriendUsername}`}
                  className="individual-friend-user-dp-primary-a"
                >
                  <img
                    className="individual-friend-user-dp individual-friend-user-dp-primary"
                    src={profileUserFriendPrimaryDp}
                    alt="avatar"
                  />
                </Link>
                <Link to={`/${profileUserFriendUsername}`}>
                  <img
                    className="individual-friend-user-dp individual-friend-user-dp-secondary"
                    src={profileUserFriendSecondaryDp}
                    alt="avatar"
                  />
                </Link>
              </div>
              <div className="individual-friend-details-div">
                <div className="post-details-div individual-friend-div">
                  <Link to={`/${profileUserFriendUsername}`}>
                    {profileUserFriendFullname}
                  </Link>
                </div>
              </div>

              {/* Sent Request related - starts */}
              {profileUserFriend.status === "sent" &&
                !profileUserFriend.isCancelled && (
                  <div
                    className="action-items-dropdown"
                    onClick={() => dropdownOpener(profileUserFriend._id)}
                  >
                    <button className="activityButton friends-actions contains">
                      Request Sent <i className="arrow down"></i>
                    </button>
                    <div
                      id={"dropdown-container-frnd-" + profileUserFriend._id}
                      className="dropdown-action-items-container"
                    >
                      <ul>
                        <li
                          className="negative-li"
                          onClick={() => cancelRequest(profileUserFriend._id)}
                        >
                          Cancel Request
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              {profileUserFriend.status === "sent" &&
                profileUserFriend.isCancelled && (
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
              {profileUserFriend.status === "pending" &&
                !profileUserFriend.isDeleted &&
                !profileUserFriend.isAccepted && (
                  <div
                    className="action-items-dropdown"
                    onClick={() => dropdownOpener(profileUserFriend._id)}
                  >
                    <button className="activityButton friends-actions contains">
                      Respond to Request <i className="arrow down"></i>
                    </button>
                    <div
                      id={"dropdown-container-frnd-" + profileUserFriend._id}
                      className="dropdown-action-items-container"
                    >
                      <ul>
                        <li
                          className="positive-li"
                          onClick={() => acceptRequest(profileUserFriend._id)}
                        >
                          Accept Request
                        </li>
                        <li
                          className="negative-li"
                          onClick={() => deleteRequest(profileUserFriend._id)}
                        >
                          Delete Request
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              {profileUserFriend.status === "pending" &&
                profileUserFriend.isDeleted && (
                  <div className="action-items-dropdown">
                    <button
                      className="activityButton friends-actions deleted-button"
                      disabled={true}
                    >
                      Request Deleted
                    </button>
                  </div>
                )}
              {profileUserFriend.status === "pending" &&
                profileUserFriend.isAccepted && (
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
              {profileUserFriend.status === "none" &&
                !profileUserFriend.isRequested &&
                !isSelf && (
                  <div
                    className="action-items-dropdown"
                    onClick={() => sendRequest(profileUserFriend._id)}
                  >
                    <button className="activityButton friends-actions">
                      +Add Friend
                    </button>
                  </div>
                )}
              {profileUserFriend.status === "none" &&
                profileUserFriend.isRequested && (
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
              {profileUserFriend.status === "none" && isSelf && (
                <div className="action-items-dropdown">
                  <button className="create-flipcard-front-photo-upload-button default-cursor">
                    You
                  </button>
                </div>
              )}
              {/* Self related -ends */}

              {/* Already Friend related -starts */}
              {profileUserFriend.status === "friend" && (
                <div className="action-items-dropdown">
                  <button className="activityButton friends-actions default-cursor">
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
  );
};

export default Friends;
