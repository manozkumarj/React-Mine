import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Contact extends Component {
  componentDidMount() {
    console.log("Contact - From componentDidMount()");
    console.log(this.props);
  }

  render() {
    return <>This is Contact Page</>;
  }
}

export default withRouter(Contact);
