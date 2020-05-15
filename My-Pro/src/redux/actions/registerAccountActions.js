import API from "./../../api";
import { REGISTRATION_SUCCESS } from "./../actionTypes/registerAccountTypes";
import { REGISTRATION_FAILED } from "./../actionTypes/registerAccountTypes";

export const registerAccount = (accountDetails) => {
  // console.log(accountDetails);

  // API.post(`users`, { accountDetails })
  //   .then((res) => console.log(res))
  //   .catch((err) => console.log(err));

  return (dispatch) => {
    API.get(`users`)
      .then((res) => {
        console.log(res.data);
        dispatch({ type: REGISTRATION_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: REGISTRATION_FAILED });
      });
  };
};
