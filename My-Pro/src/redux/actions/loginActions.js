import API from "./../../api";
import { LOGIN_SUCCESS, LOGIN_FAILED } from "./../actionTypes/loginTypes";

export const loginUser = (loginDetails) => {
  console.log(loginDetails);

  const headers = {
    "Content-Type": "application/json",
  };

  return (dispatch) => {
    API.post(`users/authenticate`, loginDetails, { headers })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("authToken", res.data.token);
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({ type: LOGIN_FAILED, payload: err.response.data.msg });
      });
  };
};
