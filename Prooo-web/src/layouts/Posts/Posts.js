import React, { Fragment, useState, useEffect } from "react";
import "./posts.css";
import { withRouter, Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsersPosts, deletePost } from "../../redux/actionCreators";

import { store } from "react-notifications-component";
import { serverPhotoUrl } from "./../../helpers/helpers";

import ViewLetter from "../ViewLetter/ViewLetter";
import NormalAndColorPostDisplayer from "./../NormalAndColorPostDisplayer/NormalAndColorPostDisplayer";
import FlipcardPostDisplayer from "./../FlipcardPostDisplayer/FlipcardPostDisplayer";
import PhotosPostDisplayer from "./../PhotosPostDisplayer/PhotosPostDisplayer";
import VideoPostDisplayer from "./../VideoPostDisplayer/VideoPostDisplayer";
import LetterPostDisplayer from "./../LetterPostDisplayer/LetterPostDisplayer";

// Import images
import defaultAvatar from "./../../images/avatar.png";
import overlayClose from "./../../icons/overlay-close.png";
import fancyClose from "./../../icons/fancy_close.png";

import ReactedUsers from "../ReactedUsers/ReactedUsers";
import PhotoDetails from "./../PhotoDetails/PhotoDetails";
import PostReactions from "./../PostReactions/PostReactions";

import { getNiceTimestamp } from "./../../helpers/helpers";
import CommentedUsers from "./../CommentedUsers/CommentedUsers";

const Posts = (props) => {
  const [urlPath, setUrlPath] = useState(props.match.path);
  const [openPhotoPostModal, setOpenPhotoPostModal] = useState(false);
  const [openReactedUsersModal, setOpenReactedUsersModal] = useState(false);
  const [openCommentedUsersModal, setOpenCommentedUsersModal] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [openLetterViewerModal, setOpenLetterViewerModal] = useState(false);
  const [modalPhoto, setModalPhoto] = useState(null);
  const [letterContent, setLetterContent] = useState(null);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [reactedUsersData, setReactedUsersData] = useState(null);
  const [commentedUsersData, setCommentedUsersData] = useState(null);
  const [singlePhotoWithDetails, setSinglePhotoWithDetails] = useState(null);
  const [posts, setPosts] = useState([]);

  const history = useHistory();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    console.log("Path is -> " + props.match.path);
    setUrlPath(props.match.path);
    if (props.match.path !== "/:username") {
      console.log("Need to fetch all posts");
      getAllUsersPosts();
    } else {
      // console.log(authState);
      setLoadingPosts(authState.isLoadingPosts);
      setPosts(authState.profileUserPosts);
    }
  }, [authState.isLoadingPosts]);

  useEffect(() => {
    window.onpopstate = () => {
      console.log("Going back");
      handlePhotoPostCloseModal();
    };
  }, []);

  const handleViewPhoto = async (postId, photoSrc) => {
    console.log("photoSrc -> " + photoSrc);
    // window.history.pushState(null, "", `post/${postId}`);

    // window.history.replaceState(
    //   null,
    //   "New Page Title",
    //   "http://localhost:3000/profile/photos/photo/123456"
    // );

    setModalPhoto(photoSrc);
    const body = document.body;
    // body.style.height = "100vh";
    body.style.overflowY = "hidden";

    let getPhotoDetails = await (<PhotoDetails postId={postId} />);
    setSinglePhotoWithDetails(getPhotoDetails);

    setOpenPhotoPostModal(true);
    let box = document.getElementById("post-photo-modal-container");
    box.click();
    setTimeout(() => {
      box.focus();
      // box.scrollTop(0);
    }, 50);
  };

  const handlePhotoPostCloseModal = () => {
    const body = document.body;
    body.style.overflowY = "scroll";

    window.history.pushState(null, "", urlPath);
    setOpenPhotoPostModal(false);
    setSinglePhotoWithDetails(null);
  };

  const handleOpenLetter = async (postId, letterContent) => {
    console.log(postId);
    const body = document.body;
    // body.style.height = "100vh";
    body.style.overflowY = "hidden";

    setOpenLetterViewerModal(true);

    let gettt = await (
      <ViewLetter
        bgColor={"#ffffff"}
        brdrColor={null}
        textColor={"#000000"}
        letterContent={letterContent}
      />
    );
    setLetterContent(gettt);

    let box = document.getElementById("letter-viewer-modal-container");
    box.click();
    setTimeout(() => {
      box.focus();
      // box.scrollTop(0);
    }, 50);
  };

  const handleLetterViewerModalClose = () => {
    const body = document.body;
    body.style.overflowY = "scroll";

    setOpenLetterViewerModal(false);
  };

  const handleReactedUsersModalOpen = (postId) => {
    console.log("Opening ReactedUsersModal");
    const body = document.body;
    // body.style.height = "100vh";
    body.style.overflowY = "hidden";

    setOpenReactedUsersModal(true);
    let box = document.getElementById("reacted-users-modal-container");
    box.click();
    setTimeout(() => {
      box.focus();
      // box.scrollTop(0);
    }, 50);
    getReactedUsersData(postId);
  };

  const handleReactedUsersModalClose = () => {
    const body = document.body;
    body.style.overflowY = "scroll";

    setOpenReactedUsersModal(false);
    setReactedUsersData(null);
  };

  const getReactedUsersData = async (postId) => {
    let gettt = await (<ReactedUsers postId={postId} />);
    setReactedUsersData(gettt);
  };

  const handleCommentedUsersModalOpen = (postId) => {
    console.log("Opening CommentedUsersModal");
    const body = document.body;
    // body.style.height = "100vh";
    body.style.overflowY = "hidden";

    setOpenCommentedUsersModal(true);
    let box = document.getElementById("commented-users-modal-container");
    box.click();
    setTimeout(() => {
      box.focus();
      // box.scrollTop(0);
    }, 50);
    getCommentedUsersData(postId);
  };

  const handleCommentedUsersModalClose = () => {
    const body = document.body;
    body.style.overflowY = "scroll";

    setOpenCommentedUsersModal(false);
    setCommentedUsersData(null);
  };

  const getCommentedUsersData = async (postId) => {
    let gettt = await (<CommentedUsers postId={postId} />);
    setCommentedUsersData(gettt);
  };

  var dropdowns = document.getElementsByClassName(
    "dropdown-action-items-container"
  );
  var moreReactionsContainers = document.getElementsByClassName(
    "more-reactions-container-holder"
  );

  const dropdownOpener = (id) => {
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

  const handleDeletePost = (postId) => {
    console.log("postId --> " + postId);
    doDeletePost(postId);
  };

  const getAllUsersPosts = async () => {
    try {
      setLoadingPosts(true);
      let response = await dispatch(fetchAllUsersPosts());
      setLoadingPosts(false);
      console.log(response);
      if (response.success) {
        console.log("Posts - getAllUsersPosts is success");
        setPosts(response.payload.posts);
      } else {
        console.error("Posts - getAllUsersPosts failed");
        let getErrorType = response.errorType;
        console.error(getErrorType);
        showDangerNotification();
      }
    } catch (err) {
      console.error("Posts - getAllUsersPosts failed");
      console.log(JSON.stringify(err));
      showDangerNotification();
      history.push(`/`);
    }
  };

  const doDeletePost = async (postId) => {
    try {
      let response = await dispatch(deletePost(postId));
      console.log(response);
      if (response.success) {
        console.log("Posts - doDeletePost is success");
      } else {
        console.error("Posts - doDeletePost failed");
        let getErrorType = response.errorType;
        console.error(getErrorType);
        showDangerNotification();
      }
    } catch (err) {
      console.error("Posts - doDeletePost failed");
      console.log(JSON.stringify(err));
      showDangerNotification();
      history.push(`/`);
    }
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

  return (
    <Fragment>
      <div className="all-posts-container">
        {loadingPosts && (
          <div className="contextPreloader">
            <div className="contextPreloader-item">
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

        {!loadingPosts && posts.length === 0 && (
          <div className="single-item">
            <div className="emptyRecords"> No posts to show </div>
          </div>
        )}

        {!loadingPosts &&
          posts &&
          posts.length > 0 &&
          posts.map((post) => {
            let userFullName = post.postedBy.fullName;

            let username = post.postedBy.username;

            let userPrimaryDp = post.postedBy.primaryDp
              ? serverPhotoUrl + post.postedBy.primaryDp
              : defaultAvatar;
            let userSecondaryDp = post.postedBy.secondaryDp
              ? serverPhotoUrl + post.postedBy.secondaryDp
              : defaultAvatar;

            let displayPage;
            if (post.postTypeId === 1 || post.postTypeId === 2)
              displayPage = (
                <NormalAndColorPostDisplayer
                  postData={post.postProperties}
                  postTypeId={post.postTypeId}
                />
              );
            else if (post.postTypeId === 3)
              displayPage = (
                <LetterPostDisplayer
                  postId={post._id}
                  postData={post.postProperties}
                  postTypeId={post.postTypeId}
                  openLetter={handleOpenLetter}
                />
              );
            else if (post.postTypeId === 4)
              displayPage = (
                <PhotosPostDisplayer
                  postId={post._id}
                  postData={post.postProperties}
                  postTypeId={post.postTypeId}
                  openPhotoModal={handleViewPhoto}
                />
              );
            else if (post.postTypeId === 5)
              displayPage = (
                <FlipcardPostDisplayer
                  postData={post.postProperties}
                  postTypeId={post.postTypeId}
                />
              );
            else if (post.postTypeId === 6)
              displayPage = (
                <VideoPostDisplayer
                  postData={post.postProperties}
                  postTypeId={post.postTypeId}
                />
              );
            return (
              <div className="single-item" key={post.milliseconds}>
                <div className="post-n-user-details-container">
                  <div className="post-dps-container">
                    <Link
                      to={`/${username}`}
                      className="post-user-dp-primary-a"
                    >
                      <img
                        className="post-user-dp post-user-dp-primary"
                        src={userPrimaryDp}
                        alt="avatar"
                      />
                    </Link>
                    <Link to={`/${username}`}>
                      <img
                        className="post-user-dp post-user-dp-secondary"
                        src={userSecondaryDp}
                        alt="avatar"
                      />
                    </Link>
                  </div>
                  <div className="postInfo-n-user-details-div">
                    <div className="post-details-div">
                      <Link to={`/${username}`}>{userFullName}</Link>
                      <span
                        className="post-vr-dots contains"
                        data-post-id={post.milliseconds}
                        id="post-more-options"
                        onClick={() => dropdownOpener(post.milliseconds)}
                      >
                        <div
                          id={"dropdown-container-" + post.milliseconds}
                          className="dropdown-action-items-container"
                        >
                          <ul>
                            <li>Open in new tab</li>
                            <li onClick={() => handleDeletePost(post._id)}>
                              Delete
                            </li>
                          </ul>
                        </div>
                      </span>
                    </div>
                    <div className="post-timestamp-div">
                      {getNiceTimestamp(+post.milliseconds)}
                    </div>
                  </div>
                </div>
                {displayPage}
                <PostReactions
                  post={post}
                  openReactedUsersModal={handleReactedUsersModalOpen}
                  openCommentedUsersModal={handleCommentedUsersModalOpen}
                />
              </div>
            );
          })}
      </div>

      {/* Photo post Modal - starts */}
      <div
        id="post-photo-modal-container"
        className="post-photo-modal-container"
        style={{ display: openPhotoPostModal ? "block" : "none" }}
        tabIndex={1}
      >
        <img
          height="20"
          src={overlayClose}
          alt="closer"
          className="overlayClose pointer"
          onClick={handlePhotoPostCloseModal}
        />
        <div className="post-photo-modal-inner-container">
          {singlePhotoWithDetails}
        </div>
      </div>
      {/* Photo post Modal - ends */}

      {/* ReactedUsersModal - starts */}
      <div
        className="reacted-users-modal-container"
        id="reacted-users-modal-container"
        style={{ display: openReactedUsersModal ? "block" : "none" }}
        tabIndex={1}
      >
        <img
          height="20"
          src={overlayClose}
          alt="closer"
          className="srollable-overlayClose pointer"
          onClick={handleReactedUsersModalClose}
        />
        <div className="reacted-users-modal-inner-container">
          <span
            className="close_popup"
            title="close"
            onClick={handleReactedUsersModalClose}
          >
            <img height="30" src={fancyClose} alt="closer" />
          </span>
          <div className="modal-header">People who Reacted</div>
          <div>{reactedUsersData}</div>
        </div>
      </div>
      {/* ReactedUsersModal - ends */}

      {/* CommentedUsersModal - starts */}
      <div
        className="commented-users-modal-container"
        id="commented-users-modal-container"
        style={{ display: openCommentedUsersModal ? "block" : "none" }}
        tabIndex={1}
      >
        <img
          height="20"
          src={overlayClose}
          alt="closer"
          className="srollable-overlayClose pointer"
          onClick={handleCommentedUsersModalClose}
        />
        <div className="commented-users-modal-inner-container">
          <span
            className="close_popup"
            title="close"
            onClick={handleCommentedUsersModalClose}
          >
            <img height="30" src={fancyClose} alt="closer" />
          </span>
          <div className="modal-header">People who Commented</div>
          <div>{commentedUsersData}</div>
        </div>
      </div>
      {/* CommentedUsersModal - ends */}

      {/* letter-viewer-modal - starts */}
      <div
        className="letter-viewer-modal-container"
        id="letter-viewer-modal-container"
        style={{
          display: openLetterViewerModal ? "block" : "none",
        }}
        tabIndex={1}
      >
        <img
          height="20"
          src={overlayClose}
          alt="closer"
          className="srollable-overlayClose pointer"
          onClick={handleLetterViewerModalClose}
        />
        <div className="letter-viewer-modal-inner-container">
          <span
            className="close_popup"
            title="close"
            onClick={handleLetterViewerModalClose}
          >
            <img height="30" src={fancyClose} alt="closer" />
          </span>
          {letterContent}
        </div>
      </div>
      {/* letter-viewer-modal - ends */}
    </Fragment>
  );
};

export default withRouter(Posts);
