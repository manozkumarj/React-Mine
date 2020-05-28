import React, { useState, useEffect } from "react";
import "./middleSection.css";
import { Link } from "react-router-dom";
// import zuck from "../../../images/zuck.jpg";
import mark from "../../../images/mark.jpg";

import kohli from "../../../images/kohli.jpg";
import bikee from "../../../images/bikee.jpg";
import wow1 from "../../../images/wow_1.jpg";
import overlayClose from "../../../images/overlay-close.png";

import wow2 from "../../../images/wow_2.jpg";
import leftArrow from "../../../images/left_arrow.png";
import rightArrow from "../../../images/right_arrow.png";
import defaultAvatar from "../../../images/avatar.png";

import loveHeartsEyesEmoji from "../../../emojis/love-hearts-eyes-emoji-50.png";
import likeThumbEmoji from "../../../emojis/like-thumb-emoji-50.png";
import dislikeThumbEmoji from "../../../emojis/dislike-thumb-emoji-50.png";
import laugherEmoji from "../../../emojis/face-with-tears-of-joy-emoji-50.png";
import angryEmoji from "../../../emojis/angry-emoji-50.png";
import wowEmoji from "../../../emojis/wow-emoji-50.png";
import cryingEmoji from "../../../emojis/crying-emoji-50.png";
import PostMenu from "../postMenu/PostMenu";
import { connect } from "react-redux";
import {
  getAllUsersPosts,
  getIndividualUserPosts,
  addComment,
} from "./../../../redux/actionCreators";
import DefaultAndCustomBgAndTextColorPost from "./../defaultAndCustomBgAndTextColorPost/DefaultAndCustomBgAndTextColorPost";
import CustomBgAndTextAndBorderColorPost from "./../customBgAndTextAndBorderColorPost/CustomBgAndTextAndBorderColorPost";
import CustomBgAndTextAndCornerPost from "./../customBgAndTextAndCornerPost/CustomBgAndTextAndCornerPost";
import PhotosPost from "./../photosPost/PhotosPost";

const MiddleSection = (props) => {
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [imagesUrl, setImagesUrl] = useState(null);

  let loopId = 1;

  useEffect(() => {
    setImagesUrl("http://localhost:8088/photo/");
    // props.getIndividualUserPosts(
    //   props.centralState.authToken,
    //   props.centralState.loggedInUserId
    // );
    props.getAllUsersPosts();
  }, []);

  useEffect(() => {
    console.log(props);
    setLoadingPosts(props.centralState.isLoading);
    setPosts(props.centralState.allUsersPosts);
    if (props.centralState.isCommentInserted) {
      window.location.reload();
    }
  }, [props]);

  return (
    <div id="middle-div">
      <div className="post-menu-section">
        <PostMenu />
      </div>

      {/* *******************  Welcome section ******************** */}
      <div className="item">
        <div className="greet-div">
          <div className="greet">Welcome</div>
          <div className="greet-name">
            <span>{props.centralState.loggedInUserDetails.fullName}</span>
          </div>
        </div>
      </div>

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
                console.log("value", e.target.value);
                // put the login here
                let commentText = e.target.value.trim();
                if (commentText) {
                  props.addComment(post._id, commentText);
                }
              }
            };

            const handleLikeReaction = (e) => {
              e.stopPropagation();
              console.log("handleLikeReaction");
            };

            const handleLoveReaction = (e) => {
              e.stopPropagation();
              console.log("handleLoveReaction");
            };

            const handleLaughReaction = (e) => {
              e.stopPropagation();
              console.log("handleLaughReaction");
            };

            const handleAngerReaction = (e) => {
              e.stopPropagation();
              console.log("handleAngerReaction");
            };

            const handleWowReaction = (e) => {
              e.stopPropagation();
              console.log("handleWowReaction");
            };

            const handleCryReaction = (e) => {
              e.stopPropagation();
              console.log("handleCryReaction");
            };

            const handleDislikeReaction = (e) => {
              e.stopPropagation();
              console.log("handleDislikeReaction");
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
              <div key={loopId++} className="item">
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
                      <Link to="/">{post.postedTo.fullName}</Link>
                      <span
                        className="post-vr-dots"
                        data-post-id={post.uniquePostId}
                        id="post-more-options"
                      >
                        <ul
                          className="post-more-options-ul"
                          id={"post-more-options-ul-" + post.uniquePostId}
                        >
                          <li>Hide</li>
                          <li>Open in new tab</li>
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

                <div className="post-actions-counter-container">
                  <div className="reactions-couter couter-item hover-ul">
                    <div className="reactions-couter-emojis">
                      <img
                        src={loveHeartsEyesEmoji}
                        alt="loveHeartsEyesEmoji"
                        width="20px"
                        className="reaction-emoji"
                      />
                      <img
                        src={likeThumbEmoji}
                        alt="likeThumbEmoji"
                        width="20px"
                        className="reaction-emoji"
                      />
                    </div>
                    <div className="reactions-count"> 250 reactions</div>
                  </div>
                  <div className="cmnts-and-shares-counter couter-item">
                    <span className="comments-counter hover-ul">
                      50 comments
                    </span>
                    <span className="shares-counter hover-ul">20 shares</span>
                  </div>
                </div>
                <div className="post-actions-container">
                  <span
                    className="action-item hover-ul like-button"
                    data-post-id={post.uniquePostId}
                    onClick={handleLikeReaction}
                  >
                    Like
                    {/* reactions-holder - starts */}
                    <span
                      className="reactions-holder"
                      id={"reactions-holder-" + post.uniquePostId}
                    >
                      <span className="reactions-holder-inner">
                        <img
                          src={likeThumbEmoji}
                          alt="likeThumbEmoji"
                          width="38px"
                          className="reaction-emoji"
                          onClick={handleLikeReaction}
                        />
                        <img
                          src={loveHeartsEyesEmoji}
                          alt="loveHeartsEyesEmoji"
                          width="38px"
                          className="reaction-emoji"
                          onClick={handleLoveReaction}
                        />
                        <img
                          src={laugherEmoji}
                          alt="laugherEmoji"
                          width="38px"
                          className="reaction-emoji"
                          onClick={handleLaughReaction}
                        />
                        <img
                          src={angryEmoji}
                          alt="angryEmoji"
                          width="38px"
                          className="reaction-emoji"
                          onClick={handleAngerReaction}
                        />
                        <img
                          src={wowEmoji}
                          alt="wowEmoji"
                          width="38px"
                          className="reaction-emoji"
                          onClick={handleWowReaction}
                        />
                        <img
                          src={cryingEmoji}
                          alt="cryingEmoji"
                          width="38px"
                          className="reaction-emoji"
                          onClick={handleCryReaction}
                        />
                        <img
                          src={dislikeThumbEmoji}
                          alt="dislikeThumbEmoji"
                          width="38px"
                          className="reaction-emoji"
                          onClick={handleDislikeReaction}
                        />
                      </span>
                    </span>
                    {/* reactions-holder - ends */}
                  </span>
                  <span className="action-item hover-ul">Comment</span>
                  <span className="action-item hover-ul">Share</span>
                </div>
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
                    <div className="post-individual-comment-container">
                      <div className="post-dp-div">
                        <Link to="/">
                          <img
                            className="post-comment-user-dp"
                            src={kohli}
                            alt="User name"
                          />
                        </Link>
                      </div>
                      <div className="post-comment-info-n-user-details-div">
                        <div className="post-comment-user-div">
                          <Link to="/">Manoj Kumar</Link>
                          <span
                            className="post-comment-vr-dots"
                            data-post-comment-id={post.uniquePostId}
                            id="post-comment-more-options"
                          >
                            <ul
                              className="post-comment-more-options-ul"
                              id={
                                "post-comment-more-options-ul-" +
                                post.uniquePostId
                              }
                            >
                              <li>Hide</li>
                              <li>Delete</li>
                            </ul>
                          </span>
                        </div>
                        <div className="post-comment">
                          This is my first test for updates div. Just to check
                          whether it's working or not.This is my first test for
                          updates div. Just to check whether it's working or
                          not.
                        </div>
                      </div>
                    </div>
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
        <hr className="dividable-hr" />
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
    getAllUsersPosts: () => dispatch(getAllUsersPosts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MiddleSection);
