import React, { Component } from "react";

class AddTodo extends Component {
  state = {
    title: "",
    decription: ""
  };

  setTitle = e => {
    this.setState({ state: e.target.value });
  };

  setDescription = e => {
    this.setState({ decription: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
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
              value={this.state.decription}
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

export default AddTodo;
