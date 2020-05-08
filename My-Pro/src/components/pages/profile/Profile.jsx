import React, { useEffect } from "react";
import "./profile.css";
import MiddleSection from "./../../layouts/middleSection/MiddleSection";
import RightSideSection from "./../../layouts/rightSideSection/RightSideSection";
import ProfileLeftSideSection from "./../../layouts/profileLeftSideSection/ProfileLeftSideSection";
import wow2 from "../../../images/wow_2.jpg";

import overlayClose from "../../../images/overlay-close.png";
import fancyClose from "../../../images/fancy-close.png";

export default function Profile() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/js/croppie.js";
    script.async = true;
    document.body.appendChild(script);

    const script_1 = document.createElement("script");
    script_1.src = "/js/dp-change.js";
    script_1.async = true;
    document.body.appendChild(script_1);
  }, []);

  return (
    <div className="three-divs-container" id="main">
      <div className="left-and-middle-divs-container">
        <div className="left-section">
          <ProfileLeftSideSection />
        </div>

        <div className="middle-section">
          <div className="timeline-pic-div">
            <img src={wow2} alt="timeline view" />
            <span className="absolute-bottom-right">Change image</span>
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
              <span id="dp-change-type">Primary</span> profile change
            </h2>
            <hr className="dividable-hr" />

            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-8 text-center">
                      <div id="image_cropper_view"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* DPs change popups - ends */}
    </div>
  );
}
