import React, { Fragment } from "react";
import "./photosPostDisplayer.css";

import { serverPhotoUrl } from "./../../helpers/helpers";

const PhotosPostDisplayer = (props) => {
  const { postData, postId } = props;

  const handleOpenPhoto = () => {
    props.openPhotoModal(postId, postData[0]["photos"][0]);
  };
  return (
    <Fragment>
      {postData[0].postContent && (
        <div className="post-description-container">
          <div className="post-description">{postData[0].postContent}</div>
        </div>
      )}

      <div className="post-picture-div">
        <img
          src={serverPhotoUrl + postData[0]["photos"][0]}
          alt="Post info"
          className="view-image"
          alt="uploaded"
          onClick={handleOpenPhoto}
        />
      </div>
    </Fragment>
  );
};

export default PhotosPostDisplayer;
