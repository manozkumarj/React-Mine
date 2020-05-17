import {
  SET_TOKEN,
  REMOVE_TOKEN,
  AUTH_STATE,
} from "./../actionTypes/authTypes";

export const setToken = (token) => {
  localStorage.setItem("authToken", token);
  return (dispatch) => {
    dispatch({ type: SET_TOKEN, payload: token });
  };
};

export const removeToken = () => {
  localStorage.setItem("authToken", null);
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
