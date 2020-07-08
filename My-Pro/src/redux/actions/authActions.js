import {
  SET_TOKEN,
  REMOVE_TOKEN,
  AUTH_STATE,
  SET_LOGGEDIN_USER_DETAILS,
} from "./../actionTypes/authTypes";

import API from "./../../api";
import validateToken from "./../validateToken";

let headers = {
  "Content-Type": "application/json",
};

// All types of post creation handler -- Starts
let apiEndPoint;

export const setToken = (token) => {
  localStorage.setItem("authToken", token);
  return (dispatch) => {
    dispatch({ type: SET_TOKEN, payload: token });
  };
};

export const removeToken = () => {
  localStorage.removeItem("authToken");
  return (dispatch) => {
    dispatch({ type: REMOVE_TOKEN });
  };
};

export const getAuthState = () => {
  const userToken = localStorage.getItem("authToken");
  return (dispatch) => {
    dispatch({ type: AUTH_STATE, payload: userToken });
  };
};

// Fetching individual user's details handler -- Starts
export const getLoggedInUserDetails = (id) => {
  return (dispatch) => {
    let authToken = localStorage.getItem("authToken");
    const tokenUserDetails = validateToken();
    // console.log(tokenUserDetails);
    if (tokenUserDetails) {
      apiEndPoint = `users/by-id/${id}`;
      headers["x-auth-token"] = authToken;
      return API.get(apiEndPoint, { headers })
        .then((res) => {
          console.log(res.data);
          dispatch({ type: SET_LOGGEDIN_USER_DETAILS, payload: res.data });
          return {
            status: "success",
            msg: "Success",
            data: res.data.userProfileDetails.friends,
          };
        })
        .catch((err) => {
          console.log(err.response);
        });
    } else {
      return { status: "error", msg: "Something went wrong" };
    }
  };
};
// Fetching individual user's details handler -- Ends
