import React, { useState, useEffect, Fragment } from "react";
import "./about.css";

import { useSelector } from "react-redux";
import { getNiceTimestamp } from "./../../helpers/helpers";

const About = () => {
  const authState = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const [profileUserDetails, setprofileUserDetails] = useState();

  useEffect(() => {
    if (authState.profileUserDetails) {
      setIsLoading(true);
      setprofileUserDetails(authState.profileUserDetails);
      setIsLoading(false);
    }
  }, [authState.profileUserDetails]);

  return (
    <div className="about-container">
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

      {!isLoading && (
        <Fragment>
          <div className="about-header">About</div>
          <div className="profile-user-details-container">
            <div className="user-details-field-container">
              <span className="user-details-field-label">Full Name</span>
              <div className="user-details-field">
                {profileUserDetails.fullName}
              </div>
            </div>
            <div className="user-details-field-container">
              <span className="user-details-field-label">Email</span>
              <div className="user-details-field">
                {profileUserDetails.email}
              </div>
            </div>
            <div className="user-details-field-container">
              <span className="user-details-field-label">Gender</span>
              <div className="user-details-field">
                {profileUserDetails.genderId === 1 ? "Male" : "Female"}
              </div>
            </div>
            <div className="user-details-field-container">
              <span className="user-details-field-label">Username</span>
              <div className="user-details-field">
                {profileUserDetails.username}
              </div>
            </div>
            <div className="user-details-field-container">
              <span className="user-details-field-label">Joined on</span>
              <div className="user-details-field">
                {getNiceTimestamp(+profileUserDetails.milliseconds)}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default About;
