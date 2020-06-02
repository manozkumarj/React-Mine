import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./profileLeftSideSection.css";
// import zuck from "../../../images/zuck.jpg";
// import mark from "../../../images/mark.jpg";
import defaultAvatar from "../../../images/avatar.png";
import { connect } from "react-redux";

const ProfileLeftSideSection = (props) => {
  const [imagesUrl, setImagesUrl] = useState("http://localhost:8088/photo/");
  const [userPrimaryDp, setUserPrimaryDp] = useState(defaultAvatar);
  const [userSecondaryDp, setUserSecondaryDp] = useState(defaultAvatar);
  const [username, setUsername] = useState(null);
  const [fullname, setFullname] = useState("Loading...");
  const [id, setId] = useState("");
  const [
    isSessionAndProfileUserSame,
    setIsSessionAndProfileUserSame,
  ] = useState(false);

  useEffect(() => {
    setImagesUrl("http://localhost:8088/photo/");
    if (
      props.centralState.authToken &&
      props.centralState.profilePageUserDetails
    ) {
      setUserPrimaryDp(
        props.centralState.profilePageUserDetails.primaryDp
          ? imagesUrl + props.centralState.profilePageUserDetails.primaryDp
          : defaultAvatar
      );

      setUserSecondaryDp(
        props.centralState.profilePageUserDetails.secondaryDp
          ? imagesUrl + props.centralState.profilePageUserDetails.secondaryDp
          : defaultAvatar
      );

      setUsername(props.centralState.profilePageUserDetails.username);
      setFullname(props.centralState.profilePageUserDetails.fullName);

      if (
        props.centralState.profilePageUserDetails.username ===
        props.centralState.loggedInUserDetails.username
      ) {
        setIsSessionAndProfileUserSame(true);
      } else {
        setIsSessionAndProfileUserSame(false);
      }
      // console.log(props.centralState.profilePageUserDetails);
    }
  }, [props.centralState]);

  useEffect(() => {
    if (isSessionAndProfileUserSame) setId("change-dp");
    else setId("");
  }, [isSessionAndProfileUserSame]);

  return (
    <div className="fixed-div" id="left-fixed-div">
      <div className="profileSection">
        <div className="profileDpsSection">
          <div
            className="dp-div primary-dp"
            id={id}
            data-type="Primary"
            data-file-type="dp"
          >
            {id && <span>change</span>}
            <img
              id="primary-dp-src"
              className="dp-img"
              src={userPrimaryDp}
              alt="User name"
              width="120px"
            />
          </div>
          <div
            className="dp-div secondary-dp"
            id={id}
            data-type="Secondary"
            data-file-type="dp"
          >
            {id && <span>change</span>}
            <img
              id="secondary-dp-src"
              className="dp-img"
              src={userSecondaryDp}
              alt="User name"
              width="120px"
            />
          </div>
        </div>

        <div className="userFullnameDiv">
          <Link to={"/" + username} className="hover-ul">
            {fullname}
          </Link>
        </div>

        <div className="animateLinksDiv">
          <ul className="profileRelatedLinks">
            <li>
              <Link to={"/" + username}>Timeline</Link>
            </li>
            <li>
              <Link to={"/" + username + "/photos"}>Photos</Link>
            </li>
            <li>
              <Link to={"/" + username + "/friends"}>Friends</Link>
            </li>
            <li>
              <Link to={"/" + username}>View Profile</Link>
            </li>
            <li>
              <Link to={"/" + username + "/settings"}>Settings</Link>
            </li>
            <li>
              <Link to={"/" + username + "/about"}>About</Link>
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

export default connect(mapStateToProps, null)(ProfileLeftSideSection);
