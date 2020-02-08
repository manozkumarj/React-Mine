import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./pages/Header";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AddTodo from "./pages/AddTodo";
import ViewTodos from "./pages/ViewTodos";
import ViewTodo from "./pages/ViewTodo";

class App extends Component {
  state = {
    appName: "To-do App",
    todos: []
  };

  componentDidMount() {
    console.log("From componentDidMount()");

    let todos = [
      {
        id: 1,
        title: "One",
        description: "Description goes here"
      },
      {
        id: 2,
        title: "Two",
        description: "Description goes here"
      }
    ];

    this.setState({ todos });
  }

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
              <Route exact path="/add-todo" component={AddTodo} />
              <Route exact path="/view-todos" component={ViewTodos} />
              <Route exact path="/:id" component={ViewTodo} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
