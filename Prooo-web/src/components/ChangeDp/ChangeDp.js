import React from "react";
import Cropper from "react-easy-crop";
import "./changeDp.css";
import Slider from "@material-ui/core/Slider";
import dog from "./../../images/dog.jpeg";
import getCroppedImg from "./../../CropImage";
import imageCompression from "browser-image-compression";

import { store } from "react-notifications-component";
import { updateDP } from "../../redux/actionCreators";

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

// Import icons
import uploadPhotoIcon from "./../../icons/upload-image-icon-100.png";

import { base64URLtoFile } from "./../../helpers/helpers";

class ChangeDp extends React.Component {
  state = {
    selectedOption: "",
    image: dog,
    crop: { x: 0, y: 0 },
    zoom: 1,
    aspect: 4 / 4,
    croppedAreaPixels: null,
    croppedImage: null,
    isCropping: false,

    hasPhotoToCrop: false,
    maxSizeMB: 1,
    maxWidthOrHeight: 1024,
    isLoadingPreview: false,
    isLoading: false,
    isAuthUserAlsoProfileUser: null,
    profileUserUsername: null,
  };

  // componentDidMount = () => {
  //   this.setState({ isLoading: true });

  //   console.log(this.props.getAuthState);

  //   if (this.props.getAuthState.profileUserDetails) {
  //     let profUserUsername = this.props.getAuthState.profileUserDetails
  //       .username;

  //     let getIsAuthUserAlsoProfileUser =
  //       profUserUsername === this.props.getAuthState.authUserDetails.username
  //         ? true
  //         : false;

  //     this.setState({
  //       isLoading: false,
  //       profileUserUsername: profUserUsername,
  //       isAuthUserAlsoProfileUser: getIsAuthUserAlsoProfileUser,
  //     });
  //   }
  // };

  onCropChange = (crop) => {
    this.setState({ crop });
  };

  onCropComplete = (croppedArea, croppedAreaPixels) => {
    // console.log(croppedArea, croppedAreaPixels);
    this.setState({
      croppedAreaPixels,
    });
  };

  onZoomChange = (zoom) => {
    this.setState({ zoom });
  };

  showResult = async () => {
    this.setState({
      croppedImage: null,
      isCropping: true,
    });

    try {
      this.setState({
        isCropping: true,
      });
      const croppedImage = await getCroppedImg(
        this.state.image,
        this.state.croppedAreaPixels
      );
      console.log("done", { croppedImage });
      this.setState({
        croppedImage,
        isCropping: false,
      });
    } catch (e) {
      console.error("Error");
      console.error(e);
      this.setState({
        isCropping: false,
      });
    }
  };

  pickVideoHandler = () => {
    this.photosFilesPickerRef.click();
  };

  photosFileChangeHandler = async (event, useWebWorker = "mainThread") => {
    this.setState({ isLoadingPreview: true });
    console.clear();
    console.log("triggered photosFileChangeHandler");
    const allFiles = event.target.files;
    console.log(allFiles);

    if (allFiles.length === 1) {
      let tempFileObjectArray = [];
      let singleFileObject;
      let compressedImg = null;

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
          maxSizeMB: this.maxSizeMB,
          maxWidthOrHeight: this.maxWidthOrHeight,
          useWebWorker,
          fileType: extension,
        };
        const output = await imageCompression(file, options);
        console.log("output", output);

        singleFileObject.outputSize = (output.size / 1024 / 1024).toFixed(2);
        compressedImg = URL.createObjectURL(output);
        singleFileObject.outputUrl = URL.createObjectURL(output);
      }

      if (compressedImg) {
        this.setState({
          hasPhotoToCrop: true,
          image: compressedImg,
          isLoadingPreview: false,
        });
      } else {
        alert("Image compression failed");
        this.setState({
          hasPhotoToCrop: false,
          image: null,
          isLoadingPreview: false,
        });
      }
    } else {
      alert("Invalid");
    }
  };

  radioChange = (e) => {
    this.setState({
      selectedOption: e.currentTarget.value,
    });
  };

  handleUpdateDp = async () => {
    console.log("Ready to update DP");
    console.log(this.state.selectedOption);

    if (
      this.state.selectedOption !== "primary" &&
      this.state.selectedOption !== "secondary"
    ) {
      console.log("selectedOption error");
      this.showDangerNotification();
      return false;
    }

    let getFile = await base64URLtoFile(this.state.croppedImage);
    let filesData = new FormData();
    filesData.append("file[" + 0 + "]", getFile);

    let postDetailsObj = {
      croppedImageProp: filesData,
      dpTypeIdProp: this.state.selectedOption === "primary" ? 1 : 2,
    };
    this.continueToUpdateDp(postDetailsObj);
  };

  continueToUpdateDp = async (postDetailsObj) => {
    console.log(postDetailsObj);
    console.log(this.props);
    try {
      let response = await this.props.updateDP(postDetailsObj);
      console.log(response);
      if (response.success) {
        console.log("PostMenu - createFlipcardPost is success");
        window.location.reload();
        // alert("createFlipcardPost success");
      } else {
        console.error("PostMenu - createFlipcardPost failed");
        // alert("createFlipcardPost failed");
        this.showDangerNotification();
      }
    } catch (err) {
      console.error("PostMenu - createFlipcardPost failed - catch block");
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

  render() {
    if (this.state.isLoading) {
      return (
        <div className="padding-5">
          <div className="contextPreloader">
            <div className="contextPreloader-item no-border-and-shadow-and-padding">
              <div className="animationLoading">
                <div className="animationLoadingContent height-40"></div>
              </div>
            </div>
            <div className="contextPreloader-item no-border-and-shadow-and-padding">
              <div className="animationLoading">
                <div className="animationLoadingContent height-40"></div>
              </div>
            </div>
            <div className="contextPreloader-item no-border-and-shadow-and-padding">
              <div className="animationLoading">
                <div className="animationLoadingContent height-40"></div>
              </div>
            </div>
            <div className="contextPreloader-item no-border-and-shadow-and-padding">
              <div className="animationLoading">
                <div className="animationLoadingContent height-40"></div>
              </div>
            </div>
            <div className="contextPreloader-item no-border-and-shadow-and-padding">
              <div className="animationLoading">
                <div className="animationLoadingContent height-40"></div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (!this.state.isLoading) {
      return (
        <div className="dp-change-container">
          <div className="dp-change-header common-header-title">Update DP</div>
          {!this.state.hasPhotoToCrop && !this.state.isLoadingPreview && (
            <div
              className="dp-change-upload-container pointer"
              onClick={this.pickVideoHandler}
            >
              <input
                type="file"
                style={{ display: "none" }}
                accept=".png, .jpg, .jpeg"
                ref={(a) => (this.photosFilesPickerRef = a)}
                onChange={this.photosFileChangeHandler}
              />
              <div className="dp-change-upload-section">
                <img
                  src={uploadPhotoIcon}
                  alt="upload"
                  className="postMenuIcons dp-change-upload-photo-icon"
                />
                <span>Upload Photo</span>
              </div>
            </div>
          )}

          {(this.state.isLoadingPreview || this.state.isCropping) && (
            <div className="dp-change-upload-container">
              <div className="dp-change-upload-section">
                {this.state.isLoadingPreview && <span>Loading...</span>}
                {this.state.isCropping && <span>Cropping...</span>}
              </div>
            </div>
          )}

          {this.state.hasPhotoToCrop &&
            !this.state.croppedImage &&
            !this.state.isCropping && (
              <>
                <div className="crop-container">
                  <Cropper
                    image={this.state.image}
                    crop={this.state.crop}
                    zoom={this.state.zoom}
                    cropShape="round"
                    showGrid={true}
                    aspect={this.state.aspect}
                    onCropChange={this.onCropChange}
                    onCropComplete={this.onCropComplete}
                    onZoomChange={this.onZoomChange}
                  />
                </div>
                <div className="controls">
                  <Slider
                    value={this.state.zoom}
                    min={1}
                    max={5}
                    step={0.001}
                    aria-labelledby="Zoom"
                    onChange={(e, zoom) => this.onZoomChange(zoom)}
                    // classes={{ container: "slider" }}
                  />
                </div>
                {/* <div className="dp-change-buttons-container">
              <button>Back</button>
              <button
                color="primary"
                variant="contained"
              >
                Show result
              </button>
            </div> */}
              </>
            )}

          {this.state.croppedImage && (
            <div className="cropped-image-container">
              <img src={this.state.croppedImage} className="cropped-image" />
            </div>
          )}

          {this.state.croppedImage &&
            !this.state.isLoadingPreview &&
            !this.state.isCropping && (
              <div className="post-content-query-section no-top-border-margin-12">
                <span className="post-content-query">Set as</span>
                <span className="post-content-query-option">
                  <input
                    type="radio"
                    value="primary"
                    className="post-content-query-option-radio"
                    checked={this.state.selectedOption === "primary"}
                    onChange={this.radioChange}
                  />
                  Primary DP
                </span>
                <span className="post-content-query-option">
                  <input
                    type="radio"
                    value="secondary"
                    className="post-content-query-option-radio"
                    checked={this.state.selectedOption === "secondary"}
                    onChange={this.radioChange}
                  />
                  Secondary DP
                </span>
              </div>
            )}

          {this.state.hasPhotoToCrop &&
            !this.state.croppedImage &&
            !this.state.isLoadingPreview &&
            !this.state.isCropping && (
              <div className="dp-change-buttons-container">
                <button
                  className="dp-change-button dp-change-back-button"
                  onClick={() => this.setState({ hasPhotoToCrop: null })}
                >
                  Back
                </button>
                <button
                  className="dp-change-button dp-change-continue-button"
                  color="primary"
                  variant="contained"
                  onClick={this.showResult}
                  disabled={this.state.isCropping}
                >
                  Crop & Preview
                </button>
              </div>
            )}

          {this.state.croppedImage &&
            !this.state.isLoadingPreview &&
            !this.state.isCropping && (
              <div className="dp-change-buttons-container">
                <button
                  className="dp-change-button dp-change-back-button"
                  onClick={() =>
                    this.setState({ croppedImage: null, selectedOption: "" })
                  }
                >
                  Back
                </button>

                {this.state.croppedImage && !this.state.selectedOption && (
                  <button
                    className="dp-change-button dp-change-continue-button disable-button"
                    color="primary"
                    variant="contained"
                  >
                    Save
                  </button>
                )}

                {this.state.croppedImage && this.state.selectedOption && (
                  <button
                    className="dp-change-button dp-change-continue-button"
                    color="primary"
                    variant="contained"
                    onClick={this.handleUpdateDp}
                  >
                    Save
                  </button>
                )}
              </div>
            )}
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  console.log(state.auth);

  // this.setState({ isLoading: true });
  if (state.auth.profileUserDetails) {
    let profUserUsername = state.auth.profileUserDetails.username;

    let getIsAuthUserAlsoProfileUser =
      profUserUsername === state.auth.authUserDetails.username ? true : false;

    if (!getIsAuthUserAlsoProfileUser)
      window.location.href = `http://localhost:3000/${profUserUsername}`;
    // return <Redirect to={`/${profUserUsername}`} />;

    // this.setState({
    //   isLoading: false,
    //   profileUserUsername: profUserUsername,
    //   isAuthUserAlsoProfileUser: getIsAuthUserAlsoProfileUser,
    // });
  }

  return {
    getAuthState: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateDP: (postDetailsObject) => dispatch(updateDP(postDetailsObject)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangeDp);
