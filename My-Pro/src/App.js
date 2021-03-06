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
import Search from "./components/pages/search/Search";
import FindAccount from "./components/pages/findAccount/FindAccount";
import AccountRecovery from "./components/pages/accountRecovery/AccountRecovery";
import ResetPassword from "./components/pages/resetPassword/ResetPassword";

import PrivateRoute from "./routing/PrivateRoute";

import FriendRequests from "./components/pages/friendRequests/FriendRequests";
import SentRequests from "./components/pages/sentRequests/SentRequests";

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
                  <PrivateRoute exact path="/" component={Home} />
                  <PrivateRoute exact path="/home" component={Home} />
                  <PrivateRoute exact path="/post/:postId" component={Home} />
                  <PrivateRoute exact path="/profile" component={Profile} />
                  <PrivateRoute exact path="/register" component={Register} />
                  <PrivateRoute exact path="/about" component={About} />
                  <PrivateRoute
                    exact
                    path="/friend-requests"
                    component={FriendRequests}
                  />
                  <PrivateRoute
                    exact
                    path="/sent-requests"
                    component={SentRequests}
                  />
                  <PrivateRoute
                    exact
                    path="/post-types"
                    component={PostTypes}
                  />
                  <PrivateRoute
                    exact
                    path="/search/:word?"
                    component={Search}
                  />
                  <PrivateRoute
                    exact
                    path="/friend-requests"
                    component={Search}
                  />
                  <PrivateRoute
                    exact
                    path="/sent-requests"
                    component={Search}
                  />
                  <PrivateRoute exact path="/login" component={Login} />
                  <PrivateRoute
                    exact
                    path="/find-account"
                    component={FindAccount}
                  />
                  <Route
                    exact
                    path="/reset-password"
                    component={ResetPassword}
                  />
                  <Route
                    exact
                    path="/account-recovery"
                    component={AccountRecovery}
                  />
                  <PrivateRoute exact path="/:username" component={Profile} />
                  <PrivateRoute
                    exact
                    path="/:username/photos"
                    component={Profile}
                  />
                  <PrivateRoute
                    exact
                    path="/:username/friends"
                    component={Profile}
                  />
                  <PrivateRoute
                    exact
                    path="/:username/settings"
                    component={Profile}
                  />
                  <PrivateRoute
                    exact
                    path="/:username/about"
                    component={Profile}
                  />
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
