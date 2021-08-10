import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import PrivateRoute from "./routing/PrivateRoute";

// Import components
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import RecoverAccount from "./components/RecoverAccount/RecoverAccount";

import Header from "./layouts/Header/Header";
import NotFound from "./components/NotFound/NotFound";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="whole-page-container">
          <Header />
        </div>
        <div className="main-component-container">
          <Switch>
            <Route
              onUpdate={() => window.scrollTo(0, 0)}
              exact
              path="/"
              component={Home}
            />
            <PrivateRoute exact path="/home" component={Home} />
            <PrivateRoute exact path="/search" component={Home} />
            <PrivateRoute exact path="/login" component={Login} />
            <PrivateRoute exact path="/register" component={Register} />
            <Route exact path="/not-found" component={NotFound} />
            <PrivateRoute
              exact
              path="/recover-account"
              component={RecoverAccount}
            />
            <PrivateRoute exact path="/:username" component={Profile} />
            <PrivateRoute
              exact
              path="/:username/change-dp"
              component={Profile}
            />
            <PrivateRoute exact path="/:username/photos" component={Profile} />
            <PrivateRoute exact path="/:username/friends" component={Profile} />
            <PrivateRoute
              exact
              path="/:username/settings"
              component={Profile}
            />
            <PrivateRoute exact path="/:username/about" component={Profile} />
            <Route exact path="*" component={NotFound} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
