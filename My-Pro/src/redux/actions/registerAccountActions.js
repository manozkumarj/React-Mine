import API from "./../../api";
import {
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILED,
  REGISTRATION_STATE,
  RESET_STATE,
} from "./../actionTypes/registerAccountTypes";

export const registerAccount = (accountDetails) => {
  console.log(accountDetails);

  // API.get(`users`)
  //   .then((res) => console.log(res))
  //   .catch((err) => console.log(err));

  // let { fullName, email, password } = accountDetails;

  const headers = {
    "Content-Type": "application/json",
  };

  return (dispatch) => {
    API.post(`users`, accountDetails, { headers })
      .then((res) => {
        console.log(res.data);
        dispatch({ type: REGISTRATION_SUCCESS, payload: res.data.token });
      })
      .catch((err) => {
        console.log(err.response.data.msg);
        dispatch({ type: REGISTRATION_FAILED, payload: err.response.data.msg });
      });
  };
};

export const registrationState = () => {
  return (dispatch) => {
    dispatch({ type: REGISTRATION_STATE });
  };
};

export const resetState = () => {
  return (dispatch) => {
    dispatch({ type: RESET_STATE });
  };
};
