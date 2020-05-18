import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import "./postMenu.css";

import whitecam from "../../../icons/whitecam.png";

import { createPost } from "./../../../redux/actionCreators";

const PostMenu = (props) => {
  const [postContent, setPostContent] = useState("");
  const [postImages, setPostImages] = useState("");
  const [postPrivacy, setPostPrivacy] = useState("");
  const [authToken, setAuthToken] = useState("");
  const [loggedInFelebId, setLoggedInFelebId] = useState("");

  useEffect(() => {
    setAuthToken(props.centralState.authToken);
    setLoggedInFelebId(props.centralState.loggedInFelebId);
    if (props.centralState.isNewPostCreated) {
      // alert("New post added");
      window.location.reload();
    } else if (props.centralState.newPostCreationError) {
      alert("Something went wrong while creating New post");
    }
    console.log(props);
  }, [props]);

  const $ = window.$;

  const maxFileSize = 1048576 * 5;
  // console.log("maxFileSize --> " + maxFileSize);

  const filesPickerRef = useRef();

  const pickImagesHandler = () => {
    filesPickerRef.current.click();
    $("#previewer").html("");
  };

  const fileChangeHandler = (event) => {
    console.log(event.target.files);
    console.log(event.target.files[0]);
    let selectedFiles = event.target.files;
    setPostImages(selectedFiles);
    let selectedFilesLength = event.target.files.length;

    if (selectedFilesLength > 10) {
      alert("You can upload maximum of 10 images");
      return false;
    }

    let isFileSizeExceededLimit = false;

    for (let i = 0; i < selectedFilesLength; i++) {
      // console.log(selectedFiles[i]["name"]);
      let fileSize = selectedFiles[i]["size"];
      console.log("fileSize --> " + fileSize);
      if (fileSize > maxFileSize) {
        isFileSizeExceededLimit = true;
      }
    }

    if (isFileSizeExceededLimit) {
      console.log("One of selected files size is more than 5 MB");
      alert("One of selected files size is more than 5 MB");
      return false;
    }

    var files = event.target.files,
      filesLength = files.length;
    if (filesLength < 11) {
      var image_holder = $("#previewer");
      image_holder.html("");
      for (var i = 0; i < filesLength; i++) {
        var f = files[i];
        var fileReader = new FileReader();
        fileReader.onload = function (e) {
          var file = e.target;
          $(
            '<div class="thumbimage">' +
              '<div class=\'thumbin\'><img class="imageThumb" src="' +
              e.target.result +
              '" alt="thumbnail" /></div>' +
              "<br/>" +
              "</div>"
          ).appendTo(image_holder);
          $(".popPic1").hide();
        };
        fileReader.readAsDataURL(f);
      }
    } else {
      alert("You can upload maximum of 10 images");
    }
  };

  const handlePost = (e) => {
    e.preventDefault();
    let postContentProp = postContent.trim();
    let postPrivacyProp = postPrivacy;
    let postImagesProp = postImages;
    let postedTo = loggedInFelebId;
    console.log("handlePost triggered");
    console.log("postContent --> " + postContent);
    console.log("PostPrivacy --> " + postPrivacy);
    console.log("postImages --> " + postImages);
    console.log(postImages);
    if (postPrivacyProp && (postContentProp || postImagesProp)) {
      let postTypeId;
      let postDetailsObject = {
        postContentProp,
        postPrivacyProp,
        postImagesProp,
      };
      if (postContentProp && postImagesProp) postTypeId = 3;
      else if (postContentProp) postTypeId = 1;
      else if (postImagesProp) postTypeId = 2;

      props.createPost(authToken, postedTo, postTypeId, postDetailsObject);
    } else {
      alert("PostContent || postImages || PostPrivacy is not selected");
    }
  };

  return (
    <div className="post-menu-section">
      <div className="post-textarea">
        <textarea
          className="textarea textarea-auto-height"
          name="text"
          placeholder="write something..."
          spellCheck="false"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        ></textarea>
      </div>
      <div id="previewer"></div>
      <div className="post-actions-div">
        <input
          type="file"
          id="imageupload"
          style={{ display: "none" }}
          accept=".png, .jpg, .jpeg"
          ref={filesPickerRef}
          onChange={fileChangeHandler}
          multiple
        />
        <img
          src={whitecam}
          onClick={pickImagesHandler}
          className="pic-uploader-icon"
          title="Upload Images"
          alt="Upload Images"
        />
        <div className="pic-uploader">
          <select
            value={postPrivacy}
            onChange={(e) => setPostPrivacy(e.target.value)}
            className="post-privacy-selection"
          >
            <option value="public">Public</option>
            <option value="friends">Friends</option>
            <option value="me">Only Me</option>
          </select>

          <button type="button" onClick={handlePost} className="post-button">
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    centralState: state.central,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createPost: (authToken, postedTo, postTypeId, postDetailsObject) =>
      dispatch(createPost(authToken, postedTo, postTypeId, postDetailsObject)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostMenu);
