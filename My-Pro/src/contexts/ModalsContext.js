import React, { Component, createContext } from "react";

export const ModalsContext = createContext();

class ModalsContextProvider extends Component {
  state = {
    openLayerOne: false,
    closeLayerOne: false,
    openLayerTwo: false,
    closeLayerTwo: false,
  };

  toggleOpenLayerOne = () => {
    this.setState({ openLayerOne: !this.state.openLayerOne });
    this.setState({ closeLayerOne: false });
    // this.toggleCloseLayerOne();
  };

  toggleCloseLayerOne = () => {
    this.setState({ closeLayerOne: !this.state.closeLayerOne });
    this.setState({ openLayerOne: false });
    // this.toggleOpenLayerOne();
  };

  toggleOpenLayerTwo = () => {
    this.setState({ openLayerTwo: !this.state.openLayerTwo });
    this.setState({ closeLayerTwo: false });
    // this.toggleCloseLayerTwo();
  };

  toggleCloseLayerTwo = () => {
    this.setState({ closeLayerTwo: !this.state.closeLayerTwo });
    this.setState({ openLayerTwo: false });
    // this.toggleOpenLayerTwo();
  };

  render() {
    return (
      <ModalsContext.Provider
        value={{
          ...this.state,
          toggleOpenLayerOne: this.toggleOpenLayerOne,
          toggleCloseLayerOne: this.toggleCloseLayerOne,
          toggleOpenLayerTwo: this.toggleOpenLayerTwo,
          toggleCloseLayerTwo: this.toggleCloseLayerTwo,
        }}
      >
        {this.props.children}
      </ModalsContext.Provider>
    );
  }
}

export default ModalsContextProvider;
