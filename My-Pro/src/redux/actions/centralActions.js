import API from "./../../api";
import validateToken from "./../validateToken";

import {
  STORE_LOGGED_IN_USER_DETAILS,
  // STORE_POSTS,
  // FILTER_POST,
  GET_STATE,
  RESET_STATE,
  SEARCH_RESULTS,
  SEARCH_ERROR,
} from "./../actionTypes/centralTypes";

let apiEndPoint;
let headers = {
  "Content-Type": "application/json",
};

export const storeLoggedInUserDetails = (details) => {
  return (dispatch) => {
    dispatch({ type: STORE_LOGGED_IN_USER_DETAILS, payload: details });
  };
};

export const searchUsers = (searchWord) => {
  let authToken = localStorage.getItem("authToken");
  const tokenUserDetails = validateToken();
  // console.log(tokenUserDetails);
  if (tokenUserDetails) {
    apiEndPoint = `users/search/${searchWord}`;
    headers["x-auth-token"] = authToken;

    return (dispatch) => {
      API.get(apiEndPoint, { headers })
        .then((res) => {
          console.log(res.data);
          dispatch({ type: SEARCH_RESULTS, payload: res.data });
        })
        .catch((err) => {
          console.log(err.response);
          dispatch({
            type: SEARCH_ERROR,
            payload: err.response,
          });
        });
    };
  }
};

export const resetState = () => {
  return (dispatch) => {
    dispatch({ type: RESET_STATE });
  };
};

export const getState = () => {
  return (dispatch) => {
    dispatch({ type: GET_STATE });
  };
};
