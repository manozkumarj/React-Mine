import React, { useState, useEffect } from "react";
import "./photos.css";

// Import images
import overlayClose from "./../../icons/overlay-close.png";
import kohli from "./../../images/kohli.jpg";
import zuck from "./../../images/zuck.jpg";
const Photos = () => {
  const [openPhotoPostModal, setOpenPhotoPostModal] = useState(false);
  const [modalPhoto, setModalPhoto] = useState(null);
  var dropdowns = document.getElementsByClassName(
    "dropdown-action-items-container"
  );

  useEffect(() => {
    window.onpopstate = () => {
      console.log("Going back");
      handlePhotoPostCloseModal();
    };

    // store.addNotification({
    //   title: "Wonderful!",
    //   message: "teodosii@react-notifications-component",
    //   type: "success",
    //   insert: "bottom",
    //   container: "bottom-left",
    //   animationIn: ["animated", "fadeIn"],
    //   animationOut: ["animated", "fadeOut"],
    //   dismiss: {
    //     duration: 10000,
    //     onScreen: true,
    //   },
    // });
  });

  const viewPhoto = (photoSrc) => {
    console.log("photoSrc -> " + photoSrc);
    window.history.pushState(null, "", "post/123456/photo" + photoSrc);

    // window.history.replaceState(
    //   null,
    //   "New Page Title",
    //   "http://localhost:3000/profile/photos/photo/123456"
    // );

    setModalPhoto(photoSrc);
    const body = document.body;
    // body.style.height = "100vh";
    body.style.overflowY = "hidden";

    setOpenPhotoPostModal(true);
    let box = document.getElementById("post-photo-modal-container");
    box.click();
    setTimeout(() => {
      box.focus();
      // box.scrollTop(0);
    }, 50);
  };

  const handlePhotoPostCloseModal = () => {
    const body = document.body;
    body.style.overflowY = "scroll";

    window.history.pushState(null, "", "/profile/photos");
    setOpenPhotoPostModal(false);
  };

  const dropdownOpener = (id) => {
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
    var idDropdowns = document.getElementById("dropdown-photo-container-" + id);
    if (!idDropdowns.classList.contains("show")) {
      idDropdowns.classList.add("show");
    }
  };

  return (
    <div className="photos-page-container">
      <div className="photos-header">Photos</div>
      <div className="photos-container">
        <div className="single-photo-container">
          <img
            src={kohli}
            alt="picc"
            className="single-photo pointer"
            onClick={() => viewPhoto(kohli)}
          />
          <span
            className="photo-vr-dots contains"
            id="post-more-options"
            title="Options"
            onClick={() => dropdownOpener(41)}
          >
            <div
              id="dropdown-photo-container-41"
              className="dropdown-action-items-container photo-dropdown-container"
            >
              <ul>
                <li>Make as Primary DP</li>
                <li>Make as Secondary DP</li>
              </ul>
            </div>
          </span>
        </div>
        <div className="single-photo-container">
          <img
            src={zuck}
            alt="picc"
            className="single-photo pointer"
            onClick={() => viewPhoto(zuck)}
          />
          <span
            className="photo-vr-dots contains"
            id="post-more-options"
            title="Options"
            onClick={() => dropdownOpener(42)}
          >
            <div
              id="dropdown-photo-container-42"
              className="dropdown-action-items-container photo-dropdown-container"
            >
              <ul>
                <li>Make as Primary DP</li>
                <li>Make as Secondary DP</li>
              </ul>
            </div>
          </span>
        </div>
      </div>

      {/* Photo post Modal - starts */}
      <div
        id="post-photo-modal-container"
        className="post-photo-modal-container"
        style={{ display: openPhotoPostModal ? "block" : "none" }}
        tabIndex={1}
      >
        <img
          height="20"
          src={overlayClose}
          alt="closer"
          className="overlayClose pointer"
          onClick={handlePhotoPostCloseModal}
        />
        <div className="post-photo-modal-inner-container">
          <div className="post-photo-modal-photo-container">
            <img src={modalPhoto} alt="picc" className="photo-in-modal" />
          </div>
          <div className="post-photo-modal-details-container"></div>
        </div>
      </div>
      {/* Photo post Modal - ends */}
    </div>
  );
};

export default Photos;
