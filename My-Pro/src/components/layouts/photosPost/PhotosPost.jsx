import React, { Fragment } from "react";
import "./photosPost.css";
import wow1 from "../../../images/wow_1.jpg";

const PhotosPost = (props) => {
  return (
    <Fragment>
      <div className="post-description-div">
        <span className="post-description">
          defaultAndCustomBgAndTextColorPost
        </span>
      </div>
      <div className="post-picture-div">
        <img src={wow1} alt="Post info" className="view-image" alt="uploaded" />
        <span className="absolute-bottom-right">1 of 5</span>
      </div>
    </Fragment>
  );
};

export default PhotosPost;
