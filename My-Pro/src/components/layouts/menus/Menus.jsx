import React, { Component } from "react";
import NavBar from "./../navBar/Navbar";
import SideNavBar from "./../sideNavBar/SideNavBar";
import BackDrop from "./../backDrop/BackDrop";

class Menus extends Component {
  state = {
    sideBarOpen: false,
  };

  handleOpen = () => {
    this.setState({
      sideBarOpen: true,
    });
  };

  handleClose = () => {
    this.setState({
      sideBarOpen: false,
    });
  };

  render() {
    return (
      <div>
        <NavBar open={this.handleOpen} />
        {this.state.sideBarOpen ? (
          <div>
            <BackDrop close={this.handleClose} />{" "}
          </div>
        ) : null}
        <SideNavBar close={this.handleClose} display={this.state.sideBarOpen} />
      </div>
    );
  }
}

export default Menus;
