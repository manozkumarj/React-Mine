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
                component={() => <ViewTodos todos={this.state.todos} />}
              />
              <Route exact path="/about" component={About} />
              <Route exact path="/contact-us" component={Contact} />
              <Route
                exact
                path="/add-todo"
                component={() => <AddTodo addTodo={this.addTodo} />}
              />
              <Route exact path="/view-todos" component={ViewTodos} />
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
