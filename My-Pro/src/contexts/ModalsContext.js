import React, { Component, createContext } from "react";

export const ModalsContext = createContext();

class ModalsContextProvider extends Component {
  state = {
    openLayerOne: false,
    closeLayerOne: false,
    LayerOne: false,
    isLayerTwo: false,
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

  toggleLayerTwo = () => {
    this.setState({ isLayerTwo: !this.state.isLayerTwo });
  };

  render() {
    return (
      <ModalsContext.Provider
        value={{
          ...this.state,
          toggleOpenLayerOne: this.toggleOpenLayerOne,
          toggleCloseLayerOne: this.toggleCloseLayerOne,
          toggleLayerTwo: this.toggleLayerTwo,
        }}
      >
        {this.props.children}
      </ModalsContext.Provider>
    );
  }
}

export default ModalsContextProvider;
