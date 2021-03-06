import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
  // const [searchWord, setSearchWord] = useState(null);
  useEffect(() => {
    window.scrollTo(0, 0);
    console.log("props are below");
    console.log(props);
    let searchWord = props.match.params.word;
    console.log(`Current searched word is -> ${searchWord}`);
    props.searchUsers(searchWord);
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

  return (
    <div className="three-divs-container" id="main">
      <div className="left-and-middle-divs-container">
        <div className="left-section">
          <LeftSideSection />
        </div>

        <div className="middle-section">
          <div className="friends-container">
            <div className="friends-container-header">Search Results</div>
            <div className="friends">
              {isSearching && <div>Loading...</div>}
              {!isSearching &&
                searchResults &&
                searchResults.map((user) => {
                  let userPrimaryDp = user.friendId.primaryDp
                    ? imagesUrl + user.friendId.primaryDp
                    : defaultAvatar;
                  return (
                    <div
                      className="individual-friend-div"
                      id="individual-friend-div"
                      key={user.friendId._id}
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

export default connect(mapStateToProps, mapDispatchToProps)(Search);
