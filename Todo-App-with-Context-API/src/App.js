import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./pages/Header";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AddTodo from "./pages/AddTodo";
import ViewTodos from "./pages/ViewTodos";
import ViewTodo from "./pages/ViewTodo";
import ThemeContextProvider from "./contexts/ThemeContext";
// import uuid from "uuid/v3";

class App extends Component {
  state = {
    appName: "Todo App - Context API"
  };

  componentDidMount() {
    console.log("App - From componentDidMount()");
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <ThemeContextProvider>
            <Header appName={this.state.appName} />
            <div className="container">
              <Switch>
                <Route
                  exact
                  path="/"
                  render={props => <ViewTodos {...props} />}
                />
                <Route
                  exact
                  path="/add-todo"
                  render={props => <AddTodo {...props} />}
                />
                <Route exact path="/about" component={About} />
                <Route exact path="/contact-us" component={Contact} />
                <Route
                  exact
                  path="/:id"
                  render={props => <ViewTodo {...props} />}
                />
              </Switch>
            </div>
          </ThemeContextProvider>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
