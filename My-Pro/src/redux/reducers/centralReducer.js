import {
  STORE_LOGGED_IN_USER_DETAILS,
  STORE_POSTS,
  FILTER_POST,
  GET_STATE,
  RESET_STATE,
} from "./../actionTypes/centralTypes";

const initialState = {
  loggedInUserDetails: [],
  allPosts: [],
  filteredPost: [],
};

const centralReducer = (state = initialState, action) => {
  switch (action.type) {
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
        filteredPost: allPosts.filter(post => post.postId == action.payload),
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
