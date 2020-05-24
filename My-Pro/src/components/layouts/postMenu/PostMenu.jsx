import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import imageCompression from "browser-image-compression";
import "./postMenu.css";

import whitecam from "../../../icons/whitecam.png";

import { createPost } from "./../../../redux/actionCreators";

const PostMenu = (props) => {
  const [postContent, setPostContent] = useState("");
  const [postImages, setPostImages] = useState("");
  const [postPrivacy, setPostPrivacy] = useState("");
  const [authToken, setAuthToken] = useState("");
  const [loggedInUserId, setLoggedInUserId] = useState("");

  useEffect(() => {
    setAuthToken(props.centralState.authToken);
    setLoggedInUserId(props.centralState.loggedInUserId);
    if (props.centralState.isNewPostCreated) {
      // alert("New post added");
      window.location.reload();
    } else if (props.centralState.newPostCreationError) {
      alert("Something went wrong while creating New post");
    }
    console.log(props);
  }, [props]);

  const $ = window.$;

  const maxFileSize = 1048576 * 10;
  // console.log("maxFileSize --> " + maxFileSize);

  const filesPickerRef = useRef();

  const pickImagesHandler = () => {
    filesPickerRef.current.click();
    $("#previewer").html("");
  };

  const fileChangeHandler = async (event) => {
    console.log(event.target.files);
    console.log(event.target.files[0]);

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1024,
      useWebWorker: true,
      fileType: "png",
    };

    let selectedFiles = event.target.files;

    const filesData = new FormData();

    let selectedFilesLength = event.target.files.length;

    if (selectedFilesLength > 10) {
      alert("You can upload maximum of 10 images");
      return false;
    }

    let isFileSizeExceededLimit = false;

    for (let i = 0; i < selectedFilesLength; i++) {
      filesData.append("file[" + i + "]", selectedFiles[i]);
      console.log(selectedFiles[i]);
      let fileSize = selectedFiles[i]["size"];
      let imgName = selectedFiles[i]["name"];

      let splitImgExtension = imgName.split(".");
      let imgExtension = splitImgExtension[splitImgExtension.length - 1];
      console.log("imgExtension  --> " + imgExtension);

      console.log("fileSize --> " + fileSize);
      console.log("imgName  --> " + imgName);
      if (
        fileSize > maxFileSize ||
        (imgExtension !== "jpg" &&
          imgExtension !== "jpeg" &&
          imgExtension !== "png" &&
          imgExtension !== "webp")
      ) {
        isFileSizeExceededLimit = true;
      }
    }

    if (isFileSizeExceededLimit) {
      // console.log("One of selected files size is more than 5 MB");
      alert("One of selected files size is not acceptable");
      return false;
    }

    console.log("filesData is below");
    console.log(filesData);

    // const entries = [...filesData.entries()];
    // console.log(entries);
    // setPostImages(filesData);

    const compressedFilesData = new FormData();

    var files = event.target.files;
    let filesLength = files.length;
    let imageSrc;
    let compressedFile;
    if (filesLength < 11) {
      var image_holder = $("#previewer");
      image_holder.html("");
      for (var i = 0; i < filesLength; i++) {
        var imageFile = files[i];

        compressedFile = await imageCompression(imageFile, options);
        imageSrc = URL.createObjectURL(compressedFile);
        console.log(
          `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
        );

        compressedFilesData.append("file[" + i + "]", imageSrc);

        var fileReader = new FileReader();
        fileReader.onload = function (e) {
          var file = e.target;
          $(
            '<div class="thumbimage">' +
              '<div class=\'thumbin\'><img class="imageThumb" src="' +
              imageSrc +
              '" alt="thumbnail" /></div>' +
              "<br/>" +
              "</div>"
          ).appendTo(image_holder);
          $(".popPic1").hide();
        };
        fileReader.readAsDataURL(imageFile);
      }

      const compressedFilesDataEntries = [...compressedFilesData.entries()];
      console.log(compressedFilesDataEntries);

      setPostImages(compressedFilesData);
    } else {
      setPostImages(null);
      alert("You can upload maximum of 10 images");
    }
  };

  const handlePostSubmission = (e) => {
    e.preventDefault();
    let postContentProp = postContent.trim();
    let postPrivacyProp = postPrivacy;
    let postImagesProp = postImages;
    let postedTo = loggedInUserId;
    console.log("handlePostSubmission triggered");
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
          accept=".png, .jpg, .jpeg, .PNG, .JPG, .JPEG, .webp, .WEBP"
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
            <option value="1">Public</option>
            <option value="2">Friends</option>
            <option value="3">Only Me</option>
          </select>

          <button
            type="button"
            onClick={handlePostSubmission}
            className="post-button"
          >
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
