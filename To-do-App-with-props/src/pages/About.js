import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class About extends Component {
  componentDidMount() {
    console.log("About - From componentDidMount()");
    console.log(this.props);
  }

  render() {
    return <>This is About Page</>;
  }
}

export default withRouter(About);
