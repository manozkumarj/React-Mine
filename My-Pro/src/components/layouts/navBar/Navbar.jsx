import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import kohli from "../../../images/kohli.jpg";

const Navbar = ({ open }) => {
  return (
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
                class="searchInput"
                id="search"
                placeholder="Search for people"
                spellcheck="false"
                autoComplete="off"
              />
            </div>
          </div>
          <div className="navbar-right-items-container">
            <div className="navbar-dp-n-name-container">
              <img
                className="navbar-right-item navbar-current-user-dp"
                src={kohli}
              />
              <span className="navbar-right-item navbar-current-user-name">
                {" "}
                Manoj Kumar J
              </span>
            </div>
            {/* <div className="nav-items">
              <ul>
                <li>
                  <Link to="/register">Register</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </ul>
            </div> */}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
