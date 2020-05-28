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

// Posts related
import {
  CREATE_POST,
  CREATE_POST_ERROR,
  ALL_USERS_POSTS,
  ALL_USERS_POSTS_ERROR,
  INDIVIDUAL_USER_POSTS,
  INDIVIDUAL_USER_POSTS_ERROR,
  IS_LOADING_POSTS,
  IS_COMMENT_INSERTED,
  COMMENT_INSERTION_ERROR,
} from "./../actionTypes/postsRelatedTypes";

import validateToken from "./../validateToken";

let token = localStorage.getItem("authToken");
const tokenUserDetails = validateToken();
console.log(tokenUserDetails);
let userId;
if (tokenUserDetails) {
  userId = tokenUserDetails._id;
} else {
  localStorage.removeItem("authToken");
  userId = null;
  token = null;
}

//************************************* State ****************************************************/
const initialState = {
  // Registration related
  isRegistrationSuccess: false,
  registrationError: null,

  // Login related
  isLoginSuccess: false,
  loginErrorData: null,

  // Auth related
  authToken: token,

  // Logged In user related
  loggedInUserDetails: tokenUserDetails,
  allPosts: null,
  filteredPost: null,
  loggedInUserId: userId,

  // Posts related
  isNewPostCreated: false,
  isLoading: false,
  newPostCreationError: null,
  allUsersPosts: null,
  allUsersPostsError: null,
  individualUserPosts: null,
  individualUserPostsError: null,
  isCommentInserted: false,
  commentInsertionError: null,
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
        authToken: action.payload.token,
        isLoginSuccess: true,
        loggedInUserDetails: action.payload.user,
        loggedInUserId: action.payload.user._id,
      };

    case REGISTRATION_FAILED:
      return {
        ...state,
        registrationError: action.payload,
        isRegistrationSuccess: false,
      };

    // Login related
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggedInUserDetails: action.payload.user,
        authToken: action.payload.token,
        isLoginSuccess: true,
        loginErrorData: null,
        loggedInUserId: action.payload.user._id,
      };

    case LOGIN_FAILED:
      return {
        ...state,
        loggedInUserDetails: null,
        loginErrorData: action.payload,
        isLoginSuccess: false,
        authToken: null,
        loggedInUserId: null,
      };

    // Auth related
    case SET_TOKEN:
      return {
        ...state,
        authToken: action.payload,
      };

    case REMOVE_TOKEN:
      return {
        ...state,
        authToken: null,
        loggedInUserDetails: null,
        isLoginSuccess: false,
        loggedInUserId: null,
        allUsersPosts: null,
        individualUserPosts: null,
      };

    // Logged In user related
    case STORE_LOGGED_IN_USER_DETAILS:
      return {
        ...state,
        loggedInUserDetails: action.payload,
      };

    case STORE_POSTS:
      return {
        ...state,
        allPosts: action.payload,
      };

    case FILTER_POST:
      return {
        ...state,
        filteredPost: state.allPosts.filter(
          (post) => post.postId === action.payload
        ),
      };

    // Posts related
    case CREATE_POST:
      return {
        ...state,
        isNewPostCreated: true,
        newPostCreationError: null,
      };

    case CREATE_POST_ERROR:
      return {
        ...state,
        isNewPostCreated: false,
        newPostCreationError: action.payload,
      };

    case ALL_USERS_POSTS:
      return {
        ...state,
        allUsersPostsError: null,
        allUsersPosts: action.payload,
        isLoading: false,
      };

    case ALL_USERS_POSTS_ERROR:
      return {
        ...state,
        allUsersPostsError: action.payload,
        allUsersPosts: null,
        isLoading: false,
      };

    case INDIVIDUAL_USER_POSTS:
      return {
        ...state,
        individualUserPostsError: null,
        individualUserPosts: action.payload,
        isLoading: false,
      };

    case INDIVIDUAL_USER_POSTS_ERROR:
      return {
        ...state,
        individualUserPostsError: action.payload,
        individualUserPosts: null,
        isLoading: false,
      };

    case IS_LOADING_POSTS:
      return {
        ...state,
        individualUserPostsError: null,
        individualUserPosts: null,
        isLoading: true,
      };

    case IS_COMMENT_INSERTED:
      return {
        ...state,
        commentInsertionError: null,
        isCommentInserted: true,
      };

    case COMMENT_INSERTION_ERROR:
      return {
        ...state,
        commentInsertionError: action.payload,
        isCommentInserted: false,
      };

    case RESET_STATE:
      return initialState;

    case GET_STATE:
      return state;

    default:
      return state;
  }
};

export default centralReducer;
