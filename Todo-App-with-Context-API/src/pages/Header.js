import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { ThemeContext } from "./../contexts/ThemeContext";

class Header extends Component {
  static contextType = ThemeContext;

  componentDidMount = () => {
    console.log("props from Header page are showing below");
    console.log(this.props);
    console.log(this.context);
    // eslint-disable-next-line
  };

  render() {
    const { isLightTheme, light, dark } = this.context;
    let theme = isLightTheme ? light : dark;
    let { appName } = this.props;
    return (
      <>
        <div className="App">
          <nav
            className="navbar navbar-expand-md navbar-dark"
            style={{ background: theme.ui, color: theme.syntax }}
          >
            <span className="navbar-brand">{appName}</span>
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
                    <NavLink className="nav-link" to="/">
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item active">
                    <NavLink className="nav-link" to="/add-todo">
                      Add Todo
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
  }
}

export default withRouter(Header);
