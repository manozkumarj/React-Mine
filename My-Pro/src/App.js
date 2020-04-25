import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Menus from "./components/layouts/menus/Menus";
import Home from "./components/pages/home/Home";
import Register from "./components/pages/register/Register";
import Login from "./components/pages/login/Login";
import NotFound from "./components/pages/notFound/NotFound";

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Menus />
          <div className="common-container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/home" component={Home} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="*" component={NotFound} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    );
  }
}

export default App;
