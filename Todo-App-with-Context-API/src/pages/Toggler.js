import React, { Component } from "react";
import { ThemeContext } from "./../contexts/ThemeContext";
import { AuthContext } from "./../contexts/AuthContext";

class ThemeToggle extends Component {
  static contextType = ThemeContext;
  render() {
    let { toggleTheme } = this.context;
    return (
      <AuthContext.Consumer>
        {authContext => {
          const { isAuthenticated, toggleAuth } = authContext;
          let checkAuth = isAuthenticated
            ? "Authenticated"
            : "Un-Authenticated";
          return (
            <div style={{ margin: "20px" }}>
              <button onClick={toggleTheme} style={{ marginRight: "15px" }}>
                Toggle Theme
              </button>
              <button onClick={toggleAuth}>{checkAuth}</button>
            </div>
          );
        }}
      </AuthContext.Consumer>
    );
  }
}

export default ThemeToggle;
