import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGIN_STATE,
  RESET_STATE,
} from "./../actionTypes/loginTypes";

const initialState = {
  loginDetails: null,
  loginSuccessData: null,
  isLoginSuccess: false,
  loginSuccessToken: null,
  loginErrorData: "",
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginSuccessData: action.payload,
        loginSuccessToken: action.payload.token,
        isLoginSuccess: true,
        loginErrorData: "",
      };
      break;

    case LOGIN_FAILED:
      return {
        ...state,
        loginDetails: null,
        loginSuccessData: null,
        loginErrorData: action.payload,
        isLoginSuccess: false,
        loginSuccessToken: null,
      };
      break;

    case LOGIN_STATE:
      return state;
      break;

    case RESET_STATE:
      return initialState;
      break;

    default:
      return state;
  }
};

export default loginReducer;
