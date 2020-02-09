import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class AddTodo extends Component {
  state = {
    title: "",
    description: ""
  };

  componentDidMount() {
    console.log("AddTodo - From componentDidMount()");
    console.log(this.props);
  }

  setTitle = e => {
    this.setState({ title: e.target.value });
  };

  setDescription = e => {
    this.setState({ description: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (!this.state.title.trim()) {
      this.setState({ title: "" });
      alert("Please enter Title");
      return false;
    } else if (!this.state.description.trim()) {
      this.setState({ description: "" });
      alert("Please enter Description");
      return false;
    }
    // console.log(this.state);
    this.props.addTodo(this.state);
    this.props.history.push("/");
  };

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleFormControlInput1">Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Title"
              value={this.state.title}
              onChange={this.setTitle}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Description</label>
            <textarea
              className="form-control"
              rows="3"
              placeholder="Enter Description"
              value={this.state.description}
              onChange={this.setDescription}
            ></textarea>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default withRouter(AddTodo);
