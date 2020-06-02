import React, { useState, useEffect } from "react";
import "./about.css";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const About = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [profileDetails, setProfileDetails] = useState(
    props.centralState.profilePageUserDetails
  );
  useEffect(() => {
    // window.scrollTo(0, 0);
    if (props.centralState.profilePageUserDetails) {
      setProfileDetails(props.centralState.profilePageUserDetails);
      setIsLoading(false);
    }
  }, [props.centralState.profilePageUserDetails]);

  return (
    <div className="about-container">
      <div className="about-container-header">About</div>

      {isLoading && (
        <div style={{ padding: "30px", textAlign: "center", width: "100%" }}>
          Loading...
        </div>
      )}

      {!isLoading && profileDetails && (
        <div className="about">
          <div className="individual-setting-div">
            <div className="about-heading">Username</div>
            <div className="about-heading">-</div>
            <div className="about-edit">{profileDetails.username}</div>
          </div>

          <div className="individual-setting-div">
            <div className="about-heading">Full Name</div>
            <div className="about-heading">-</div>
            <div className="about-edit">{profileDetails.fullName}</div>
          </div>

          <div className="individual-setting-div">
            <div className="about-heading">Gender</div>
            <div className="about-heading">-</div>
            <div className="about-edit">Male</div>
          </div>

          <div className="individual-setting-div">
            <div className="about-heading">Joined Date</div>
            <div className="about-heading">-</div>
            <div className="about-edit">25th March 2020</div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    centralState: state.central,
  };
};

export default withRouter(connect(mapStateToProps, null)(About));
