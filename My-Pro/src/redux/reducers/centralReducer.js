//************************************* Imports ****************************************************/
// Registration related
import {
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILED,
} from "./../actionTypes/registerAccountTypes";

// Login related
import { LOGIN_SUCCESS, LOGIN_FAILED } from "./../actionTypes/loginTypes";

// Auth related
import {
  SET_TOKEN,
  REMOVE_TOKEN,
  SET_LOGGEDIN_USER_DETAILS,
} from "./../actionTypes/authTypes";

// Logged In user related
import {
  STORE_LOGGED_IN_USER_DETAILS,
  STORE_POSTS,
  FILTER_POST,
  GET_STATE,
  RESET_STATE,
  SEARCH_RESULTS,
  SEARCH_ERROR,
  FRIENDSHIP_ACTION_SUCCESS,
  FRIENDSHIP_ACTION_ERROR,
} from "./../actionTypes/centralTypes";

// Posts related
import {
  CREATE_POST,
  CREATE_POST_ERROR,
  FETCHED_POSTS,
  FETCHING_POSTS_ERROR,
  IS_LOADING_POSTS,
  IS_COMMENT_INSERTED,
  COMMENT_INSERTION_ERROR,
  IS_REACTION_UPSERTED,
  REACTION_UPSERTION_ERROR,
  PROFILE_PAGE_USER_DETAILS_AND_POSTS,
  PROFILE_PAGE_USER_DETAILS_AND_POSTS_ERROR,
} from "./../actionTypes/postsRelatedTypes";

import validateToken from "./../validateToken";

let token = localStorage.getItem("authToken");
const tokenUserDetails = validateToken();
// console.log(tokenUserDetails);
let userId;
let username;
if (tokenUserDetails) {
  userId = tokenUserDetails._id;
  username = tokenUserDetails.username;
} else {
  localStorage.removeItem("authToken");
  userId = null;
  token = null;
  username = null;
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
  loggedInUserUsername: username,
  loggedInUserFriends: null,
  searchResults: null,
  searchError: null,
  isRequestSucceeded: null,
  hasRequestError: null,

  // Posts related
  isNewPostCreated: false,
  isLoading: false,
  newPostCreationError: null,
  fetchedPosts: null,
  postsFetchingError: null,
  isCommentInserted: false,
  commentInsertionError: null,
  isReactionUpserted: false,
  reactionUpsertionError: null,
  isProfileUserFound: null,
  profilePageUserDetails: null,
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
        loggedInUserUsername: action.payload.user.username,
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
        loggedInUserUsername: action.payload.user.username,
        loggedInUserFriends: action.payload.user.friends,
      };

    case LOGIN_FAILED:
      return {
        ...state,
        loggedInUserDetails: null,
        loginErrorData: action.payload,
        isLoginSuccess: false,
        authToken: null,
        loggedInUserId: null,
        loggedInUserUsername: null,
      };

    // Auth related
    case SET_TOKEN:
      return {
        ...state,
        authToken: action.payload,
      };

    case SET_LOGGEDIN_USER_DETAILS:
      return {
        ...state,
        loggedInUserDetails: action.payload.userProfileDetails,
        loggedInUserFriends: action.payload.userProfileDetails.friends,
      };

    case REMOVE_TOKEN:
      return {
        ...state,
        authToken: null,
        loggedInUserDetails: null,
        isLoginSuccess: false,
        loggedInUserId: null,
        loggedInUserUsername: null,
        fetchedPosts: null,
        postsFetchingError: null,
        isRequestSucceeded: null,
        hasRequestError: null,
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

    case FETCHED_POSTS:
      return {
        ...state,
        postsFetchingError: null,
        fetchedPosts: action.payload,
        isLoading: false,
      };

    case FETCHING_POSTS_ERROR:
      return {
        ...state,
        postsFetchingError: action.payload,
        fetchedPosts: null,
        isLoading: false,
      };

    case IS_LOADING_POSTS:
      return {
        ...state,
        postsFetchingError: null,
        fetchedPosts: null,
        isLoading: true,
        profilePageUserDetails: null,
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

    case IS_REACTION_UPSERTED:
      return {
        ...state,
        isReactionUpserted: true,
        reactionUpsertionError: null,
      };

    case REACTION_UPSERTION_ERROR:
      return {
        ...state,
        reactionUpsertionError: action.payload,
        isReactionUpserted: false,
      };

    case PROFILE_PAGE_USER_DETAILS_AND_POSTS:
      return {
        ...state,
        profilePageUserDetails: action.payload.userProfileDetails,
        isProfileUserFound: true,
        fetchedPosts: action.payload.posts,
        isLoading: false,
        loggedInUserDetails: action.payload.authUserdetails,
      };

    case PROFILE_PAGE_USER_DETAILS_AND_POSTS_ERROR:
      return {
        ...state,
        profilePageUserDetails: null,
        isProfileUserFound: false,
        fetchedPosts: null,
        isLoading: false,
      };

    case SEARCH_RESULTS:
      return {
        ...state,
        searchError: null,
        searchResults: action.payload,
      };

    case SEARCH_ERROR:
      return {
        ...state,
        searchError: action.payload,
        searchResults: null,
      };

    case FRIENDSHIP_ACTION_SUCCESS:
      return {
        ...state,
        isRequestSucceeded: true,
        hasRequestError: null,
      };

    case FRIENDSHIP_ACTION_ERROR:
      return {
        ...state,
        isRequestSucceeded: false,
        hasRequestError: action.payload,
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
