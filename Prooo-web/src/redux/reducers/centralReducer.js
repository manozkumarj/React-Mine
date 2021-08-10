//************************************* Imports ****************************************************/
// Posts related
import {
  CREATE_POST,
  CREATE_POST_ERROR,
  FETCHED_POSTS,
  POSTS_FETCHING_ERROR,
  REACTION_UPSERTION_SUCCESS,
  REACTION_UPSERTION_ERROR,
  COMMENT_UPSERTION_SUCCESS,
  COMMENT_UPSERTION_ERROR,
  POST_DELETION_SUCCESS,
  POST_DELETION_ERROR,
  ASSIGN_PROFILE_USER_POSTS,
} from "./../actionTypes/postsRelatedTypes";
//************************************* State ****************************************************/
const initialState = {
  isEverythingOk: true,
  isNewPostCreated: false,
  newPostCreationError: null,
  isLoadingPosts: null,
  fetchedPosts: [],
  postsFetchingError: null,
  isReactionUpserted: null,
  reactionUpsertionError: null,
  isCommentUpserted: null,
  commentUpsertionError: null,
  isPostDeleted: null,
  postDeletionError: null,
  authUserDetails: null,
};

//************************************* Reducer ****************************************************/
const centralReducer = (state = initialState, action) => {
  switch (action.type) {
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
        fetchedPosts: action.payload.posts,
        postsFetchingError: action.payload,
      };

    case ASSIGN_PROFILE_USER_POSTS:
      return {
        ...state,
        fetchedPosts: action.payload.profileUserPosts,
      };

    case POSTS_FETCHING_ERROR:
      return {
        ...state,
        fetchedPosts: [],
        postsFetchingError: action.payload,
      };

    case REACTION_UPSERTION_SUCCESS:
      return {
        ...state,
        isReactionUpserted: true,
        reactionUpsertionError: null,
      };

    case REACTION_UPSERTION_ERROR:
      return {
        ...state,
        isReactionUpserted: false,
        reactionUpsertionError: action.payload.msg,
      };

    case COMMENT_UPSERTION_SUCCESS:
      return {
        ...state,
        isCommentUpserted: true,
        commentUpsertionError: null,
      };

    case COMMENT_UPSERTION_ERROR:
      return {
        ...state,
        isCommentUpserted: false,
        commentUpsertionError: action.payload.msg,
      };

    case POST_DELETION_SUCCESS:
      return {
        ...state,
        isPostDeleted: true,
        postDeletionError: null,
      };

    case POST_DELETION_ERROR:
      return {
        ...state,
        isPostDeleted: false,
        postDeletionError: action.payload.msg,
      };

    default:
      return state;
  }
};

export default centralReducer;
