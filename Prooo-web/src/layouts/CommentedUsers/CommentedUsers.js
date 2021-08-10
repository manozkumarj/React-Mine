import React, { useState, useEffect, Fragment } from "react";
import "./commentedUsers.css";
import { Link } from "react-router-dom";

// Import images
import defaultAvatar from "./../../images/avatar.png";

import { serverPhotoUrl } from "./../../helpers/helpers";
import { useSelector, useDispatch } from "react-redux";
import { upsertComment } from "../../redux/actionCreators";

const CommentedUsers = (props) => {
  const dispatch = useDispatch();
  const [postId, setPostId] = useState(props.postId);
  const [isLoading, setIsLoading] = useState(true);
  const [commentedUsers, setCommentedUsers] = useState();

  const getFetchedPosts = useSelector((state) => state.central.fetchedPosts);

  useEffect(() => {
    doFilterPostReactions();
  }, []);

  const doFilterPostReactions = async () => {
    console.log("getFetchedPosts are below");
    console.log(getFetchedPosts);
    let getPost = await getFetchedPosts.filter((post) => post._id === postId);
    console.log("getPost is below");
    console.log(getPost);
    let getCommentedUsers = getPost[0].comments;
    console.log(getCommentedUsers);
    let getMappedCommentedUsers = getCommentedUsers.map((commentedUser) => {
      return {
        ...commentedUser,
        isRequested: false,
        isDeleted: false,
        isAccepted: false,
        status: "none",
      };
    });
    setCommentedUsers(getMappedCommentedUsers);
    setIsLoading(false);
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

  const handleDeleteComment = (uniqueCommentId) => {
    console.log("uniqueCommentId --> " + uniqueCommentId);

    let filterPostComments = commentedUsers.filter(
      (comment) => comment.uniqueCommentId !== uniqueCommentId
    );
    setCommentedUsers(filterPostComments);
    doUpsertComment(postId, "delete", null, uniqueCommentId);
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
        console.log("CommentedUsers - doUpsertComment is success");
      } else {
        console.error("CommentedUsers - doUpsertComment failed");
        let getErrorType = response.errorType;
        console.error(getErrorType);
      }
    } catch (err) {
      console.error("CommentedUsers - doUpsertComment failed");
      console.log(JSON.stringify(err));
    }
  };

  return (
    <Fragment>
      {isLoading && (
        <div>
          <div className="contextPreloader">
            <div className="contextPreloader-item no-border-and-shadow-and-padding">
              <div className="animationLoading">
                <div className="animationLoadingContent height-40"></div>
              </div>
            </div>
            <div className="contextPreloader-item no-border-and-shadow-and-padding">
              <div className="animationLoading">
                <div className="animationLoadingContent height-40"></div>
              </div>
            </div>
            <div className="contextPreloader-item no-border-and-shadow-and-padding">
              <div className="animationLoading">
                <div className="animationLoadingContent height-40"></div>
              </div>
            </div>
            <div className="contextPreloader-item no-border-and-shadow-and-padding">
              <div className="animationLoading">
                <div className="animationLoadingContent height-40"></div>
              </div>
            </div>
            <div className="contextPreloader-item no-border-and-shadow-and-padding">
              <div className="animationLoading">
                <div className="animationLoadingContent height-40"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {!isLoading && commentedUsers.length === 0 && (
        <div className="single-item">
          <div className="emptyRecords"> No Comments yet </div>
        </div>
      )}

      {!isLoading && commentedUsers.length > 0 && (
        <div className="search-component-container">
          <div className="friends-container no-border-shadow-margin-top-10">
            {commentedUsers && commentedUsers.length > 0 && (
              <div className={"post-comments-container no-border"}>
                {commentedUsers.map((comment) => {
                  let commentedUserPrimaryDp = comment.commentedBy.primaryDp
                    ? serverPhotoUrl + comment.commentedBy.primaryDp
                    : defaultAvatar;

                  let commentedUserSecondaryDp = comment.commentedBy.secondaryDp
                    ? serverPhotoUrl + comment.commentedBy.secondaryDp
                    : defaultAvatar;

                  let commentedUserFullname = comment.commentedBy.fullName;
                  let commentedUserUsername = comment.commentedBy.username;
                  return (
                    <div
                      className="post-individual-comment-container border-bottom"
                      key={comment.uniqueCommentId}
                    >
                      <div className="post-n-user-details-comment-container">
                        <div className="post-comments-dps-container">
                          <Link
                            to={`/${commentedUserUsername}`}
                            className="post-comment-user-dp-primary-a"
                          >
                            <img
                              className="post-comment-user-dp post-comment-user-dp-primary"
                              src={commentedUserPrimaryDp}
                              alt="avatar"
                            />
                          </Link>
                          <Link to={`/${commentedUserUsername}`}>
                            <img
                              className="post-comment-user-dp post-comment-user-dp-secondary"
                              src={commentedUserSecondaryDp}
                              alt="avatar"
                            />
                          </Link>
                        </div>
                        <div className="postInfo-n-user-details-div">
                          <div className="post-details-div">
                            <Link to={`/${commentedUserUsername}`}>
                              {commentedUserFullname}
                            </Link>
                            <span
                              className="post-vr-dots contains"
                              data-post-id={comment.uniqueCommentId}
                              id="post-more-options"
                              onClick={() =>
                                commentDropdownOpener(comment.uniqueCommentId)
                              }
                            >
                              <div
                                id={
                                  "dropdown-container-" +
                                  comment.uniqueCommentId
                                }
                                className="dropdown-action-items-container"
                              >
                                <ul>
                                  <li>View Profile</li>
                                  <li
                                    onClick={() =>
                                      handleDeleteComment(
                                        comment.uniqueCommentId
                                      )
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
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default CommentedUsers;
