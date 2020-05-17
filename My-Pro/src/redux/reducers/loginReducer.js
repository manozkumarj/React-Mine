import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGIN_STATE,
  RESET_STATE,
} from "./../actionTypes/loginTypes";

const initialState = {
  loginDetails: [],
  isLoginSuccess: false,
  loginSuccessToken: null,
  loginError: "",
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginSuccessToken: action.payload,
        isLoginSuccess: true,
        loginError: "",
      };
      break;

    case LOGIN_FAILED:
      return {
        ...state,
        loginDetails: [],
        loginError: action.payload,
        isLoginSuccess: false,
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
