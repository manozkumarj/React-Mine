import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./navbar.css";
import kohli from "../../../images/kohli.jpg";
// import zuck from "../../../images/zuck.jpg";
// import mark from "../../../images/mark.jpg";
import defaultAvatar from "../../../images/avatar.png";
import { connect } from "react-redux";
import { removeToken } from "./../../../redux/actions/authActions";
import { searchUsers } from "./../../../redux/actionCreators";

const Navbar = (props) => {
  const [imagesUrl, setImagesUrl] = useState("http://localhost:8088/photo/");
  const [userPrimaryDp, setUserPrimaryDp] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  useEffect(() => {
    setImagesUrl("http://localhost:8088/photo/");
    if (props.centralState.authToken) {
      setUserPrimaryDp(
        props.centralState.loggedInUserDetails.primaryDp
          ? imagesUrl + props.centralState.loggedInUserDetails.primaryDp
          : defaultAvatar
      );

      if (props.centralState.searchResults) {
        setSearchResults(props.centralState.searchResults);
        setIsSearching(false);
      }
    }
    // console.log(props);
  }, [props]);

  const { open } = props;
  const history = useHistory();

  const handleLogout = () => {
    // console.log("handleLogout triggered");
    props.logout();
    history.push(`/login`);
  };

  const keyPress = (e) => {
    let searchWord = e.target.value.trim();
    if (searchWord) {
      setIsSearching(true);
      props.searchUsers(searchWord);
    } else {
      setIsSearching(false);
    }
  };

  const loggedInMenu = props.centralState.authToken && (
    <div className="navbar-container">
      <nav className="nav-bar" id="nav-bar">
        <div className="main-container">
          <div className="navbar-left-and-middle-divs-container">
            <div className="navbar-left-items-container">
              <div onClick={open} className="nav-icon">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className="nav-logo">
                <Link to="/">Logo</Link>
              </div>
            </div>
            <div className="navbar-middle-items-container">
              <input
                type="text"
                id="navbar-searchInput"
                placeholder="Search for people"
                spellCheck="false"
                autoComplete="off"
                onKeyDown={keyPress}
              />

              <div id="search_results_container">
                <div id="search_results_div">
                  {isSearching && (
                    <div className="searchLoading">Searching...</div>
                  )}

                  {!isSearching && searchResults && (
                    <div>
                      <ul>
                        {searchResults &&
                          searchResults.map((user) => {
                            let userPrimaryDp = user.primaryDp
                              ? imagesUrl + user.primaryDp
                              : defaultAvatar;
                            return (
                              // <li key={user._id}>
                              <Link to={"/" + user.username} key={user._id}>
                                <img
                                  src={userPrimaryDp}
                                  className="search_result_user_dp"
                                  alt="Username"
                                />
                                <span className="search_result_user_name">
                                  {user.fullName}
                                </span>
                              </Link>
                              // </li>
                            );
                          })}
                      </ul>
                      <ul className="search-more-container">
                        <li>
                          <Link to="/search/word">
                            <span className="search_result_user_name">
                              See more results for -
                              <span className="search-word">Manoj Kumar J</span>
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="navbar-right-items-container">
            <div className="navbar-dp-n-name-container">
              <img
                className="navbar-right-item navbar-current-user-dp"
                src={userPrimaryDp}
                id="navbar-dp-n-name-container"
                alt={props.centralState.loggedInUserDetails.fullName}
              />
              <span
                className="navbar-right-item navbar-current-user-name"
                id="navbar-dp-n-name-container"
              >
                {props.centralState.loggedInUserDetails.fullName}
              </span>
              <span
                className="triangle-down"
                id="navbar-dp-n-name-container"
              ></span>
            </div>
            <div className="navbar-rightside-dropdown-container">
              <div id="navbar-rightside-dropdown-div">
                <ul id="navbar-rightside-dropdown-ul">
                  <li>Profile</li>
                  <li>Settings</li>
                  <li>Advanced posts</li>
                  <li>Photos</li>
                  <li>Friends</li>
                  <li onClick={handleLogout}>Logout</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );

  const normalMenu = (
    <div className="navbar-container">
      <nav className="nav-bar" id="nav-bar">
        <div className="main-container">
          <div className="navbar-left-and-middle-divs-container">
            <div className="navbar-left-items-container">
              <div onClick={open} className="nav-icon">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className="nav-logo">
                <Link to="/">Logo</Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );

  return props.centralState.authToken ? loggedInMenu : normalMenu;
};

const mapStateToProps = (state) => {
  return {
    centralState: state.central,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(removeToken()),
    searchUsers: (searchWord) => dispatch(searchUsers(searchWord)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
