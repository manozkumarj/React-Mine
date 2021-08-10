import React, { Fragment } from "react";
import "./normalAndColorPostDisplayer.css";

const NormalAndColorPostDisplayer = (props) => {
  const { postData, postTypeId } = props;
  return (
    <Fragment>
      {postTypeId === 1 && (
        <div className="post-description-container">
          <div className="post-description">{postData[0].postContent}</div>
        </div>
      )}

      {postTypeId === 2 && (
        <div
          className="post-description-container"
          style={{
            background: postData[0].backgroundColor,
            color: postData[0].textColor,
          }}
        >
          <div
            className="post-description"
            style={{
              padding: "8px",
              background: postData[0].backgroundColor,
              color: postData[0].textColor,
              border: "2px solid " + postData[0].borderColor,
              borderRadius: "3px",
            }}
          >
            {postData[0].postContent}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default NormalAndColorPostDisplayer;
