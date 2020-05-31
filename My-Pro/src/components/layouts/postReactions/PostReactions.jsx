import React, { Fragment, useState, useEffect } from "react";
import "./postReactions.css";
import { Link, withRouter } from "react-router-dom";

import loveHeartsEyesEmoji from "../../../emojis/love-hearts-eyes-emoji-50.png";
import likeThumbEmoji from "../../../emojis/like-thumb-emoji-50.png";
import dislikeThumbEmoji from "../../../emojis/dislike-thumb-emoji-50.png";
import laugherEmoji from "../../../emojis/face-with-tears-of-joy-emoji-50.png";
import angryEmoji from "../../../emojis/angry-emoji-50.png";
import wowEmoji from "../../../emojis/wow-emoji-50.png";
import cryingEmoji from "../../../emojis/crying-emoji-50.png";
import defaultAvatar from "../../../images/avatar.png";

import { connect } from "react-redux";
import { addComment, upsertReaction } from "./../../../redux/actionCreators";

const PostReactions = (props) => {
  const [post, setPost] = useState(props.postDetails);
  const [imagesUrl, setImagesUrl] = useState("http://localhost:8088/photo/");
  const [postReactions, setPostReactions] = useState(
    props.postDetails.reactions
  );
  const [postComments, setPostComments] = useState(props.postDetails.comments);
  const [isReactedToThisPost, setIsReactedToThisPost] = useState(false);
  const [loggedInUserId, setLoggedInUserId] = useState(
    props.centralState.loggedInUserId
  );
  const [reactedTypeInText, setReactedTypeInText] = useState("Like");
  const [showReactions, setShowReactions] = useState(false);

  let reactedTypeId = null;
  let loopId = 1;

  useEffect(() => {
    setPost(props.postDetails);
    setPostReactions(props.postDetails.reactions);
    setLoggedInUserId(props.centralState.loggedInUserId);
    // console.log(props);

    if (postReactions && postReactions.length > 0) {
      let getIndex = postReactions.findIndex(
        (user) => user.reactedBy === loggedInUserId
      );
      console.log("loggedInUserId --> " + loggedInUserId);
      console.log("getIndex --> " + getIndex);

      if (getIndex > -1) {
        setIsReactedToThisPost(true);
        reactedTypeId = postReactions[getIndex]["reactionTypeId"];
        // console.log("reactedTypeId --> " + reactedTypeId);
        // console.log(postReactions[getIndex]["reactionTypeId"]);

        if (reactedTypeId === 1) setReactedTypeInText("Like");
        else if (reactedTypeId === 2) setReactedTypeInText("Dislike");
        else if (reactedTypeId === 3) setReactedTypeInText("Love");
        else if (reactedTypeId === 4) setReactedTypeInText("Wow");
        else if (reactedTypeId === 5) setReactedTypeInText("Laugh");
        else if (reactedTypeId === 6) setReactedTypeInText("Cry");
        else if (reactedTypeId === 7) setReactedTypeInText("Angry");
        else setReactedTypeInText("Like");

        // console.log("reactedTypeInText --> " + reactedTypeInText);
      }
    }
  }, [props.postDetails]);

  useEffect(() => {
    // console.log(props);
    if (props.centralState.isCommentInserted) {
      // window.location.reload();
      console.log("Comment inserted");
      // alert("Comment inserted");
    }
  }, [props.centralState.isCommentInserted]);

  const handleReactionRemover = (e) => {
    e.stopPropagation();
    console.log("handleReactionRemover --> " + post._id);
    upsertReaction("delete", null);
  };

  const handleLikeReaction = (e) => {
    e.stopPropagation();
    // console.log("handleLikeReaction --> " + post._id);
    upsertReaction("add", 1);
    setReactedTypeInText("Like");
  };

  const handleDislikeReaction = (e) => {
    e.stopPropagation();
    // console.log("handleDislikeReaction --> " + post._id);
    upsertReaction("add", 2);
    setReactedTypeInText("Dislike");
  };

  const handleLoveReaction = (e) => {
    e.stopPropagation();
    // console.log("handleLoveReaction --> " + post._id);
    upsertReaction("add", 3);
    setReactedTypeInText("Love");
  };

  const handleWowReaction = (e) => {
    e.stopPropagation();
    // console.log("handleWowReaction --> " + post._id);
    upsertReaction("add", 4);
    setReactedTypeInText("Wow");
  };

  const handleLaughReaction = (e) => {
    e.stopPropagation();
    // console.log("handleLaughReaction --> " + post._id);
    upsertReaction("add", 5);
    setReactedTypeInText("Laugh");
  };

  const handleCryReaction = (e) => {
    e.stopPropagation();
    // console.log("handleCryReaction --> " + post._id);
    upsertReaction("add", 6);
    setReactedTypeInText("Cry");
  };

  const handleAngerReaction = (e) => {
    // e.stopPropagation();
    // console.log("handleAngerReaction --> " + post._id);
    upsertReaction("add", 7);
    setReactedTypeInText("Anger");
  };

  const upsertReaction = (actionType, reactionTypeId) => {
    if (actionType === "add") {
      let filterPostReactions = postReactions.filter(
        (reaction) => reaction.reactedBy !== loggedInUserId
      );
      // setPostReactions(filterPostReactions);

      let addUserToReactions = {
        reactedBy: loggedInUserId,
        reactionTypeId,
      };
      // let addd = postReactions.push(addUserToReactions);
      // console.log(postReactions);
      // console.log(addd);
      setPostReactions([...filterPostReactions, addUserToReactions]);
      setIsReactedToThisPost(true);
    } else if (actionType === "delete") {
      let filterPostReactions = postReactions.filter(
        (reaction) => reaction.reactedBy !== loggedInUserId
      );
      setPostReactions(filterPostReactions);
      setIsReactedToThisPost(false);
    }
    props.upsertReaction(post._id, actionType, reactionTypeId);
  };

  const keyPress = (e) => {
    // e.preventDefault();
    if (e.keyCode === 13) {
      // console.log("value", e.target.value);
      // put the login here
      let commentText = e.target.value.trim();
      if (commentText) {
        let newComment = {
          comment: commentText,
          commentedBy: {
            fullName: props.centralState.loggedInUserDetails.fullName,
            username: props.centralState.loggedInUserDetails.username,
            primaryDp: props.centralState.loggedInUserDetails.primaryDp,
          },
          _id: ++loopId,
        };
        setPostComments([newComment, ...postComments]);
        e.target.value = "";
        props.addComment(post._id, commentText);
      }
    }
  };

  return (
    <Fragment>
      <div className="post-actions-counter-container">
        <div className="reactions-couter couter-item hover-ul">
          <div className="reactions-couter-emojis">
            {/* <img
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
            */}
          </div>
          <div className="reactions-count">
            {postReactions.length && !isReactedToThisPost
              ? postReactions.length +
                (postReactions.length > 1 ? " persons" : " person") +
                "reacted"
              : null}

            {postReactions.length > 1 && isReactedToThisPost
              ? "You and " +
                (postReactions.length - 1) +
                " other " +
                (postReactions.length - 1 > 1 ? " persons" : " person") +
                " reacted"
              : null}

            {postReactions.length == 1 && isReactedToThisPost
              ? "You reacted to this post"
              : null}

            {postReactions.length === 0 ? "Be the first person to react" : null}
          </div>
        </div>
        <div className="cmnts-and-shares-counter couter-item">
          <span className="comments-counter hover-ul">
            {postComments.length
              ? postComments.length +
                (postComments.length > 1 ? " - comments" : " - comment")
              : "0 - comments"}
          </span>
          <span className="shares-counter hover-ul">20 shares</span>
        </div>
      </div>
      <div className="post-actions-container">
        <span
          className="action-item hover-ul like-button"
          data-post-id={post._id}
        >
          {!isReactedToThisPost && (
            <span className="like-button" onClick={handleLikeReaction}>
              Like
            </span>
          )}

          {isReactedToThisPost && (
            <span
              className="highlight-reaction"
              onClick={handleReactionRemover}
            >
              {reactedTypeInText}
            </span>
          )}

          {/* reactions-holder - starts */}
          <span
            className="reactions-holder"
            id={"reactions-holder-" + post._id}
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

      {postComments && postComments.length > 0 && (
        <div className="post-comments-container">
          {postComments.map((comment) => {
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
                            post._id + comment._id + comment.commentedAt
                          }
                        >
                          Hide
                        </li>
                        <li>Delete</li>
                      </ul>
                    </span>
                  </div>
                  <div className="post-comment">{comment.comment}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    centralState: state.central,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addComment: (postId, commentText) =>
      dispatch(addComment(postId, commentText)),
    upsertReaction: (postId, actionType, reactionTypeId) =>
      dispatch(upsertReaction(postId, actionType, reactionTypeId)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PostReactions)
);
