import { CREATE_POST } from "./../actionTypes/postsRelatedTypes";

export const createPost = (postContent, postImages, postPrivacy) => {
  console.log("postContent --> " + postContent);
  console.log("PostPrivacy --> " + postPrivacy);
  console.log("postImages is below");
  console.log(postImages);
  return (dispatch) => {
    dispatch({ type: CREATE_POST });
  };
};
