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
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [path, setPath] = useState(props.match.path);
  // const [searchWord, setSearchWord] = useState(null);

  console.log("Path is -> " + path);

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log("props are below");
    console.log(props);
    if (path === "/search/:word?" && props.match.params.word) {
      let searchWord = props.match.params.word;
      console.log(`Current searched word is -> ${searchWord}`);
      props.searchUsers(searchWord);
    }
    setImagesUrl("http://localhost:8088/photo/");
    // setSearchWord(searchWord);
  }, []);

  useEffect(() => {
    if (props.centralState.searchResults) {
      setSearchResults(props.centralState.searchResults);
      setIsSearching(false);
    }
    console.log(props);
  }, [props]);

  useEffect(() => {
    setPath(props.match.path);
  }, [props.match]);

  return (
    <div className="three-divs-container" id="main">
      <div className="left-and-middle-divs-container">
        <div className="left-section">
          <LeftSideSection />
        </div>

        {path && path === "/search/:word?" && (
          <div className="middle-section">
            <div className="friends-container">
              <div className="friends-container-header">Search Results</div>
              <div className="friends">
                {!isSearching &&
                  searchResults &&
                  searchResults.map((user) => {
                    let userPrimaryDp = user.primaryDp
                      ? imagesUrl + user.primaryDp
                      : defaultAvatar;
                    return (
                      <div
                        className="individual-friend-div"
                        id="individual-friend-div"
                        key={user._id}
                      >
                        <div className="friend-name">
                          <Link
                            to={"/" + user.username}
                            className="global-aTag-style"
                          >
                            <img
                              src={userPrimaryDp}
                              className="search_result_user_dp"
                              alt="Username"
                            />
                          </Link>
                          <Link
                            to={"/" + user.username}
                            className="global-aTag-style"
                          >
                            {user.fullName}
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
        )}

        {path && path === "/sent-requests" && (
          <div className="middle-section">
            <div className="friends-container">
              <div className="friends-container-header">Sent Requests</div>
            </div>
          </div>
        )}

        {path && path === "/friend-requests" && (
          <div className="middle-section">
            <div className="friends-container">
              <div className="friends-container-header">Friend Requests</div>
            </div>
          </div>
        )}
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
