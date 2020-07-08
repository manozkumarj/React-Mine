import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import "./search.css";
import RightSideSection from "./../../layouts/rightSideSection/RightSideSection";
import LeftSideSection from "./../../layouts/leftSideSection/LeftSideSection";
import { connect } from "react-redux";
import { searchUsers } from "./../../../redux/actionCreators";
import defaultAvatar from "../../../images/avatar.png";

const Search = (props) => {
  const [imagesUrl, setImagesUrl] = useState("http://localhost:8088/photo/");
  const [isSearching, setIsSearching] = useState(true);
  const [path, setPath] = useState(props.match.path);
  const [loggedInUserFriends, setLoggedInUserFriends] = useState(
    props.centralState.loggedInUserFriends
  );

  const [usersList, setUsersList] = useState(null);
  // const [searchWord, setSearchWord] = useState(null);

  console.log("Path is -> " + path);

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log("props are below");
    console.log(props);
    if (path === "/search/:word?") {
      console.log("This is search path");
      if (props.centralState.searchResults) {
        setUsersList(props.centralState.searchResults);
        if (props.match.params.word) {
          let searchWord = props.match.params.word;
          console.log(`Current searched word is -> ${searchWord}`);
          props.searchUsers(searchWord);
        }
        setIsSearching(false);
      }
    } else if (path === "/sent-requests") {
      console.log("This is sent-requests path");
      let friends = props.centralState.loggedInUserFriends;
      if (friends && friends.length > 0) {
        let sentRequests = friends.filter((friend) => friend.status === "sent");
        setUsersList(sentRequests);
        setIsSearching(false);
      }
    } else if (path === "/friend-requests") {
      console.log("This is friend-requests path");
      let friends = props.centralState.loggedInUserFriends;
      if (friends && friends.length > 0) {
        let requests = friends.filter((friend) => friend.status === "pending");
        setUsersList(requests);
        setIsSearching(false);
      }
    }

    console.log(usersList);
    setImagesUrl("http://localhost:8088/photo/");
    // setSearchWord(searchWord);
  }, [props.match.path]);

  useEffect(() => {
    setPath(props.match.path);
  }, [props.match]);

  return (
    <div className="three-divs-container" id="main">
      <div className="left-and-middle-divs-container">
        <div className="left-section">
          <LeftSideSection />
        </div>

        <div className="middle-section">
          <div className="friends-container">
            <div className="friends-container-header">
              {path === "/search/:word?"
                ? "Search Results"
                : path === "/sent-requests"
                ? "Sent Requests"
                : "Friend Requests"}
            </div>
            <div className="friends">
              {!isSearching &&
                usersList &&
                usersList.map((user) => {
                  let userPrimaryDp = user.friendId.primaryDp
                    ? imagesUrl + user.friendId.primaryDp
                    : defaultAvatar;
                  return (
                    <div
                      className="individual-friend-div"
                      id="individual-friend-div"
                      key={user._id}
                    >
                      <div className="friend-name">
                        <Link
                          to={"/" + user.friendId.username}
                          className="global-aTag-style"
                        >
                          <img
                            src={userPrimaryDp}
                            className="search_result_user_dp"
                            alt="Username"
                          />
                        </Link>
                        <Link
                          to={"/" + user.friendId.username}
                          className="global-aTag-style"
                        >
                          {user.friendId.fullName}
                        </Link>
                      </div>
                      <div className="friendship-status-div">
                        <div
                          className="friends-list-individual request-friendshp-btn"
                          id="1"
                        >
                          Friends
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>

      <div className="right-section">
        <RightSideSection />
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
    searchUsers: (searchWord) => dispatch(searchUsers(searchWord)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));
