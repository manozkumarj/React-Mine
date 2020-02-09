import React from "react";
import { NavLink } from "react-router-dom";

const Header = props => {
  // console.log(props);
  return (
    <>
      <div className="App">
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <span className="navbar-brand">{props.appName}</span>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarsExampleDefault"
            aria-controls="navbarsExampleDefault"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarsExampleDefault">
            <ul className="navbar-nav mr-auto"></ul>
            <form className="form-inline my-2 my-lg-0">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <NavLink className="nav-link" to="/">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item active">
                  <NavLink className="nav-link" to="/add-todo">
                    Add To-do
                  </NavLink>
                </li>
                <li className="nav-item active">
                  <NavLink className="nav-link" to="/about">
                    About
                  </NavLink>
                </li>
                <li className="nav-item active">
                  <NavLink className="nav-link" to="/contact-us">
                    Contact
                  </NavLink>
                </li>
              </ul>
            </form>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
