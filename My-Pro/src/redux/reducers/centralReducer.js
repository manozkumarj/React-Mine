//************************************* Imports ****************************************************/
// Registration related
import {
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILED,
} from "./../actionTypes/registerAccountTypes";

// Login related
import { LOGIN_SUCCESS, LOGIN_FAILED } from "./../actionTypes/loginTypes";

// Auth related
import { SET_TOKEN, REMOVE_TOKEN } from "./../actionTypes/authTypes";

// Logged In user related
import {
  STORE_LOGGED_IN_USER_DETAILS,
  STORE_POSTS,
  FILTER_POST,
  GET_STATE,
  RESET_STATE,
} from "./../actionTypes/centralTypes";

//************************************* State ****************************************************/
const initialState = {
  // Registration related
  isRegistrationSuccess: false,
  registrationError: null,

  // Login related
  isLoginSuccess: false,
  loginErrorData: null,

  // Auth related
  authToken: userToken,

  // Logged In user related
  loggedInUserDetails: null,
  allPosts: null,
  filteredPost: null,
};

//************************************* Reducer ****************************************************/
const centralReducer = (state = initialState, action) => {
  switch (action.type) {
    // Registration related
    case REGISTRATION_SUCCESS:
      return {
        ...state,
        isRegistrationSuccess: true,
        registrationError: null,
      };
      break;

    case REGISTRATION_FAILED:
      return {
        ...state,
        registrationError: action.payload,
        isRegistrationSuccess: false,
      };
      break;

    // Login related
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggedInUserDetails: action.payload,
        authToken: action.payload.token,
        isLoginSuccess: true,
        loginErrorData: null,
      };
      break;

    case LOGIN_FAILED:
      return {
        ...state,
        loggedInUserDetails: null,
        loginErrorData: action.payload,
        isLoginSuccess: false,
        authToken: null,
      };
      break;

    // Auth related
    case SET_TOKEN:
      return {
        ...state,
        authToken: action.payload,
      };
      break;

    case REMOVE_TOKEN:
      return {
        ...state,
        authToken: null,
        loggedInUserDetails: null,
        isLoginSuccess: false,
      };
      break;

    // Logged In user related
    case STORE_LOGGED_IN_USER_DETAILS:
      return {
        ...state,
        loggedInUserDetails: action.payload,
      };
      break;

    case STORE_POSTS:
      return {
        ...state,
        allPosts: action.payload,
      };
      break;

    case FILTER_POST:
      return {
        ...state,
        filteredPost: state.allPosts.filter(
          (post) => post.postId == action.payload
        ),
      };
      break;

    case RESET_STATE:
      return initialState;
      break;

    case GET_STATE:
      return state;
      break;

    default:
      return state;
  }
};

export default centralReducer;
