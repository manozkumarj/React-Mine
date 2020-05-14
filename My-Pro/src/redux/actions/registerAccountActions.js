import { REGISTER_ACCOUNT } from "./../actionTypes/registerAccountTypes";
import { DUMMY_TYPE } from "./../actionTypes/registerAccountTypes";

export const registerAccount = () => {
  return (dispatch) => {
    dispatch({ type: REGISTER_ACCOUNT });
  };
};

export const dummyType = () => {
  return (dispatch) => {
    dispatch({ type: DUMMY_TYPE });
  };
};
