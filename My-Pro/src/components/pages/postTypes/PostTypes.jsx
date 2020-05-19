import React, { useState, useEffect } from "react";
import "./postTypes.css";
import RightSideSection from "./../../layouts/rightSideSection/RightSideSection";

import overlayClose from "../../../images/overlay-close.png";
import fancyClose from "../../../images/fancy-close.png";
import ColorPalette from "./../../layouts/colorPalette/ColorPalette";

export default function PostTypes() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [postContent, setPostContent] = useState(null);
  const [postPrivacy, setPostPrivacy] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [loggedInUserId, setLoggedInUserId] = useState(null);

  const [bgColor, setBgColor] = useState(null);
  const [textColor, setTextColor] = useState(null);
  const [borderColor, setBorderColor] = useState(null);
  const [borderStyle, setBorderStyle] = useState(null);
  const [borderStyleSides, setBorderStyleSides] = useState(null);
  const [cornerStyle, setCornerStyle] = useState(null);
  const [cornerStyleSides, setCornerStyleSides] = useState(null);

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

  const handleCloser = () => {
    setPostContent(null);
    setPostPrivacy(null);
  };

  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.src = "/js/jscolor.js";
  //   script.async = true;
  //   document.body.appendChild(script);
  // }, []);

  const handlePostSubmission = (e) => {
    e.preventDefault();
    console.log("handlePostSubmission triggered");
  };

  return (
    <div className="three-divs-container">
      <div className="left-and-middle-divs-container advanced-posts-container">
        <div className="advanced-posts-header">Select a post type</div>

        <div className="types_title_holder">
          <span className="type_title">Background &amp; Text color type:-</span>
        </div>

        {/* Background & Text color type */}
        <div className="types-container">
          <div
            className="individual-type open-post-type-modal"
            id="bg-N-text-type"
            data-post-type="bg-N-text"
          >
            <div className="individual-type-inner type-bg-color">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </div>
          </div>
          <div
            className="individual-type open-post-type-modal"
            id="bg-N-text-type"
            data-post-type="text"
          >
            <div className="individual-type-inner type-text-color">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </div>
          </div>
        </div>

        <div className="types_title_holder">
          <span className="type_title">
            Background, Text &amp; border color type:-
          </span>
        </div>

        {/* Background, Text & border color type */}
        <div className="types-container">
          <div
            className="individual-type open-post-type-modal"
            id="bg-N-text-N-border-type"
            data-post-border-style="solid"
            data-post-border-sides="all"
          >
            <div className="individual-type-inner type-bg-color-1">
              <div className="inner-border inner-solid-border">
                Lorem Ipsum is simply dummy text of the printing.
              </div>
            </div>
          </div>

          <div
            className="individual-type open-post-type-modal"
            id="bg-N-text-N-border-type"
            data-post-border-style="dashed"
            data-post-border-sides="all"
          >
            <div className="individual-type-inner type-bg-color-1">
              <div className="inner-border inner-dashed-border">
                Lorem Ipsum is simply dummy text of the printing.
              </div>
            </div>
          </div>

          <div
            className="individual-type open-post-type-modal"
            id="bg-N-text-N-border-type"
            data-post-border-style="dotted"
            data-post-border-sides="all"
          >
            <div className="individual-type-inner type-bg-color-1">
              <div className="inner-border inner-dotted-border">
                Lorem Ipsum is simply dummy text of the printing.
              </div>
            </div>
          </div>

          <div
            className="individual-type open-post-type-modal"
            id="bg-N-text-N-border-type"
            data-post-border-style="double"
            data-post-border-sides="all"
          >
            <div className="individual-type-inner type-bg-color-1">
              <div className="inner-border inner-double-border">
                Lorem Ipsum is simply dummy text of printing.
              </div>
            </div>
          </div>
        </div>

        <div className="types-container">
          <div
            className="individual-type open-post-type-modal"
            id="bg-N-text-N-border-type"
            data-post-border-style="solid"
            data-post-border-sides="lNr"
          >
            <div className="individual-type-inner type-bg-color-1">
              <div className="inner-border inner-solid-border border-lNr">
                Lorem Ipsum is simply dummy text of the printing.
              </div>
            </div>
          </div>
          <div
            className="individual-type open-post-type-modal"
            id="bg-N-text-N-border-type"
            data-post-border-style="solid"
            data-post-border-sides="tNb"
          >
            <div className="individual-type-inner type-bg-color-1">
              <div className="inner-border inner-solid-border border-tNb">
                Lorem Ipsum is simply dummy text of the printing.
              </div>
            </div>
          </div>
          <div
            className="individual-type open-post-type-modal"
            id="bg-N-text-N-border-type"
            data-post-border-style="dashed"
            data-post-border-sides="lNr"
          >
            <div className="individual-type-inner type-bg-color-1">
              <div className="inner-border inner-dashed-border border-lNr">
                Lorem Ipsum is simply dummy text of the printing.
              </div>
            </div>
          </div>
          <div
            className="individual-type open-post-type-modal"
            id="bg-N-text-N-border-type"
            data-post-border-style="dashed"
            data-post-border-sides="tNb"
          >
            <div className="individual-type-inner type-bg-color-1">
              <div className="inner-border inner-dashed-border border-tNb">
                Lorem Ipsum is simply dummy text of the printing.
              </div>
            </div>
          </div>
        </div>

        <div className="types-container">
          <div
            className="individual-type open-post-type-modal"
            id="bg-N-text-N-border-type"
            data-post-border-style="dotted"
            data-post-border-sides="lNr"
          >
            <div className="individual-type-inner type-bg-color-1">
              <div className="inner-border inner-dotted-border border-lNr">
                Lorem Ipsum is simply dummy text of the printing.
              </div>
            </div>
          </div>
          <div
            className="individual-type open-post-type-modal"
            id="bg-N-text-N-border-type"
            data-post-border-style="dotted"
            data-post-border-sides="tNb"
          >
            <div className="individual-type-inner type-bg-color-1">
              <div className="inner-border inner-dotted-border border-tNb">
                Lorem Ipsum is simply dummy text of the printing.
              </div>
            </div>
          </div>
          <div
            className="individual-type open-post-type-modal"
            id="bg-N-text-N-border-type"
            data-post-border-style="double"
            data-post-border-sides="lNr"
          >
            <div className="individual-type-inner type-bg-color-1">
              <div className="inner-border inner-double-border border-lNr">
                Lorem Ipsum is simply dummy text of printing.
              </div>
            </div>
          </div>
          <div
            className="individual-type open-post-type-modal"
            id="bg-N-text-N-border-type"
            data-post-border-style="double"
            data-post-border-sides="tNb"
          >
            <div className="individual-type-inner type-bg-color-1">
              <div className="inner-border inner-double-border border-tNb">
                Lorem Ipsum is simply dummy text of printing.
              </div>
            </div>
          </div>
        </div>

        <div className="types_title_holder">
          <span className="type_title">Border fold type:-</span>
        </div>

        <div className="types-container">
          <div
            className="individual-type open-post-type-modal"
            id="border-fold-type"
            data-post-fold-or-cut-class="cornerFold_topRight"
          >
            <div className="individual-type-inner">
              <div className="post-type-cornerFold cornerFold cornerFold_topRight ">
                <span className="post-description">
                  Lorem Ipsum is simply dummy text of the printing.
                </span>
              </div>
            </div>
          </div>

          <div
            className="individual-type open-post-type-modal"
            id="border-fold-type"
            data-post-fold-or-cut-class="cornerFold_bottomRight"
          >
            <div className="individual-type-inner">
              <div className="post-type-cornerFold cornerFold cornerFold_bottomRight ">
                <span className="post-description">
                  Lorem Ipsum is simply dummy text of the printing.
                </span>
              </div>
            </div>
          </div>

          <div
            className="individual-type open-post-type-modal"
            id="border-fold-type"
            data-post-fold-or-cut-class="cornerFold_bottomLeft"
          >
            <div className="individual-type-inner">
              <div className="post-type-cornerFold cornerFold cornerFold_bottomLeft ">
                <span className="post-description">
                  Lorem Ipsum is simply dummy text of the printing.
                </span>
              </div>
            </div>
          </div>

          <div
            className="individual-type open-post-type-modal"
            id="border-fold-type"
            data-post-fold-or-cut-class="cornerFold_topLeft"
          >
            <div className="individual-type-inner">
              <div className="post-type-cornerFold cornerFold cornerFold_topLeft ">
                <span className="post-description">
                  Lorem Ipsum is simply dummy text of the printing.
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="types-container">
          <div
            className="individual-type open-post-type-modal"
            id="border-fold-type"
            data-post-fold-or-cut-class="cornerFold_topRight_bottomLeft"
          >
            <div className="individual-type-inner">
              <div className="post-type-cornerFold cornerFold cornerFold_topRight_bottomLeft ">
                <span className="post-description">
                  Lorem Ipsum is simply dummy text of the printing.
                </span>
              </div>
            </div>
          </div>

          <div
            className="individual-type open-post-type-modal"
            id="border-fold-type"
            data-post-fold-or-cut-class="cornerFold_topLeft_bottomRight"
          >
            <div className="individual-type-inner">
              <div className="post-type-cornerFold cornerFold cornerFold_topLeft_bottomRight ">
                <span className="post-description">
                  Lorem Ipsum is simply dummy text of the printing.
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="types_title_holder">
          <span className="type_title">Border cut type:-</span>
        </div>

        <div className="types-container">
          <div
            className="individual-type open-post-type-modal"
            id="border-cut-type"
            data-post-fold-or-cut-class="cornerFold_topRight"
          >
            <div className="individual-type-inner">
              <div className="post-type-cornerFold cornerFold cornerFold_topRight remove_cornerShadow">
                <span className="post-description">
                  Lorem Ipsum is simply dummy text of the printing.
                </span>
              </div>
            </div>
          </div>

          <div
            className="individual-type open-post-type-modal"
            id="border-cut-type"
            data-post-fold-or-cut-class="cornerFold_bottomRight"
          >
            <div className="individual-type-inner">
              <div className="post-type-cornerFold cornerFold cornerFold_bottomRight remove_cornerShadow">
                <span className="post-description">
                  Lorem Ipsum is simply dummy text of the printing.
                </span>
              </div>
            </div>
          </div>

          <div
            className="individual-type open-post-type-modal"
            id="border-cut-type"
            data-post-fold-or-cut-class="cornerFold_bottomLeft"
          >
            <div className="individual-type-inner">
              <div className="post-type-cornerFold cornerFold cornerFold_bottomLeft remove_cornerShadow">
                <span className="post-description">
                  Lorem Ipsum is simply dummy text of the printing.
                </span>
              </div>
            </div>
          </div>

          <div
            className="individual-type open-post-type-modal"
            id="border-cut-type"
            data-post-fold-or-cut-class="cornerFold_topLeft"
          >
            <div className="individual-type-inner">
              <div className="post-type-cornerFold cornerFold cornerFold_topLeft remove_cornerShadow">
                <span className="post-description">
                  Lorem Ipsum is simply dummy text of the printing.
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="types-container">
          <div
            className="individual-type open-post-type-modal"
            id="border-cut-type"
            data-post-fold-or-cut-class="cornerFold_topRight_bottomLeft"
          >
            <div className="individual-type-inner">
              <div className="post-type-cornerFold cornerFold cornerFold_topRight_bottomLeft remove_cornerShadow">
                <span className="post-description">
                  Lorem Ipsum is simply dummy text of the printing.
                </span>
              </div>
            </div>
          </div>

          <div
            className="individual-type open-post-type-modal"
            id="border-cut-type"
            data-post-fold-or-cut-class="cornerFold_topLeft_bottomRight"
          >
            <div className="individual-type-inner">
              <div className="post-type-cornerFold cornerFold cornerFold_topLeft_bottomRight remove_cornerShadow">
                <span className="post-description">
                  Lorem Ipsum is simply dummy text of the printing.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="right-section">
        <RightSideSection />
      </div>

      {/* Post type modals below - Layerone - starts */}
      <div
        id="postType-layerOneModalContainer"
        tabIndex="1"
        className="postType-layerOneModalContainer"
      >
        <span
          className="overlay_close layerOneCloser"
          onClick={handleCloser}
          title="close"
        >
          <img height="20" src={overlayClose} alt="closer" />
        </span>

        <div className="postType-layerOneModalInner">
          <div className="postType-sample-LayerOne">
            <span
              className="fancyCloseIcon layerOneCloser"
              onClick={handleCloser}
              title="close"
            >
              <img height="30" src={fancyClose} alt="closer" />
            </span>
            <div className="postContentDiv postContentDivStyle">
              <textarea
                className="postContentTextarea textarea-auto-height"
                name="text"
                placeholder="write something..."
                spellCheck="false"
                onChange={(e) => setPostContent(e.target.value)}
              ></textarea>
            </div>
            <hr className="dividable-hr" />
            <div className="colorpickers-titles-container picker-div-1">
              <div className="clrpkr-relative">
                <button
                  className="color-palette"
                  id="clrpkr-header"
                  data-color-palette-id="1"
                >
                  Pick post background color
                </button>
                <div className="clrpkr-absolute-container color-palette-1">
                  <ColorPalette storePlace="bgcolor" />
                </div>
              </div>
              <div>
                <button
                  className="color-palette"
                  id="clrpkr-header"
                  data-color-palette-id="2"
                >
                  Pick post text color
                </button>
                <div className="clrpkr-absolute-container color-palette-2">
                  <ColorPalette storePlace="textcolor" />
                </div>
              </div>
            </div>

            <div className="colorpickers-titles-container picker-div-2">
              <div>
                <button
                  className="color-palette"
                  id="clrpkr-header"
                  data-color-palette-id="3"
                >
                  Pick post border color
                </button>
                <div className="clrpkr-absolute-container color-palette-3">
                  <ColorPalette storePlace="bordercolor" />
                </div>
              </div>
              <div>
                <select
                  id="post-borders-selecter"
                  placeholder="Select post border sides"
                  onChange={(e) => setBorderStyleSides(e.target.value)}
                >
                  <option value="all">Border - All sides</option>
                  <option value="lNr">Border - Left and Right</option>
                  <option value="tNb">Border - Top and Bottom</option>
                </select>
              </div>
            </div>

            <div className="hidden-clrpkrs">
              <input
                id="bgcolor"
                value="006600"
                readOnly
                onChange={(e) => setBgColor(e.target.value)}
              />
              <input
                id="textcolor"
                value="ffffff"
                readOnly
                onChange={(e) => setTextColor(e.target.value)}
              />
              <input
                id="bordercolor"
                value="FFF711"
                readOnly
                onChange={(e) => setBorderColor(e.target.value)}
              />
              <input
                id="borderStyle"
                value="solid"
                readOnly
                onChange={(e) => setBorderStyle(e.target.value)}
              />
            </div>

            <div className="warning-div">Post content can't be empty</div>

            <hr className="dividable-hr" />

            <div className="layerOne-post-actions-div">
              <button className="layerOne-close-btn layerOneCloser">
                Cancel
              </button>
              <button id="postType-openLayerTwoModal" className="post-button">
                Preview Post
              </button>
            </div>
          </div>
        </div>

        <div className="postType-sample-two-LayerOne">
          <span
            className="fancyCloseIcon layerOneCloser"
            onClick={handleCloser}
            title="close"
          >
            <img height="30" src={fancyClose} alt="closer" />
          </span>
          <div className="brdrFoldNcutPostContentDiv">
            <div
              className="cornerFold cornerFoldStyle-modal"
              id="cornerFoldStyle-textareaDiv"
            >
              <textarea
                className="textarea-auto-height"
                id="brdrFoldNcutPostContentTextarea"
                name="text"
                placeholder="write something..."
                spellCheck="false"
                onChange={(e) => setPostContent(e.target.value)}
              ></textarea>
            </div>
          </div>
          <hr className="dividable-hr" />
          <div className="colorpickers-titles-container picker-div-1">
            <div>
              <button
                className="color-palette"
                id="clrpkr-header"
                data-color-palette-id="4"
              >
                Pick post background color
              </button>
              <div className="clrpkr-absolute-container color-palette-4">
                <ColorPalette storePlace="brdrFoldNcutPost-bgclrpkr" />
              </div>
            </div>
            <div>
              <button
                className="color-palette"
                id="clrpkr-header"
                data-color-palette-id="5"
              >
                Pick post text color
              </button>
              <div className="clrpkr-absolute-container color-palette-5">
                <ColorPalette storePlace="brdrFoldNcutPost-textclrpkr" />
              </div>
            </div>
          </div>

          <div className="hidden-clrpkrs">
            <input id="brdrFoldNcutPost-bgclrpkr" value="53a3b4" readOnly />
            <input id="brdrFoldNcutPost-textclrpkr" value="ffffff" readOnly />
          </div>

          <div className="warning-div">Post content can't be empty</div>

          <hr className="dividable-hr" />

          <div className="layerOne-post-actions-div">
            <button className="layerOne-close-btn layerOneCloser">
              Cancel
            </button>
            <button
              id="brdrFoldNcut-postType-openLayerTwoModal"
              className="post-button"
            >
              Preview Post
            </button>
          </div>
        </div>
      </div>

      {/* Post type modals below - LayerTwo - starts */}
      <div
        id="postType-layerTwoModalContainer"
        tabIndex="1"
        className="postType-layerTwoModalContainer"
      >
        <span
          className="overlay_close layerTwoCloser"
          onClick={handleCloser}
          title="close"
        >
          <img height="20" src={overlayClose} alt="closer" />
        </span>

        <div className="postType-layerTwoModalInner">
          <div className="postType-sample-LayerTwo">
            <span
              className="fancyCloseIcon layerTwoCloser"
              onClick={handleCloser}
              title="close"
            >
              <img height="30" src={fancyClose} alt="closer" />
            </span>

            <div className="postContentDiv postContentDivStyle">
              <div id="postContentPreviewDiv"></div>
            </div>

            <hr className="dividable-hr" />

            <div className="layerOne-post-actions-div">
              <button className="layerOne-close-btn layerTwoCloser">
                Back
              </button>
              <div>
                <select
                  className="layerTwo-one-post-privacy-selection"
                  onChange={(e) => setPostPrivacy(e.target.value)}
                >
                  <option value="public">Public</option>
                  <option value="friends">Friends</option>
                  <option value="me">Only Me</option>
                </select>
                <button className="post-button" onClick={handlePostSubmission}>
                  Post
                </button>
              </div>
            </div>
          </div>

          {/* LayerTwo sample 2 - starts */}
          <div className="postType-sample-two-LayerTwo">
            <span
              className="fancyCloseIcon layerTwoCloser"
              onClick={handleCloser}
              title="close"
            >
              <img height="30" src={fancyClose} alt="closer" />
            </span>

            <div className="brdrFoldNcutPostContentDiv">
              <div
                className="cornerFold cornerFoldStyle-modal"
                id="brdrFoldNcutPostContentPreviewer"
              ></div>
            </div>

            <hr className="dividable-hr" />

            <div className="layerOne-post-actions-div">
              <button className="layerOne-close-btn layerTwoCloser">
                Back
              </button>
              <div>
                <select
                  className="layerTwo-two-post-privacy-selection"
                  onChange={(e) => setPostPrivacy(e.target.value)}
                >
                  <option value="public">Public</option>
                  <option value="friends">Friends</option>
                  <option value="me">Only Me</option>
                </select>
                <button className="post-button" onClick={handlePostSubmission}>
                  Post
                </button>
              </div>
            </div>
          </div>
          {/* LayerTwo sample 2 - ends */}
        </div>
      </div>
    </div>
  );
}
