//************************************* Imports ****************************************************/
import validateToken from "./../validateToken";
// Auth related
import {
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILED,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  DP_UPDATION_SUCCESS,
  DP_UPDATION_ERROR,
  IS_LOADING_POSTS,
  FETCHIG_PROFILE_USER_DETAILS_SUCCESS,
  FETCHIG_PROFILE_USER_DETAILS_ERROR,
  EMPTY_PROFILE_USER_POSTS,
  FRIENDSHIP_ACTION_SUCCESS,
  FRIENDSHIP_ACTION_ERROR,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_ERROR,
  REMOVE_TOKEN,
} from "./../actionTypes/authTypes";

//************************************* Token validation ****************************************************/
let token = localStorage.getItem("authToken");
const tokenUserDetails = validateToken();
// console.log(tokenUserDetails);
let authUserDetails;
if (tokenUserDetails) {
  authUserDetails = tokenUserDetails;
  // console.log("tokenUserDetails from AuthReducer");
  // console.log(tokenUserDetails);
} else {
  localStorage.removeItem("authToken");
  authUserDetails = null;
  token = null;
}
//************************************* State ****************************************************/
const initialState = {
  authToken: token,
  authUserDetails,
  isRegistrationSuccess: false,
  isDpUpdated: null,
  dpUpdationError: null,
  profileUserDetails: null,
  profileUserPosts: [],
  isFriendshipActionSucceeded: null,
  friendshipActionError: null,
  isProfileUpdationSucceeded: null,
  profileUpdationError: null,
};

//************************************* Reducer ****************************************************/
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // Registration related - starts
    case REGISTRATION_SUCCESS:
      return {
        ...state,
        isRegistrationSuccess: true,
        authUserDetails: authUserDetails,
      };

    case REGISTRATION_FAILED:
      return {
        ...state,
        isRegistrationSuccess: false,
        authToken: null,
        authUserDetails: null,
      };
    // Registration related - ends

    // Login related - starts
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoginSuccess: true,
        authToken: action.payload.token,
        authUserDetails: action.payload.userDetails,
      };

    case LOGIN_FAILED:
      return {
        ...state,
        isLoginSuccess: false,
        authToken: null,
        authUserDetails: null,
      };
    // Login related - ends

    // DP updation related - starts
    case DP_UPDATION_SUCCESS:
      return {
        ...state,
        authToken: action.payload.token,
        authUserDetails: action.payload.userDetails,
        isDpUpdated: true,
        dpUpdationError: null,
      };

    case DP_UPDATION_ERROR:
      return {
        ...state,
        isDpUpdated: false,
        dpUpdationError: action.payload.msg,
      };
    // DP updation related - ends

    // Profile user details with username related - starts
    case IS_LOADING_POSTS:
      return {
        ...state,
        isLoadingPosts: true,
        profileUserDetails: null,
        profileUserPosts: [],
        profileUserDeatailsError: null,
      };

    case FETCHIG_PROFILE_USER_DETAILS_SUCCESS:
      return {
        ...state,
        isLoadingPosts: false,
        profileUserDetails: action.payload.profileUserDetails,
        profileUserPosts: action.payload.profileUserPosts,
        authUserDetails: action.payload.authUserdetails,
        profileUserDeatailsError: null,
      };

    case FETCHIG_PROFILE_USER_DETAILS_ERROR:
      return {
        ...state,
        isLoadingPosts: false,
        profileUserDetails: null,
        profileUserPosts: [],
        profileUserDeatailsError: action.payload.msg,
      };

    case EMPTY_PROFILE_USER_POSTS:
      return {
        ...state,
        isLoadingPosts: null,
        profileUserDetails: null,
        profileUserPosts: [],
        profileUserDeatailsError: null,
      };
    // Profile user details with username related - ends

    // friendshipAction related - starts
    case FRIENDSHIP_ACTION_SUCCESS:
      return {
        ...state,
        isFriendshipActionSucceeded: true,
        friendshipActionError: null,
      };

    case FRIENDSHIP_ACTION_ERROR:
      return {
        ...state,
        isFriendshipActionSucceeded: false,
        friendshipActionError: action.payload,
      };
    // friendshipAction related - ends

    // friendshipAction related - starts
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        isProfileUpdationSucceeded: true,
        profileUpdationError: null,
        authUserDetails: action.payload.userDetails,
        profileUserDetails: action.payload.userDetails,
      };

    case UPDATE_PROFILE_ERROR:
      return {
        ...state,
        isProfileUpdationSucceeded: false,
        profileUpdationError: action.payload,
      };
    // friendshipAction related - ends

    case REMOVE_TOKEN:
      return {
        ...state,
        authToken: null,
        authUserDetails: null,
        isRegistrationSuccess: false,
        isDpUpdated: null,
        dpUpdationError: null,
        profileUserDetails: null,
        profileUserPosts: [],
        isFriendshipActionSucceeded: null,
        friendshipActionError: null,
        isProfileUpdationSucceeded: null,
        isProfileUpdationSucceeded: null,
      };

    default:
      return state;
  }
};

export default authReducer;
