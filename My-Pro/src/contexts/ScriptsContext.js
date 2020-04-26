import React, { Component, createContext } from "react";

export const ScriptsContext = createContext();

class ScriptsContextProvider extends Component {
  state = {
    isSideBarOpen: false,
  };

  toggleSidebar = () => {
    this.setState({ isSideBarOpen: !this.state.isSideBarOpen });
  };

  render() {
    return (
      <ScriptsContext.Provider
        value={{ ...this.state, toggleSidebar: this.toggleSidebar }}
      >
        {this.props.children}
      </ScriptsContext.Provider>
    );
  }
}

export default ScriptsContextProvider;
