import {
  STORE_LOGGED_IN_USER_DETAILS,
  STORE_POSTS,
  FILTER_POST,
  GET_STATE,
  RESET_STATE,
} from "./../actionTypes/centralTypes";

export const storeLoggedInUserDetails = (details) => {
  return (dispatch) => {
    dispatch({ type: STORE_LOGGED_IN_USER_DETAILS, payload: details });
  };
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
