import {
  CREATE_POST,
} from "./../actionTypes/postCreationTypes";

export const createPost = (postDetails) => {
  return (dispatch) => {
    dispatch({ type: CREATE_POST, payload: postDetails });
  };
};
