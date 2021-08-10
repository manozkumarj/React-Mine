import API from "./../../api";
import validateToken from "./../validateToken";

import {
  CREATE_POST,
  CREATE_POST_ERROR,
  FETCHED_POSTS,
  POSTS_FETCHING_ERROR,
  REACTION_UPSERTION_SUCCESS,
  REACTION_UPSERTION_ERROR,
  COMMENT_UPSERTION_SUCCESS,
  COMMENT_UPSERTION_ERROR,
  POST_DELETION_SUCCESS,
  POST_DELETION_ERROR,
} from "./../actionTypes/postsRelatedTypes";

import { EMPTY_PROFILE_USER_POSTS } from "./../actionTypes/authTypes";

let headers = {
  "Content-Type": "application/json",
};

// All types of post creation handler -- Starts
let apiEndPoint;

export const createPost = (postTypeId, postDetailsObject, postedTo) => {
  // console.log(postDetailsObject);
  let authToken = localStorage.getItem("authToken");
  const tokenUserDetails = validateToken();
  // console.log(tokenUserDetails);
  if (tokenUserDetails) {
    let formDataPayload = new FormData();
    apiEndPoint = `posts`;
    headers["x-auth-token"] = authToken;

    let postDetailsObj;

    if (postTypeId === 1) {
      apiEndPoint = "posts/create-post/1";
      postDetailsObj = {
        postContent: postDetailsObject.postContentProp,
        privacyId: postDetailsObject.postPrivacyProp,
        postTypeId,
        postedTo,
      };
    } else if (postTypeId === 2) {
      apiEndPoint = "posts/create-post/2";
      postDetailsObj = {
        postContent: postDetailsObject.postContentProp,
        backgroundColor: postDetailsObject.backgroundColourProp,
        textColor: postDetailsObject.textColourProp,
        borderColor: postDetailsObject.borderColourProp,
        privacyId: postDetailsObject.postPrivacyProp,
        postTypeId,
        postedTo,
      };
    } else if (postTypeId === 3) {
      apiEndPoint = "posts/create-post/3";
      postDetailsObj = {
        postContent: postDetailsObject.postContentProp,
        letterContent: postDetailsObject.letterContentProp,
        privacyId: postDetailsObject.postPrivacyProp,
        postTypeId,
        postedTo,
      };
    } else if (postTypeId === 4) {
      apiEndPoint = "posts/create-post/4";
      postDetailsObj = {
        postPhotos: postDetailsObject.postPhotosProp,
        postContent: postDetailsObject.postContentProp,
        privacyId: postDetailsObject.postPrivacyProp,
        postTypeId,
        postedTo,
      };

      formDataPayload.append("postContent", postDetailsObject.postContentProp);
      formDataPayload.append("postImages", postDetailsObject.postPhotosProp);
      formDataPayload.append("privacyId", postDetailsObject.postPrivacyProp);
      formDataPayload.append("postTypeId", postTypeId);
      formDataPayload.append("postedTo", postedTo);

      console.log("formDataPayload");
      console.log(postDetailsObject.postPhotosProp);

      postDetailsObject.postPhotosProp.forEach((file) => {
        formDataPayload.append("images", file);
        console.log(file);
      });
    } else if (postTypeId === 5) {
      apiEndPoint = "posts/create-post/5";
      postDetailsObj = {
        postContent: postDetailsObject.postContentProp,
        postPhotos: postDetailsObject.flipcardPhotosProp,
        privacyId: postDetailsObject.postPrivacyProp,
        postTypeId,
        postedTo,
      };

      formDataPayload.append("postContent", postDetailsObject.postContentProp);
      formDataPayload.append(
        "postImages",
        postDetailsObject.flipcardPhotosProp
      );
      formDataPayload.append("privacyId", postDetailsObject.postPrivacyProp);
      formDataPayload.append(
        "flipDirection",
        postDetailsObject.flipDirectionProp
      );
      formDataPayload.append("postTypeId", postTypeId);
      formDataPayload.append("postedTo", postedTo);

      console.log("formDataPayload");
      console.log(postDetailsObject.flipcardPhotosProp);

      postDetailsObject.flipcardPhotosProp.forEach((file) => {
        formDataPayload.append("images", file);
        console.log(file);
      });
    } else if (postTypeId === 6) {
      apiEndPoint = "posts/create-post/6";
      postDetailsObj = {
        postContent: postDetailsObject.postContentProp,
        postVideo: postDetailsObject.postVideoProp,
        privacyId: postDetailsObject.postPrivacyProp,
        postTypeId,
        postedTo,
      };

      formDataPayload.append("postContent", postDetailsObject.postContentProp);
      formDataPayload.append("postVideo", postDetailsObject.postVideoProp);
      formDataPayload.append("privacyId", postDetailsObject.postPrivacyProp);
      formDataPayload.append("postTypeId", postTypeId);
      formDataPayload.append("postedTo", postedTo);

      console.log("formDataPayload");
      console.log(postDetailsObject.postVideoProp);

      postDetailsObject.postVideoProp.forEach((file) => {
        formDataPayload.append("videoFile", file);
        console.log(file);
      });
    }
    // console.log("postDetailsObj is below --> ");
    // console.log(formDataPayload);

    if (postTypeId !== 4 && postTypeId !== 5 && postTypeId !== 6) {
      return async (dispatch) => {
        return API.post(apiEndPoint, postDetailsObj, { headers })
          .then((res) => {
            // console.log(res.data);
            dispatch({ type: CREATE_POST });
            return { success: true, data: res.data };
          })
          .catch((err) => {
            // console.log(err.response.data);
            dispatch({
              type: CREATE_POST_ERROR,
              payload: err.response.data.msg,
            });
            return {
              success: false,
              errorType: err.response.data.errorType,
              errorTag: err.response.data.errorTag,
              msg: err.response.data.msg,
            };
          });
      };
    } else {
      // headers["Content-Type"] = "multipart/form-data";
      // console.log("formDataPayload is below");
      // console.log(formDataPayload);
      return async (dispatch) => {
        return API.post(apiEndPoint, formDataPayload, { headers })
          .then((res) => {
            // console.log(res.data);
            dispatch({ type: CREATE_POST });
            return { success: true, data: res.data };
          })
          .catch((err) => {
            // console.log(err.response.data);
            dispatch({
              type: CREATE_POST_ERROR,
              payload: err.response.data.msg,
            });
            return {
              success: false,
              errorType: err.response.data.errorType,
              errorTag: err.response.data.errorTag,
              msg: err.response.data.msg,
            };
          });
      };
    }
  } else {
    return {
      success: false,
      errorType: "localError",
      errorTag: "tokenExpired",
    };
  }
};

// Fetching all users's posts handler -- Starts
export const fetchAllUsersPosts = () => {
  let authToken = localStorage.getItem("authToken");
  const tokenUserDetails = validateToken();
  // console.log(tokenUserDetails);
  if (tokenUserDetails) {
    apiEndPoint = `posts`;
    headers["x-auth-token"] = authToken;

    return async (dispatch) => {
      return API.get(apiEndPoint, { headers })
        .then((res) => {
          // console.log(res.data);
          dispatch({ type: FETCHED_POSTS, payload: res.data });
          dispatch({ type: EMPTY_PROFILE_USER_POSTS });
          return { success: true, payload: res.data };
        })
        .catch((err) => {
          // console.log(err.response);
          dispatch({
            type: POSTS_FETCHING_ERROR,
            payload: err.response,
          });
          return {
            success: false,
            payload: err.response,
          };
        });
    };
  } else {
    return {
      success: false,
      errorType: "localError",
      errorTag: "tokenExpired",
    };
  }
};
// Fetching all users's posts handler -- Ends

// upsertReaction handler -- Starts
export const upsertReaction = (postId, actionType, reactionTypeId) => {
  let authToken = localStorage.getItem("authToken");
  const tokenUserDetails = validateToken();
  // console.log(tokenUserDetails);
  // let userId;
  if (tokenUserDetails) {
    let obj = {
      postId,
      reactionTypeId,
    };
    // console.log("userId --> " + userId);
    if (actionType === "add") {
      apiEndPoint = `posts/addReaction`;
    } else {
      apiEndPoint = `posts/deleteReaction`;
    }
    headers["x-auth-token"] = authToken;

    return async (dispatch) => {
      return API.put(apiEndPoint, obj, { headers })
        .then((res) => {
          console.log(res.data);
          dispatch({ type: REACTION_UPSERTION_SUCCESS, payload: res.data });
          return { success: true, payload: res.data };
        })
        .catch((err) => {
          console.log(err.response);
          dispatch({
            type: REACTION_UPSERTION_ERROR,
            payload: err.response,
          });
          return {
            success: false,
            payload: err.response,
          };
        });
    };
  } else {
    return {
      success: false,
      errorType: "localError",
      errorTag: "tokenExpired",
    };
  }
};
// upsertReaction handler -- Ends

// upsertComment handler -- Starts
export const upsertComment = (
  postId,
  actionType,
  commentText,
  uniqueCommentId
) => {
  let authToken = localStorage.getItem("authToken");
  const tokenUserDetails = validateToken();
  // console.log(tokenUserDetails);
  // let userId;
  console.log("tokenUserDetails -> " + tokenUserDetails);
  console.log("postId -> " + postId);
  console.log("commentText -> " + commentText);
  console.log("uniqueCommentId -> " + uniqueCommentId);
  if (tokenUserDetails && postId && uniqueCommentId) {
    let obj = {
      postId,
      comment: commentText,
      uniqueCommentId,
    };
    // console.log("userId --> " + userId);
    if (actionType === "add") {
      apiEndPoint = `posts/addComment`;
    } else {
      apiEndPoint = `posts/deleteComment`;
    }
    headers["x-auth-token"] = authToken;

    return async (dispatch) => {
      return API.put(apiEndPoint, obj, { headers })
        .then((res) => {
          console.log(res.data);
          dispatch({ type: COMMENT_UPSERTION_SUCCESS, payload: res.data });
          return { success: true, payload: res.data };
        })
        .catch((err) => {
          console.log(err.response);
          dispatch({
            type: COMMENT_UPSERTION_ERROR,
            payload: err.response,
          });
          return {
            success: false,
            payload: err.response,
          };
        });
    };
  } else {
    return {
      success: false,
      errorType: "localError",
      errorTag: "tokenExpired",
    };
  }
};
// upsertComment handler -- Ends

// Deleting single post handler -- Starts
export const deletePost = (postId) => {
  let authToken = localStorage.getItem("authToken");
  const tokenUserDetails = validateToken();
  // console.log(tokenUserDetails);
  // let userId;
  if (tokenUserDetails && postId) {
    // console.log("userId --> " + userId);
    apiEndPoint = `posts/delete/`;

    let obj = {
      postId,
    };

    headers["x-auth-token"] = authToken;

    return async (dispatch) => {
      return API.put(apiEndPoint, obj, { headers })
        .then((res) => {
          console.log(res.data);
          dispatch({ type: POST_DELETION_SUCCESS });
          return { success: true, payload: res.data };
        })
        .catch((err) => {
          console.log(err.response);
          dispatch({
            type: POST_DELETION_ERROR,
            payload: err.response,
          });
          return {
            success: false,
            payload: err.response,
          };
        });
    };
  } else {
    return {
      success: false,
      errorType: "localError",
      errorTag: "tokenExpired",
    };
  }
};
// Deleting single post handler -- Ends
