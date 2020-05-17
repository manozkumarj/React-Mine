import API from "./../../api";
import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGIN_STATE,
  RESET_STATE,
} from "./../actionTypes/loginTypes";

export const loginUser = (loginDetails) => {
  console.log(loginDetails);

  const headers = {
    "Content-Type": "application/json",
  };

  return (dispatch) => {
    API.post(`users/authenticate`, loginDetails, { headers })
      .then((res) => {
        console.log(res.data);
        dispatch({ type: LOGIN_SUCCESS, payload: res.data.token });
      })
      .catch((err) => {
        console.log(err.response.data.msg);
        dispatch({ type: LOGIN_FAILED, payload: err.response.data.msg });
      });
  };
};

export const loginState = () => {
  return (dispatch) => {
    dispatch({ type: LOGIN_STATE });
  };
};

export const resetState = () => {
  return (dispatch) => {
    dispatch({ type: RESET_STATE });
  };
};
