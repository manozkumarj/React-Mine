import React, { useEffect } from "react";
import "./postTypes.css";
import RightSideSection from "./../../layouts/rightSideSection/RightSideSection";

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
          <div className="individual-type">
            <div className="individual-type-inner type-bg-color">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </div>
          </div>
          <div className="individual-type">
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
          <div className="individual-type">
            <div className="individual-type-inner type-bg-color-1">
              <div className="inner-border inner-solid-border">
                Lorem Ipsum is simply dummy text of the printing.
              </div>
            </div>
          </div>

          <div className="individual-type">
            <div className="individual-type-inner type-bg-color-1">
              <div className="inner-border inner-dashed-border">
                Lorem Ipsum is simply dummy text of the printing.
              </div>
            </div>
          </div>

          <div className="individual-type">
            <div className="individual-type-inner type-bg-color-1">
              <div className="inner-border inner-dotted-border">
                Lorem Ipsum is simply dummy text of the printing.
              </div>
            </div>
          </div>

          <div className="individual-type">
            <div className="individual-type-inner type-bg-color-1">
              <div className="inner-border inner-double-border">
                Lorem Ipsum is simply dummy text of printing.
              </div>
            </div>
          </div>
        </div>

        <div className="types-container">
          <div className="individual-type">
            <div className="individual-type-inner type-bg-color-1">
              <div className="inner-border inner-solid-border border-lNr">
                Lorem Ipsum is simply dummy text of the printing.
              </div>
            </div>
          </div>
          <div className="individual-type">
            <div className="individual-type-inner type-bg-color-1">
              <div className="inner-border inner-solid-border border-tNb">
                Lorem Ipsum is simply dummy text of the printing.
              </div>
            </div>
          </div>
          <div className="individual-type">
            <div className="individual-type-inner type-bg-color-1">
              <div className="inner-border inner-dashed-border border-lNr">
                Lorem Ipsum is simply dummy text of the printing.
              </div>
            </div>
          </div>
          <div className="individual-type">
            <div className="individual-type-inner type-bg-color-1">
              <div className="inner-border inner-dashed-border border-tNb">
                Lorem Ipsum is simply dummy text of the printing.
              </div>
            </div>
          </div>
        </div>

        <div className="types-container">
          <div className="individual-type">
            <div className="individual-type-inner type-bg-color-1">
              <div className="inner-border inner-dotted-border border-lNr">
                Lorem Ipsum is simply dummy text of the printing.
              </div>
            </div>
          </div>
          <div className="individual-type">
            <div className="individual-type-inner type-bg-color-1">
              <div className="inner-border inner-dotted-border border-tNb">
                Lorem Ipsum is simply dummy text of the printing.
              </div>
            </div>
          </div>
          <div className="individual-type">
            <div className="individual-type-inner type-bg-color-1">
              <div className="inner-border inner-double-border border-lNr">
                Lorem Ipsum is simply dummy text of printing.
              </div>
            </div>
          </div>
          <div className="individual-type">
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
    </div>
  );
}
