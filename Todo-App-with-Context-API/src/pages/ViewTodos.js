import React, { useState, useEffect } from "react";
import AddTodo from "./AddTodo";
import { Link } from "react-router-dom";
import uuid from "uuid/v1";

const ViewTodos = props => {
  const [todos, setTodos] = useState([
    { id: 1, title: "First title", description: "This first description" },
    { id: 2, title: "Second title", description: "This Second description" },
    { id: 3, title: "Third title", description: "This Third description" },
    { id: 4, title: "Fourth title", description: "This Fourth description" }
  ]);

  const [age, setAge] = useState(20);

  useEffect(() => {
    console.log("ViewTodos - todos changed");
    // console.log(props);
    // eslint-disable-next-line
  }, [todos]);

  useEffect(() => {
    console.log("ViewTodos - age changed");
    // console.log(props);
    // eslint-disable-next-line
  }, [age]);

  const addNewTodo = titleAndDescription => {
    // console.log("ViewTodos - addTodo");
    // console.log(titleAndDescription);
    let newTodo = {
      id: uuid(),
      title: titleAndDescription.title,
      description: titleAndDescription.description
    };

    let newTodos = [...todos, newTodo];
    // console.log(newTodos);
    setTodos(newTodos);
  };

  const deleteTodo = id => {
    // console.log("Deletable todo ID is -> " + id);
    if (window.confirm(`Do you wanna delete this Todo - ${id} ?`)) {
      // console.log("You pressed OK!");
      // props.deleteTodo(id);
    } else {
      // console.log("You pressed Cancel!");
    }
  };

  let showTodos =
    todos.length > 0
      ? todos.map(todo => {
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
                  onClick={() => deleteTodo(todo.id)}
                >
                  Delete Todo
                </span>
              </div>
            </div>
          );
        })
      : "There are no todos to show";

  return (
    <>
      <div style={{ margin: "20px" }}>
        <button
          onClick={() => setAge(age + 1)}
        >{`Add 1 to age: ${age}`}</button>
      </div>
      {showTodos} <AddTodo addNewTodo={addNewTodo} />
    </>
  );
};

const titleStyle = {
  color: "Blue",
  fontSize: "25px"
};

export default ViewTodos;
