import API from "./../../api";
import {
  CREATE_POST,
  CREATE_POST_ERROR,
} from "./../actionTypes/postsRelatedTypes";

let headers = {
  "Content-Type": "application/json",
};

export const createPost = (
  authToken,
  postedTo,
  postTypeId,
  postDetailsObject
) => {
  console.log("postedTo --> " + postedTo);
  console.log("postTypeId --> " + postTypeId);
  console.log("PostPrivacy --> " + postDetailsObject.postPrivacyProp);

  if (postTypeId === 1 || postTypeId === 2 || postTypeId === 3) {
    let postDetailsObj;
    if (postTypeId === 1) {
      console.log("postContent --> " + postDetailsObject.postContentProp);
      postDetailsObj = {
        postContent: postDetailsObject.postContentProp,
        privacyId: postDetailsObject.postPrivacyProp,
        postTypeId,
        postedTo,
      };
    } else if (postTypeId === 2) {
      console.log("postImages is below");
      console.log(postDetailsObject.postImagesProp);
      postDetailsObj = {
        postImages: postDetailsObject.postImagesProp,
        privacyId: postDetailsObject.postPrivacyProp,
        postTypeId,
        postedTo,
      };
    } else if (postTypeId === 3) {
      console.log("postContent --> " + postDetailsObject.postContentProp);
      console.log("postImages is below");
      console.log(postDetailsObject.postImagesProp);
      postDetailsObj = {
        postImages: postDetailsObject.postImagesProp,
        postContent: postDetailsObject.postContentProp,
        privacyId: postDetailsObject.postPrivacyProp,
        postTypeId,
        postedTo,
      };
    }

    headers["x-auth-token"] = authToken;

    return (dispatch) => {
      API.post(`posts`, postDetailsObj, { headers })
        .then((res) => {
          console.log(res.data);
          dispatch({ type: CREATE_POST });
        })
        .catch((err) => {
          console.log(err.response.data);
          dispatch({ type: CREATE_POST_ERROR, payload: err.response.data.msg });
        });
    };
  }
};
