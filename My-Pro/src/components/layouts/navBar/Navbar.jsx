import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = ({ open }) => {
  return (
    <nav className="nav-bar">
      <div onClick={open} className="nav-icon">
        <input type="checkbox" />
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="nav-logo">
        <Link to="/">Logo</Link>
      </div>
      <div className="nav-space" />
      <div className="nav-items">
        <ul>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
