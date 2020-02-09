import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./pages/Header";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AddTodo from "./pages/AddTodo";
import ViewTodos from "./pages/ViewTodos";
import ViewTodo from "./pages/ViewTodo";
// import uuid from "uuid/v3";

class App extends Component {
  state = {
    appName: "To-do App",
    todos: [],
    todo: []
  };

  componentDidMount() {
    // console.log("App - From componentDidMount()");
    let todosList = localStorage.getItem("todos");
    if (todosList && todosList.length > 0) {
      this.setState({ todos: JSON.parse(todosList) });
    }
  }

  addTodo = titleAndDescription => {
    console.log("App - addTodo");
    console.log(titleAndDescription);
    let newTodo = {
      id: +new Date(),
      title: titleAndDescription.title,
      description: titleAndDescription.description
    };

    let todos = [...this.state.todos, newTodo];
    this.setState({ todos });

    localStorage.setItem("todos", JSON.stringify(todos));
  };

  getTodo = async paramId => {
    let getTodos = await JSON.parse(localStorage.getItem("todos"));
    let filterTodo;
    if (getTodos && getTodos.length > 0) {
      // console.log(`App - getTodos - ${JSON.stringify(getTodos)}`);
      filterTodo = await getTodos.filter(todoo => +todoo.id === paramId);
    }
    console.log("filterTodo", JSON.stringify(filterTodo));
    this.setState({ todo: filterTodo });
  };

  deleteTodo = async todoId => {
    let getTodos = await JSON.parse(localStorage.getItem("todos"));
    let filterTodos;
    if (getTodos && getTodos.length > 0) {
      // console.log(`App - getTodos - ${JSON.stringify(getTodos)}`);
      filterTodos = await getTodos.filter(todoo => +todoo.id !== todoId);
    }
    console.log("filterTodos", JSON.stringify(filterTodos));
    this.setState({ todos: filterTodos });
    localStorage.removeItem("todos");
    localStorage.setItem("todos", JSON.stringify(filterTodos));
  };

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header appName={this.state.appName} />
          <div className="container">
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <ViewTodos
                    {...props}
                    todos={this.state.todos}
                    deleteTodo={this.deleteTodo}
                  />
                )}
              />
              <Route exact path="/about" component={About} />
              <Route exact path="/contact-us" component={Contact} />
              <Route
                exact
                path="/add-todo"
                component={() => <AddTodo addTodo={this.addTodo} />}
              />
              <Route
                exact
                path="/:id"
                render={props => (
                  <ViewTodo
                    {...props}
                    getTodo={this.getTodo}
                    todo={this.state.todo}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
