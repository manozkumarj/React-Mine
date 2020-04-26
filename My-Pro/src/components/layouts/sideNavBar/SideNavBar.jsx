import React from "react";
import { Link } from "react-router-dom";
import "./sideNavBar.css";

const SideNavBar = ({ close, display }) => {
  let Classes = "side-nav-bar";
  if (display) {
    Classes = "side-nav-bar open";
  }
  return (
    <nav className={Classes}>
      <ul onClick={close}>
        <li>Close</li>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default SideNavBar;
