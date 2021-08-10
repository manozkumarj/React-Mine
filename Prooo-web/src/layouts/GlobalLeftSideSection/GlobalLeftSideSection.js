import React, { useState, Fragment, useEffect } from "react";
import "./globalLeftSideSection.css";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

// Import images
import defaultAvatar from "./../../images/avatar.png";
import { serverPhotoUrl } from "./../../helpers/helpers";

const GlobalLeftSideSection = () => {
  const [authUserFullName, setAuthUserFullName] = useState(null);
  const [authUserPrimaryDp, setAuthUserPrimaryDp] = useState(null);
  const [authUserSecondaryDp, setAuthUserSecondaryDp] = useState(null);
  const [authUserUsername, setAuthUserUsername] = useState(null);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);

  const authDetails = useSelector((state) => state.auth);
  const authToken = useSelector((state) => state.auth.authToken);

  useEffect(() => {
    if (authToken) {
      let getPrimaryDp = authDetails.authUserDetails.primaryDp;
      if (getPrimaryDp) {
        setAuthUserPrimaryDp(serverPhotoUrl + getPrimaryDp);
      } else {
        setAuthUserPrimaryDp(defaultAvatar);
      }

      let getSecondaryDp = authDetails.authUserDetails.secondaryDp;
      if (getSecondaryDp) {
        setAuthUserSecondaryDp(serverPhotoUrl + getSecondaryDp);
      } else {
        setAuthUserSecondaryDp(defaultAvatar);
      }
      setAuthUserFullName(authDetails.authUserDetails.fullName);
      setAuthUserUsername(authDetails.authUserDetails.username);

      if (authDetails.authUserDetails.friends) {
        let getAuthUserFriends = authDetails.authUserDetails.friends;

        if (getAuthUserFriends.length > 0) {
          console.log("getAuthUserFriends are below");
          console.log(getAuthUserFriends);

          let pendingRequestsHolder = getAuthUserFriends.filter((friend) => {
            return friend.status === "pending";
          });

          let sentRequestsHolder = getAuthUserFriends.filter((friend) => {
            return friend.status === "sent";
          });

          setPendingRequests(pendingRequestsHolder);
          setSentRequests(sentRequestsHolder);
        }
      }
    }
  }, [authDetails]);

  return (
    <Fragment>
      <div className="auth-user-dps-lg-container">
        <img
          src={authUserPrimaryDp}
          alt="avatar-primary"
          className="auth-user-dp-primary auth-user-dp-lg"
        />
        <img
          src={authUserSecondaryDp}
          alt="avatar-secondary"
          className="auth-user-dp-secondary auth-user-dp-lg"
        />
      </div>
      <div className="auth-user-fullName-container">
        <Link
          className="highlight-a-tag-on-hover auth-user-fullName-lg"
          to={`/${authUserUsername}`}
        >
          {authUserFullName}
        </Link>
      </div>
      <div>
        <ul className="form">
          <li>
            <Link className="profile" to={`/${authUserUsername}`}>
              <i className="icon-user"></i>Profile
            </Link>
          </li>
          <li>
            <Link className="settings" to="/search">
              <i className="icon-cog"></i>Search
            </Link>
          </li>
          <li>
            <Link className="logout" to="/">
              <i className="icon-signout"></i>Friend Requests
              {pendingRequests.length > 0 && <em>{pendingRequests.length}</em>}
            </Link>
          </li>
          <li>
            <Link className="messages" to="/">
              <i className="icon-envelope-alt"></i>Sent Requests
              {sentRequests.length > 0 && <em>{sentRequests.length}</em>}
            </Link>
          </li>
        </ul>
      </div>
    </Fragment>
  );
};

export default GlobalLeftSideSection;
