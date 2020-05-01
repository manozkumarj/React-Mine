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
            data-post-type="solid-all"
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
            data-post-type="dashed-all"
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
            data-post-type="dotted-all"
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
            data-post-type="double-all"
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
            data-post-type="solid-lNr"
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
            data-post-type="solid-tNb"
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
            data-post-type="dashed-lNr"
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
            data-post-type="dashed-tNb"
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
            data-post-type="dotted-lNr"
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
            data-post-type="dotted-tNb"
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
            data-post-type="double-lNr"
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
            data-post-type="double-tNb"
          >
            <div className="individual-type-inner type-bg-color-1">
              <div className="inner-border inner-double-border border-tNb">
                Lorem Ipsum is simply dummy text of printing.
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

            <br />
            <br />
            <br />
            <p>
              Manoj Kumar - Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Mauris ac ornare metus. Duis luctus consequat consectetur.
              Integer eleifend metus et condimentum rutrum. Nam vel laoreet
              diam, in gravida metus. Etiam sagittis diam nec lacus sodales, id
              hendrerit quam convallis. Proin finibus pretium commodo. Nam et
              luctus metus. Nulla vitae augue est. Donec vitae tristique urna,
              id cursus nunc.
            </p>
            <button id="postType-openLayerTwoModal" type="button">
              Open posttype layer 2nd Modal
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
          <div className="postType-sample-LayerOne">
            <span className="fancyCloseIcon layerTwoCloser" title="close">
              <img height="30" src={fancyClose} alt="closer" />
            </span>
            <br />

            <p>
              Manoj Kumar - Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Mauris ac ornare metus. Duis luctus consequat consectetur.
              Integer eleifend metus et condimentum rutrum. Nam vel laoreet
              diam, in gravida metus. Etiam sagittis diam nec lacus sodales, id
              hendrerit quam convallis. Proin finibus pretium commodo. Nam et
              luctus metus. Nulla vitae augue est. Donec vitae tristique urna,
              id cursus nunc.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
