import React from "react";
import "./middleSection.css";
import { Link } from "react-router-dom";
// import zuck from "../../../images/zuck.jpg";
// import mark from "../../../images/mark.jpg";

import kohli from "../../../images/kohli.jpg";
import bikee from "../../../images/bikee.jpg";
import wow1 from "../../../images/wow_1.jpg";
import wow2 from "../../../images/wow_2.jpg";

import loveHeartsEyesEmoji from "../../../emojis/love-hearts-eyes-emoji.png";

const MiddleSection = () => {
  return (
    <div id="middle-div">
      <div className="post-menu-section">
        <div className="post-textarea">
          <textarea
            className="textarea"
            name="text"
            placeholder="write something..."
            spellCheck="false"
          ></textarea>
        </div>
        <div className="post-actions-div">
          <div className="pic-uploader">Upload Images</div>
          <div className="pic-uploader">
            <select className="post-privacy-selection">
              <option value="public">Public</option>
              <option value="friends">Friends</option>
              <option value="me">Only Me</option>
            </select>

            <button className="post-button">Post</button>
          </div>
        </div>
      </div>

      {/* *******************  Welcome section ******************** */}
      <div className="item">
        <div className="greet-div">
          <div className="greet">Welcome</div>
          <div className="greet-name">
            <span>
              Manoj Kumar
              <img
                src={loveHeartsEyesEmoji}
                alt="loveHeartsEyes"
                width="30px"
              />
            </span>
          </div>
        </div>
      </div>

      {/* *******************  All posts section ******************** */}
      <div className="all-posts-container">
        {/* **********  cornerFold_topRight_bottomLeft remove_cornerShadow post section - starts *************** */}
        <div className="item">
          <div className="post-n-user-details-container">
            <div className="post-dp-div">
              <Link to="/">
                <img className="post-user-dp" src={kohli} alt="User name" />
              </Link>
            </div>
            <div className="postInfo-n-user-details-div">
              <div className="post-details-div">
                <Link to="/">Manoj Kumar</Link>
              </div>
              <div className="post-timestamp-div openLayerOneModal">
                5th Jan 2017 - 08:51:25 AM
              </div>
            </div>
          </div>
          <div className="post-description-div">
            <div class="cornerFold cornerFold_topRight_bottomLeft remove_cornerShadow">
              <span className="post-description">
                This is my first test for updates div. Just to check whether
                it's working or not.This is my first test for updates div. Just
                to check whether it's working or not. Lorem Ipsum is simply
                dummy text of the printing and typesetting industry. Lorem Ipsum
                has been the industry's standard dummy text ever since the
                1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book.
              </span>
            </div>
          </div>
        </div>
        {/* ********  cornerFold_topLeft_bottomRight remove_cornerShadow post section - starts *********** */}
        <div className="item">
          <div className="post-n-user-details-container">
            <div className="post-dp-div">
              <Link to="/">
                <img className="post-user-dp" src={kohli} alt="User name" />
              </Link>
            </div>
            <div className="postInfo-n-user-details-div">
              <div className="post-details-div">
                <Link to="/">Manoj Kumar</Link>
              </div>
              <div className="post-timestamp-div openLayerOneModal">
                5th Jan 2017 - 08:51:25 AM
              </div>
            </div>
          </div>
          <div className="post-description-div">
            <div class="cornerFold cornerFold_topLeft_bottomRight remove_cornerShadow">
              <span className="post-description">
                This is my first test for updates div. Just to check whether
                it's working or not.This is my first test for updates div. Just
                to check whether it's working or not. Lorem Ipsum is simply
                dummy text of the printing and typesetting industry. Lorem Ipsum
                has been the industry's standard dummy text ever since the
                1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book.
              </span>
            </div>
          </div>
        </div>
        {/* *******************  cornerFold_topLeft_bottomRight post section - starts ******************** */}
        <div className="item">
          <div className="post-n-user-details-container">
            <div className="post-dp-div">
              <Link to="/">
                <img className="post-user-dp" src={kohli} alt="User name" />
              </Link>
            </div>
            <div className="postInfo-n-user-details-div">
              <div className="post-details-div">
                <Link to="/">Manoj Kumar</Link>
              </div>
              <div className="post-timestamp-div openLayerOneModal">
                5th Jan 2017 - 08:51:25 AM
              </div>
            </div>
          </div>
          <div className="post-description-div">
            <div class="cornerFold cornerFold_topLeft_bottomRight">
              <span className="post-description">
                This is my first test for updates div. Just to check whether
                it's working or not.This is my first test for updates div. Just
                to check whether it's working or not. Lorem Ipsum is simply
                dummy text of the printing and typesetting industry. Lorem Ipsum
                has been the industry's standard dummy text ever since the
                1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book.
              </span>
            </div>
          </div>
        </div>
        {/* *******************  cornerFold_topRight_bottomLeft post section - starts ******************** */}
        <div className="item">
          <div className="post-n-user-details-container">
            <div className="post-dp-div">
              <Link to="/">
                <img className="post-user-dp" src={kohli} alt="User name" />
              </Link>
            </div>
            <div className="postInfo-n-user-details-div">
              <div className="post-details-div">
                <Link to="/">Manoj Kumar</Link>
              </div>
              <div className="post-timestamp-div openLayerOneModal">
                5th Jan 2017 - 08:51:25 AM
              </div>
            </div>
          </div>
          <div className="post-description-div">
            <div class="cornerFold cornerFold_topRight_bottomLeft">
              <span className="post-description">
                This is my first test for updates div. Just to check whether
                it's working or not.This is my first test for updates div. Just
                to check whether it's working or not. Lorem Ipsum is simply
                dummy text of the printing and typesetting industry. Lorem Ipsum
                has been the industry's standard dummy text ever since the
                1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book.
              </span>
            </div>
          </div>
        </div>
        {/* *******************  cornerFold_topLeft post section - starts ******************** */}
        <div className="item">
          <div className="post-n-user-details-container">
            <div className="post-dp-div">
              <Link to="/">
                <img className="post-user-dp" src={kohli} alt="User name" />
              </Link>
            </div>
            <div className="postInfo-n-user-details-div">
              <div className="post-details-div">
                <Link to="/">Manoj Kumar</Link>
              </div>
              <div className="post-timestamp-div openLayerOneModal">
                5th Jan 2017 - 08:51:25 AM
              </div>
            </div>
          </div>
          <div className="post-description-div">
            <div class="cornerFold cornerFold_topLeft">
              <span className="post-description">
                This is my first test for updates div. Just to check whether
                it's working or not.This is my first test for updates div. Just
                to check whether it's working or not. Lorem Ipsum is simply
                dummy text of the printing and typesetting industry. Lorem Ipsum
                has been the industry's standard dummy text ever since the
                1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book.
              </span>
            </div>
          </div>
        </div>
        {/* *******************  cornerFold_bottomLeft post section - starts ******************** */}
        <div className="item">
          <div className="post-n-user-details-container">
            <div className="post-dp-div">
              <Link to="/">
                <img className="post-user-dp" src={kohli} alt="User name" />
              </Link>
            </div>
            <div className="postInfo-n-user-details-div">
              <div className="post-details-div">
                <Link to="/">Manoj Kumar</Link>
              </div>
              <div className="post-timestamp-div openLayerOneModal">
                5th Jan 2017 - 08:51:25 AM
              </div>
            </div>
          </div>
          <div className="post-description-div">
            <div class="cornerFold cornerFold_bottomLeft">
              <span className="post-description">
                This is my first test for updates div. Just to check whether
                it's working or not.This is my first test for updates div. Just
                to check whether it's working or not. Lorem Ipsum is simply
                dummy text of the printing and typesetting industry. Lorem Ipsum
                has been the industry's standard dummy text ever since the
                1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book.
              </span>
            </div>
          </div>
        </div>
        {/* *******************  cornerFold_bottomRight post section - starts ******************** */}
        <div className="item">
          <div className="post-n-user-details-container">
            <div className="post-dp-div">
              <Link to="/">
                <img className="post-user-dp" src={kohli} alt="User name" />
              </Link>
            </div>
            <div className="postInfo-n-user-details-div">
              <div className="post-details-div">
                <Link to="/">Manoj Kumar</Link>
              </div>
              <div className="post-timestamp-div openLayerOneModal">
                5th Jan 2017 - 08:51:25 AM
              </div>
            </div>
          </div>
          <div className="post-description-div">
            <div class="cornerFold cornerFold_bottomRight">
              <span className="post-description">
                This is my first test for updates div. Just to check whether
                it's working or not.This is my first test for updates div. Just
                to check whether it's working or not. Lorem Ipsum is simply
                dummy text of the printing and typesetting industry. Lorem Ipsum
                has been the industry's standard dummy text ever since the
                1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book.
              </span>
            </div>
          </div>
        </div>
        {/* *******************  cornerFold_topRight post section - starts ******************** */}
        <div className="item">
          <div className="post-n-user-details-container">
            <div className="post-dp-div">
              <Link to="/">
                <img className="post-user-dp" src={kohli} alt="User name" />
              </Link>
            </div>
            <div className="postInfo-n-user-details-div">
              <div className="post-details-div">
                <Link to="/">Manoj Kumar</Link>
              </div>
              <div className="post-timestamp-div openLayerOneModal">
                5th Jan 2017 - 08:51:25 AM
              </div>
            </div>
          </div>
          <div className="post-description-div">
            <div class="cornerFold cornerFold_topRight">
              <span className="post-description">
                This is my first test for updates div. Just to check whether
                it's working or not.This is my first test for updates div. Just
                to check whether it's working or not. Lorem Ipsum is simply
                dummy text of the printing and typesetting industry. Lorem Ipsum
                has been the industry's standard dummy text ever since the
                1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book.
              </span>
            </div>
          </div>
        </div>
        {/* *******************  Multiple pictures post section - starts ******************** */}
        <div className="item">
          <div className="post-n-user-details-container">
            <div className="post-dp-div">
              <Link to="/">
                <img className="post-user-dp" src={kohli} alt="User name" />
              </Link>
            </div>
            <div className="postInfo-n-user-details-div">
              <div className="post-details-div">
                <Link to="/">Manoj Kumar</Link>
              </div>
              <div className="post-timestamp-div openLayerOneModal">
                5th Jan 2017 - 08:51:25 AM
              </div>
            </div>
          </div>
          <div className="post-description-div">
            <span className="post-description">
              This is my first test for updates div. Just to check whether it's
              working or not.This is my first test for updates div. Just to
              check whether it's working or not.
            </span>
          </div>
          <div className="post-picture-div">
            <img src={wow1} alt="Post info" />
            <span className="absolute-bottom-right">1 of 5</span>
          </div>
        </div>
        {/* *******************  Multiple pictures post section - ends ******************** */}

        {/* *******************  bgNcolorNdottedBrdrLinesAll post section - starts ******************** */}
        <div className="item">
          <div className="post-n-user-details-container">
            <div className="post-dp-div">
              <Link to="/">
                <img className="post-user-dp" src={kohli} alt="User name" />
              </Link>
            </div>
            <div className="postInfo-n-user-details-div">
              <div className="post-details-div">
                <Link to="/">Manoj Kumar</Link>
              </div>
              <div className="post-timestamp-div openLayerOneModal">
                5th Jan 2017 - 08:51:25 AM
              </div>
            </div>
          </div>
          <div
            className="post-description-div"
            style={{ background: "#006600", color: "#fff" }}
          >
            <div
              className="pad-12-10 dashed border-2px"
              style={{
                borderColor: "yellow",
              }}
            >
              <span className="post-description">
                This is my first test for updates div. Just to check whether
                it's working or not.This is my first test for updates div. Just
                to check whether it's working or not. Lorem Ipsum is simply
                dummy text of the printing and typesetting industry.
              </span>
            </div>
          </div>
        </div>

        {/* *******************  backgroungNcolor post section - starts ******************** */}
        <div className="item">
          <div className="post-n-user-details-container">
            <div className="post-dp-div">
              <Link to="/">
                <img className="post-user-dp" src={kohli} alt="User name" />
              </Link>
            </div>
            <div className="postInfo-n-user-details-div">
              <div className="post-details-div">
                <Link to="/">Manoj Kumar</Link>
              </div>
              <div className="post-timestamp-div openLayerOneModal">
                5th Jan 2017 - 08:51:25 AM
              </div>
            </div>
          </div>
          <div className="post-description-div" style={{ color: "red" }}>
            <span className="post-description">
              This is my first test for updates div. Just to check whether it's
              working or not.This is my first test for updates div. Just to
              check whether it's working or not. Lorem Ipsum is simply dummy
              text of the printing and typesetting industry. Lorem Ipsum has
              been the industry's standard dummy text ever since the 1500s, when
              an unknown printer took a galley of type and scrambled it to make
              a type specimen book. It has survived not only five centuries, but
              also the leap into electronic typesetting, remaining essentially
              unchanged. It was popularised in the 1960s with the release of
              Letraset sheets containing Lorem Ipsum passages, and more recently
              with desktop publishing software like Aldus PageMaker including
              versions of Lorem Ipsum.
            </span>
          </div>
        </div>
        {/* *******************  backgroungNcolor post section - starts ******************** */}
        <div className="item">
          <div className="post-n-user-details-container">
            <div className="post-dp-div">
              <Link to="/">
                <img className="post-user-dp" src={kohli} alt="User name" />
              </Link>
            </div>
            <div className="postInfo-n-user-details-div">
              <div className="post-details-div">
                <Link to="/">Manoj Kumar</Link>
              </div>
              <div className="post-timestamp-div openLayerOneModal">
                5th Jan 2017 - 08:51:25 AM
              </div>
            </div>
          </div>
          <div
            className="post-description-div"
            style={{ background: "#003d99", color: "#fff" }}
          >
            <span className="post-description">
              This is my first test for updates div. Just to check whether it's
              working or not.This is my first test for updates div. Just to
              check whether it's working or not. Lorem Ipsum is simply dummy
              text of the printing and typesetting industry. Lorem Ipsum has
              been the industry's standard dummy text ever since the 1500s, when
              an unknown printer took a galley of type and scrambled it to make
              a type specimen book. It has survived not only five centuries, but
              also the leap into electronic typesetting, remaining essentially
              unchanged. It was popularised in the 1960s with the release of
              Letraset sheets containing Lorem Ipsum passages, and more recently
              with desktop publishing software like Aldus PageMaker including
              versions of Lorem Ipsum.
            </span>
          </div>
        </div>
        {/* *******************  dottedBrdrLinesAll post section - starts ******************** */}
        <div className="item">
          <div className="post-n-user-details-container">
            <div className="post-dp-div">
              <Link to="/">
                <img className="post-user-dp" src={kohli} alt="User name" />
              </Link>
            </div>
            <div className="postInfo-n-user-details-div">
              <div className="post-details-div">
                <Link to="/">Manoj Kumar</Link>
              </div>
              <div className="post-timestamp-div openLayerOneModal">
                5th Jan 2017 - 08:51:25 AM
              </div>
            </div>
          </div>
          <div className="post-description-div">
            <div
              className="pad-12-10 dotted border-3px"
              style={{
                borderColor: "green",
              }}
            >
              <span className="post-description">
                This is my first test for updates div. Just to check whether
                it's working or not.This is my first test for updates div. Just
                to check whether it's working or not. Lorem Ipsum is simply
                dummy text of the printing and typesetting industry.
              </span>
            </div>
          </div>
        </div>
        {/* *******************  dottedBrdrLinesTnB post section - starts ******************** */}
        <div className="item">
          <div className="post-n-user-details-container">
            <div className="post-dp-div">
              <Link to="/">
                <img className="post-user-dp" src={kohli} alt="User name" />
              </Link>
            </div>
            <div className="postInfo-n-user-details-div">
              <div className="post-details-div">
                <Link to="/">Manoj Kumar</Link>
              </div>
              <div className="post-timestamp-div openLayerOneModal">
                5th Jan 2017 - 08:51:25 AM
              </div>
            </div>
          </div>
          <div className="post-description-div">
            <div
              className="pad-12-10 dotted border-3px"
              style={{
                borderColor: "red transparent",
              }}
            >
              <span className="post-description">
                This is my first test for updates div. Just to check whether
                it's working or not.This is my first test for updates div. Just
                to check whether it's working or not. Lorem Ipsum is simply
                dummy text of the printing and typesetting industry.
              </span>
            </div>
          </div>
        </div>
        {/* *******************  dottedBrdrLinesLnR post section - starts ******************** */}
        <div className="item">
          <div className="post-n-user-details-container">
            <div className="post-dp-div">
              <Link to="/">
                <img className="post-user-dp" src={kohli} alt="User name" />
              </Link>
            </div>
            <div className="postInfo-n-user-details-div">
              <div className="post-details-div">
                <Link to="/">Manoj Kumar</Link>
              </div>
              <div className="post-timestamp-div openLayerOneModal">
                5th Jan 2017 - 08:51:25 AM
              </div>
            </div>
          </div>
          <div className="post-description-div">
            <div
              className="pad-12-10 dotted border-3px"
              style={{
                borderColor: "transparent blue",
              }}
            >
              <span className="post-description">
                This is my first test for updates div. Just to check whether
                it's working or not.This is my first test for updates div. Just
                to check whether it's working or not. Lorem Ipsum is simply
                dummy text of the printing and typesetting industry.
              </span>
            </div>
          </div>
        </div>

        {/* *******************  dashedBrdrLinesAll post section - starts ******************** */}
        <div className="item">
          <div className="post-n-user-details-container">
            <div className="post-dp-div">
              <Link to="/">
                <img className="post-user-dp" src={kohli} alt="User name" />
              </Link>
            </div>
            <div className="postInfo-n-user-details-div">
              <div className="post-details-div">
                <Link to="/">Manoj Kumar</Link>
              </div>
              <div className="post-timestamp-div openLayerOneModal">
                5th Jan 2017 - 08:51:25 AM
              </div>
            </div>
          </div>
          <div className="post-description-div">
            <div
              className="pad-12-10 dashed border-3px"
              style={{
                borderColor: "green",
              }}
            >
              <span className="post-description">
                This is my first test for updates div. Just to check whether
                it's working or not.This is my first test for updates div. Just
                to check whether it's working or not. Lorem Ipsum is simply
                dummy text of the printing and typesetting industry.
              </span>
            </div>
          </div>
        </div>
        {/* *******************  dashedBrdrLinesTnB post section - starts ******************** */}
        <div className="item">
          <div className="post-n-user-details-container">
            <div className="post-dp-div">
              <Link to="/">
                <img className="post-user-dp" src={kohli} alt="User name" />
              </Link>
            </div>
            <div className="postInfo-n-user-details-div">
              <div className="post-details-div">
                <Link to="/">Manoj Kumar</Link>
              </div>
              <div className="post-timestamp-div openLayerOneModal">
                5th Jan 2017 - 08:51:25 AM
              </div>
            </div>
          </div>
          <div className="post-description-div">
            <div
              className="pad-12-10 dashed border-3px"
              style={{
                borderColor: "red transparent",
              }}
            >
              <span className="post-description">
                This is my first test for updates div. Just to check whether
                it's working or not.This is my first test for updates div. Just
                to check whether it's working or not. Lorem Ipsum is simply
                dummy text of the printing and typesetting industry.
              </span>
            </div>
          </div>
        </div>
        {/* *******************  dashedBrdrLinesLnR post section - starts ******************** */}
        <div className="item">
          <div className="post-n-user-details-container">
            <div className="post-dp-div">
              <Link to="/">
                <img className="post-user-dp" src={kohli} alt="User name" />
              </Link>
            </div>
            <div className="postInfo-n-user-details-div">
              <div className="post-details-div">
                <Link to="/">Manoj Kumar</Link>
              </div>
              <div className="post-timestamp-div openLayerOneModal">
                5th Jan 2017 - 08:51:25 AM
              </div>
            </div>
          </div>
          <div className="post-description-div">
            <div
              className="pad-12-10 dashed border-3px"
              style={{
                borderColor: "transparent blue",
              }}
            >
              <span className="post-description">
                This is my first test for updates div. Just to check whether
                it's working or not.This is my first test for updates div. Just
                to check whether it's working or not. Lorem Ipsum is simply
                dummy text of the printing and typesetting industry.
              </span>
            </div>
          </div>
        </div>

        {/* *******************  solidBrdrLinesAll post section - starts ******************** */}
        <div className="item">
          <div className="post-n-user-details-container">
            <div className="post-dp-div">
              <Link to="/">
                <img className="post-user-dp" src={kohli} alt="User name" />
              </Link>
            </div>
            <div className="postInfo-n-user-details-div">
              <div className="post-details-div">
                <Link to="/">Manoj Kumar</Link>
              </div>
              <div className="post-timestamp-div openLayerOneModal">
                5th Jan 2017 - 08:51:25 AM
              </div>
            </div>
          </div>
          <div className="post-description-div">
            <div
              className="pad-12-10 solid border-3px"
              style={{
                borderColor: "green",
              }}
            >
              <span className="post-description">
                This is my first test for updates div. Just to check whether
                it's working or not.This is my first test for updates div. Just
                to check whether it's working or not. Lorem Ipsum is simply
                dummy text of the printing and typesetting industry.
              </span>
            </div>
          </div>
        </div>
        {/* *******************  solidBrdrLinesTnB post section - starts ******************** */}
        <div className="item">
          <div className="post-n-user-details-container">
            <div className="post-dp-div">
              <Link to="/">
                <img className="post-user-dp" src={kohli} alt="User name" />
              </Link>
            </div>
            <div className="postInfo-n-user-details-div">
              <div className="post-details-div">
                <Link to="/">Manoj Kumar</Link>
              </div>
              <div className="post-timestamp-div openLayerOneModal">
                5th Jan 2017 - 08:51:25 AM
              </div>
            </div>
          </div>
          <div className="post-description-div">
            <div
              className="pad-12-10 solid border-3px"
              style={{
                borderColor: "red transparent",
              }}
            >
              <span className="post-description">
                This is my first test for updates div. Just to check whether
                it's working or not.This is my first test for updates div. Just
                to check whether it's working or not. Lorem Ipsum is simply
                dummy text of the printing and typesetting industry.
              </span>
            </div>
          </div>
        </div>
        {/* *******************  solidBrdrLinesLnR post section - starts ******************** */}
        <div className="item">
          <div className="post-n-user-details-container">
            <div className="post-dp-div">
              <Link to="/">
                <img className="post-user-dp" src={kohli} alt="User name" />
              </Link>
            </div>
            <div className="postInfo-n-user-details-div">
              <div className="post-details-div">
                <Link to="/">Manoj Kumar</Link>
              </div>
              <div className="post-timestamp-div openLayerOneModal">
                5th Jan 2017 - 08:51:25 AM
              </div>
            </div>
          </div>
          <div className="post-description-div">
            <div
              className="pad-12-10 solid border-3px"
              style={{
                borderColor: "transparent blue",
              }}
            >
              <span className="post-description">
                This is my first test for updates div. Just to check whether
                it's working or not.This is my first test for updates div. Just
                to check whether it's working or not. Lorem Ipsum is simply
                dummy text of the printing and typesetting industry.
              </span>
            </div>
          </div>
        </div>

        {/* *******************  doubleBrdrLinesAll post section - starts ******************** */}
        <div className="item">
          <div className="post-n-user-details-container">
            <div className="post-dp-div">
              <Link to="/">
                <img className="post-user-dp" src={kohli} alt="User name" />
              </Link>
            </div>
            <div className="postInfo-n-user-details-div">
              <div className="post-details-div">
                <Link to="/">Manoj Kumar</Link>
              </div>
              <div className="post-timestamp-div openLayerOneModal">
                5th Jan 2017 - 08:51:25 AM
              </div>
            </div>
          </div>
          <div className="post-description-div">
            <div
              className="pad-12-10 double border-3px"
              style={{
                borderColor: "green",
              }}
            >
              <span className="post-description">
                This is my first test for updates div. Just to check whether
                it's working or not.This is my first test for updates div. Just
                to check whether it's working or not. Lorem Ipsum is simply
                dummy text of the printing and typesetting industry.
              </span>
            </div>
          </div>
        </div>
        {/* *******************  doubleBrdrLinesTnB post section - starts ******************** */}
        <div className="item">
          <div className="post-n-user-details-container">
            <div className="post-dp-div">
              <Link to="/">
                <img className="post-user-dp" src={kohli} alt="User name" />
              </Link>
            </div>
            <div className="postInfo-n-user-details-div">
              <div className="post-details-div">
                <Link to="/">Manoj Kumar</Link>
              </div>
              <div className="post-timestamp-div openLayerOneModal">
                5th Jan 2017 - 08:51:25 AM
              </div>
            </div>
          </div>
          <div className="post-description-div">
            <div
              className="pad-12-10 double border-3px"
              style={{
                borderColor: "red transparent",
              }}
            >
              <span className="post-description">
                This is my first test for updates div. Just to check whether
                it's working or not.This is my first test for updates div. Just
                to check whether it's working or not. Lorem Ipsum is simply
                dummy text of the printing and typesetting industry.
              </span>
            </div>
          </div>
        </div>
        {/* *******************  doubleBrdrLinesLnR post section - starts ******************** */}
        <div className="item">
          <div className="post-n-user-details-container">
            <div className="post-dp-div">
              <Link to="/">
                <img className="post-user-dp" src={kohli} alt="User name" />
              </Link>
            </div>
            <div className="postInfo-n-user-details-div">
              <div className="post-details-div">
                <Link to="/">Manoj Kumar</Link>
              </div>
              <div className="post-timestamp-div openLayerOneModal">
                5th Jan 2017 - 08:51:25 AM
              </div>
            </div>
          </div>
          <div className="post-description-div">
            <div
              className="pad-12-10 double border-3px"
              style={{
                borderColor: "transparent blue",
              }}
            >
              <span className="post-description">
                This is my first test for updates div. Just to check whether
                it's working or not.This is my first test for updates div. Just
                to check whether it's working or not. Lorem Ipsum is simply
                dummy text of the printing and typesetting industry.
              </span>
            </div>
          </div>
        </div>
        {/* *******************  Normal post section - starts ******************** */}
        <div className="item">
          <div className="post-n-user-details-container">
            <div className="post-dp-div">
              <Link to="/">
                <img className="post-user-dp" src={kohli} alt="User name" />
              </Link>
            </div>
            <div className="postInfo-n-user-details-div">
              <div className="post-details-div">
                <Link to="/">Manoj Kumar</Link>
              </div>
              <div className="post-timestamp-div openLayerOneModal">
                5th Jan 2017 - 08:51:25 AM
              </div>
            </div>
          </div>
          <div className="post-description-div">
            <span className="post-description">
              This is my first test for updates div. Just to check whether it's
              working or not.This is my first test for updates div. Just to
              check whether it's working or not. Lorem Ipsum is simply dummy
              text of the printing and typesetting industry. Lorem Ipsum has
              been the industry's standard dummy text ever since the 1500s, when
              an unknown printer took a galley of type and scrambled it to make
              a type specimen book. It has survived not only five centuries, but
              also the leap into electronic typesetting, remaining essentially
              unchanged. It was popularised in the 1960s with the release of
              Letraset sheets containing Lorem Ipsum passages, and more recently
              with desktop publishing software like Aldus PageMaker including
              versions of Lorem Ipsum.
            </span>
          </div>
        </div>
        {/* *******************  Single picture posts section - starts ******************** */}
        <div className="item">
          <div className="post-n-user-details-container">
            <div className="post-dp-div">
              <Link to="/">
                <img className="post-user-dp" src={kohli} alt="User name" />
              </Link>
            </div>
            <div className="postInfo-n-user-details-div">
              <div className="post-details-div">
                <Link to="/">Manoj Kumar</Link>
              </div>
              <div className="post-timestamp-div openLayerOneModal">
                5th Jan 2017 - 08:51:25 AM
              </div>
            </div>
          </div>
          <div className="post-description-div">
            <span className="post-description">
              This is my first test for updates div. Just to check whether it's
              working or not.This is my first test for updates div. Just to
              check whether it's working or not.
            </span>
          </div>
          <div className="post-picture-div">
            <img src={wow1} alt="Post info" />
          </div>
        </div>
        {/* *******************  Single picture posts section - ends ******************** */}

        {/* *******************  Single picture posts section - starts ******************** */}
        <div className="item">
          <div className="post-n-user-details-container">
            <div className="post-dp-div">
              <Link to="/">
                <img className="post-user-dp" src={kohli} alt="User name" />
              </Link>
            </div>
            <div className="postInfo-n-user-details-div">
              <div className="post-details-div">
                <Link to="/">Manoj Kumar</Link>
              </div>
              <div className="post-timestamp-div openLayerOneModal">
                5th Jan 2017 - 08:51:25 AM
              </div>
            </div>
          </div>
          <div className="post-description-div">
            <span className="post-description">
              This is my first test for updates div. Just to check whether it's
              working or not.This is my first test for updates div. Just to
              check whether it's working or not.
            </span>
          </div>
          <div className="post-picture-div">
            <img src={wow2} alt="Post info" />
          </div>
        </div>
        {/* *******************  Single picture posts section - ends ******************** */}

        {/* *******************  Single picture posts section - starts ******************** */}
        <div className="item">
          <div className="post-n-user-details-container">
            <div className="post-dp-div">
              <Link to="/">
                <img className="post-user-dp" src={kohli} alt="User name" />
              </Link>
            </div>
            <div className="postInfo-n-user-details-div">
              <div className="post-details-div">
                <Link to="/">Manoj Kumar</Link>
              </div>
              <div className="post-timestamp-div openLayerOneModal">
                5th Jan 2017 - 08:51:25 AM
              </div>
            </div>
          </div>
          <div className="post-description-div">
            <span className="post-description">
              This is my first test for updates div. Just to check whether it's
              working or not.This is my first test for updates div. Just to
              check whether it's working or not.
            </span>
          </div>
          <div className="post-picture-div">
            <img src={bikee} alt="Post info" />
          </div>
        </div>
        {/* *******************  Single picture posts section - ends ******************** */}
      </div>
    </div>
  );
};

export default MiddleSection;
