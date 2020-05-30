import React, { useEffect, useRef } from "react";
import "./profile.css";
import { withRouter } from "react-router-dom";
import MiddleSection from "./../../layouts/middleSection/MiddleSection";
import RightSideSection from "./../../layouts/rightSideSection/RightSideSection";
import ProfileLeftSideSection from "./../../layouts/profileLeftSideSection/ProfileLeftSideSection";
import wow2 from "../../../images/wow_2.jpg";

import overlayClose from "../../../images/overlay-close.png";
import fancyClose from "../../../images/fancy-close.png";
import { connect } from "react-redux";
import {
  getAllUsersPosts,
  getIndividualUserPosts,
  getProfileUserDetailsAndPosts,
} from "./../../../redux/actionCreators";

const Profile = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    const script = document.createElement("script");
    script.src = "/js/croppie.js";
    script.async = true;
    document.body.appendChild(script);

    const script_1 = document.createElement("script");
    script_1.src = "/js/dp-change.js";
    script_1.async = true;
    document.body.appendChild(script_1);
  }, []);

  useEffect(() => {
    console.log(props);
  }, [props]);

  useEffect(() => {
    let username = props.match.params.username;
    console.log("Path is -> " + props.match.path);

    if (username == props.centralState.loggedInUserDetails.username) {
      props.centralState.profilePageUserDetails =
        props.centralState.loggedInUserDetails;
      props.getIndividualUserPosts(props.centralState.loggedInUserDetails._id);
    } else {
      props.getProfileUserDetailsAndPosts(username);
    }
  }, [props.match]);

  const filesPickerRef = useRef();

  const pickImagesHandler = () => {
    filesPickerRef.current.click();
    console.log("Input file triggered");
  };

  return (
    <div className="three-divs-container" id="main">
      <div className="left-and-middle-divs-container">
        <div className="left-section">
          <ProfileLeftSideSection />
        </div>

        <div className="middle-section">
          <div className="timeline-pic-div">
            <img src={wow2} alt="timeline view" />
            <span
              className="absolute-bottom-right"
              id="change-timeline"
              data-file-type="timeline"
            >
              Change image
            </span>
          </div>
          <div className="left-right-holders">
            <div className="total-friends-count">Friends - 15</div>
            <div className="interact-with-current-user">
              <button className="request-friendshp-btn">
                Request Friendship
              </button>
            </div>
          </div>
          <MiddleSection />
        </div>
      </div>

      <div className="right-section">
        <RightSideSection />
      </div>

      {/* <input type="file" id="hiddenFile" /> */}

      {/* DPs change popups - starts */}
      <div
        id="dp_change_layerOneModalContainer"
        tabIndex="1"
        className="dp_change_layerOneModalContainer"
      >
        <span className="overlay_close layerOneCloser" title="close">
          <img height="20" src={overlayClose} alt="closer" />
        </span>

        <div className="dp_change_layerOneModalInner">
          <div className="dp_change_main">
            <span className="fancyCloseIcon layerOneCloser" title="close">
              <img height="30" src={fancyClose} alt="closer" />
            </span>
            <h2 className="global-style">
              <span id="dp-and-timeline-change-title">
                Primary profile change
              </span>
            </h2>
            <hr className="dividable-hr" />

            <div className="modal-dialog" id="dp_img_change_croppie_modal">
              <div className="modal-content">
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-8 text-center">
                      <div id="dp_image_cropper_view"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="modal-dialog"
              id="timeline_img_change_croppie_modal"
            >
              <div className="modal-content">
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-8 text-center">
                      <div id="timeline_image_cropper_view"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="upload-new-dp-container">
              <input
                type="file"
                id="dp-upload"
                style={{ display: "none" }}
                accept=".png, .jpg, .jpeg"
                ref={filesPickerRef}
              />
              <div id="upload-new-dp" onClick={pickImagesHandler}>
                Upload an Image
              </div>

              <div id="crop-selected-part">Crop Image</div>
            </div>

            <hr className="dividable-hr" />

            <div className="layerOne-post-actions-div">
              <button className="layerOne-close-btn layerOneCloser">
                Cancel
              </button>
              <button id="update-dp" className="post-button">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* DPs change popups - ends */}
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
    getIndividualUserPosts: (token, userId) =>
      dispatch(getIndividualUserPosts(token, userId)),
    getAllUsersPosts: () => dispatch(getAllUsersPosts()),
    getProfileUserDetailsAndPosts: (username) =>
      dispatch(getProfileUserDetailsAndPosts(username)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Profile)
);
