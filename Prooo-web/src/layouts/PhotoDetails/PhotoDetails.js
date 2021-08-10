import React, { Fragment, useState, useEffect } from "react";
import "./photoDetails.css";

import { useSelector } from "react-redux";
import { serverPhotoUrl } from "./../../helpers/helpers";

// Import images
import leftArrow from "./../../icons/left_arrow.png";
import rightArrow from "./../../icons/right_arrow.png";

const PhotoDetails = (props) => {
  const getFetchedPosts = useSelector((state) => state.central.fetchedPosts);

  const [postId, setPostId] = useState(props.postId);
  const [photos, setPhotos] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [totalNumberOfPhotos, setTotalNumberOfPhotos] = useState();
  const [currentPhotoNumber, setCurrentPhotoNumber] = useState(0);

  useEffect(() => {
    doFilterPosts();
    // setPhoto(props.post.photoSrc);
  }, []);

  const doFilterPosts = async () => {
    console.log("getFetchedPosts are below");
    console.log(getFetchedPosts);
    let getPost = await getFetchedPosts.filter((post) => post._id === postId);
    console.log("getPost is below");
    console.log(getPost);
    setPhotos(getPost[0].postProperties[0].photos);
    let totalPhotos = getPost[0].postProperties[0].photos.length;
    setTotalNumberOfPhotos(totalPhotos - 1);

    setPhoto(getPost[0].postProperties[0].photos[0]);
  };

  const handleNextClick = () => {
    setPhoto(photos[currentPhotoNumber + 1]);
    setCurrentPhotoNumber(currentPhotoNumber + 1);
  };
  const handlePreviousClick = () => {
    setPhoto(photos[currentPhotoNumber - 1]);
    setCurrentPhotoNumber(currentPhotoNumber - 1);
  };

  return (
    <Fragment>
      <div
        className="post-photo-modal-photo-container"
        id="post-photo-modal-photo-container"
      >
        {currentPhotoNumber > 0 && (
          <img
            src={leftArrow}
            alt="leftArrow"
            className="leftArrow-in-modal"
            title="Previous"
            onClick={handlePreviousClick}
          />
        )}
        <img
          src={serverPhotoUrl + photo}
          alt="picc"
          className="photo-in-modal"
        />
        {totalNumberOfPhotos > currentPhotoNumber && (
          <img
            src={rightArrow}
            alt="rightArrow"
            className="rightArrow-in-modal"
            title="Next"
            onClick={handleNextClick}
          />
        )}
      </div>
    </Fragment>
  );
};

export default PhotoDetails;
