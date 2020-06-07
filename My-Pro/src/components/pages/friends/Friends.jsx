import React, { useState, useEffect } from "react";
import "./friends.css";

import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

const Friends = (props) => {
  const [profileUserFriends, setProfileUserFriends] = useState(null);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // console.log(props);
    if (props.centralState.profilePageUserDetails) {
      let filterFriends = props.centralState.profilePageUserDetails.friends.filter(
        (friend) => friend.status === "friend"
      );
      setProfileUserFriends(filterFriends);
    }
  }, [props.centralState.profilePageUserDetails]);

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
            const handleUnfriend = (e) => {
              e.preventDefault();
              console.log("Unfriend " + friend.friendId);
            };
            return (
              <div className="individual-friend-div">
                <div className="friend-name">
                  <Link to="/profile" className="global-aTag-style">
                    {friend.friendId}
                  </Link>
                </div>
                <div className="friendship-status-div">
                  <div
                    className="friends-list-individual request-friendshp-btn"
                    id="individual-friend-div"
                    data-id={friend.friendId}
                  >
                    Friends <span> &#8595;</span>
                  </div>
                  <div
                    className="dropdown-content"
                    id={"dropd-" + friend.friendId}
                  >
                    <Link to={"/" + friend.friendId}>View Profile</Link>
                    <a href="#" onClick={handleUnfriend}>
                      Unfriend
                    </a>
                  </div>
                </div>
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

export default withRouter(connect(mapStateToProps, null)(Friends));
