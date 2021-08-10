import React, { useState, useEffect } from "react";
import "./rightSideSection.css";
import { Link } from "react-router-dom";
// Import images
import kohli from "./../../images/kohli.jpg";
import zuck from "./../../images/zuck.jpg";

// Import Layouts
import AdBanner from "./../AdBanner/AdBanner";
import FriendSuggessions from "./../FriendSuggessions/FriendSuggessions";

const RightSideSection = () => {
  const [showAdBanner, setShowAdBanner] = useState(false);
  const [suggestUsers, setSuggestUsers] = useState([
    {
      id: 31,
      status: "none",
      name: "Manoj Kumar",
      isRequesting: false,
      isRequested: false,
    },
    {
      id: 32,
      status: "none",
      name: "Mahesh Kumar",
      isRequesting: false,
      isRequested: false,
    },
    {
      id: 33,
      status: "none",
      name: "Kranthi Kumar",
      isRequesting: false,
      isRequested: false,
    },
    // {
    //   id: 34,
    //   status: "none",
    //   name: "Mallesh Kumar",
    //   isRequesting: false,
    //   isRequested: false,
    // },
    // {
    //   id: 35,
    //   status: "none",
    //   name: "Rammy",
    //   isRequesting: false,
    //   isRequested: false,
    // },
  ]);

  useEffect(() => {
    setShowAdBanner(false);
    // console.log("props.bgColor -> " + props.brdrColor);
  }, [showAdBanner]);

  const sendRequest = (friendId) => {
    console.log("friendId -> " + friendId);

    let mapper = suggestUsers.map((friend) => {
      if (friend.id === friendId) {
        return { ...friend, isRequesting: true };
      } else {
        return friend;
      }
    });

    setSuggestUsers(mapper);

    setTimeout(() => {
      let mapper = suggestUsers.map((friend) => {
        if (friend.id === friendId) {
          return { ...friend, isRequesting: false, isRequested: true };
        } else {
          return friend;
        }
      });
      setSuggestUsers(mapper);
    }, 3000);
  };
  return (
    <div className="right-side-fixed-container">
      {showAdBanner && (
        <div className="ad-banner-container">
          <AdBanner />
        </div>
      )}

      {/* {!showAdBanner && <FriendSuggessions />} */}

      {!showAdBanner && (
        <div className="friends-suggessions-container">
          <div className="friends-suggessions-title-container">
            <div className="friends-suggessions-title">Friend suggessions</div>
            <Link
              to="/"
              className="friends-suggessions-seeAll highlight-a-tag-on-hover"
            >
              See All
            </Link>
          </div>

          {suggestUsers &&
            suggestUsers.length > 0 &&
            suggestUsers.map((user) => (
              <div className="individual-suggest-container" key={user.id}>
                <div className="individual-suggest-user-details-container">
                  <div className="individual-suggest-user-dps-container">
                    <Link
                      to="/"
                      className="individual-suggest-user-dp-primary-a"
                    >
                      <img
                        className="individual-suggest-user-dp individual-suggest-user-dp-primary"
                        src={zuck}
                        alt="avatar"
                      />
                    </Link>
                    <Link to="/">
                      <img
                        className="individual-suggest-user-dp individual-suggest-user-dp-secondary"
                        src={kohli}
                        alt="avatar"
                      />
                    </Link>
                  </div>
                  <div className="postInfo-n-user-details-div">
                    <div className="post-details-div individual-suggest-div">
                      <Link to={"/profile"}>{user.name}</Link>
                    </div>
                  </div>
                  {/* <span className="individual-suggest-user-vr-dots"></span> */}
                </div>

                {user.status === "none" &&
                  !user.isRequesting &&
                  !user.isRequested && (
                    <div className="individual-suggest-button-container">
                      <button
                        className="individual-suggest-button"
                        onClick={() => sendRequest(user.id)}
                      >
                        +Add Friend
                      </button>
                    </div>
                  )}
                {user.status === "none" && user.isRequesting && (
                  <div className="action-items-dropdown">
                    <button
                      className="individual-suggest-button disable-button"
                      disabled={true}
                    >
                      Sending Request...
                    </button>
                  </div>
                )}
                {user.status === "none" && user.isRequested && (
                  <div className="action-items-dropdown">
                    <button
                      className="individual-suggest-button accepted-button"
                      disabled={true}
                    >
                      Request Sent
                    </button>
                  </div>
                )}
              </div>
            ))}
        </div>
      )}

      <div className="right-section-footer">All rights reserved @ Mightyyy</div>
    </div>
  );
};

export default RightSideSection;
