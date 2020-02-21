import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { ThemeContext } from "./../contexts/ThemeContext";
import { AuthContext } from "./../contexts/AuthContext";

class Header extends Component {
  componentDidMount = () => {
    // console.log("props from Header page are showing below");
    // console.log(this.props);
    // eslint-disable-next-line
  };

  render() {
    let { appName } = this.props;
    return (
      <AuthContext.Consumer>
        {authContext => (
          <ThemeContext.Consumer>
            {themeContext => {
              const { isLightTheme, light, dark } = themeContext;
              let theme = isLightTheme ? light : dark;
              const { isAuthenticated } = authContext;
              let checkAuth = isAuthenticated
                ? "Authenticated"
                : "Un-Authenticated";
              return (
                <div className="App">
                  <nav
                    className="navbar navbar-expand-md navbar-dark"
                    style={{ background: theme.ui, color: theme.syntax }}
                  >
                    <span className="navbar-brand">
                      {appName} --> {checkAuth}
                    </span>
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

                    <div
                      className="collapse navbar-collapse"
                      id="navbarsExampleDefault"
                    >
                      <ul className="navbar-nav mr-auto"></ul>
                      <form className="form-inline my-2 my-lg-0">
                        <ul className="navbar-nav mr-auto">
                          <li className="nav-item active">
                            <NavLink className="nav-link" to="/viewTodos">
                              Home
                            </NavLink>
                          </li>
                          {/* <li className="nav-item active">
                            <NavLink className="nav-link" to="/add-todo">
                              Add Todo
                            </NavLink>
                          </li> */}
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
              );
            }}
          </ThemeContext.Consumer>
        )}
      </AuthContext.Consumer>
    );
  }
}

export default withRouter(Header);
