import React from "react";
import "./middleSection.css";
// import zuck from "../../../images/zuck.jpg";
// import mark from "../../../images/mark.jpg";

import kohli from "../../../images/kohli.jpg";
import bikee from "../../../images/bikee.jpg";
import wow1 from "../../../images/wow_1.jpg";
import wow2 from "../../../images/wow_2.jpg";

const MiddleSection = () => {
  return (
    <div id="middle-div">
      <div className="post-menu-section">
        <div className="post-textarea">
          <textarea
            className="textarea"
            name="text"
            placeholder="write something..."
            spellcheck="false"
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

            <button class="post-button">Post</button>
          </div>
        </div>
      </div>

      {/* *******************  Welcome section ******************** */}
      <div className="item">
        <div className="greet-div">
          <div className="greet">Welcome</div>
          <div className="greet-name">Manoj Kumar</div>
        </div>
      </div>

      {/* *******************  All posts section ******************** */}
      <div className="all-posts-container">
        {/* *******************  Normal post section - starts ******************** */}
        <div className="item">
          <div className="post-n-user-details-container">
            <div className="post-dp-div">
              <a href="#">
                <img className="post-user-dp" src={kohli} alt="User name" />
              </a>
            </div>
            <div className="postInfo-n-user-details-div">
              <div className="post-details-div">
                <a href="#">Manoj Kumar</a>
              </div>
              <div className="post-timestamp-div">
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
              <a href="#">
                <img className="post-user-dp" src={kohli} alt="User name" />
              </a>
            </div>
            <div className="postInfo-n-user-details-div">
              <div className="post-details-div">
                <a href="#">Manoj Kumar</a>
              </div>
              <div className="post-timestamp-div">
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
              <a href="#">
                <img className="post-user-dp" src={kohli} alt="User name" />
              </a>
            </div>
            <div className="postInfo-n-user-details-div">
              <div className="post-details-div">
                <a href="#">Manoj Kumar</a>
              </div>
              <div className="post-timestamp-div">
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
              <a href="#">
                <img className="post-user-dp" src={kohli} alt="User name" />
              </a>
            </div>
            <div className="postInfo-n-user-details-div">
              <div className="post-details-div">
                <a href="#">Manoj Kumar</a>
              </div>
              <div className="post-timestamp-div">
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
