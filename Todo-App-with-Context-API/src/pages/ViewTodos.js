import React, { Component } from "react";
import { Link } from "react-router-dom";

class ViewTodos extends Component {
  componentDidMount() {
    console.log("props from ViewTodos page are showing below");
    console.log(this.props);
  }

  render() {
    return <> This is ViewTodos page </>;
  }
}

const titleStyle = {
  color: "Blue",
  fontSize: "25px"
};

export default ViewTodos;
