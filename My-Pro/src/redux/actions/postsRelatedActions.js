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
  console.log("postDetailsObject is below --> ");
  console.log(postDetailsObject);

  if (
    postTypeId === 1 ||
    postTypeId === 2 ||
    postTypeId === 3 ||
    postTypeId === 4 ||
    postTypeId === 5 ||
    postTypeId === 6
  ) {
    let apiEndPoint;
    let postDetailsObj;
    if (postTypeId === 1) {
      apiEndPoint = "posts/create-post/1";
      console.log("postContent --> " + postDetailsObject.postContentProp);
      postDetailsObj = {
        postContent: postDetailsObject.postContentProp,
        privacyId: postDetailsObject.postPrivacyProp,
        postTypeId,
        postedTo,
      };
    } else if (postTypeId === 2) {
      apiEndPoint = "posts/create-post/2";
      console.log("postImages is below");
      console.log(postDetailsObject.postImagesProp);
      postDetailsObj = {
        postImages: postDetailsObject.postImagesProp,
        privacyId: postDetailsObject.postPrivacyProp,
        postTypeId,
        postedTo,
      };
    } else if (postTypeId === 3) {
      apiEndPoint = "posts/create-post/3";
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
    } else if (postTypeId === 4 || postTypeId === 5 || postTypeId === 6) {
      apiEndPoint = `posts/create-post/${postTypeId}`;
      console.log("postContent --> " + postDetailsObject.postContent);
      postDetailsObj = {
        postContent: postDetailsObject.postContent,
        privacyId: postDetailsObject.postPrivacy,
        postTypeId,
        postedTo,
        backgroundColor: postDetailsObject.backgroundColor,
        textColor: postDetailsObject.textColor,
      };

      if (postTypeId === 5) {
        postDetailsObj.borderColor = postDetailsObject.borderColor;
        postDetailsObj.borderStyle = postDetailsObject.borderStyle;
        postDetailsObj.borderStyleSides = postDetailsObject.borderStyleSides;
      } else if (postTypeId === 6) {
        postDetailsObj.cornerStyle = postDetailsObject.cornerStyle;
        postDetailsObj.cornerStyleSides = postDetailsObject.cornerStyleSides;
      }
    }

    headers["x-auth-token"] = authToken;

    return (dispatch) => {
      API.post(apiEndPoint, postDetailsObj, { headers })
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
