import React, { Fragment } from "react";
import "./videoPostDisplayer.css";

import ReactPlayer from "react-player";
import { serverVideoUrl } from "./../../helpers/helpers";
import blank from "./../../images/blank.png";

const VideoPostDisplayer = (props) => {
  const { postData } = props;
  return (
    <Fragment>
      {postData[0].postContent && (
        <div className="post-description-container">
          <div className="post-description">{postData[0].postContent}</div>
        </div>
      )}
      <div className="player-wrapper">
        <ReactPlayer
          playing={false}
          controls={true}
          light={blank}
          width="100%"
          height="auto"
          volume={0.5}
          url={serverVideoUrl + postData[0]["videos"][0]}
        />
      </div>
    </Fragment>
  );
};

export default VideoPostDisplayer;
