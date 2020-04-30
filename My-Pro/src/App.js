import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Menus from "./components/layouts/menus/Menus";

// Modals
import LayerOneModal from "./components/layouts/modals/layerOneModal/LayerOneModal";
import LayerTwoModal from "./components/layouts/modals/layerTwoModal/LayerTwoModal";

// Contexts
import ScriptsContextProvider from "./contexts/ScriptsContext";
import ModalsContextProvider from "./contexts/ModalsContext";

// pages
import Home from "./components/pages/home/Home";
import Register from "./components/pages/register/Register";
import Login from "./components/pages/login/Login";
import NotFound from "./components/pages/notFound/NotFound";
import Profile from "./components/pages/profile/Profile";
import Photos from "./components/pages/photos/Photos";
import Settings from "./components/pages/settings/Settings";
import Friends from "./components/pages/friends/Friends";
import About from "./components/pages/about/About";
import PostTypes from "./components/pages/postTypes/PostTypes";

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <div className="app-container">
            <ModalsContextProvider>
              <ScriptsContextProvider>
                <Menus />
                <LayerOneModal />
                <LayerTwoModal />
              </ScriptsContextProvider>
              <div className="common-container">
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/home" component={Home} />
                  <Route exact path="/profile" component={Profile} />
                  <Route exact path="/photos" component={Photos} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/settings" component={Settings} />
                  <Route exact path="/friends" component={Friends} />
                  <Route exact path="/about" component={About} />
                  <Route exact path="/post-types" component={PostTypes} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="*" component={NotFound} />
                </Switch>
              </div>
            </ModalsContextProvider>
          </div>
        </Fragment>
      </Router>
    );
  }
}

export default App;
