import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./pages/Header";
import About from "./pages/About";
import Contact from "./pages/Contact";
// import AddTodo from "./pages/AddTodo";
import ViewTodos from "./pages/ViewTodos";
import ViewTodo from "./pages/ViewTodo";
import ThemeContextProvider from "./contexts/ThemeContext";
import AuthContextProvider from "./contexts/AuthContext";
// import uuid from "uuid/v3";
import Toggler from "./pages/Toggler";

class App extends Component {
  state = {
    appName: "Todo App - Context API"
  };

  componentDidMount() {
    // console.log("App - From componentDidMount()");
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <ThemeContextProvider>
            <AuthContextProvider>
              <Header appName={this.state.appName} />
              <Toggler />
              <div className="container">
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={props => <ViewTodos {...props} />}
                  />
                  {/* <Route
                    exact
                    path="/add-todo"
                    render={props => <AddTodo {...props} />}
                  /> */}
                  <Route exact path="/about" component={About} />
                  <Route exact path="/contact-us" component={Contact} />
                  <Route
                    exact
                    path="/:id"
                    render={props => <ViewTodo {...props} />}
                  />
                </Switch>
              </div>
            </AuthContextProvider>
          </ThemeContextProvider>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
