import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./leftSideSection.css";
// import zuck from "../../../images/zuck.jpg";
// import mark from "../../../images/mark.jpg";
import defaultAvatar from "../../../images/avatar.png";
import { connect } from "react-redux";

const LeftSideSection = (props) => {
  const [imagesUrl, setImagesUrl] = useState("http://localhost:8088/photo/");
  const [userPrimaryDp, setUserPrimaryDp] = useState(defaultAvatar);
  const [userSecondaryDp, setUserSecondaryDp] = useState(defaultAvatar);
  const [loggedInUserDetails, setLoggedInUserDetails] = useState(null);
  const [friendRequests, setFriendRequests] = useState(null);
  const [sentFriendRequests, setSentFriendRequests] = useState(null);

  useEffect(() => {
    setImagesUrl("http://localhost:8088/photo/");
    if (props.centralState.authToken) {
      setLoggedInUserDetails(props.centralState.loggedInUserDetails);
      setUserPrimaryDp(
        props.centralState.loggedInUserDetails.primaryDp
          ? imagesUrl + props.centralState.loggedInUserDetails.primaryDp
          : defaultAvatar
      );

      setUserSecondaryDp(
        props.centralState.loggedInUserDetails.secondaryDp
          ? imagesUrl + props.centralState.loggedInUserDetails.secondaryDp
          : defaultAvatar
      );
      let friends = props.centralState.loggedInUserFriends;
      if (friends && friends.length > 0) {
        let requests = friends.filter((friend) => friend.status === "pending");
        setFriendRequests(requests.length);
        let sentRequests = friends.filter((friend) => friend.status === "sent");
        setSentFriendRequests(sentRequests.length);
      }
    }
    console.log(props);
  }, [props]);

  return (
    <div className="fixed-div" id="left-fixed-div">
      <div className="profileSection">
        <div className="profileDpsSection">
          <img
            src={userPrimaryDp}
            alt="User name"
            className="primary-dp dp-img"
          />
          <img
            src={userSecondaryDp}
            alt="User name"
            className="secondary-dp dp-img"
          />
        </div>

        <div className="userFullnameDiv">
          <Link
            to={"/" + props.centralState.loggedInUserUsername}
            className="hover-ul"
          >
            {props.centralState.loggedInUserDetails.fullName}
          </Link>
        </div>

        <div className="animateLinksDiv">
          <ul className="nav">
            <li>
              <Link to={"/" + props.centralState.loggedInUserUsername}>
                Profile
              </Link>
            </li>
            <li>
              <Link to="/search">Search Friends</Link>
            </li>
            <li>
              <Link to="/post-types">Advanced Posts</Link>
            </li>

            <li>
              <Link to="/friend-requests">
                Friend Requests - {friendRequests}
              </Link>
            </li>
            <li>
              <Link to="/sent-requests">
                Sent Friend Requests - {sentFriendRequests}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    centralState: state.central,
  };
};

export default connect(mapStateToProps, null)(LeftSideSection);
