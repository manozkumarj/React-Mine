import API from "./../../api";
import validateToken from "./../validateToken";

import {
  CREATE_POST,
  CREATE_POST_ERROR,
  ALL_USERS_POSTS,
  ALL_USERS_POSTS_ERROR,
  INDIVIDUAL_USER_POSTS,
  INDIVIDUAL_USER_POSTS_ERROR,
  IS_LOADING_POSTS,
  IS_COMMENT_INSERTED,
  COMMENT_INSERTION_ERROR,
  IS_REACTION_UPSERTED,
  REACTION_UPSERTION_ERROR,
} from "./../actionTypes/postsRelatedTypes";

let headers = {
  "Content-Type": "application/json",
};

// All types of post creation handler -- Starts
let apiEndPoint;
let photosPayload = new FormData();
export const createPost = (
  authToken,
  postedTo,
  postTypeId,
  postDetailsObject
) => {
  // console.log("authToken --> " + authToken);
  // console.log("postedTo --> " + postedTo);
  // console.log("postTypeId --> " + postTypeId);
  // console.log("postDetailsObject is below --> ");
  // console.log(postDetailsObject);
  headers["x-auth-token"] = authToken;

  if (
    postTypeId === 1 ||
    postTypeId === 2 ||
    postTypeId === 3 ||
    postTypeId === 4 ||
    postTypeId === 5
  ) {
    let postDetailsObj;
    if (postTypeId === 1) {
      apiEndPoint = "posts/create-post/1";
      // console.log("postContent --> " + postDetailsObject.postContentProp);
      postDetailsObj = {
        postContent: postDetailsObject.postContentProp,
        privacyId: postDetailsObject.postPrivacyProp,
        postTypeId,
        postedTo,
      };
    } else if (postTypeId === 2) {
      apiEndPoint = "posts/create-post/2";
      // console.log("postImages is below");
      // console.log(postDetailsObject.postImagesProp);
      postDetailsObj = {
        postImages: postDetailsObject.postImagesProp,
        privacyId: postDetailsObject.postPrivacyProp,
        postContent: postDetailsObject.postContentProp,
        postTypeId,
        postedTo,
      };

      photosPayload.append("postContent", postDetailsObject.postContentProp);
      photosPayload.append("postImages", postDetailsObject.postImagesProp);
      photosPayload.append("privacyId", postDetailsObject.postPrivacyProp);
      photosPayload.append("postTypeId", postTypeId);
      photosPayload.append("postedTo", postedTo);

      postDetailsObject.postImagesProp.forEach((file) => {
        photosPayload.append("images", file);
      });
    } else if (postTypeId === 3 || postTypeId === 4 || postTypeId === 5) {
      apiEndPoint = `posts/create-post/${postTypeId}`;
      // console.log("postContent --> " + postDetailsObject.postContent);
      postDetailsObj = {
        postContent: postDetailsObject.postContent,
        privacyId: postDetailsObject.postPrivacy,
        postTypeId,
        postedTo,
        backgroundColor: postDetailsObject.backgroundColor,
        textColor: postDetailsObject.textColor,
      };

      if (postTypeId === 4) {
        postDetailsObj.borderColor = postDetailsObject.borderColor;
        postDetailsObj.borderStyle = postDetailsObject.borderStyle;
        postDetailsObj.borderStyleSides = postDetailsObject.borderStyleSides;
      } else if (postTypeId === 5) {
        postDetailsObj.cornerStyle = postDetailsObject.cornerStyle;
        postDetailsObj.cornerStyleSides = postDetailsObject.cornerStyleSides;
      }
    }

    if (
      postTypeId === 1 ||
      postTypeId === 3 ||
      postTypeId === 4 ||
      postTypeId === 5
    ) {
      headers["Content-Type"] = "application/json";

      return (dispatch) => {
        API.post(apiEndPoint, postDetailsObj, { headers })
          .then((res) => {
            console.log(res.data);
            dispatch({ type: CREATE_POST });
          })
          .catch((err) => {
            console.log(err.response.data);
            dispatch({
              type: CREATE_POST_ERROR,
              payload: err.response.data.msg,
            });
          });
      };
    } else if (postTypeId === 2) {
      // console.log("photosPayload is below");
      // console.log(photosPayload);
      // headers["Content-Type"] = "multipart/form-data";
      headers["Content-Type"] = "application/json";

      return (dispatch) => {
        API.post(apiEndPoint, photosPayload, { headers })
          .then((res) => {
            console.log(res.data);
            dispatch({ type: CREATE_POST });
          })
          .catch((err) => {
            console.log(err.response.data);
            dispatch({
              type: CREATE_POST_ERROR,
              payload: err.response.data.msg,
            });
          });
      };
    }
  }
};
// All types of post creation handler -- Ends

// Fetching individual user's posts handler -- Starts
export const getAllUsersPosts = () => {
  let authToken = localStorage.getItem("authToken");
  const tokenUserDetails = validateToken();
  // console.log(tokenUserDetails);
  if (tokenUserDetails) {
    apiEndPoint = `posts`;
    headers["x-auth-token"] = authToken;

    return (dispatch) => {
      dispatch({ type: IS_LOADING_POSTS });
      API.get(apiEndPoint, { headers })
        .then((res) => {
          console.log(res.data);
          dispatch({ type: ALL_USERS_POSTS, payload: res.data });
        })
        .catch((err) => {
          console.log(err.response);
          dispatch({
            type: ALL_USERS_POSTS_ERROR,
            payload: err.response,
          });
        });
    };
  }
};
// Fetching individual user's posts handler -- Ends

// Fetching individual user's posts handler -- Starts
export const getIndividualUserPosts = (authToken, userId) => {
  // console.log("userId --> " + userId);
  apiEndPoint = `posts/postedTo/${userId}`;
  headers["x-auth-token"] = authToken;

  return (dispatch) => {
    dispatch({ type: IS_LOADING_POSTS });
    API.get(apiEndPoint, { headers })
      .then((res) => {
        console.log(res.data);
        dispatch({ type: INDIVIDUAL_USER_POSTS, payload: res.data });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: INDIVIDUAL_USER_POSTS_ERROR,
          payload: err.response,
        });
      });
  };
};
// Fetching individual user's posts handler -- Ends

// Fetching individual post's comment insertion handler -- Starts
export const addComment = (postId, commentText) => {
  let authToken = localStorage.getItem("authToken");
  const tokenUserDetails = validateToken();
  // console.log(tokenUserDetails);
  // let userId;
  if (tokenUserDetails) {
    let obj = {
      postId,
      comment: commentText,
    };
    // console.log("userId --> " + userId);
    apiEndPoint = `posts/addComment`;
    headers["x-auth-token"] = authToken;

    return (dispatch) => {
      API.put(apiEndPoint, obj, { headers })
        .then((res) => {
          console.log(res.data);
          dispatch({ type: IS_COMMENT_INSERTED });
        })
        .catch((err) => {
          console.log(err.response);
          dispatch({
            type: COMMENT_INSERTION_ERROR,
            payload: err.response,
          });
        });
    };
  }
};
// Fetching individual post's comment insertion handler -- Ends

// Fetching individual posts's reaction handler -- Starts
export const upsertReaction = (postId, reactionTypeId) => {
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
    apiEndPoint = `posts/addReaction`;
    headers["x-auth-token"] = authToken;

    return (dispatch) => {
      API.put(apiEndPoint, obj, { headers })
        .then((res) => {
          console.log(res.data);
          dispatch({ type: IS_REACTION_UPSERTED });
        })
        .catch((err) => {
          console.log(err.response);
          dispatch({
            type: REACTION_UPSERTION_ERROR,
            payload: err.response,
          });
        });
    };
  }
};
// Fetching individual posts's reaction handler -- Ends
