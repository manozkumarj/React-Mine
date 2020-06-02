import React, { useState, useEffect } from "react";
import "./settings.css";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const Settings = (props) => {
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
    <div className="settings-container">
      <div className="settings-container-header">Settings</div>

      {isLoading && (
        <div style={{ padding: "30px", textAlign: "center", width: "100%" }}>
          Loading...
        </div>
      )}

      {!isLoading && profileDetails && (
        <div className="settings">
          <div className="individual-setting-div">
            <div className="settings-heading">Full Name</div>
            <div className="settings-edit">
              <input type="text" value={profileDetails.fullName} readOnly />
            </div>
          </div>
          <div className="individual-setting-div">
            <div className="settings-heading">Username</div>
            <div className="settings-edit">
              <input type="text" value={profileDetails.username} readOnly />
            </div>
          </div>
          <div className="individual-setting-div">
            <div className="settings-heading">Gender</div>
            <div className="settings-edit">
              <select className="settings-edit">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Only Other</option>
              </select>
            </div>
          </div>
          <div className="individual-setting-div">
            <button className="request-friendshp-btn">Save Changes</button>
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

export default withRouter(connect(mapStateToProps, null)(Settings));
