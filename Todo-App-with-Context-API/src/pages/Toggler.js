import React, { useContext } from "react";
import { ThemeContext } from "./../contexts/ThemeContext";
import { AuthContext } from "./../contexts/AuthContext";

const ThemeToggle = props => {
  let { toggleTheme } = useContext(ThemeContext);
  let { isAuthenticated, toggleAuth } = useContext(AuthContext);
  let checkAuth = isAuthenticated ? "Authenticated" : "Un-Authenticated";
  return (
    <div style={{ margin: "20px" }}>
      <button onClick={toggleTheme} style={{ marginRight: "15px" }}>
        Toggle Theme
      </button>
      <button onClick={toggleAuth}>{checkAuth}</button>
    </div>
  );
};

export default ThemeToggle;
