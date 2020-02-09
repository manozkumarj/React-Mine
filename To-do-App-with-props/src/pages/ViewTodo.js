import React, { Component } from "react";

class ViewTodo extends Component {
  componentDidMount() {
    console.log("props from ViewTodo page are showing below");
    console.log(this.props);
    let id = +this.props.match.params.id;
    console.log(`ViewTodo - grabbed ID is - ${id}`);
    this.props.getTodo(id);
  }

  render() {
    let { todo: currentTodo } = this.props;
    console.log(`ViewTodo - currentTodo - ${JSON.stringify(currentTodo)}`);
    console.log(`${currentTodo.length}`);
    const thisTodo =
      currentTodo.length > 0 ? (
        <div
          key={currentTodo[0].id}
          className="card"
          style={{ width: "90%", margin: "auto" }}
        >
          <div className="card-body">
            <h5 className="card-title" style={titleStyle}>
              {currentTodo[0].title}
            </h5>
            <p className="card-text">{currentTodo[0].description}</p>
          </div>
        </div>
      ) : (
        <div className="card" style={{ width: "90%", margin: "50px auto" }}>
          <div className="card-body">
            <h5 className="card-title" style={{ color: "Red" }}>
              No Todo found
            </h5>
          </div>
        </div>
      );

    return <> {thisTodo} </>;
  }
}

const titleStyle = {
  color: "Blue",
  fontSize: "25px"
};

export default ViewTodo;
