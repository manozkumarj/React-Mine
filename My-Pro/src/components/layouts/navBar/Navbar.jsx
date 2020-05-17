import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./navbar.css";
import kohli from "../../../images/kohli.jpg";
import zuck from "../../../images/zuck.jpg";
import mark from "../../../images/mark.jpg";
import { connect } from "react-redux";
import { removeToken } from "./../../../redux/actions/authActions";

const Navbar = (props) => {
  useEffect(() => {
    console.log(props);
  }, [props]);

  const { open } = props;
  const history = useHistory();

  const handleLogout = () => {
    console.log("handleLogout triggered");
    props.logout();
    history.push(`/login`);
  };

  const loggedInMenu = (
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
              />

              <div id="search_results_container">
                <div id="search_results_div">
                  <ul>
                    <li>
                      <img
                        src={kohli}
                        className="search_result_user_dp"
                        alt="Username"
                      />
                      <span className="search_result_user_name">
                        Manoj Kumar J
                      </span>
                    </li>
                    <li>
                      <img
                        src={zuck}
                        className="search_result_user_dp"
                        alt="Username"
                      />
                      <span className="search_result_user_name">
                        Mahesh Kumar J
                      </span>
                    </li>
                    <li>
                      <img
                        src={mark}
                        className="search_result_user_dp"
                        alt="Username"
                      />
                      <span className="search_result_user_name">Kranthi</span>
                    </li>
                    <li>
                      <img
                        src={kohli}
                        className="search_result_user_dp"
                        alt="Username"
                      />
                      <span className="search_result_user_name">
                        Manoj Kumar J
                      </span>
                    </li>
                    <li>
                      <img
                        src={zuck}
                        className="search_result_user_dp"
                        alt="Manoj Kumar"
                      />
                      <span className="search_result_user_name">
                        Mahesh Kumar J
                      </span>
                    </li>
                  </ul>
                  <ul className="search-more-container">
                    <li>
                      <Link to="/search/word">
                        <span className="search_result_user_name">
                          See more results for -
                          <span className="search-word"> Manoj Kumar J</span>
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="navbar-right-items-container">
            <div className="navbar-dp-n-name-container">
              <img
                className="navbar-right-item navbar-current-user-dp"
                src={kohli}
                id="navbar-dp-n-name-container"
                alt="Username"
              />
              <span
                className="navbar-right-item navbar-current-user-name"
                id="navbar-dp-n-name-container"
              >
                Manoj Kumar J
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

  return props.authState.authToken ? loggedInMenu : normalMenu;
};

const mapStateToProps = (state) => {
  return {
    authState: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(removeToken()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
