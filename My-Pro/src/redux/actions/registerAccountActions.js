import { REGISTER_ACCOUNT } from "./../actionTypes/registerAccountTypes";

export const registerAccount = (accountDetails) => {
  return (dispatch) => {
    dispatch({ type: REGISTER_ACCOUNT });
  };
};
