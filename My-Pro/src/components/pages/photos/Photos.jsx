import React, { useState, useEffect } from "react";
import "./photos.css";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import zuck from "../../../images/zuck.jpg";
import mark from "../../../images/mark.jpg";
import kohli from "../../../images/kohli.jpg";
import bikee from "../../../images/bikee.jpg";
import wow1 from "../../../images/wow_1.jpg";
import wow2 from "../../../images/wow_2.jpg";

const Photos = (props) => {
  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imagesUrl, setImagesUrl] = useState("http://localhost:8088/photo/");
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);
    setImagesUrl("http://localhost:8088/photo/");
    if (props.centralState.fetchedPosts) {
      let allPosts = props.centralState.fetchedPosts;
      let filterPhotosPosts = allPosts.filter((post) => post.postTypeId === 2);
      setPosts(filterPhotosPosts);
      setIsLoading(false);
      console.log(filterPhotosPosts[0].postProperties[0].photos);
    }
  }, [props]);

  return (
    <div className="all-photos-container">
      {!isLoading &&
        posts.map((post) => {
          let imgUrl = imagesUrl + post.postProperties[0].photos;
          return (
            <div className="individual-pic-div" key={imgUrl}>
              <img src={imgUrl} alt="individual" className="individual-pic" />
            </div>
          );
        })}
      <div className="individual-pic-div">
        <img src={bikee} alt="individual" className="individual-pic" />
      </div>
      <div className="individual-pic-div">
        <img src={wow1} alt="individual" className="individual-pic" />
      </div>
      <div className="individual-pic-div">
        <img src={wow2} alt="individual" className="individual-pic" />
      </div>
      <div className="individual-pic-div">
        <img src={kohli} alt="individual" className="individual-pic" />
      </div>
      <div className="individual-pic-div">
        <img src={zuck} alt="individual" className="individual-pic" />
      </div>
      <div className="individual-pic-div">
        <img src={mark} alt="individual" className="individual-pic" />
      </div>
      <div className="individual-pic-div">
        <img src={bikee} alt="individual" className="individual-pic" />
      </div>
      <div className="individual-pic-div">
        <img src={wow1} alt="individual" className="individual-pic" />
      </div>
      <div className="individual-pic-div">
        <img src={wow2} alt="individual" className="individual-pic" />
      </div>
      <div className="individual-pic-div">
        <img src={kohli} alt="individual" className="individual-pic" />
      </div>
      <div className="individual-pic-div">
        <img src={zuck} alt="individual" className="individual-pic" />
      </div>
      <div className="individual-pic-div">
        <img src={mark} alt="individual" className="individual-pic" />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    centralState: state.central,
  };
};

export default withRouter(connect(mapStateToProps, null)(Photos));
