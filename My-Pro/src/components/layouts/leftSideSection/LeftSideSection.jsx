import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./leftSideSection.css";
// import zuck from "../../../images/zuck.jpg";
// import mark from "../../../images/mark.jpg";
import defaultAvatar from "../../../images/avatar.png";
import { connect } from "react-redux";

const LeftSideSection = (props) => {
  const [imagesUrl, setImagesUrl] = useState(null);
  const [userPrimaryDp, setUserPrimaryDp] = useState(defaultAvatar);
  const [userSecondaryDp, setUserSecondaryDp] = useState(defaultAvatar);

  useEffect(() => {
    setImagesUrl("http://localhost:8088/photo/");
    if (props.centralState.authToken) {
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
    }
    // console.log(props);
  }, [props]);

  return (
    <div className="fixed-div" id="left-fixed-div">
      <div className="profileSection">
        <div className="profileDpsSection">
          <img
            src={userPrimaryDp}
            alt="User name"
            className="primary-dp"
            width="120px"
          />
          <img
            src={userSecondaryDp}
            alt="User name"
            className="secondary-dp"
            width="120px"
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
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/profile">View Profile</Link>
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
            <li>
              <Link to="/search">Search Friends</Link>
            </li>
            <li>
              <Link to="/post-types">Advanced Posts</Link>
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
