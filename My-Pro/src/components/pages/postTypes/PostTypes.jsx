import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createPost } from "./../../../redux/actionCreators";
import "./postTypes.css";
import RightSideSection from "./../../layouts/rightSideSection/RightSideSection";

import overlayClose from "../../../images/overlay-close.png";
import fancyClose from "../../../images/fancy-close.png";
import ColorPalette from "./../../layouts/colorPalette/ColorPalette";

const PostTypes = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // const [postContent, setPostContent] = useState(null);
  const [postPrivacy, setPostPrivacy] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [loggedInUserId, setLoggedInUserId] = useState(null);

  // const [bgColor, setBgColor] = useState(null);
  // const [textColor, setTextColor] = useState(null);
  // const [borderColor, setBorderColor] = useState(null);
  // const [borderStyle, setBorderStyle] = useState(null);
  // const [borderStyleSides, setBorderStyleSides] = useState(null);
  // const [cornerStyle, setCornerStyle] = useState(null);
  // const [cornerStyleSides, setCornerStyleSides] = useState(null);
  const [postTypeId, setPostTypeId] = useState(null);

  useEffect(() => {
    localStorage.setItem("_bgNtextNborderPostBgcolor", "006600");
    localStorage.setItem("_bgNtextNborderPostTextcolor", "ffffff");
    localStorage.setItem("_bgNtextNborderPostBordercolor", "FFF711");
    localStorage.setItem("_bgNtextNborderPostBorderStyle", "solid");
    localStorage.setItem("_bgNtextNborderPostBorderStyleSides", "all");

    localStorage.setItem("_brdrFoldNcutPostBgcolor", "53a3b4");
    localStorage.setItem("_brdrFoldNcutPostTextcolor", "ffffff");

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
    // setPostContent(null);
    setPostPrivacy(null);
    setPostTypeId(null);
    document.getElementsByClassName(
      "layerTwo-one-post-privacy-selection"
    ).value = "";
  };

  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.src = "/js/jscolor.js";
  //   script.async = true;
  //   document.body.appendChild(script);
  // }, []);

  const handlePostSubmission = (e) => {
    e.preventDefault();
    let postedTo = loggedInUserId;
    let postDetailsObject;

    console.log("handlePostSubmission triggered");
    console.log("PostTypeId -> " + postTypeId);
    console.log("postPrivacy -> " + postPrivacy);
    if (postTypeId && postPrivacy) {
      let postContent;
      if (postTypeId === 3 || postTypeId === 4) {
        // console.log("bgNtextNbrdrPostContentTextarea");
        postContent = document.getElementById("bgNtextNbrdrPostContentTextarea")
          .value;
        // setPostContent(content);
        let getbgcolor = localStorage.getItem("_bgNtextNborderPostBgcolor");
        let getTextColor = localStorage.getItem("_bgNtextNborderPostTextcolor");
        let getBorderColor = localStorage.getItem(
          "_bgNtextNborderPostBordercolor"
        );
        let getBorderStyle = localStorage.getItem(
          "_bgNtextNborderPostBorderStyle"
        );
        let getBorderStyleSides = localStorage.getItem(
          "_bgNtextNborderPostBorderStyleSides"
        );

        // console.log("content -> " + content);
        // console.log("Bgcolor -> " + getbgcolor);
        // console.log("Textcolor -> " + getTextColor);
        // console.log("BorderColor -> " + getBorderColor);
        // console.log("BorderStyle -> " + getBorderStyle);
        // console.log("BorderStyleSides -> " + getBorderStyleSides);

        postDetailsObject = {
          postContent,
          backgroundColor: getbgcolor,
          textColor: getTextColor,
          postPrivacy,
        };

        if (postTypeId === 4) {
          postDetailsObject.borderColor = getBorderColor;
          postDetailsObject.borderStyle = getBorderStyle;
          postDetailsObject.borderStyleSides = getBorderStyleSides;
        }
      } else if (postTypeId === 5) {
        // console.log("brdrFoldNcutPostContentTextarea");
        postContent = document.getElementById("brdrFoldNcutPostContentTextarea")
          .value;

        let getbgcolor = localStorage.getItem("_brdrFoldNcutPostBgcolor");
        let getTextColor = localStorage.getItem("_brdrFoldNcutPostTextcolor");
        let cornerStyle = localStorage.getItem("_brdrFoldNcutPostCornerStyle");
        let cornerStyleSides = localStorage.getItem(
          "_brdrFoldNcutPostCornerStyleSides"
        );

        postDetailsObject = {
          postContent,
          backgroundColor: getbgcolor,
          textColor: getTextColor,
          cornerStyle,
          cornerStyleSides,
          postPrivacy,
        };

        // console.log("content -> " + content);
        // console.log("Bgcolor -> " + getbgcolor);
        // console.log("Textcolor -> " + getTextColor);
        // console.log("CornerStyle -> " + cornerStyle);
        // console.log("CornerStyleSides -> " + cornerStyleSides);
      } else {
        alert("postTypeId is not 3 || 4|| 5");
        return false;
      }
    } else {
      alert("either postTypeId || postType ID is not valid");
      return false;
    }

    props.createPost(authToken, postedTo, postTypeId, postDetailsObject);
    console.log("postDetailsObject are below");
    console.log(postDetailsObject);
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
            onClick={() => setPostTypeId(3)}
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
            onClick={() => setPostTypeId(3)}
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
            onClick={() => setPostTypeId(4)}
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
            onClick={() => setPostTypeId(4)}
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
            onClick={() => setPostTypeId(4)}
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
            onClick={() => setPostTypeId(4)}
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
            data-post-border-sides="leftAndRight"
            onClick={() => setPostTypeId(4)}
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
            data-post-border-sides="topAndBottom"
            onClick={() => setPostTypeId(4)}
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
            data-post-border-sides="leftAndRight"
            onClick={() => setPostTypeId(4)}
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
            data-post-border-sides="topAndBottom"
            onClick={() => setPostTypeId(4)}
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
            data-post-border-sides="leftAndRight"
            onClick={() => setPostTypeId(4)}
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
            data-post-border-sides="topAndBottom"
            onClick={() => setPostTypeId(4)}
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
            data-post-border-sides="leftAndRight"
            onClick={() => setPostTypeId(4)}
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
            data-post-border-sides="topAndBottom"
            onClick={() => setPostTypeId(4)}
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
            data-corner-style-sides="topRight"
            onClick={() => setPostTypeId(5)}
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
            onClick={() => setPostTypeId(5)}
            data-corner-style-sides="bottomRight"
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
            onClick={() => setPostTypeId(5)}
            data-corner-style-sides="bottomLeft"
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
            onClick={() => setPostTypeId(5)}
            data-corner-style-sides="topLeft"
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
            onClick={() => setPostTypeId(5)}
            data-corner-style-sides="topRightAndBottomLeft"
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
            onClick={() => setPostTypeId(5)}
            data-corner-style-sides="topLeftAndBottomRight"
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
            onClick={() => setPostTypeId(5)}
            data-corner-style-sides="topRight"
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
            onClick={() => setPostTypeId(5)}
            data-corner-style-sides="bottomRight"
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
            onClick={() => setPostTypeId(5)}
            data-corner-style-sides="bottomLeft"
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
            onClick={() => setPostTypeId(5)}
            data-corner-style-sides="topLeft"
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
            onClick={() => setPostTypeId(5)}
            data-corner-style-sides="topRightAndBottomLeft"
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
            onClick={() => setPostTypeId(5)}
            data-corner-style-sides="topLeftAndBottomRight"
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
                id="bgNtextNbrdrPostContentTextarea"
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
                  // onChange={(e) => setBorderStyleSides(e.target.value)}
                >
                  <option value="all">Border - All sides</option>
                  <option value="top">Border - Top</option>
                  <option value="right">Border - Right</option>
                  <option value="bottom">Border - Bottom</option>
                  <option value="left">Border - Left</option>
                  <option value="leftAndRight">Border - Left and Right</option>
                  <option value="topAndBottom">Border - Top and Bottom</option>
                </select>
              </div>
            </div>

            <div className="hidden-clrpkrs">
              <input
                type="text"
                id="bgcolor"
                value="006600"
                // onChange={(e) => setBgColor(e.target.value)}
              />
              <input
                type="text"
                id="textcolor"
                value="ffffff"
                // onChange={(e) => setTextColor(e.target.value)}
              />
              <input
                type="text"
                id="bordercolor"
                value="FFF711"
                // onChange={(e) => setBorderColor(e.target.value)}
              />
              <input type="text" id="borderStyle" value="solid" />
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
            <input id="brdrFoldNcutPost-bgclrpkr" value="53a3b4" />
            <input id="brdrFoldNcutPost-textclrpkr" value="ffffff" />
            <input id="brdrFoldNcutPost-cornerStyle" value="" />
            <input id="brdrFoldNcutPost-cornerStyleSides" value="" />
          </div>

          <div className="warning-div">Post content can't be empty</div>

          <hr className="dividable-hr" />

          <div className="layerOne-post-actions-div">
            <button
              className="layerOne-close-btn layerOneCloser"
              onClick={handleCloser}
            >
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
        <span className="overlay_close layerTwoCloser" title="close">
          <img height="20" src={overlayClose} alt="closer" />
        </span>

        <div className="postType-layerTwoModalInner">
          <div className="postType-sample-LayerTwo">
            <span className="fancyCloseIcon layerTwoCloser" title="close">
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
                  value={postPrivacy}
                >
                  <option value="">Select Post Privacy</option>
                  <option value="1">Public</option>
                  <option value="2">Friends</option>
                  <option value="3">Only Me</option>
                </select>
                <button className="post-button" onClick={handlePostSubmission}>
                  Post
                </button>
              </div>
            </div>
          </div>

          {/* LayerTwo sample 2 - starts */}
          <div className="postType-sample-two-LayerTwo">
            <span className="fancyCloseIcon layerTwoCloser" title="close">
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
                  value={postPrivacy}
                >
                  <option value="">Select Post Privacy</option>
                  <option value="1">Public</option>
                  <option value="2">Friends</option>
                  <option value="3">Only Me</option>
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

export default connect(mapStateToProps, mapDispatchToProps)(PostTypes);
