import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./pages/Header";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ViewUsers from "./pages/ViewUsers";
import ViewUser from "./pages/ViewUser";
import axios from "axios";
// import uuid from "uuid/v3";

class App extends Component {
  state = {
    appName: "Github users - AXIOS",
    users: [],
    user: []
  };

  async componentDidMount() {
    console.log("props from App page are showing below");
    console.log(this.props);
    console.log(
      `process.env.REACT_APP_GITHUB_CLIENT_ID -> ${process.env.REACT_APP_GITHUB_CLIENT_ID}`
    );
    console.log(
      `process.env.REACT_APP_GITHUB_CLIENT_SECRET -> ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    let results = await axios.get(
      `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ users: results.data });
  }

  getUser = async id => {
    console.log("Received userId is -> " + id);
    let results = await axios.get(
      `https://api.github.com/users/${id}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ user: results.data });
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
                  <ViewUsers {...props} users={this.state.users} />
                )}
              />
              <Route exact path="/about" component={About} />
              <Route exact path="/contact-us" component={Contact} />
              <Route
                exact
                path="/:id"
                render={props => (
                  <ViewUser
                    {...props}
                    getUser={this.getUser}
                    user={this.state.user}
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
