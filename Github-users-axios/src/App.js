import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./pages/Header";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ViewUsers from "./pages/ViewUsers";
import ViewUser from "./pages/ViewUser";
// import uuid from "uuid/v3";

class App extends Component {
  state = {
    appName: "Github users - AXIOS"
  };

  componentDidMount() {
    console.log("App - From componentDidMount()");
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
                render={props => <ViewUsers {...props} />}
              />
              <Route exact path="/about" component={About} />
              <Route exact path="/contact-us" component={Contact} />
              <Route
                exact
                path="/:id"
                render={props => <ViewUser {...props} />}
              />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
