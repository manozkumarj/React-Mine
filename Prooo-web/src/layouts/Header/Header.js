import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import { useDispatch, useSelector } from "react-redux";

import { removeToken } from "../../redux/actionCreators";

import BackDrop from "../BackDrop/BackDrop";
import SideNavBar from "../SideNavbar/SideNavbar";

// Import images
import defaultAvatar from "./../../images/avatar.png";
import kohli from "./../../images/kohli.jpg";
import zuck from "./../../images/zuck.jpg";

import { serverPhotoUrl } from "./../../helpers/helpers";

const Header = () => {
  const [openSideNavbar, setOpenSideNavbar] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [authUserFullName, setAuthUserFullName] = useState(null);
  const [authUserPrimaryDp, setAuthUserPrimaryDp] = useState(null);
  const [authUserSecondaryDp, setAuthUserSecondaryDp] = useState(null);
  const [authUserUsername, setAuthUserUsername] = useState(null);
  const [searchResults, setSearchResults] = useState([
    {
      _id: 1,
      username: "profile",
      fullName: "Manoj Kumar",
      primaryDp: kohli,
      secondaryDp: zuck,
    },
    {
      _id: 2,
      username: "profile",
      fullName: "Mahesh Kumar",
      primaryDp: kohli,
      secondaryDp: zuck,
    },
    {
      _id: 3,
      username: "profile",
      fullName: "Mallesh Kumar",
      primaryDp: kohli,
      secondaryDp: zuck,
    },
    {
      _id: 4,
      username: "profile",
      fullName: "Kranthi Kumar",
      primaryDp: kohli,
      secondaryDp: zuck,
    },
    {
      _id: 5,
      username: "profile",
      fullName: "Rammy Kumar",
      primaryDp: kohli,
      secondaryDp: zuck,
    },
  ]);

  const dispatch = useDispatch();
  const authDetails = useSelector((state) => state.auth);
  const authToken = useSelector((state) => state.auth.authToken);

  useEffect(() => {
    setIsSearching(false);
    if (authToken) {
      let getPrimaryDp = authDetails.authUserDetails.primaryDp;
      if (getPrimaryDp) {
        setAuthUserPrimaryDp(serverPhotoUrl + getPrimaryDp);
      } else {
        setAuthUserPrimaryDp(defaultAvatar);
      }

      let getSecondaryDp = authDetails.authUserDetails.secondaryDp;
      if (getSecondaryDp) {
        setAuthUserSecondaryDp(serverPhotoUrl + getSecondaryDp);
      } else {
        setAuthUserSecondaryDp(defaultAvatar);
      }
      setAuthUserFullName(authDetails.authUserDetails.fullName);
      setAuthUserUsername(authDetails.authUserDetails.username);
    }
  }, [authDetails]);

  const openSearchResultsContainer = () => {
    closeOptionsContainer();
    let searchResultsContainer = document.getElementById(
      "search_results_container"
    );
    if (!searchResultsContainer.classList.contains("show")) {
      searchResultsContainer.classList.add("show");
    }
  };

  const closeSarchResultsContainer = () => {
    let searchResultsContainer = document.getElementById(
      "search_results_container"
    );
    searchResultsContainer.classList.remove("show");
  };

  const openOptionsContainer = () => {
    closeSarchResultsContainer();
    let optionsContainer = document.getElementById(
      "navbar-rightside-dropdown-container"
    );
    if (!optionsContainer.classList.contains("show")) {
      optionsContainer.classList.add("show");
    }
  };

  const closeOptionsContainer = () => {
    let optionsContainer = document.getElementById(
      "navbar-rightside-dropdown-container"
    );
    optionsContainer.classList.remove("show");
  };

  const logout = async () => {
    try {
      let response = await dispatch(removeToken());
      console.log("logout success");
      console.log(response);
    } catch (e) {
      console.error("logout failed");
    }
  };

  const openSideNav = () => {
    setOpenSideNavbar(!openSideNavbar);
  };

  return (
    <Fragment>
      <div className="header-container">
        {!authToken && (
          <div className="header-flex">
            <div className="header-item app-title">
              <Link to="/">Mightyyy</Link>
            </div>
            {/* <div className="header-item header-buttons">
              <button className="header-button pointer" onClick={toggleAuth}>
                Toggle Auth
              </button>
              <button className="header-button pointer">
              Register new Account
            </button>
            </div> */}
          </div>
        )}

        {authToken && (
          <div className="header-flex">
            <div className="header-item app-title-container">
              <div onClick={openSideNav} className="nav-icon">
                <span></span>
                <span></span>
                <span></span>
              </div>

              <div className="header-item app-title">
                <Link to="/">Mightyyy</Link>
              </div>
            </div>
            <div id="header-search-box-container">
              <input
                className="search_results_container-contains"
                type="text"
                id="header-search-box"
                placeholder="Search people"
                onFocus={openSearchResultsContainer}
                autoComplete="off"
              />

              <div
                className="search_results_container"
                id="search_results_container"
                onClick={closeSarchResultsContainer}
              >
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
                              ? user.primaryDp
                              : kohli;
                            let userSecondaryDp = user.secondaryDp
                              ? user.secondaryDp
                              : kohli;
                            return (
                              // <li key={user._id}>
                              <Link to={"/" + user.username} key={user._id}>
                                <img
                                  src={userPrimaryDp}
                                  className="search_result_user_dp search_result_user_primary_dp"
                                  alt="Username"
                                />
                                <img
                                  src={userSecondaryDp}
                                  className="search_result_user_dp search_result_user_secondary_dp"
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
                          <Link to={"/search/"}>
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
            <div className="header-item header-right-section">
              <div className="header-user-details-container">
                <div className="header-user-dps-container">
                  <Link
                    to={`/${authUserUsername}`}
                    className="header-user-dp-primary-a"
                  >
                    <img
                      className="header-user-dp header-user-dp-primary"
                      src={authUserPrimaryDp}
                      alt="avatar"
                    />
                    <img
                      className="header-user-dp header-user-dp-secondary"
                      src={authUserSecondaryDp}
                      alt="avatar"
                    />
                  </Link>
                  <Link
                    to={`/${authUserUsername}`}
                    className="header-user-name three-dots-section"
                  >
                    {authUserFullName}
                  </Link>
                </div>
              </div>

              <div className="header-icons-section">
                <span
                  className="triangle-down triangle-down-contain"
                  id="navbar-dp-n-name-container"
                  onClick={openOptionsContainer}
                ></span>

                <div
                  className="navbar-rightside-dropdown-container"
                  id="navbar-rightside-dropdown-container"
                  onClick={closeOptionsContainer}
                >
                  <div id="navbar-rightside-dropdown-div">
                    <ul id="navbar-rightside-dropdown-ul">
                      <li>Profile</li>
                      <li>Settings</li>
                      <li>Advanced posts</li>
                      <li>Photos</li>
                      <li>Friends</li>
                      <li onClick={logout}>Logout</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* <button className="header-button pointer" onClick={toggleAuth}>
                Toggle Auth
              </button>
              <button className="header-button pointer">
              Register new Account
            </button> */}
            </div>
          </div>
        )}
      </div>
      {openSideNavbar ? (
        <div>
          <BackDrop close={openSideNav} />
        </div>
      ) : null}
      <SideNavBar close={openSideNav} display={openSideNavbar} />
    </Fragment>
  );
};

export default Header;
