import React, { Component } from "react";
import { Link } from "react-router-dom";

class ViewTodos extends Component {
  componentDidMount() {
    console.log("props from ViewTodos page are showing below");
    console.log(this.props);
  }

  deleteTodo = id => {
    console.log("Deletable todo ID is -> " + id);
    if (window.confirm(`Do you wanna delete this Todo - ${id} ?`)) {
      console.log("You pressed OK!");
      this.props.deleteTodo(id);
    } else {
      console.log("You pressed Cancel!");
    }
  };

  render() {
    let todosList =
      this.props.todos && this.props.todos.length > 0 ? (
        this.props.todos.map(todo => {
          return (
            <div
              key={todo.id}
              className="card"
              style={{ width: "90%", margin: "auto" }}
            >
              <div className="card-body">
                <h5 className="card-title" style={titleStyle}>
                  <Link to={`/${todo.id}`}>{todo.title}</Link>
                </h5>
                <p className="card-text">{todo.description}</p>
                <span
                  className="btn btn-danger"
                  onClick={() => this.deleteTodo(todo.id)}
                >
                  Delete Todo
                </span>
              </div>
            </div>
          );
        })
      ) : (
        <div className="card" style={{ width: "90%", margin: "50px auto" }}>
          <div className="card-body">
            <h5 className="card-title" style={{ color: "Red" }}>
              There are no Todos to show
            </h5>
          </div>
        </div>
      );

    return <> {todosList} </>;
  }
}

const titleStyle = {
  color: "Blue",
  fontSize: "25px"
};

export default ViewTodos;
