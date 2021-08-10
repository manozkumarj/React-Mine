import React, { Fragment, useState, useEffect } from "react";
import "./postReactions.css";
import { Link } from "react-router-dom";
import { MentionsInput, Mention } from "react-mentions";

import { useSelector, useDispatch } from "react-redux";
import { upsertReaction, upsertComment } from "../../redux/actionCreators";
import { serverPhotoUrl } from "./../../helpers/helpers";
import { store } from "react-notifications-component";

// Import Emojis
import like from "./../../emojis/reactions/like-thumb-emoji-50.png";
import loveEyes from "./../../emojis/reactions/love-hearts-eyes-emoji-50.png";
import laugh from "./../../emojis/reactions/face-with-tears-of-joy-emoji-50.png";
import wowEmoji from "./../../emojis/reactions/wow-emoji-50.png";
import angry from "./../../emojis/reactions/angry-emoji-50.png";
import dislike from "./../../emojis/reactions/dislike-thumb-emoji-50.png";
import cry from "./../../emojis/reactions/sad-emojii-50.png";
import defaultAvatar from "./../../images/avatar.png";

import { getMilliseconds } from "./../../helpers/helpers";

const PostReactions = (props) => {
  const dispatch = useDispatch();
  const getLoggedInUserDetails = useSelector(
    (state) => state.auth.authUserDetails
  );

  // console.log("getLoggedInUserId -> " + getLoggedInUserId);

  const [commentBoxValue, setCommentBoxValue] = useState("");
  const [plainText, setPlainText] = useState("");
  const [mentionData, setMentionData] = useState(null);
  const [mentionableUsers, setMentionableUsers] = useState([
    {
      id: "123",
      name: { fullName: "Name - Reynolds", username: "Manoj Kumar j" },
    },
    {
      id: "234",
      name: { fullName: "Name - Reynolds", username: "Mahesh Kumar" },
    },
    {
      id: "345",
      name: { fullName: "Name - Williams", username: "Rammy" },
    },
    {
      id: "456",
      name: { fullName: "Name - 456", username: "Mallesh" },
    },
    {
      id: "567",
      name: { fullName: "Name - 567", username: "Krishna Prasad" },
    },
    {
      id: "678",
      name: { fullName: "Name - 678", username: "Ramana" },
    },
    {
      id: "789",
      name: { fullName: "Name - 789", username: "Kranthi Kumar" },
    },
    {
      id: "111",
      name: { fullName: "Name - 789", username: "Sadhi Kumar" },
    },
    {
      id: "222",
      name: { fullName: "Name - 789", username: "Vinay Kumar" },
    },
    {
      id: "333",
      name: { fullName: "Name - 789", username: "Rohith Kumar" },
    },
  ]);

  const [post, setPost] = useState(props.post);
  const [postReactions, setPostReactions] = useState(props.post.reactions);
  const [postComments, setPostComments] = useState(props.post.comments);
  const [postNewComments, setPostNewComments] = useState([]);
  const [isReactedToThisPost, setIsReactedToThisPost] = useState(false);

  const [loggedInUserId, setLoggedInUserId] = useState(
    getLoggedInUserDetails._id
  );
  const [loggedInUserFullName, setLoggedInUserFullName] = useState(
    getLoggedInUserDetails.fullName
  );
  const [loggedInUserUsername, setLoggedInUserUsername] = useState(
    getLoggedInUserDetails.username
  );
  const [loggedInUserPrimaryDp, setLoggedInPrimaryDp] = useState(
    getLoggedInUserDetails.primaryDp
  );
  const [loggedInUserSecondaryDp, setLoggedInSecondaryDp] = useState(
    getLoggedInUserDetails.secondaryDp
  );

  const [reactedType, setReactedType] = useState("Like");
  const [getReactedTypeId, setGetReactedTypeId] = useState(null);

  var moreReactionsContainers = document.getElementsByClassName(
    "more-reactions-container-holder"
  );

  let loopId = 1;

  useEffect(() => {
    if (postReactions && postReactions.length > 0) {
      let getIndex = postReactions.findIndex(
        (user) => user.reactedBy._id === loggedInUserId
      );
      console.log("loggedInUserId --> " + loggedInUserId);
      console.log("getIndex --> " + getIndex);

      if (getIndex > -1) {
        setIsReactedToThisPost(true);
        let reactedTypeId = postReactions[getIndex]["reactionTypeId"];
        setGetReactedTypeId(reactedTypeId);

        if (reactedTypeId === 1)
          setReactedType(
            <div className="reacted-emoji-container">
              <img src={like} alt="likeThumbEmoji" className="reacted-emoji" />
              <span className="reacted-emoji-text">Like</span>
            </div>
          );
        else if (reactedTypeId === 2)
          setReactedType(
            <div className="reacted-emoji-container">
              <img
                src={dislike}
                alt="dislikeThumbEmoji"
                className="reacted-emoji"
              />
              <span className="reacted-emoji-text">Dislike</span>
            </div>
          );
        else if (reactedTypeId === 3)
          setReactedType(
            <div className="reacted-emoji-container">
              <img
                src={loveEyes}
                alt="loveEyesThumbEmoji"
                className="reacted-emoji"
              />
              <span className="reacted-emoji-text">Love</span>
            </div>
          );
        else if (reactedTypeId === 4)
          setReactedType(
            <div className="reacted-emoji-container">
              <img
                src={wowEmoji}
                alt="wowEmojiThumbEmoji"
                className="reacted-emoji"
              />
              <span className="reacted-emoji-text">Wow</span>
            </div>
          );
        else if (reactedTypeId === 5)
          setReactedType(
            <div className="reacted-emoji-container">
              <img
                src={laugh}
                alt="laughThumbEmoji"
                className="reacted-emoji"
              />
              <span className="reacted-emoji-text">Laugh</span>
            </div>
          );
        else if (reactedTypeId === 6)
          setReactedType(
            <div className="reacted-emoji-container">
              <img src={cry} alt="CryEmoji" className="reacted-emoji" />
              <span className="reacted-emoji-text">Cry</span>
            </div>
          );
        else if (reactedTypeId === 7)
          setReactedType(
            <div className="reacted-emoji-container">
              <img
                src={angry}
                alt="angryThumbEmoji"
                className="reacted-emoji"
              />
              <span className="reacted-emoji-text">Angry</span>
            </div>
          );
      } else {
        setIsReactedToThisPost(false);
      }
    } else {
      setIsReactedToThisPost(false);
    }
  }, [postReactions]);

  const showMoreReactions = (id) => {
    console.log("Id -> " + id);
    let i;
    for (i = 0; i < moreReactionsContainers.length; i++) {
      let openMoreReactionsContainer = moreReactionsContainers[i];
      if (openMoreReactionsContainer.classList.contains("show")) {
        openMoreReactionsContainer.classList.remove("show");
      }
    }
    var idMoreReactionsContainers = document.getElementById(
      "more-reactions-container-holder-" + id
    );

    idMoreReactionsContainers.classList.add("show");
  };

  const handleAddReaction = (postId, reactionTypeId) => {
    console.log(postId + " -- " + reactionTypeId);

    if (getReactedTypeId === reactionTypeId) {
      console.log("No need to any actions");
      return false;
    }

    let filterPostReactions = postReactions.filter(
      (reaction) => reaction.reactedBy._id !== loggedInUserId
    );
    // setPostReactions(filterPostReactions);

    let addUserToReactions = {
      reactedBy: {
        _id: loggedInUserId,
      },
      reactionTypeId,
    };
    // let addd = postReactions.push(addUserToReactions);
    // console.log(postReactions);
    // console.log(addd);
    setPostReactions([...filterPostReactions, addUserToReactions]);
    setIsReactedToThisPost(true);
    doUpsertReaction(postId, "add", reactionTypeId);
  };

  const handleDeleteReaction = (postId) => {
    console.log(postId);

    let filterPostReactions = postReactions.filter(
      (reaction) => reaction.reactedBy._id !== loggedInUserId
    );
    setPostReactions(filterPostReactions);
    setIsReactedToThisPost(false);
    doUpsertReaction(postId, "delete", 0);
  };

  const doUpsertReaction = async (postId, actionType, reactionTypeId) => {
    try {
      let response = await dispatch(
        upsertReaction(postId, actionType, reactionTypeId)
      );
      console.log(response);
      if (response.success) {
        console.log("PostReactions - doUpsertReaction is success");
      } else {
        console.error("PostReactions - doUpsertReaction failed");
        let getErrorType = response.errorType;
        console.error(getErrorType);
        showDangerNotification();
      }
    } catch (err) {
      console.error("PostReactions - doUpsertReaction failed");
      console.log(JSON.stringify(err));
      showDangerNotification();
    }
  };

  const keyPress = (e) => {
    // e.preventDefault();
    if (e.keyCode === 13) {
      // console.log("value", e.target.value);
      let commentText = e.target.value.trim();
      if (commentText) {
        console.log("Need to insert comment");

        let uniqueCommentId =
          loggedInUserId + getMilliseconds().toString() + loopId.toString();
        let newComment = {
          comment: commentText,
          commentedBy: {
            fullName: loggedInUserFullName,
            username: loggedInUserUsername,
            primaryDp: loggedInUserPrimaryDp,
            secondaryDp: loggedInUserSecondaryDp,
          },
          _id: ++loopId,
          uniqueCommentId,
        };

        setPostNewComments([newComment, ...postNewComments]);
        setPostComments([newComment, ...postComments]);

        let getMentionesArray = commentBoxValue.match(/@@@{{\S+/g);
        console.log(getMentionesArray);

        if (getMentionesArray && getMentionesArray.length > 0) {
          let mentionesArray = getMentionesArray.map((mention) => {
            let splitOne = mention.split("@@@");
            let replaceBraces = splitOne[1].replace(/\{|\}/gi, "");
            return replaceBraces;
            // let splitTwo = splitOne.split('@@@{{');
          });
          console.log("mentionesArray is below");
          console.log(mentionesArray);
        }

        e.target.value = "";
        setCommentBoxValue("");

        // doUpsertComment(post._id, "add", commentText, uniqueCommentId);
      }
    }
  };

  const handleDeleteComment = (uniqueCommentId) => {
    console.log("uniqueCommentId --> " + uniqueCommentId);

    let filterPostComments = postNewComments.filter(
      (comment) => comment.uniqueCommentId !== uniqueCommentId
    );
    setPostNewComments(filterPostComments);
    doUpsertComment(post._id, "delete", null, uniqueCommentId);
  };

  const doUpsertComment = async (
    postId,
    actionType,
    comment,
    uniqueCommentId
  ) => {
    try {
      let response = await dispatch(
        upsertComment(postId, actionType, comment, uniqueCommentId)
      );
      console.log(response);
      if (response.success) {
        console.log("PostReactions - doUpsertComment is success");
      } else {
        console.error("PostReactions - doUpsertComment failed");
        let getErrorType = response.errorType;
        console.error(getErrorType);
        this.showDangerNotification();
      }
    } catch (err) {
      console.error("PostReactions - doUpsertComment failed");
      console.log(JSON.stringify(err));
      this.showDangerNotification();
    }
  };

  var dropdowns = document.getElementsByClassName(
    "dropdown-action-items-container"
  );

  const commentDropdownOpener = (id) => {
    let i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }

    var idDropdowns = document.getElementById("dropdown-container-" + id);
    if (!idDropdowns.classList.contains("show")) {
      idDropdowns.classList.add("show");
    }
  };

  const handleOpenReactedUsersModal = () => {
    props.openReactedUsersModal(post._id);
  };

  const handleOpenCommentedUsersModal = () => {
    props.openCommentedUsersModal(post._id);
  };

  const showDangerNotification = () => {
    store.addNotification({
      title: "Notice",
      message: "Something went wrong, please try again after sometime",
      type: "danger",
      insert: "bottom",
      container: "bottom-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: true,
      },
    });
  };

  const handleCommentBoxValueChange = (
    event,
    newValue,
    newPlainTextValue,
    mentions
  ) => {
    setCommentBoxValue(newValue);
    setMentionData(mentionData);
    setPlainText(newPlainTextValue);
  };

  const userMentionData = mentionableUsers.map((myUser) => ({
    id: myUser.id,
    display: `@${myUser.name.username}`,
  }));

  return (
    <Fragment>
      <div className="post-actions-counter-container">
        <div
          className="post-actions-reaction-counter"
          onClick={handleOpenReactedUsersModal}
        >
          {postReactions.length === 0 ? "Be the first person to react" : null}
          {postReactions.length === 1 ? "1 reaction" : null}
          {postReactions.length > 1
            ? postReactions.length + " reactions"
            : null}
        </div>
        <div
          className="post-actions-comments-counter"
          onClick={handleOpenCommentedUsersModal}
        >
          {postComments.length} Comments
        </div>
      </div>

      <div className="post-actions-container">
        <div
          className="more-reactions-container-holder"
          id={"more-reactions-container-holder-" + post.milliseconds}
        >
          <div className="more-reactions-container">
            <img
              src={like}
              alt="emoji"
              className="more-reactions-emoji"
              onClick={() => {
                handleAddReaction(post._id, 1);
              }}
            />
            <img
              src={laugh}
              alt="emoji"
              className="more-reactions-emoji"
              onClick={() => {
                handleAddReaction(post._id, 5);
              }}
            />
            <img
              src={loveEyes}
              alt="emoji"
              className="more-reactions-emoji"
              onClick={() => {
                handleAddReaction(post._id, 3);
              }}
            />
            <img
              src={wowEmoji}
              alt="emoji"
              className="more-reactions-emoji"
              onClick={() => {
                handleAddReaction(post._id, 4);
              }}
            />
            <img
              src={angry}
              alt="emoji"
              className="more-reactions-emoji"
              onClick={() => {
                handleAddReaction(post._id, 7);
              }}
            />
            <img
              src={cry}
              alt="emoji"
              className="more-reactions-emoji"
              onClick={() => {
                handleAddReaction(post._id, 6);
              }}
            />
            <img
              src={dislike}
              alt="emoji"
              className="more-reactions-emoji"
              onClick={() => {
                handleAddReaction(post._id, 2);
              }}
            />
          </div>
        </div>
        <div className="action-item like-button-container">
          {!isReactedToThisPost && (
            <div
              className="action-item like-button"
              onClick={() => handleAddReaction(post._id, 1)}
            >
              Like
            </div>
          )}
          {isReactedToThisPost && (
            <div
              className="action-item like-button"
              onClick={() => handleDeleteReaction(post._id)}
            >
              {reactedType}
            </div>
          )}
          <div
            className="more-reactions-action-item containss"
            onClick={() => showMoreReactions(post.milliseconds)}
          >
            More...
          </div>
        </div>
        <div className="action-item post-comment-item">Comment</div>
      </div>

      <div className="comment-input-container">
        {/* <input
          type="text"
          className="comment-box"
          placeholder="Type and press enter to comment..."
          onKeyDown={keyPress}
        /> */}

        <MentionsInput
          value={commentBoxValue}
          onChange={handleCommentBoxValueChange}
          markup="@{{__display__}}"
          placeholder="Type and press enter to comment..."
          className="comment-box mentions"
          onKeyDown={keyPress}
        >
          <Mention
            type="user"
            appendSpaceOnAdd={true}
            trigger="@"
            markup=" @@@{{__display__}}@@@ "
            data={userMentionData}
            className="mentions__mention"
          />
        </MentionsInput>
      </div>

      {postNewComments && postNewComments.length > 0 && (
        <div
          className={"post-comments-container " + post._id + "-comment-holder"}
        >
          {postNewComments.map((comment) => {
            let commentedUserPrimaryDp = comment.commentedBy.primaryDp
              ? serverPhotoUrl + comment.commentedBy.primaryDp
              : defaultAvatar;

            let commentedUserSecondaryDp = comment.commentedBy.secondaryDp
              ? serverPhotoUrl + comment.commentedBy.secondaryDp
              : defaultAvatar;

            let commentedUserFullname = comment.commentedBy.fullName;
            return (
              <div
                className="post-individual-comment-container"
                key={comment.uniqueCommentId}
              >
                <div className="post-n-user-details-comment-container">
                  <div className="post-comments-dps-container">
                    <Link to="/" className="post-comment-user-dp-primary-a">
                      <img
                        className="post-comment-user-dp post-comment-user-dp-primary"
                        src={commentedUserPrimaryDp}
                        alt="avatar"
                      />
                    </Link>
                    <Link to="/">
                      <img
                        className="post-comment-user-dp post-comment-user-dp-secondary"
                        src={commentedUserSecondaryDp}
                        alt="avatar"
                      />
                    </Link>
                  </div>
                  <div className="postInfo-n-user-details-div">
                    <div className="post-details-div">
                      <Link to={"/profile"}>Manoj Kumar j</Link>
                      <span
                        className="post-vr-dots contains"
                        data-post-id={comment.uniqueCommentId}
                        id="post-more-options"
                        onClick={() =>
                          commentDropdownOpener(comment.uniqueCommentId)
                        }
                      >
                        <div
                          id={"dropdown-container-" + comment.uniqueCommentId}
                          className="dropdown-action-items-container"
                        >
                          <ul>
                            <li>View Profile</li>
                            <li
                              onClick={() =>
                                handleDeleteComment(comment.uniqueCommentId)
                              }
                            >
                              Delete
                            </li>
                          </ul>
                        </div>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="post-comment">{comment.comment}</div>
              </div>
            );
          })}
        </div>
      )}
    </Fragment>
  );
};

export default PostReactions;
