import React, { useState, useEffect } from "react";
import "./friends.css";

import { withRouter, Link } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { friendshipAction } from "./../../../redux/actionCreators";

const Friends = (props) => {
  let getCurrentLoggedInUserId = useSelector(
    (state) => state.central.loggedInUserId
  );
  const [profileUserFriends, setProfileUserFriends] = useState(null);
  const [currentLoggedInUserId, setCurrentLoggedInUserId] = useState(
    getCurrentLoggedInUserId
  );
  console.log("currentLoggedInUserId -> " + currentLoggedInUserId);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (
      props.centralState.profilePageUserDetails &&
      props.centralState.loggedInUserDetails.friends
    ) {
      let filterFriends = props.centralState.profilePageUserDetails.friends.filter(
        (friend) => friend.status === "friend"
      );
      setProfileUserFriends(filterFriends);
    }

    if (props.centralState.isRequestSucceeded) {
      console.log("Friend request action success");
    }
    if (props.centralState.hasRequestError) {
      alert("Friend request action failed");
    }
    console.log(props);
  }, [props, props.centralState.profilePageUserDetails]);

  return (
    <div className="friends-container">
      <div className="friends-container-header">
        Friends - {profileUserFriends && profileUserFriends.length}
      </div>
      <div className="friends">
        {profileUserFriends && profileUserFriends.length === 0 && (
          <div className="emptyRecords"> You have no Friends to show </div>
        )}

        {profileUserFriends &&
          profileUserFriends.length > 0 &&
          profileUserFriends.map((friend) => {
            console.log("friend Id -> " + friend.friendId._id);
            console.log(friend);
            const handleUnfriend = (e) => {
              e.preventDefault();
              let actionType = "unfriend";
              let friendId = friend.friendId._id;
              console.log("Unfriend friendId -> " + friendId);
              props.friendshipAction(friendId, actionType);
            };
            return (
              <div
                className="individual-friend-div"
                key={friend._id}
                id={"individual-friend-div-" + friend._id}
              >
                <div className="friend-name">
                  <Link
                    to={"/" + friend.friendId.username}
                    className="global-aTag-style"
                  >
                    {friend.friendId.fullName}
                  </Link>
                </div>

                {friend.friendId._id !== currentLoggedInUserId && (
                  <div className="friendship-status-div">
                    <div
                      className="friends-list-individual request-friendshp-btn"
                      id="individual-friend-div"
                      data-id={friend._id}
                    >
                      Friend <span> &#8595;</span>
                    </div>
                    <div
                      className="dropdown-content"
                      id={"dropd-" + friend._id}
                    >
                      <Link to={"/" + friend.friendId.username}>
                        View Profile
                      </Link>
                      <a
                        href="#"
                        className="unfriend-individual-user"
                        data-id={friend._id}
                        onClick={handleUnfriend}
                      >
                        Unfriend
                      </a>
                    </div>
                  </div>
                )}

                {friend.friendId._id === currentLoggedInUserId && "It's you"}
              </div>
            );
          })}
      </div>
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
    friendshipAction: (friendId, actionType) =>
      dispatch(friendshipAction(friendId, actionType)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Friends)
);
