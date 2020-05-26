import React, { Fragment } from "react";
import "./photosPost.css";

const PhotosPost = (props) => {
  const { postData } = props;
  let photosCount = postData[0]["photos"].length;
  let firstPhoto = postData[0]["photos"][0];
  let firstPhotoSrc = "http://localhost:8088/photo/" + firstPhoto;
  return (
    <Fragment>
      <div className="post-description-div">
        <span className="post-description">{postData[0].postContent}</span>
      </div>
      <div className="post-picture-div">
        <img
          src={firstPhotoSrc}
          alt="Post info"
          className="view-image"
          alt="uploaded"
        />
        {photosCount > 1 && (
          <span className="absolute-bottom-right">1 of {photosCount}</span>
        )}
      </div>
    </Fragment>
  );
};

export default PhotosPost;
