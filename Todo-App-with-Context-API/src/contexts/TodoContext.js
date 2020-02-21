import React, { useState, useContext, useEffect } from "react";

const TodoContext = useContext();

const TodoContextProvider = props => {
  const [todos, setTodos] = useState([
    { id: 1, title: "First title", description: "This first description" },
    { id: 2, title: "Second title", description: "This Second description" },
    { id: 3, title: "Third title", description: "This Third description" },
    { id: 4, title: "Fourth title", description: "This Fourth description" }
  ]);

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

  return (
    <TodoContext.Provider value={{ todos, addNewTodo }}>
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
