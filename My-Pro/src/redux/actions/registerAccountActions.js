import { REGISTRATION_SUCCESS } from "./../actionTypes/registerAccountTypes";

export const registerAccount = (accountDetails) => {
  console.log(accountDetails);
  return (dispatch) => {
    dispatch({ type: REGISTRATION_SUCCESS, payload: accountDetails });
  };
};
