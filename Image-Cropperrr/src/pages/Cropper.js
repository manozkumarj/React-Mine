import React from "react";
import Cropper from "react-easy-crop";
import "./styles.css";
import Slider from "@material-ui/core/Slider";
import dog from "./../dog.jpeg";
import getCroppedImg from "./CropImage";

class Cropperrr extends React.Component {
  state = {
    image: dog,
    crop: { x: 0, y: 0 },
    zoom: 1,
    aspect: 4 / 4,
    croppedAreaPixels: null,
    croppedImage: null,
    isCropping: false,
  };

  onCropChange = (crop) => {
    this.setState({ crop });
  };

  onCropComplete = (croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
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

  render() {
    return (
      <div>
        <div className="crop-container">
          <Cropper
            image={this.state.image}
            crop={this.state.crop}
            zoom={this.state.zoom}
            cropShape="square"
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

        <div className="buttonHolder">
          <button
            color="primary"
            variant="contained"
            onClick={this.showResult}
            disabled={this.state.isCropping}
          >
            Show result
          </button>
        </div>

        {this.state.croppedImage && (
          <div className="buttonHolder">
            <img src={this.state.croppedImage} height="150px" width="150px" />
          </div>
        )}
      </div>
    );
  }
}

export default Cropperrr;
