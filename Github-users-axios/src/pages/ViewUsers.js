import React, { Component } from "react";
// import { Link } from "react-router-dom";

class ViewUsers extends Component {
  componentDidMount() {
    console.log("props from ViewUsers page are showing below");
    console.log(this.props);
  }

  render() {
    return <> This is ViewUsers page </>;
  }
}

export default ViewUsers;
