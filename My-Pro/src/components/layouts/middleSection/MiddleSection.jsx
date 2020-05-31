import React, { useState, useEffect } from "react";
import "./middleSection.css";
import { Link, withRouter } from "react-router-dom";
// import zuck from "../../../images/zuck.jpg";
// import mark from "../../../images/mark.jpg";

// import kohli from "../../../images/kohli.jpg";
// import bikee from "../../../images/bikee.jpg";
import wow1 from "../../../images/wow_1.jpg";
import overlayClose from "../../../images/overlay-close.png";

// import wow2 from "../../../images/wow_2.jpg";
import leftArrow from "../../../images/left_arrow.png";
import rightArrow from "../../../images/right_arrow.png";
import defaultAvatar from "../../../images/avatar.png";

import PostMenu from "../postMenu/PostMenu";
import { connect } from "react-redux";
import {
  getAllUsersPosts,
  getIndividualUserPosts,
  addComment,
  upsertReaction,
} from "./../../../redux/actionCreators";
import DefaultAndCustomBgAndTextColorPost from "./../defaultAndCustomBgAndTextColorPost/DefaultAndCustomBgAndTextColorPost";
import CustomBgAndTextAndBorderColorPost from "./../customBgAndTextAndBorderColorPost/CustomBgAndTextAndBorderColorPost";
import CustomBgAndTextAndCornerPost from "./../customBgAndTextAndCornerPost/CustomBgAndTextAndCornerPost";
import PhotosPost from "./../photosPost/PhotosPost";
import PostReactions from "./../postReactions/PostReactions";

const MiddleSection = (props) => {
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [imagesUrl, setImagesUrl] = useState(null);
  const [singlePost, setSinglePost] = useState(true);
  const [loggedInUserId, setLoggedInUserId] = useState(null);

  let loopId = 1;

  useEffect(() => {
    setImagesUrl("http://localhost:8088/photo/");
    // props.getIndividualUserPosts(
    //   props.centralState.authToken,
    //   props.centralState.loggedInUserId
    // );
    // props.getAllUsersPosts();
    setLoggedInUserId(props.centralState.loggedInUserId);
  }, []);

  useEffect(() => {
    console.log("Path is -> " + props.match.path);
    if (props.match.path === "/" || props.match.path === "/:username") {
      setSinglePost(false);
    } else if (props.match.path === "/post/:postId") {
      setSinglePost(true);
    }
  }, [props.match]);

  useEffect(() => {
    console.log(props);
    setLoadingPosts(props.centralState.isLoading);
    setPosts(props.centralState.fetchedPosts);
    if (props.centralState.isCommentInserted) {
      window.location.reload();
    }
  }, [props]);

  return (
    <div id="middle-div">
      <div className="post-menu-section">{!singlePost && <PostMenu />}</div>

      {/* *******************  Welcome section ******************** */}
      {!singlePost && (
        <div className="item">
          <div className="greet-div">
            <div className="greet">Welcome</div>
            <div className="greet-name">
              <span>{props.centralState.loggedInUserDetails.fullName}</span>
            </div>
          </div>
        </div>
      )}

      <div className="all-posts-container">
        {posts &&
          posts.length > 0 &&
          posts.map((post) => {
            let userPrimaryDp = post.postedBy.primaryDp
              ? imagesUrl + post.postedBy.primaryDp
              : defaultAvatar;
            let userSecondaryDp = post.postedBy.primaryDp
              ? imagesUrl + post.postedBy.secondaryDp
              : defaultAvatar;

            const keyPress = (e) => {
              // e.preventDefault();
              if (e.keyCode == 13) {
                // console.log("value", e.target.value);
                // put the login here
                let commentText = e.target.value.trim();
                if (commentText) {
                  props.addComment(post._id, commentText);
                }
              }
            };

            let displayPage;
            if (post.postTypeId == 1 || post.postTypeId == 3)
              displayPage = (
                <DefaultAndCustomBgAndTextColorPost
                  postData={post.postProperties}
                  postTypeId={post.postTypeId}
                />
              );
            else if (post.postTypeId == 4)
              displayPage = (
                <CustomBgAndTextAndBorderColorPost
                  postData={post.postProperties}
                  postTypeId={post.postTypeId}
                />
              );
            else if (post.postTypeId == 2)
              displayPage = (
                <PhotosPost
                  postData={post.postProperties}
                  postTypeId={post.postTypeId}
                />
              );
            else if (post.postTypeId == 5)
              displayPage = (
                <CustomBgAndTextAndCornerPost
                  postData={post.postProperties}
                  postTypeId={post.postTypeId}
                />
              );

            return (
              <div
                key={loopId++}
                className="item"
                id={"individual-post-" + post._id + loopId}
              >
                <div className="post-n-user-details-container">
                  <div className="post-dp-div">
                    <Link to="/">
                      <img
                        className="post-user-dp"
                        src={userPrimaryDp}
                        alt={post.postedBy.fullName}
                      />
                    </Link>
                  </div>
                  <div className="postInfo-n-user-details-div">
                    <div className="post-details-div">
                      <Link to={"/" + post.postedTo.username}>
                        {post.postedTo.fullName}
                      </Link>
                      <span
                        className="post-vr-dots"
                        data-post-id={post._id}
                        id="post-more-options"
                      >
                        <ul
                          className="post-more-options-ul"
                          id={"post-more-options-ul-" + post._id}
                        >
                          <li
                            className="hide-post"
                            data-post-id={post._id + loopId}
                          >
                            Hide
                          </li>
                          <li>
                            <a href={"/post/" + post._id} target="_blank">
                              Open in new tab
                            </a>
                          </li>
                          <li>Delete</li>
                        </ul>
                      </span>
                    </div>
                    <div className="post-timestamp-div">
                      5th Jan 2017 - 08:51:25 AM
                    </div>
                  </div>
                </div>
                {displayPage}
                <PostReactions postDetails={post} />
                <div className="comment-input-container">
                  <input
                    type="text"
                    className="comment-box"
                    placeholder="Type and press enter to comment..."
                    onKeyDown={keyPress}
                  />
                </div>

                {post.comments && post.comments.length > 0 && (
                  <div className="post-comments-container">
                    {post.comments.map((comment) => {
                      let commentedUserPrimaryDp = comment.commentedBy.primaryDp
                        ? imagesUrl + comment.commentedBy.primaryDp
                        : defaultAvatar;
                      let commentedUserFullname = comment.commentedBy.fullName;
                      return (
                        <div
                          className="post-individual-comment-container"
                          key={comment._id}
                          id={
                            "individual-comment-" +
                            post._id +
                            comment._id +
                            comment.commentedAt
                          }
                        >
                          <div className="post-dp-div">
                            <Link to={"/" + comment.commentedBy.username}>
                              <img
                                className="post-comment-user-dp"
                                src={commentedUserPrimaryDp}
                                alt={commentedUserFullname}
                              />
                            </Link>
                          </div>
                          <div className="post-comment-info-n-user-details-div">
                            <div className="post-comment-user-div">
                              <Link to={"/" + comment.commentedBy.username}>
                                {commentedUserFullname}
                              </Link>
                              <span
                                className="post-comment-vr-dots"
                                data-post-comment-id={
                                  post._id + comment._id + comment.commentedAt
                                }
                                id="post-comment-more-options"
                              >
                                <ul
                                  className="post-comment-more-options-ul"
                                  id={
                                    "post-comment-more-options-ul-" +
                                    post._id +
                                    comment._id +
                                    comment.commentedAt
                                  }
                                >
                                  <li
                                    className="hide-comment"
                                    data-post-comment-id={
                                      post._id +
                                      comment._id +
                                      comment.commentedAt
                                    }
                                  >
                                    Hide
                                  </li>
                                  <li>Delete</li>
                                </ul>
                              </span>
                            </div>
                            <div className="post-comment">
                              {comment.comment}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

        {/* *******************  All posts section ******************** */}
        {loadingPosts && (
          <div id="contextPreloader">
            <div className="item">
              <div className="animationLoading">
                <div className="animationLoadingContainer">
                  <div className="animationLoadingUser"></div>
                  <div className="animationLoadingRightContainer">
                    <div className="animationLoadingUsername"></div>
                    <div className="animationLoadingTimestamp"></div>
                  </div>
                </div>
                <div className="animationLoadingDivider"></div>
                <div className="animationLoadingContent"></div>
                <div className="animationLoadingReactionsCounter"></div>
                <div className="animationLoadingReactionsDiv">
                  <div className="animationLoadingReaction"></div>
                  <div className="animationLoadingReaction"></div>
                  <div className="animationLoadingReaction"></div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* *******************  Context loader - ends ******************** */}
        {/* <hr className="dividable-hr" /> */}
      </div>

      {/* Image viewer popup - starts */}
      <div
        id="middle_page_section_layerOneModalContainer"
        tabIndex="1"
        className="middle_page_section_layerOneModalContainer"
      >
        <span className="overlay_close layerOneCloser" title="close">
          <img height="20" src={overlayClose} alt="closer" />
        </span>

        <div className="middle_page_section_layerOneModalInner">
          {/* popup code which triggers image viewer - starts */}
          <div className="image-viewer-holder">
            <div className="image-viewer-overlay">
              <span>
                <img
                  className="img_viewer_left"
                  src={leftArrow}
                  title="Previous"
                />
              </span>
              <span>
                <img
                  className="img_viewer_right"
                  src={rightArrow}
                  title="Next"
                />
              </span>

              <div className="imgv_center_holder">
                <img
                  className="theatre_img"
                  src={wow1}
                  title="default"
                  alt="uploaded"
                />
              </div>
            </div>
          </div>
          {/* popup code which triggers image viewer - ends */}
        </div>
      </div>
      {/* Image viewer popup - ends */}
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
    addComment: (postId, commentText) =>
      dispatch(addComment(postId, commentText)),
    upsertReaction: (postId, actionType, reactionTypeId) =>
      dispatch(upsertReaction(postId, actionType, reactionTypeId)),
    getAllUsersPosts: () => dispatch(getAllUsersPosts()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MiddleSection)
);
