import React, { useEffect } from "react";
import "./postTypes.css";
import RightSideSection from "./../../layouts/rightSideSection/RightSideSection";

import overlayClose from "../../../images/overlay-close.png";
import fancyClose from "../../../images/fancy-close.png";

export default function PostTypes() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
            data-post-foldRcut-class="cornerFold_topRight"
          >
            <div className="individual-type-inner">
              <div class="post-type-cornerFold cornerFold cornerFold_topRight ">
                <span className="post-description">
                  Lorem Ipsum is simply dummy text of the printing.
                </span>
              </div>
            </div>
          </div>

          <div
            className="individual-type open-post-type-modal"
            id="border-fold-type"
            data-post-foldRcut-class="cornerFold_bottomRight"
          >
            <div className="individual-type-inner">
              <div class="post-type-cornerFold cornerFold cornerFold_bottomRight ">
                <span className="post-description">
                  Lorem Ipsum is simply dummy text of the printing.
                </span>
              </div>
            </div>
          </div>

          <div
            className="individual-type open-post-type-modal"
            id="border-fold-type"
            data-post-foldRcut-class="cornerFold_bottomLeft"
          >
            <div className="individual-type-inner">
              <div class="post-type-cornerFold cornerFold cornerFold_bottomLeft ">
                <span className="post-description">
                  Lorem Ipsum is simply dummy text of the printing.
                </span>
              </div>
            </div>
          </div>

          <div
            className="individual-type open-post-type-modal"
            id="border-fold-type"
            data-post-foldRcut-class="cornerFold_topLeft"
          >
            <div className="individual-type-inner">
              <div class="post-type-cornerFold cornerFold cornerFold_topLeft ">
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
            data-post-foldRcut-class="cornerFold_topRight_bottomLeft"
          >
            <div className="individual-type-inner">
              <div class="post-type-cornerFold cornerFold cornerFold_topRight_bottomLeft ">
                <span className="post-description">
                  Lorem Ipsum is simply dummy text of the printing.
                </span>
              </div>
            </div>
          </div>

          <div
            className="individual-type open-post-type-modal"
            id="border-fold-type"
            data-post-foldRcut-class="cornerFold_topLeft_bottomRight"
          >
            <div className="individual-type-inner">
              <div class="post-type-cornerFold cornerFold cornerFold_topLeft_bottomRight ">
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
            data-post-foldRcut-class="cornerFold_topRight"
          >
            <div className="individual-type-inner">
              <div class="post-type-cornerFold cornerFold cornerFold_topRight remove_cornerShadow">
                <span className="post-description">
                  Lorem Ipsum is simply dummy text of the printing.
                </span>
              </div>
            </div>
          </div>

          <div
            className="individual-type open-post-type-modal"
            id="border-cut-type"
            data-post-foldRcut-class="cornerFold_bottomRight"
          >
            <div className="individual-type-inner">
              <div class="post-type-cornerFold cornerFold cornerFold_bottomRight remove_cornerShadow">
                <span className="post-description">
                  Lorem Ipsum is simply dummy text of the printing.
                </span>
              </div>
            </div>
          </div>

          <div
            className="individual-type open-post-type-modal"
            id="border-cut-type"
            data-post-foldRcut-class="cornerFold_bottomLeft"
          >
            <div className="individual-type-inner">
              <div class="post-type-cornerFold cornerFold cornerFold_bottomLeft remove_cornerShadow">
                <span className="post-description">
                  Lorem Ipsum is simply dummy text of the printing.
                </span>
              </div>
            </div>
          </div>

          <div
            className="individual-type open-post-type-modal"
            id="border-cut-type"
            data-post-foldRcut-class="cornerFold_topLeft"
          >
            <div className="individual-type-inner">
              <div class="post-type-cornerFold cornerFold cornerFold_topLeft remove_cornerShadow">
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
            data-post-foldRcut-class="cornerFold_topRight_bottomLeft"
          >
            <div className="individual-type-inner">
              <div class="post-type-cornerFold cornerFold cornerFold_topRight_bottomLeft remove_cornerShadow">
                <span className="post-description">
                  Lorem Ipsum is simply dummy text of the printing.
                </span>
              </div>
            </div>
          </div>

          <div
            className="individual-type open-post-type-modal"
            id="border-cut-type"
            data-post-foldRcut-class="cornerFold_topLeft_bottomRight"
          >
            <div className="individual-type-inner">
              <div class="post-type-cornerFold cornerFold cornerFold_topLeft_bottomRight remove_cornerShadow">
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
        <span className="overlay_close layerOneCloser" title="close">
          <img height="20" src={overlayClose} alt="closer" />
        </span>

        <div className="postType-layerOneModalInner">
          <div className="postType-sample-LayerOne">
            <span className="fancyCloseIcon layerOneCloser" title="close">
              <img height="30" src={fancyClose} alt="closer" />
            </span>
            <div className="postContentDiv postContentDivStyle">
              <textarea
                className="postContentTextarea"
                name="text"
                placeholder="write something..."
                spellCheck="false"
              ></textarea>
            </div>
            <hr className="dividable-hr" />
            <div className="colorpickers-titles-container picker-div-1">
              <div>
                <button
                  className="jscolor {valueElement:'bgcolor'}"
                  id="bgclrpkr"
                >
                  Pick post background color
                </button>
              </div>
              <div>
                <button
                  className="jscolor {valueElement:'textcolor'}"
                  id="textclrpkr"
                >
                  Pick post text color
                </button>
              </div>
            </div>

            <div className="colorpickers-titles-container picker-div-2">
              <div>
                <button
                  className="jscolor {valueElement:'bordercolor'}"
                  id="borderclrpkr"
                >
                  Pick post border color
                </button>
              </div>
              <div>
                <select
                  id="post-borders-selecter"
                  placeholder="Select post border sides"
                >
                  <option value="all">Border - All sides</option>
                  <option value="lNr">Border - Left and Right</option>
                  <option value="tNb">Border - Top and Bottom</option>
                </select>
              </div>
            </div>

            <div className="hidden-clrpkrs">
              <input id="bgcolor" value="006600" readOnly />
              <input id="textcolor" value="ffffff" readOnly />
              <input id="bordercolor" value="FFF711" readOnly />
              <input id="borderStyle" value="solid" readOnly />
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
          <span className="fancyCloseIcon layerOneCloser" title="close">
            <img height="30" src={fancyClose} alt="closer" />
          </span>
          <div className="brdrFoldNcutPostContentDiv">
            <div
              class="cornerFold cornerFoldStyle-modal"
              id="cornerFoldStyle-textareaDiv"
            >
              <textarea
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
                className="jscolor {valueElement:'brdrFoldNcutPost-bgclrpkr'}"
                id="brdrFoldNcut-bgclrpkr"
              >
                Pick post background color
              </button>
            </div>
            <div>
              <button
                className="jscolor {valueElement:'brdrFoldNcutPost-textclrpkr'}"
                id="brdrFoldNcut-textclrpkr"
              >
                Pick post text color
              </button>
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
              <button className="post-button">Post</button>
            </div>
          </div>

          {/* LayerTwo sample 2 - starts */}
          <div className="postType-sample-two-LayerTwo">
            <span className="fancyCloseIcon layerTwoCloser" title="close">
              <img height="30" src={fancyClose} alt="closer" />
            </span>

            <div className="brdrFoldNcutPostContentDiv">
              <div
                class="cornerFold cornerFoldStyle-modal"
                id="brdrFoldNcutPostContentPreviewer"
              ></div>
            </div>

            <hr className="dividable-hr" />

            <div className="layerOne-post-actions-div">
              <button className="layerOne-close-btn layerTwoCloser">
                Back
              </button>
              <button className="post-button">Post</button>
            </div>
          </div>
          {/* LayerTwo sample 2 - ends */}
        </div>
      </div>
    </div>
  );
}