import React, { Fragment, useState, useEffect } from "react";
import "./postReactions.css";
import { withRouter } from "react-router-dom";

import loveHeartsEyesEmoji from "../../../emojis/love-hearts-eyes-emoji-50.png";
import likeThumbEmoji from "../../../emojis/like-thumb-emoji-50.png";
import dislikeThumbEmoji from "../../../emojis/dislike-thumb-emoji-50.png";
import laugherEmoji from "../../../emojis/face-with-tears-of-joy-emoji-50.png";
import angryEmoji from "../../../emojis/angry-emoji-50.png";
import wowEmoji from "../../../emojis/wow-emoji-50.png";
import cryingEmoji from "../../../emojis/crying-emoji-50.png";

import { connect } from "react-redux";
import { addComment, upsertReaction } from "./../../../redux/actionCreators";

const PostReactions = (props) => {
  const [post, setPost] = useState(props.postDetails);
  const [postReactions, setPostReactions] = useState(
    props.postDetails.reactions
  );
  const [isReactedToThisPost, setIsReactedToThisPost] = useState(false);
  const [loggedInUserId, setLoggedInUserId] = useState(
    props.centralState.loggedInUserId
  );
  const [reactedTypeInText, setReactedTypeInText] = useState("Like");

  let reactedTypeId = null;

  useEffect(() => {
    setPost(props.postDetails);
    setPostReactions(props.postDetails.reactions);
    setLoggedInUserId(props.centralState.loggedInUserId);
    console.log(props);

    if (postReactions && postReactions.length > 0) {
      let getIndex = postReactions.findIndex(
        (user) => user.reactedBy == loggedInUserId
      );
      console.log("loggedInUserId --> " + loggedInUserId);
      console.log("getIndex --> " + getIndex);

      if (getIndex > -1) {
        setIsReactedToThisPost(true);
        reactedTypeId = postReactions[getIndex]["reactionTypeId"];
        console.log("reactedTypeId --> " + reactedTypeId);
        console.log(postReactions[getIndex]["reactionTypeId"]);

        if (reactedTypeId == 1) setReactedTypeInText("Like");
        else if (reactedTypeId == 2) setReactedTypeInText("Dislike");
        else if (reactedTypeId == 3) setReactedTypeInText("Love");
        else if (reactedTypeId == 4) setReactedTypeInText("Wow");
        else if (reactedTypeId == 5) setReactedTypeInText("Laugh");
        else if (reactedTypeId == 6) setReactedTypeInText("Cry");
        else if (reactedTypeId == 7) setReactedTypeInText("Angry");
        else setReactedTypeInText("Like");

        console.log("reactedTypeInText --> " + reactedTypeInText);
      }
    }
  }, [props.postDetails]);

  const handleReactionRemover = (e) => {
    // e.stopPropagation();
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
    e.stopPropagation();
    // console.log("handleAngerReaction --> " + post._id);
    upsertReaction("add", 7);
    setReactedTypeInText("Anger");
  };

  const upsertReaction = (actionType, reactionTypeId) => {
    if (actionType == "add") {
      setIsReactedToThisPost(true);
    } else if (actionType == "delete") {
      setIsReactedToThisPost(false);
    }
    // props.upsertReaction(post._id, actionType, reactionTypeId);
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
            {post.reactions.length
              ? post.reactions.length + " reactions"
              : "Be the first person to react"}
          </div>
        </div>
        <div className="cmnts-and-shares-counter couter-item">
          <span className="comments-counter hover-ul">
            {post.comments.length} comments
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
            <span onClick={handleLikeReaction}>Like</span>
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
