import API from "./../../api";
import {
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILED,
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
        localStorage.setItem("authToken", res.data.token);
        dispatch({ type: REGISTRATION_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        console.log(err.response.data.msg);
        dispatch({ type: REGISTRATION_FAILED, payload: err.response.data.msg });
      });
  };
};
