import React from "react";
import { Link } from "react-router-dom";

const ViewTodos = props => {
  console.log("props from ViewTodos page are showing below");
  console.log(props);

  let todosList =
    props.todos && props.todos.length > 0 ? (
      props.todos.map(todo => {
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
};

const titleStyle = {
  color: "Blue",
  fontSize: "25px"
};

export default ViewTodos;
