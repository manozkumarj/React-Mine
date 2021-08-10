import React, { Component } from "react";
import autosize from "autosize";
import "./postMenu.css";
import { MentionsInput, Mention } from "react-mentions";
import imageCompression from "browser-image-compression";
import ReactCardFlip from "react-card-flip";
import { SliderPicker } from "react-color";

import { connect } from "react-redux";

import { createPost } from "../../redux/actionCreators";
import { store } from "react-notifications-component";

// Import images
import kohli from "./../../images/kohli.jpg";
import zuck from "./../../images/zuck.jpg";
import overlayClose from "./../../icons/overlay-close.png";
import fancyClose from "./../../icons/fancy_close.png";
import letterIcon from "./../../icons/letterIcon.png";
import uploadPhotoIcon from "./../../icons/upload-image-icon-100.png";
import uploadVideoIcon from "./../../icons/videoIcon.png";
import ViewLetter from "../ViewLetter/ViewLetter";

class PostMenu extends Component {
  state = {
    textarea_one_mentions_value: "",
    plainText: "",
    mentionData: null,
    mentionableUsers: [
      {
        id: "123",
        name: {
          fullName: "Name - Reynolds",
          username: "Manoj Kumar j",
          photo: kohli,
        },
      },
      {
        id: "234",
        name: {
          fullName: "Name - Reynolds",
          username: "Mahesh Kumar",
          photo: zuck,
        },
      },
      {
        id: "345",
        name: { fullName: "Name - Williams", username: "Rammy", photo: kohli },
      },
      {
        id: "456",
        name: { fullName: "Name - 456", username: "Mallesh", photo: zuck },
      },
      {
        id: "567",
        name: {
          fullName: "Name - 567",
          username: "Krishna Prasad",
          photo: kohli,
        },
      },
      {
        id: "678",
        name: { fullName: "Name - 678", username: "Ramana", photo: zuck },
      },
      {
        id: "789",
        name: {
          fullName: "Name - 789",
          username: "Kranthi Kumar",
          photo: kohli,
        },
      },
      {
        id: "111",
        name: { fullName: "Name - 789", username: "Sadhi Kumar", photo: zuck },
      },
      {
        id: "222",
        name: { fullName: "Name - 789", username: "Vinay Kumar", photo: kohli },
      },
      {
        id: "333",
        name: { fullName: "Name - 789", username: "Rohith Kumar", photo: zuck },
      },
    ],

    postContent: "",
    modalPostContent: "",
    modalPostContentDescription: "",
    modalFlipcardPostContentDescription: "",
    primaryPostPrivacy: "",
    colourPostPrivacy: "",
    letterPostPrivacy: "",
    flipcardPostPrivacy: "",
    showPrimaryPostPrivacy: false,
    showColourPostPrivacy: false,
    showLetterPostPrivacy: false,
    showFlipcardPostPrivacy: false,
    isLoadingPreview: false,
    isLoadingFlipcardFrontPhoto: false,
    isLoadingFlipcardBackPhoto: false,
    flipcardFrontPhoto: null,
    flipcardFrontPhotoBlob: null,
    flipcardBackPhoto: null,
    flipcardBackPhotoBlob: null,
    isVideoReady: false,
    maxSizeMB: 1,
    maxWidthOrHeight: 980,
    previewPhotos: [],
    flipcardPhotos: [],
    selectedPhotosFormData: null,
    selectedVideoFormData: null,
    selectedVideo: null,
    openCreatePostLayerOneModal: false,
    openCreateFlipcardLayerOneModal: false,
    openCreateFlipcardLayerTwoModal: false,
    openCreatePostLayerTwoModal: false,
    openLetterViewerModal: false,
    postCreationTitle: null,
    colourPostBgColor: "#003d99",
    colourPostBrdrColor: "#ff0000",
    colourPostTextColor: "#ffffff",
    isLetterCreation: false,
    showError: false,
    showPreviewError: false,
    showFlipcardPhotosError: false,
    showFlipcardPreviewError: false,
    flipcardPreviewError: null,
    selectedOption: "yes",
    selectedOptionForFlipcard: "yes",
    letterContent: null,
    flipcardPostContent: null,
    showPostButtonSection: true,
    isFlipped: false,
    flipDirection: "horizontal",
  };
  componentDidMount() {
    // this.textarea.focus();
    autosize(this.textarea_one);
    autosize(this.textarea_two);
    autosize(this.textarea_three);
    autosize(this.textarea_four);
  }

  handleLetterViewerModalOpen = async () => {
    const body = document.body;
    // body.style.height = "100vh";
    body.style.overflowY = "hidden";

    let gettt = await (
      <ViewLetter
        bgColor={"#ffffff"}
        brdrColor={null}
        textColor={"#000000"}
        letterContent={this.state.modalPostContent}
      />
    );
    this.setState({ letterContent: gettt });

    this.setState({ openLetterViewerModal: true });
    let box = document.getElementById("letter-viewer-modal-container");
    box.click();
    setTimeout(() => {
      box.focus();
      // box.scrollTop(0);
    }, 50);
  };

  handleLetterViewerModalClose = () => {
    document.getElementById(
      "create-post-layer-two-modal-container"
    ).style.overflowY = "scroll";

    this.setState({ openLetterViewerModal: false, letterContent: null });
  };

  radioChange = (e) => {
    this.setState({
      selectedOption: e.currentTarget.value,
      showPreviewError: false,
    });
  };

  flipcardRadioChange = (e) => {
    this.setState({
      selectedOptionForFlipcard: e.currentTarget.value,
      showFlipcardPreviewError: false,
    });
  };

  flipDirectionRadioChange = (e) => {
    this.setState({
      flipDirection: e.currentTarget.value,
    });
  };

  handleColourPostBgColorChange = (color) =>
    this.setState({ colourPostBgColor: color.hex });

  handleColourPostBrdrColorChange = (color) =>
    this.setState({ colourPostBrdrColor: color.hex });

  handleColourPostTextColorChange = (color) =>
    this.setState({ colourPostTextColor: color.hex });

  submitColourPost = () => {
    let getPostContent = this.state.modalPostContent.trim();
    if (getPostContent === null || getPostContent === "") {
      this.setState({ showError: true });
      return false;
    } else {
      let colourPostPrivacy = this.state.colourPostPrivacy;

      if (colourPostPrivacy === "") {
        this.setState({ showColourPostPrivacy: true });
        return false;
      }

      let postDetailsObj = {
        postContentProp: getPostContent,
        postPrivacyProp: colourPostPrivacy,
        backgroundColourProp: this.state.colourPostBgColor,
        textColourProp: this.state.colourPostTextColor,
        borderColourProp: this.state.colourPostBrdrColor,
        postedTo: this.state.authUserId,
      };
      console.log("This is Colour post");

      this.continueToColourPostSubmission(postDetailsObj);
    }
  };

  submitLetterPost = () => {
    let getPostContentDescription = this.state.modalPostContentDescription.trim();
    if (
      this.state.selectedOption === "yes" &&
      (getPostContentDescription === null || getPostContentDescription === "")
    ) {
      this.setState({ showPreviewError: true });
    } else {
      let letterPostPrivacy = this.state.letterPostPrivacy;

      if (letterPostPrivacy === "") {
        this.setState({ showLetterPostPrivacy: true });
        return false;
      }

      let postDetailsObj = {
        postContentProp: getPostContentDescription,
        letterContentProp: this.state.modalPostContent,
        postPrivacyProp: letterPostPrivacy,
        postedTo: this.state.authUserId,
      };
      console.log("This is Letter post");

      this.continueToLetterPostSubmission(postDetailsObj);
    }
  };

  submitFlipcardPost = () => {
    let getPostContentDescription = this.state.modalFlipcardPostContentDescription.trim();
    if (
      this.state.selectedOptionForFlipcard === "yes" &&
      (getPostContentDescription === null || getPostContentDescription === "")
    ) {
      this.setState({ showFlipcardPreviewError: true });
    } else {
      let flipcardPostPrivacy = this.state.flipcardPostPrivacy;

      if (flipcardPostPrivacy === "") {
        this.setState({ showFlipcardPostPrivacy: true });
        return false;
      }

      // console.log("flipcardFrontPhoto is below");
      // console.log(this.state.flipcardFrontPhotoBlob);

      // console.log("flipcardBackPhoto is below");
      // console.log(this.state.flipcardBackPhotoBlob);

      let filesData = new FormData();
      filesData.append("file[" + 0 + "]", this.state.flipcardFrontPhotoBlob);
      filesData.append("file[" + 1 + "]", this.state.flipcardBackPhotoBlob);

      let postDetailsObj = {
        postContentProp: getPostContentDescription,
        flipcardPhotosProp: filesData,
        postPrivacyProp: flipcardPostPrivacy,
        postedTo: this.state.authUserId,
        flipDirectionProp: this.state.flipDirection === "horizontal" ? 1 : 2,
      };
      console.log("This is Flipcard post");

      this.continueToFlipcardPostSubmission(postDetailsObj);
    }
  };

  previewer = () => {
    let getPostContent = this.state.modalPostContent.trim();
    if (getPostContent === null || getPostContent === "") {
      this.setState({ showError: true });
      return false;
    }

    this.setState({ openCreatePostLayerTwoModal: true });
  };

  handleCreatePostLayerOneModalOpen = (id) => {
    if (id === 1 || id === 2) {
      if (id === 1) {
        this.setState({
          postCreationTitle: "Letter post creation",
          isLetterCreation: true,
        });
        this.setState({
          colourPostBgColor: "#ffffff",
          colourPostBrdrColor: "#ffffff",
          colourPostTextColor: "#000000",
        });
        document.getElementById("post-creation-center-flex").style.padding =
          "0px";
        document.getElementById("textarea").placeholder =
          "Enter letter content...";
      } else if (id === 2) {
        this.setState({
          postCreationTitle: "Colour post creation",
          isLetterCreation: false,
        });
        this.setState({
          colourPostBgColor: "#003d99",
          colourPostBrdrColor: "#ff0000",
          colourPostTextColor: "#ffffff",
        });
        document.getElementById("post-creation-center-flex").style.padding =
          "8px";
        document.getElementById("textarea").placeholder = "Write something...";
      }

      const body = document.body;
      // body.style.height = "100vh";
      body.style.overflowY = "hidden";

      this.setState({ openCreatePostLayerOneModal: true });
      let box = document.getElementById("post-photo-modal-container");
      box.click();
      setTimeout(() => {
        box.focus();
        // box.scrollTop(0);
      }, 50);
    } else {
      alert("Invalid type");
      return false;
    }
  };

  handleCreatePostLayerOneModalClose = () => {
    const body = document.body;
    body.style.overflowY = "scroll";
    this.setState({
      openCreatePostLayerOneModal: false,
      postCreationTitle: null,
      showError: false,
    });
  };

  handleCreateFlipcardLayerOneModalOpen = () => {
    const body = document.body;
    // body.style.height = "100vh";
    body.style.overflowY = "hidden";

    this.setState({ openCreateFlipcardLayerOneModal: true });
    let box = document.getElementById(
      "create-flipcard-layer-one-modal-container"
    );
    box.click();
    setTimeout(() => {
      box.focus();
      // box.scrollTop(0);
    }, 50);
  };

  handleCreateFlipcardLayerOneModalClose = () => {
    const body = document.body;
    body.style.overflowY = "scroll";
    this.setState({
      openCreateFlipcardLayerOneModal: false,
      flipcardFrontPhoto: null,
      isLoadingFlipcardFrontPhoto: false,
      flipcardBackPhoto: null,
      isLoadingFlipcardBackPhoto: false,
    });
  };

  showFlipcardPreview = () => {
    if (!this.state.flipcardFrontPhoto) {
      this.setState({
        showFlipcardPhotosError: true,
        flipcardPreviewError: "Please select Flipcard front photo",
      });
      return false;
    } else if (!this.state.flipcardBackPhoto) {
      this.setState({
        showFlipcardPhotosError: true,
        flipcardPreviewError: "Please select Flipcard back photo",
      });
      return false;
    } else {
      // alert("Show Flipcard preview modal");
      this.setState({ openCreateFlipcardLayerTwoModal: true });
    }
  };

  handleCreateFlipcardLayerTwoModalClose = () => {
    document.getElementById(
      "create-flipcard-layer-two-modal-container"
    ).style.overflowY = "scroll";

    this.setState({
      openCreateFlipcardLayerTwoModal: false,
      flipcardPostContent: null,
    });
  };

  handleCreatePostLayerTwoModalClose = () => {
    document.getElementById(
      "create-post-layer-one-modal-container"
    ).style.overflowY = "scroll";
    this.setState({
      openCreatePostLayerTwoModal: false,
      showPreviewError: false,
    });
  };

  pickImagesHandler = () => {
    this.photosFilesPickerRef.click();
  };

  removeFiles = () => {
    let content = this.state.postContent.trim();
    this.setState({
      previewPhotos: [],
      selectedVideo: null,
      isVideoReady: false,
      showPostButtonSection: content ? true : false,
    });
  };

  pickVideoHandler = () => {
    this.videoFilesPickerRef.click();
  };

  pickFlipcardFrontPhotoHandler = () => {
    this.flipcardFrontPhotoFilesPickerRef.click();
  };

  pickFlipcardBackPhotoHandler = () => {
    this.flipcardBackPhotoFilesPickerRef.click();
  };

  videoFileChangeHandler = (event) => {
    this.setState({ isLoadingPreview: true });
    console.log("triggered videoFileChangeHandler");

    let videoFile = event.target.files;
    console.log(videoFile[0]);

    let videoFileData = new FormData();
    videoFileData.append("file[" + 0 + "]", videoFile[0]);

    this.setState({ selectedVideoFormData: videoFileData });

    this.setState({
      isLoadingPreview: false,
      isVideoReady: true,
      selectedVideo: true,
      showPostButtonSection: true,
    });
  };

  flipcardFrontPhotoFileChangeHandler = async (
    event,
    useWebWorker = "mainThread"
  ) => {
    this.setState({
      flipcardFrontPhoto: null,
      isLoadingFlipcardFrontPhoto: true,
      showFlipcardPhotosError: false,
      flipcardPreviewError: null,
    });
    console.clear();
    console.log("triggered photosFileChangeHandler");
    const allFiles = event.target.files;
    console.log(allFiles);

    if (allFiles.length === 1) {
      let singleFileObject;
      let compressedImg = null;
      let getFile;

      for (let i = 0; i < allFiles.length; i++) {
        const file = allFiles[i];
        console.log("input", file);

        singleFileObject = {};

        let fileSource = file;
        let fileName = fileSource.name;
        let splitFileName = fileName.split(".");
        let extension = splitFileName[splitFileName.length - 1];

        console.log("extension --> " + extension);

        if (extension === "webp") {
          extension = "jpg";
        }

        singleFileObject.inputSize = (file.size / 1024 / 1024).toFixed(2);
        singleFileObject.inputUrl = URL.createObjectURL(file);

        var options = {
          maxSizeMB: this.state.maxSizeMB,
          maxWidthOrHeight: this.state.maxWidthOrHeight,
          useWebWorker: true,
          fileType: extension,
        };
        const output = await imageCompression(file, options);
        console.log("output", output);

        getFile = await this.blobToFile(output);

        singleFileObject.outputSize = (output.size / 1024 / 1024).toFixed(2);
        compressedImg = URL.createObjectURL(output);
        singleFileObject.outputUrl = URL.createObjectURL(output);
      }

      if (compressedImg) {
        this.setState({
          flipcardFrontPhoto: compressedImg,
          isLoadingFlipcardFrontPhoto: false,
          flipcardFrontPhotoBlob: getFile,
        });
      } else {
        alert("flipcardFrontPhoto compression failed");
        this.setState({
          flipcardFrontPhoto: null,
          isLoadingFlipcardFrontPhoto: false,
        });
      }
    } else {
      alert("Invalid");
    }
  };

  flipcardBackPhotoFileChangeHandler = async (
    event,
    useWebWorker = "mainThread"
  ) => {
    this.setState({
      flipcardBackPhoto: null,
      isLoadingFlipcardBackPhoto: true,
      showFlipcardPhotosError: false,
      flipcardPreviewError: null,
    });
    console.clear();
    console.log("triggered photosFileChangeHandler");
    const allFiles = event.target.files;
    console.log(allFiles);

    if (allFiles.length === 1) {
      let singleFileObject;
      let compressedImg = null;
      let getFile;

      for (let i = 0; i < allFiles.length; i++) {
        const file = allFiles[i];
        console.log("input", file);

        singleFileObject = {};

        let fileSource = file;
        let fileName = fileSource.name;
        let splitFileName = fileName.split(".");
        let extension = splitFileName[splitFileName.length - 1];

        console.log("extension --> " + extension);

        if (extension === "webp") {
          extension = "jpg";
        }

        singleFileObject.inputSize = (file.size / 1024 / 1024).toFixed(2);
        singleFileObject.inputUrl = URL.createObjectURL(file);

        var options = {
          maxSizeMB: this.state.maxSizeMB,
          maxWidthOrHeight: this.state.maxWidthOrHeight,
          useWebWorker: true,
          fileType: extension,
        };
        const output = await imageCompression(file, options);
        console.log("output", output);

        getFile = await this.blobToFile(output);

        singleFileObject.outputSize = (output.size / 1024 / 1024).toFixed(2);
        compressedImg = URL.createObjectURL(output);
        singleFileObject.outputUrl = URL.createObjectURL(output);
      }

      if (compressedImg) {
        this.setState({
          flipcardBackPhoto: compressedImg,
          isLoadingFlipcardBackPhoto: false,
          flipcardBackPhotoBlob: getFile,
        });
      } else {
        alert("flipcardBackPhoto compression failed");
        this.setState({
          flipcardBackPhoto: null,
          isLoadingFlipcardBackPhoto: false,
        });
      }
    } else {
      alert("Invalid");
    }
  };

  photosFileChangeHandler = async (event, useWebWorker) => {
    console.clear();
    console.log("triggered photosFileChangeHandler");
    const allFiles = event.target.files;

    if (allFiles.length <= 10) {
      this.setState({ isLoadingPreview: true });
      console.log(allFiles);

      let tempFileObjectArray = [];
      let singleFileObject;

      let filesData = new FormData();

      for (let i = 0; i < allFiles.length; i++) {
        const file = allFiles[i];
        console.log("input", file);

        singleFileObject = {};

        let fileSource = file;
        let fileName = fileSource.name;
        let splitFileName = fileName.split(".");
        let extension = splitFileName[splitFileName.length - 1];

        console.log("extension --> " + extension);

        if (extension === "webp") {
          extension = "jpg";
        }

        // console.log(
        //   "ExifOrientation",
        //   await imageCompression.getExifOrientation(file)
        // );

        singleFileObject.inputSize = (file.size / 1024 / 1024).toFixed(2);
        singleFileObject.inputUrl = URL.createObjectURL(file);

        var options = {
          maxSizeMB: this.state.maxSizeMB,
          maxWidthOrHeight: this.state.maxWidthOrHeight,
          useWebWorker: true,
          fileType: extension,
        };
        const output = await imageCompression(file, options);
        console.log("output", output);

        let getFile = await this.blobToFile(output);

        filesData.append("file[" + i + "]", getFile);

        singleFileObject.outputSize = (output.size / 1024 / 1024).toFixed(2);
        singleFileObject.outputUrl = URL.createObjectURL(output);

        tempFileObjectArray.push(singleFileObject);
      }
      this.setState({ selectedPhotosFormData: filesData });
      console.log("filesData is below");
      // console.log(filesData.entries());
      // Display the key/value pairs
      for (var pair of filesData.entries()) {
        console.log(pair);
      }
      this.setState({
        previewPhotos: [...this.state.previewPhotos, ...tempFileObjectArray],
        showPostButtonSection: true,
      });
      this.setState({ isLoadingPreview: false });
    } else {
      alert("You can upload maximum of 10 photos at a time");
    }
  };

  blobToFile(theBlob, fileName) {
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
  }

  hidePostButtonSection = () => {
    let content = this.state.postContent.trim();
    if (
      this.state.previewPhotos.length === 0 &&
      !this.state.selectedVideo &&
      !content
    )
      console.log("Blurred...");
    // this.setState({ showPostButtonSection: false });
  };

  continueToPost = () => {
    let postContent = this.state.postContent;
    let postPrvc = this.state.primaryPostPrivacy;
    let postDetailsObj;

    console.log(postContent);
    console.log(postPrvc);

    if (postPrvc === "") {
      this.setState({ showPrimaryPostPrivacy: true });
      return false;
    } else {
      if (this.state.previewPhotos.length) {
        console.log("This is Photos post");
        postDetailsObj = {
          postPhotosProp: this.state.selectedPhotosFormData,
          postContentProp: postContent,
          postPrivacyProp: postPrvc,
        };
        this.continueToPhotosPostSubmission(postDetailsObj);
      } else if (this.state.isVideoReady) {
        console.log("This is Video post");
        console.log(this.state.selectedVideoFormData);
        postDetailsObj = {
          postVideoProp: this.state.selectedVideoFormData,
          postContentProp: postContent,
          postPrivacyProp: postPrvc,
        };
        this.continueToVideoPostSubmission(postDetailsObj);
      } else {
        postDetailsObj = {
          postContentProp: postContent,
          postPrivacyProp: postPrvc,
          postedTo: this.state.authUserId,
        };
        console.log("This is Normal post");

        let getMentionesArray = this.state.textarea_one_mentions_value.match(
          /@@@{{\S+/g
        );
        console.log(getMentionesArray);

        if (getMentionesArray && getMentionesArray.length > 0) {
          let mentionesArray = getMentionesArray.map((mention) => {
            let splitOne = mention.split("@@@");
            let replaceBraces = splitOne[1].replace(/\{|\}/gi, "");
            return replaceBraces;
            // let splitTwo = splitOne.split('@@@{{');
          });
          console.log("mentionesArray is below");
          console.log(mentionesArray);
        }

        // this.createNormalPost(postDetailsObj);
      }
    }
  };

  createNormalPost = async (postDetailsObj) => {
    console.log(postDetailsObj);
    console.log(this.props);
    let loggedInUserId = this.props.getAuthState.authUserDetails._id;
    console.log("Auth user ID " + loggedInUserId);
    try {
      let response = await this.props.createPost(
        1,
        postDetailsObj,
        loggedInUserId
      );
      console.log(response);
      if (response.success) {
        console.log("PostMenu - createNormalPost is success");
        window.location.reload();
        // alert("createNormalPost success");
      } else {
        console.error("PostMenu - createNormalPost failed");
        alert("createNormalPost failed");
        this.showDangerNotification();
      }
    } catch (err) {
      alert("createNormalPost failed");
      console.error("PostMenu - createNormalPost failed - catch block");
      console.log(JSON.stringify(err));
      this.showDangerNotification();
    }
  };

  continueToPhotosPostSubmission = async (postDetailsObj) => {
    console.log(postDetailsObj);
    console.log(this.props);
    let loggedInUserId = this.props.getAuthState.authUserDetails._id;
    console.log("Auth user ID " + loggedInUserId);
    try {
      let response = await this.props.createPost(
        4,
        postDetailsObj,
        loggedInUserId
      );
      console.log(response);
      if (response.success) {
        console.log("PostMenu - createPhotosPost is success");
        window.location.reload();
        // alert("createPhotosPost success");
      } else {
        console.error("PostMenu - createPhotosPost failed");
        alert("createPhotosPost failed");
        this.showDangerNotification();
      }
    } catch (err) {
      console.error("PostMenu - createPhotosPost failed - catch block");
      console.log(JSON.stringify(err));
      this.showDangerNotification();
    }
  };

  continueToVideoPostSubmission = async (postDetailsObj) => {
    console.log(postDetailsObj);
    console.log(this.props);
    let loggedInUserId = this.props.getAuthState.authUserDetails._id;
    console.log("Auth user ID " + loggedInUserId);
    try {
      let response = await this.props.createPost(
        6,
        postDetailsObj,
        loggedInUserId
      );
      console.log(response);
      if (response.success) {
        console.log("PostMenu - createVideoPost is success");
        window.location.reload();
        // alert("createVideoPost success");
      } else {
        console.error("PostMenu - createVideoPost failed");
        alert("createVideoPost failed");
        this.showDangerNotification();
      }
    } catch (err) {
      console.error("PostMenu - createVideoPost failed - catch block");
      console.log(JSON.stringify(err));
      this.showDangerNotification();
    }
  };

  continueToFlipcardPostSubmission = async (postDetailsObj) => {
    console.log(postDetailsObj);
    console.log(this.props);
    let loggedInUserId = this.props.getAuthState.authUserDetails._id;
    console.log("Auth user ID " + loggedInUserId);
    try {
      let response = await this.props.createPost(
        5,
        postDetailsObj,
        loggedInUserId
      );
      console.log(response);
      if (response.success) {
        console.log("PostMenu - createFlipcardPost is success");
        window.location.reload();
        // alert("createFlipcardPost success");
      } else {
        console.error("PostMenu - createFlipcardPost failed");
        alert("createFlipcardPost failed");
        this.showDangerNotification();
      }
    } catch (err) {
      console.error("PostMenu - createFlipcardPost failed - catch block");
      console.log(JSON.stringify(err));
      this.showDangerNotification();
    }
  };

  continueToColourPostSubmission = async (postDetailsObj) => {
    console.log(postDetailsObj);
    console.log(this.props);
    let loggedInUserId = this.props.getAuthState.authUserDetails._id;
    console.log("Auth user ID " + loggedInUserId);
    try {
      let response = await this.props.createPost(
        2,
        postDetailsObj,
        loggedInUserId
      );
      console.log(response);
      if (response.success) {
        console.log("PostMenu - createColourPost is success");
        window.location.reload();
        // alert("createColourPost success");
      } else {
        console.error("PostMenu - createColourPost failed");
        alert("createColourPost failed");
        this.showDangerNotification();
      }
    } catch (err) {
      console.error("PostMenu - createColourPost failed - catch block");
      console.log(JSON.stringify(err));
      this.showDangerNotification();
    }
  };

  continueToLetterPostSubmission = async (postDetailsObj) => {
    console.log(postDetailsObj);
    console.log(this.props);
    let loggedInUserId = this.props.getAuthState.authUserDetails._id;
    console.log("Auth user ID " + loggedInUserId);
    try {
      let response = await this.props.createPost(
        3,
        postDetailsObj,
        loggedInUserId
      );
      console.log(response);
      if (response.success) {
        console.log("PostMenu - createLetterPost is success");
        window.location.reload();
        // alert("createLetterPost success");
      } else {
        console.error("PostMenu - createLetterPost failed");
        alert("createLetterPost failed");
        this.showDangerNotification();
      }
    } catch (err) {
      console.error("PostMenu - createLetterPost failed - catch block");
      console.log(JSON.stringify(err));
      this.showDangerNotification();
    }
  };

  showDangerNotification = () => {
    store.addNotification({
      title: "Notice",
      message: "Something went wrong, please try again after sometime",
      type: "danger",
      insert: "bottom",
      container: "bottom-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: true,
      },
    });
  };

  handleMentionableTextareaOneChange = (
    event,
    newValue,
    newPlainTextValue,
    mentions
  ) => {
    this.setState({
      textarea_one_mentions_value: newValue,
      mentionData: { newValue, newPlainTextValue, mentions },
      plainText: newPlainTextValue,
      postContent: newPlainTextValue,
    });
  };

  render() {
    const userMentionData = this.state.mentionableUsers.map((myUser) => ({
      id: myUser.id,
      display: `@${myUser.name.username}`,
    }));

    return (
      <>
        <div className="post-menu-holder">
          <div className="post-menu-textarea-container">
            <div className="center-flex">
              {/* <textarea
                className="textarea"
                ref={(c) => (this.textarea_one = c)}
                placeholder="write something..."
                rows={5}
                onChange={(e) => this.setState({ postContent: e.target.value })}
                onFocus={() => this.setState({ showPostButtonSection: true })}
                onBlur={this.hidePostButtonSection}
              /> */}

              <MentionsInput
                ref={(c) => (this.textarea_one = c)}
                value={this.state.textarea_one_mentions_value}
                onChange={this.handleChange}
                markup="@{{__display__}}"
                placeholder="Write something, use @ symbol to mention Friends"
                className="textarea mentions"
                onChange={this.handleMentionableTextareaOneChange}
                onFocus={() => this.setState({ showPostButtonSection: true })}
                onBlur={this.hidePostButtonSection}
              >
                <Mention
                  type="user"
                  appendSpaceOnAdd={true}
                  trigger="@"
                  markup=" @@@{{__display__}}@@@ "
                  data={userMentionData}
                  className="mentions__mention"
                />
              </MentionsInput>
            </div>
          </div>

          {this.state.isLoadingPreview && (
            <div>
              <div className="loading-item">
                <div className="animationLoading">
                  <div className="animationLoadingContent"></div>
                </div>
              </div>
            </div>
          )}

          {this.state.previewPhotos && this.state.previewPhotos.length > 0 && (
            <div className="preview-photos-container">
              {this.state.previewPhotos &&
                this.state.previewPhotos.map((photo) => (
                  <div
                    className="preview-photo-container"
                    key={photo.outputUrl}
                  >
                    <img
                      src={photo.outputUrl}
                      alt="preview"
                      className="preview-photo"
                    />
                  </div>
                ))}
            </div>
          )}

          {this.state.isVideoReady && (
            <div className="video-preview-container">
              Video is ready, press 'Post' to continue
            </div>
          )}

          <div className="post-options">
            <input
              type="file"
              style={{ display: "none" }}
              accept=".png, .jpg, .jpeg"
              ref={(a) => (this.photosFilesPickerRef = a)}
              onChange={(e) => this.photosFileChangeHandler(e, "mainThread")}
              multiple
            />
            <input
              type="file"
              style={{ display: "none" }}
              accept=".mp4, .mkv"
              ref={(b) => (this.videoFilesPickerRef = b)}
              onChange={this.videoFileChangeHandler}
            />
            {this.state.previewPhotos.length === 0 && !this.state.isVideoReady && (
              <button
                className="post-options-item"
                onClick={this.pickImagesHandler}
              >
                <img
                  src={uploadPhotoIcon}
                  alt="upload"
                  className="postMenuIcons"
                />
                Photos
              </button>
            )}
            {this.state.previewPhotos.length === 0 && !this.state.isVideoReady && (
              <button
                className="post-options-item"
                onClick={this.pickVideoHandler}
              >
                <img
                  src={uploadVideoIcon}
                  alt="upload"
                  className="postMenuIcons"
                />
                Video
              </button>
            )}
            {this.state.previewPhotos.length === 0 && !this.state.isVideoReady && (
              <button
                className="post-options-item"
                onClick={() => this.handleCreatePostLayerOneModalOpen(1)}
              >
                <img
                  src={letterIcon}
                  alt="upload"
                  className="postMenuIcons letterIcon"
                />
                Letter
              </button>
            )}
            {this.state.previewPhotos.length === 0 && !this.state.isVideoReady && (
              <button
                className="post-options-item"
                onClick={() => this.handleCreatePostLayerOneModalOpen(2)}
              >
                Colour Post
              </button>
            )}
            {this.state.previewPhotos.length === 0 && !this.state.isVideoReady && (
              <button
                className="post-options-item"
                onClick={() => this.handleCreateFlipcardLayerOneModalOpen()}
              >
                Flipcard
              </button>
            )}

            {this.state.previewPhotos.length > 0 && (
              <button
                className="post-options-item files-remover"
                onClick={this.removeFiles}
              >
                Remove selected Photos
              </button>
            )}
            {this.state.isVideoReady && (
              <button
                className="post-options-item files-remover"
                onClick={this.removeFiles}
              >
                Remove selected Video
              </button>
            )}
          </div>

          {this.state.showPostButtonSection && (
            <div className="post-button-container">
              <select
                className="post-privacy"
                value={this.state.primaryPostPrivacy}
                onChange={(e) =>
                  this.setState({ primaryPostPrivacy: e.target.value })
                }
                style={{
                  border:
                    this.state.primaryPostPrivacy === "" &&
                    this.state.showPrimaryPostPrivacy
                      ? "1px solid red"
                      : "1px solid #ccc",
                }}
              >
                <option value="">Select Post Privacy</option>
                <option value="1">Public</option>
                <option value="2">Friends</option>
                <option value="3">Only Me</option>
              </select>
              {!this.state.postContent.trim() &&
                this.state.previewPhotos.length === 0 &&
                !this.state.selectedVideo && (
                  <button className="post-button disable-button">Post</button>
                )}
              {(this.state.postContent.trim() ||
                this.state.previewPhotos.length > 0 ||
                this.state.selectedVideo) && (
                <button className="post-button" onClick={this.continueToPost}>
                  Post
                </button>
              )}
            </div>
          )}
        </div>

        {/* createPostModal Layer one - starts */}
        <div
          className="create-post-layer-one-modal-container"
          id="create-post-layer-one-modal-container"
          style={{
            display: this.state.openCreatePostLayerOneModal ? "block" : "none",
          }}
          tabIndex={1}
        >
          <img
            height="20"
            src={overlayClose}
            alt="closer"
            className="srollable-overlayClose pointer"
            onClick={this.handleCreatePostLayerOneModalClose}
          />
          <div className="create-post-layer-one-modal-inner-container">
            <span
              className="close_popup"
              title="close"
              onClick={this.handleCreatePostLayerOneModalClose}
            >
              <img height="30" src={fancyClose} alt="closer" />
            </span>
            <div className="modal-header">{this.state.postCreationTitle}</div>
            <div className="post-creation-container">
              <div
                className="post-creation-textarea-container"
                style={{ backgroundColor: this.state.colourPostBgColor }}
              >
                <div
                  className="post-creation-center-flex"
                  id="post-creation-center-flex"
                  style={{
                    backgroundColor: this.state.colourPostBgColor,
                    border: "2px solid" + this.state.colourPostBrdrColor,
                  }}
                >
                  <textarea
                    className="textarea"
                    id="textarea"
                    style={{
                      backgroundColor: this.state.colourPostBgColor,
                      color: this.state.colourPostTextColor,
                    }}
                    ref={(d) => (this.textarea_two = d)}
                    placeholder="write something..."
                    rows={5}
                    onChange={(e) =>
                      this.setState({ modalPostContent: e.target.value })
                    }
                    onFocus={() => this.setState({ showError: false })}
                  />
                </div>
              </div>

              <div
                style={{
                  display: !this.state.isLetterCreation ? "block" : "none",
                }}
              >
                <div className="single-slider-container">
                  <div className="slider-label">Select Background colour</div>
                  <SliderPicker
                    color={this.state.colourPostBgColor}
                    onChangeComplete={this.handleColourPostBgColorChange}
                  />
                </div>

                <div className="single-slider-container">
                  <div className="slider-label">Select Border colour</div>
                  <SliderPicker
                    color={this.state.colourPostBrdrColor}
                    onChangeComplete={this.handleColourPostBrdrColorChange}
                  />
                </div>

                <div className="single-slider-container">
                  <div className="slider-label">Select Text colour</div>
                  <SliderPicker
                    color={this.state.colourPostTextColor}
                    onChangeComplete={this.handleColourPostTextColorChange}
                  />
                </div>
              </div>

              <div style={{ display: this.state.showError ? "block" : "none" }}>
                <div className="warning-displayer">Please enter content...</div>
              </div>

              <div
                style={{
                  display: !this.state.isLetterCreation ? "block" : "none",
                }}
              >
                <div className="create-post-footer-container">
                  <select
                    className="create-post-footer-item"
                    value={this.state.colourPostPrivacy}
                    onChange={(e) =>
                      this.setState({ colourPostPrivacy: e.target.value })
                    }
                    style={{
                      border:
                        this.state.colourPostPrivacy === "" &&
                        this.state.showColourPostPrivacy
                          ? "1px solid red"
                          : "1px solid #ccc",
                    }}
                  >
                    <option value="">Select Post Privacy</option>
                    <option value="1">Public</option>
                    <option value="2">Friends</option>
                    <option value="3">Only Me</option>
                  </select>
                  <button
                    className="create-post-footer-item create-post-button"
                    onClick={this.submitColourPost}
                  >
                    Post
                  </button>
                </div>
              </div>

              <div
                style={{
                  display: this.state.isLetterCreation ? "block" : "none",
                }}
              >
                <div className="create-post-footer-preview-button-container">
                  <button
                    className="create-post-footer-item create-preview-button"
                    onClick={this.previewer}
                  >
                    Preview
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* createPostModal Layer one - ends */}

        {/* createPostModal Layer two - starts */}
        <div
          className="create-post-layer-two-modal-container"
          id="create-post-layer-two-modal-container"
          style={{
            display: this.state.openCreatePostLayerTwoModal ? "block" : "none",
          }}
          tabIndex={1}
        >
          <img
            height="20"
            src={overlayClose}
            alt="closer"
            className="srollable-overlayClose pointer"
            onClick={this.handleCreatePostLayerTwoModalClose}
          />
          <div className="create-post-layer-two-modal-inner-container">
            <span
              className="close_popup"
              title="close"
              onClick={this.handleCreatePostLayerTwoModalClose}
            >
              <img height="30" src={fancyClose} alt="closer" />
            </span>
            <div className="modal-header">Letter post Preview</div>
            <div className="letter-preview-container">
              <div className="single-item">
                <div className="post-n-user-details-container">
                  <div className="post-dps-container">
                    <span className="post-user-dp-primary-a">
                      <img
                        className="post-user-dp post-user-dp-primary"
                        src={zuck}
                        alt="avatar"
                      />
                    </span>
                    <span>
                      <img
                        className="post-user-dp post-user-dp-secondary"
                        src={kohli}
                        alt="avatar"
                      />
                    </span>
                  </div>
                  <div className="postInfo-n-user-details-div">
                    <div className="post-details-div">
                      <span>Manoj Kumar j</span>
                    </div>
                    <div className="post-timestamp-div">Just now</div>
                  </div>
                </div>

                <div
                  className="post-description-container"
                  style={{
                    display:
                      this.state.selectedOption === "yes" ? "block" : "none",
                  }}
                >
                  <textarea
                    className="textarea"
                    ref={(e) => (this.textarea_three = e)}
                    placeholder="write something..."
                    rows={5}
                    onFocus={() => this.setState({ showPreviewError: false })}
                    onChange={(e) =>
                      this.setState({
                        modalPostContentDescription: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="greet-section-container">
                  <div className="greet-section-item greet-icon-container">
                    <img
                      src={letterIcon}
                      alt="greet avatar"
                      className="greetIcon pointer"
                      onClick={this.handleLetterViewerModalOpen}
                    />
                  </div>
                  {/* <div className="greet-section-item greet-views-count-section">
                    <div className="greet-view-text">Views</div>
                    <hr className="greet-hr" />
                    <span className="greet-count pointer">xxx</span>
                  </div> */}
                </div>
              </div>

              <div className="post-content-query-section">
                <span className="post-content-query">
                  Want to have post content?
                </span>
                <span className="post-content-query-option">
                  <input
                    type="radio"
                    value="yes"
                    className="post-content-query-option-radio"
                    checked={this.state.selectedOption === "yes"}
                    onChange={this.radioChange}
                  />
                  Yes
                </span>
                <span className="post-content-query-option">
                  <input
                    type="radio"
                    value="no"
                    className="post-content-query-option-radio"
                    checked={this.state.selectedOption === "no"}
                    onChange={this.radioChange}
                  />
                  No
                </span>
              </div>

              <div
                style={{
                  display: this.state.showPreviewError ? "block" : "none",
                }}
              >
                <div className="warning-displayer">Please enter content...</div>
              </div>

              <div
                style={{
                  display: this.state.isLetterCreation ? "block" : "none",
                }}
              >
                <div className="create-post-footer-container">
                  <select
                    className="create-post-footer-item"
                    value={this.state.letterPostPrivacy}
                    onChange={(e) =>
                      this.setState({ letterPostPrivacy: e.target.value })
                    }
                    style={{
                      border:
                        this.state.letterPostPrivacy === "" &&
                        this.state.showLetterPostPrivacy
                          ? "1px solid red"
                          : "1px solid #ccc",
                    }}
                  >
                    <option value="">Select Post Privacy</option>
                    <option value="1">Public</option>
                    <option value="2">Friends</option>
                    <option value="3">Only Me</option>
                  </select>
                  <button
                    className="create-post-footer-item create-post-button"
                    onClick={this.submitLetterPost}
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* createPostModal Layer two - ends */}

        {/* createFlipcardModal Layer one - starts */}
        <div
          className="create-flipcard-layer-one-modal-container"
          id="create-flipcard-layer-one-modal-container"
          style={{
            display: this.state.openCreateFlipcardLayerOneModal
              ? "block"
              : "none",
          }}
          tabIndex={1}
        >
          <img
            height="20"
            src={overlayClose}
            alt="closer"
            className="srollable-overlayClose pointer"
            onClick={this.handleCreateFlipcardLayerOneModalClose}
          />
          <div className="create-flipcard-layer-one-modal-inner-container">
            <span
              className="close_popup"
              title="close"
              onClick={this.handleCreateFlipcardLayerOneModalClose}
            >
              <img height="30" src={fancyClose} alt="closer" />
            </span>
            <div className="modal-header">Flipcard creation</div>
            <div className="create-flipcard-uploads-container">
              <div className="create-flipcard-upload-photo">
                {(!this.state.isLoadingFlipcardFrontPhoto ||
                  this.state.flipcardFrontPhoto) && (
                  <div className="create-flipcard-photo-preview">
                    {this.state.flipcardFrontPhoto && (
                      <img
                        src={this.state.flipcardFrontPhoto}
                        alt="flipcard-preview"
                        height="100px"
                        width="100px"
                      />
                    )}
                  </div>
                )}

                {this.state.isLoadingFlipcardFrontPhoto && (
                  <div className="flipcard-loading-container">
                    <div className="loading-item loading-flipcard-photo-preview">
                      <div className="animationLoading">
                        <div className="animationLoadingContent"></div>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <input
                    type="file"
                    style={{ display: "none" }}
                    accept=".png, .jpg, .jpeg"
                    ref={(fa) => (this.flipcardFrontPhotoFilesPickerRef = fa)}
                    onChange={this.flipcardFrontPhotoFileChangeHandler}
                  />
                  <button
                    className="create-flipcard-front-photo-upload-button"
                    onClick={this.pickFlipcardFrontPhotoHandler}
                  >
                    Upload Flipcard Front Photo
                  </button>
                </div>
              </div>

              <div className="create-flipcard-upload-photo">
                {(!this.state.isLoadingFlipcardBackPhoto ||
                  this.state.flipcardBackPhoto) && (
                  <div className="create-flipcard-photo-preview">
                    {this.state.flipcardBackPhoto && (
                      <img
                        src={this.state.flipcardBackPhoto}
                        alt="flipcard-preview"
                        height="100px"
                        width="100px"
                      />
                    )}
                  </div>
                )}

                {this.state.isLoadingFlipcardBackPhoto && (
                  <div>
                    <div className="loading-item loading-flipcard-photo-preview">
                      <div className="animationLoading">
                        <div className="animationLoadingContent"></div>
                      </div>
                    </div>
                  </div>
                )}

                <input
                  type="file"
                  style={{ display: "none" }}
                  accept=".png, .jpg, .jpeg"
                  ref={(fb) => (this.flipcardBackPhotoFilesPickerRef = fb)}
                  onChange={this.flipcardBackPhotoFileChangeHandler}
                />
                <button
                  className="create-flipcard-front-photo-upload-button"
                  onClick={this.pickFlipcardBackPhotoHandler}
                >
                  Upload Flipcard Back Photo
                </button>
              </div>
            </div>

            <div
              style={{
                display: this.state.showFlipcardPhotosError ? "block" : "none",
              }}
            >
              <div className="warning-displayer">
                {this.state.flipcardPreviewError}
              </div>
            </div>

            <div>
              <div className="create-post-footer-preview-button-container">
                <button
                  className="create-post-footer-item create-preview-button"
                  onClick={this.showFlipcardPreview}
                >
                  Preview Flipcard
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* createFlipcardModal Layer one - ends */}

        {/* createFlipcardModal Layer two - starts */}
        <div
          className="create-flipcard-layer-two-modal-container"
          id="create-flipcard-layer-two-modal-container"
          style={{
            display: this.state.openCreateFlipcardLayerTwoModal
              ? "block"
              : "none",
          }}
          tabIndex={1}
        >
          <img
            height="20"
            src={overlayClose}
            alt="closer"
            className="srollable-overlayClose pointer"
            onClick={this.handleCreateFlipcardLayerTwoModalClose}
          />
          <div className="create-flipcard-layer-two-modal-inner-container">
            <span
              className="close_popup"
              title="close"
              onClick={this.handleCreateFlipcardLayerTwoModalClose}
            >
              <img height="30" src={fancyClose} alt="closer" />
            </span>
            <div className="modal-header">Flipcard Preview</div>

            <div className="letter-preview-container">
              <div className="single-item">
                <div className="post-n-user-details-container">
                  <div className="post-dps-container">
                    <span className="post-user-dp-primary-a">
                      <img
                        className="post-user-dp post-user-dp-primary"
                        src={zuck}
                        alt="avatar"
                      />
                    </span>
                    <span>
                      <img
                        className="post-user-dp post-user-dp-secondary"
                        src={kohli}
                        alt="avatar"
                      />
                    </span>
                  </div>
                  <div className="postInfo-n-user-details-div">
                    <div className="post-details-div">
                      <span>Manoj Kumar j</span>
                    </div>
                    <div className="post-timestamp-div">Just now</div>
                  </div>
                </div>

                <div
                  className="post-description-container"
                  style={{
                    display:
                      this.state.selectedOptionForFlipcard === "yes"
                        ? "block"
                        : "none",
                  }}
                >
                  <textarea
                    className="textarea"
                    ref={(f) => (this.textarea_four = f)}
                    placeholder="write something..."
                    rows={5}
                    onFocus={() =>
                      this.setState({ showFlipcardPreviewError: false })
                    }
                    onChange={(e) =>
                      this.setState({
                        modalFlipcardPostContentDescription: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="post-description-container">
                  <ReactCardFlip
                    isFlipped={this.state.isFlipped}
                    flipDirection={this.state.flipDirection}
                    infinite={true}
                    flipSpeedBackToFront={0.6}
                    containerStyle={{ textAlign: "center" }}
                  >
                    <div>
                      <img
                        src={this.state.flipcardFrontPhoto}
                        width={300}
                        height={300}
                        alt="front"
                      />
                    </div>

                    <div>
                      <img
                        src={this.state.flipcardBackPhoto}
                        width={300}
                        height={300}
                        alt="back"
                      />
                    </div>
                  </ReactCardFlip>
                  <div className="flip-button-container">
                    <button
                      type="button"
                      className="flip-button"
                      onClick={() =>
                        this.setState({ isFlipped: !this.state.isFlipped })
                      }
                    >
                      Click to flip
                    </button>
                  </div>
                </div>
              </div>

              <div className="post-content-query-section">
                <span className="post-content-query">
                  Want to have post content?
                </span>
                <span className="post-content-query-option">
                  <input
                    type="radio"
                    value="yes"
                    className="flipcard-post-content-query-option-radio"
                    checked={this.state.selectedOptionForFlipcard === "yes"}
                    onChange={this.flipcardRadioChange}
                  />
                  Yes
                </span>
                <span className="post-content-query-option">
                  <input
                    type="radio"
                    value="no"
                    className="flipcard-post-content-query-option-radio"
                    checked={this.state.selectedOptionForFlipcard === "no"}
                    onChange={this.flipcardRadioChange}
                  />
                  No
                </span>
              </div>

              <div className="post-content-query-section">
                <span className="post-content-query">Flip direction</span>
                <span className="post-content-query-option">
                  <input
                    type="radio"
                    value="horizontal"
                    className="flipcard-post-content-query-option-radio"
                    checked={this.state.flipDirection === "horizontal"}
                    onChange={this.flipDirectionRadioChange}
                  />
                  Horizontal
                </span>
                <span className="post-content-query-option">
                  <input
                    type="radio"
                    value="vertical"
                    className="flipcard-post-content-query-option-radio"
                    checked={this.state.flipDirection === "vertical"}
                    onChange={this.flipDirectionRadioChange}
                  />
                  Vertical
                </span>
              </div>

              <div
                style={{
                  display: this.state.showFlipcardPreviewError
                    ? "block"
                    : "none",
                }}
              >
                <div className="warning-displayer">Please enter content...</div>
              </div>

              <div>
                <div className="create-post-footer-container">
                  <select
                    className="create-post-footer-item"
                    value={this.state.flipcardPostPrivacy}
                    onChange={(e) =>
                      this.setState({ flipcardPostPrivacy: e.target.value })
                    }
                    style={{
                      border:
                        this.state.flipcardPostPrivacy === "" &&
                        this.state.showFlipcardPostPrivacy
                          ? "1px solid red"
                          : "1px solid #ccc",
                    }}
                  >
                    <option value="">Select Post Privacy</option>
                    <option value="1">Public</option>
                    <option value="2">Friends</option>
                    <option value="3">Only Me</option>
                  </select>
                  <button
                    className="create-post-footer-item create-post-button"
                    onClick={this.submitFlipcardPost}
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* createFlipcardModal Layer two - ends */}

        {/* letter-viewer-modal - starts */}
        <div
          className="letter-viewer-modal-container"
          id="letter-viewer-modal-container"
          style={{
            display: this.state.openLetterViewerModal ? "block" : "none",
          }}
          tabIndex={1}
        >
          <img
            height="20"
            src={overlayClose}
            alt="closer"
            className="srollable-overlayClose pointer"
            onClick={this.handleLetterViewerModalClose}
          />
          <div className="letter-viewer-modal-inner-container">
            <span
              className="close_popup"
              title="close"
              onClick={this.handleLetterViewerModalClose}
            >
              <img height="30" src={fancyClose} alt="closer" />
            </span>
            {this.state.letterContent}
          </div>
        </div>
        {/* letter-viewer-modal - ends */}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log(state.auth);
  return {
    centralState: state.central,
    getAuthState: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createPost: (postTypeId, postDetailsObject, postedTo) =>
      dispatch(createPost(postTypeId, postDetailsObject, postedTo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostMenu);
