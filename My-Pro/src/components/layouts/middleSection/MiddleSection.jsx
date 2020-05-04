import React, { useState, useRef, useEffect } from "react";
import "./middleSection.css";
import { Link } from "react-router-dom";
import zuck from "../../../images/zuck.jpg";
import mark from "../../../images/mark.jpg";

import kohli from "../../../images/kohli.jpg";
import bikee from "../../../images/bikee.jpg";
import wow1 from "../../../images/wow_1.jpg";
import whitecam from "../../../icons/whitecam.png";

import wow2 from "../../../images/wow_2.jpg";

import loveHeartsEyesEmoji from "../../../emojis/love-hearts-eyes-emoji-50.png";
import likeThumbEmoji from "../../../emojis/like-thumb-emoji-50.png";

const MiddleSection = () => {
  const $ = window.$;

  const maxFileSize = 1048576 * 5;
  console.log("maxFileSize --> " + maxFileSize);

  const filesPickerRef = useRef();

  const pickImagesHandler = () => {
    filesPickerRef.current.click();
    $("#previewer").html("");
  };

  const fileChangeHandler = (event) => {
    console.log(event.target.files);
    console.log(event.target.files[0]);
    let selectedFiles = event.target.files;
    let selectedFilesLength = event.target.files.length;

    if (selectedFilesLength > 10) {
      alert("You can upload maximum of 10 images");
      return false;
    }

    let isFileSizeExceededLimit = false;

    for (let i = 0; i < selectedFilesLength; i++) {
      // console.log(selectedFiles[i]["name"]);
      let fileSize = selectedFiles[i]["size"];
      console.log("fileSize --> " + fileSize);
      if (fileSize > maxFileSize) {
        isFileSizeExceededLimit = true;
      }
    }

    if (isFileSizeExceededLimit) {
      console.log("One of selected files size is more than 5 MB");
      alert("One of selected files size is more than 5 MB");
      return false;
    }

    var files = event.target.files,
      filesLength = files.length;
    if (filesLength < 11) {
      var image_holder = $("#previewer");
      image_holder.html("");
      for (var i = 0; i < filesLength; i++) {
        var f = files[i];
        var fileReader = new FileReader();
        fileReader.onload = function (e) {
          var file = e.target;
          $(
            '<div class="thumbimage">' +
              '<div class=\'thumbin\'><img class="imageThumb" src="' +
              e.target.result +
              '" /></div>' +
              "<br/>" +
              "</div>"
          ).appendTo(image_holder);
          $(".popPic1").hide();
        };
        fileReader.readAsDataURL(f);
      }
    } else {
      alert("You can upload maximum of 10 images");
    }
  };

  return (
    <div id="middle-div">
      <div className="post-menu-section">
        <div className="post-textarea">
          <textarea
            className="textarea textarea-auto-height"
            name="text"
            placeholder="write something..."
            spellCheck="false"
          ></textarea>
        </div>
        <div id="previewer"></div>
        <div className="post-actions-div">
          <input
            type="file"
            id="imageupload"
            style={{ display: "none" }}
            accept=".png, .jpg, .jpeg"
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
            <span>Manoj Kumar</span>
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
                <span class="post-vr-dots"></span>
              </div>
              <div className="post-timestamp-div openLayerOneModal">
                5th Jan 2017 - 08:51:25 AM
              </div>
            </div>
          </div>
          <div className="post-description-div">
            <div className="cornerFold cornerFoldStyle cornerFold_topRight_bottomLeft remove_cornerShadow">
              <span className="post-description">
                This is my first test for updates div. Just to check whether
                it's working or not.This is my first test for updates div. Just
                to check whether it's working or not.
              </span>
            </div>
          </div>
          <div className="post-actions-counter-container">
            <div className="reactions-couter couter-item hover-ul">
              <div className="reactions-couter-emojis">
                <img
                  src={loveHeartsEyesEmoji}
                  alt="loveHeartsEyesEmoji"
                  width="20px"
                  className="reaction-emoji"
                />
                <img
                  src={likeThumbEmoji}
                  alt="likeThumbEmoji"
                  width="20px"
                  className="reaction-emoji"
                />
              </div>
              <div className="reactions-count"> 250 reactions</div>
            </div>
            <div className="cmnts-and-shares-counter couter-item">
              <span className="comments-counter hover-ul">50 comments</span>
              <span className="shares-counter hover-ul">20 shares</span>
            </div>
          </div>
          <div className="post-actions-container">
            <span className="action-item hover-ul">Like</span>
            <span className="action-item hover-ul">Comment</span>
            <span className="action-item hover-ul">Share</span>
          </div>
          <div className="comment-input-container">
            <input
              type="text"
              className="comment-box"
              placeholder="Type and press enter to comment..."
            />
          </div>

          <div className="post-comments-container">
            <div className="post-individual-comment-container">
              <div className="post-dp-div">
                <Link to="/">
                  <img
                    className="post-comment-user-dp"
                    src={mark}
                    alt="User name"
                  />
                </Link>
              </div>
              <div className="post-comment-info-n-user-details-div">
                <div className="post-comment-user-div">
                  <Link to="/">Manoj Kumar</Link>
                  <span class="comment-vr-dots"></span>
                </div>
                <div className="post-comment">
                  This is my first test for updates div. Just to check whether
                  it's working or not.This is my first test for updates div.
                  Just to check whether it's working or not.
                </div>
              </div>
            </div>
          </div>

          <div className="post-individual-comment-container">
            <div className="post-dp-div">
              <Link to="/">
                <img
                  className="post-comment-user-dp"
                  src={kohli}
                  alt="User name"
                />
              </Link>
            </div>
            <div className="post-comment-info-n-user-details-div">
              <div className="post-comment-user-div">
                <Link to="/">Manoj Kumar</Link>
                <span class="comment-vr-dots"></span>
              </div>
              <div className="post-comment">
                This is my first test for updates div. Just to check whether
                it's working or not.This is my first test for updates div. Just
                to check whether it's working or not.
              </div>
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
            <div className="cornerFold cornerFoldStyle cornerFold_topLeft_bottomRight remove_cornerShadow">
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
        {/* ***************  cornerFold_topLeft remove_cornerShadow post section - starts ***************** */}
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
            <div className="cornerFold cornerFoldStyle cornerFold_topLeft remove_cornerShadow">
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
        {/* ****************  cornerFold_bottomLeft remove_cornerShadow post section - starts **************** */}
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
            <div className="cornerFold cornerFoldStyle cornerFold_bottomLeft remove_cornerShadow">
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
        {/* *************  cornerFold_bottomRight remove_cornerShadow post section - starts ************** */}
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
            <div className="cornerFold cornerFoldStyle cornerFold_bottomRight remove_cornerShadow">
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
        {/* ********  cornerFold_topRight remove_cornerShadow post section - starts ************ */}
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
            <div className="cornerFold cornerFoldStyle cornerFold_topRight remove_cornerShadow">
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
        {/* ******************  cornerFold_topLeft_bottomRight post section - starts ******************** */}
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
            <div className="cornerFold cornerFoldStyle cornerFold_topLeft_bottomRight">
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
            <div className="cornerFold cornerFoldStyle cornerFold_topRight_bottomLeft">
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
            <div className="cornerFold cornerFoldStyle cornerFold_topLeft">
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
            <div className="cornerFold cornerFoldStyle cornerFold_bottomLeft">
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
            <div className="cornerFold cornerFoldStyle cornerFold_bottomRight">
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
            <div className="cornerFold cornerFoldStyle cornerFold_topRight">
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
