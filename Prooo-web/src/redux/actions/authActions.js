import API from "./../../api";
import validateToken from "./../validateToken";
import {
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILED,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  DP_UPDATION_SUCCESS,
  DP_UPDATION_ERROR,
  IS_LOADING_POSTS,
  FETCHIG_PROFILE_USER_DETAILS_SUCCESS,
  FETCHIG_PROFILE_USER_DETAILS_ERROR,
  FRIENDSHIP_ACTION_SUCCESS,
  FRIENDSHIP_ACTION_ERROR,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_ERROR,
  REMOVE_TOKEN,
} from "./../actionTypes/authTypes";

import { ASSIGN_PROFILE_USER_POSTS } from "./../actionTypes/postsRelatedTypes";

let headers = {
  "Content-Type": "application/json",
};
let apiEndPoint;

export const registerAccount = (registerDetails) => {
  // console.log(registerDetails);

  return async (dispatch) => {
    return API.post(`users`, registerDetails, { headers })
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          console.log("AuthActions - Registration is success");
          // localStorage.setItem("authToken", res.data.data.token);
          dispatch({ type: REGISTRATION_SUCCESS, payload: res.data });
          return { success: true, data: res.data };
        }
        // else {
        //   console.error("register failed");
        //   dispatch({ type: REGISTRATION_FAILED });
        //   return {
        //     success: false,
        //     errorType: res.data.errorType,
        //     errorTag: err.response.data.errorTag,
        //     msg: res.data.msg,
        //   };
        // }
      })
      .catch((err) => {
        console.error("AuthActions - Registration failed");
        console.log(err.response.data.msg);
        dispatch({ type: REGISTRATION_FAILED });
        return {
          success: false,
          errorType: err.response.data.errorType,
          errorTag: err.response.data.errorTag,
          msg: err.response.data.msg,
        };
      });
  };
};

// Login related - starts
export const authenticate = (loginDetails) => {
  console.log(loginDetails);

  const headers = {
    "Content-Type": "application/json",
  };

  return async (dispatch) => {
    return API.post(`users/authenticate`, loginDetails, { headers })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("authToken", res.data.token);
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
        return { success: true, data: res.data };
      })
      .catch((err) => {
        console.error("AuthActions - Authentication failed");
        console.log(err.response);
        dispatch({ type: LOGIN_FAILED });
        return {
          success: false,
          errorType: err.response.data.errorType,
          errorTag: err.response.data.errorTag,
          msg: err.response.data.msg,
        };
      });
  };
};
// Login related - starts

// DP updation handler -- Starts
export const updateDP = (postDetailsObject) => {
  let authToken = localStorage.getItem("authToken");
  const tokenUserDetails = validateToken();
  console.log(postDetailsObject);
  if (tokenUserDetails) {
    apiEndPoint = `users/update-dp`;
    headers["x-auth-token"] = authToken;

    let formDataPayload = new FormData();

    formDataPayload.append("dpTypeId", +postDetailsObject.dpTypeIdProp);

    postDetailsObject.croppedImageProp.forEach((file) => {
      formDataPayload.append("profilePhoto", file);
      console.log(file);
    });

    return async (dispatch) => {
      return API.post(apiEndPoint, formDataPayload, { headers })
        .then((res) => {
          // console.log(res.data);
          localStorage.setItem("authToken", res.data.token);
          dispatch({ type: DP_UPDATION_SUCCESS, payload: res.data });
          return { success: true, payload: res.data };
        })
        .catch((err) => {
          // console.log(err.response);
          dispatch({
            type: DP_UPDATION_ERROR,
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
// DP updation handler -- Ends

// Fetching profilePageUserDetails & posts with username handler -- Starts
export const getProfileUserDetailsAndPosts = (username) => {
  // console.log("username --> " + username);
  let authToken = localStorage.getItem("authToken");
  const tokenUserDetails = validateToken();

  apiEndPoint = `users/by-username/${username}`;
  headers["x-auth-token"] = authToken;

  if (tokenUserDetails) {
    return async (dispatch) => {
      dispatch({ type: IS_LOADING_POSTS });
      return API.get(apiEndPoint, { headers })
        .then((res) => {
          console.log(res.data);
          dispatch({
            type: FETCHIG_PROFILE_USER_DETAILS_SUCCESS,
            payload: res.data,
          });
          dispatch({
            type: ASSIGN_PROFILE_USER_POSTS,
            payload: res.data,
          });
          return { success: true, payload: res.data };
        })
        .catch((err) => {
          console.log(err.response);
          dispatch({
            type: FETCHIG_PROFILE_USER_DETAILS_ERROR,
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
// Fetching profilePageUserDetails & posts with username handler -- Ends

// friendshipAction related - starts
export const friendshipAction = (friendId, actionType) => {
  console.log("friendshipAction func triggered");
  return async (dispatch) => {
    let authToken = await localStorage.getItem("authToken");
    const tokenUserDetails = validateToken();
    // console.log(tokenUserDetails);
    if (tokenUserDetails) {
      if (actionType === "sendRequest") {
        apiEndPoint = `users/send-friend-request`;
      } else if (actionType === "cancelRequest") {
        apiEndPoint = `users/cancel-friend-request`;
      } else if (actionType === "deleteRequest") {
        apiEndPoint = `users/delete-friend-request`;
      } else if (actionType === "acceptRequest") {
        apiEndPoint = `users/accept-friend-request`;
      } else if (actionType === "unfriend") {
        apiEndPoint = `users/unfriend`;
      } else {
        return { status: "error", msg: "Invalid actionType" };
      }
      headers["x-auth-token"] = authToken;

      let obj = {
        friendId,
      };

      return API.put(apiEndPoint, obj, { headers })
        .then((res) => {
          console.log(res.data);
          dispatch({ type: FRIENDSHIP_ACTION_SUCCESS, payload: res.data });
          return { success: true, msg: "Friendship actions is success" };
        })
        .catch((err) => {
          console.log(err.response);
          dispatch({
            type: FRIENDSHIP_ACTION_ERROR,
            payload: err.response,
          });
          return { success: false, payload: err.response };
        });
    } else {
      return {
        success: false,
        errorType: "localError",
        errorTag: "tokenExpired",
      };
    }
  };
};
// friendshipAction related - ends

// Update Profile details related - starts
export const updateProfile = (profileDetails) => {
  console.log(profileDetails);

  return async (dispatch) => {
    let authToken = await localStorage.getItem("authToken");

    headers["x-auth-token"] = authToken;

    const tokenUserDetails = validateToken();
    // console.log(tokenUserDetails);
    if (tokenUserDetails) {
      return API.put(`users/update-profile-details`, profileDetails, {
        headers,
      })
        .then((res) => {
          console.log(res.data);
          localStorage.setItem("authToken", res.data.token);
          dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: res.data });
          return { success: true, data: res.data };
        })
        .catch((err) => {
          console.error("AuthActions - updateProfile failed");
          console.log(err.response);
          dispatch({ type: UPDATE_PROFILE_ERROR });
          return {
            success: false,
            errorType: err.response.data.errorType,
            errorTag: err.response.data.errorTag,
            msg: err.response.data.msg,
          };
        });
    } else {
      return {
        success: false,
        errorType: "localError",
        errorTag: "tokenExpired",
      };
    }
  };
};
// Update Profile details related - starts

export const removeToken = () => {
  localStorage.removeItem("authToken");
  return (dispatch) => {
    dispatch({ type: REMOVE_TOKEN });
    return { success: true };
  };
};
