import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Faq from "./pages/Faq";

class Content extends Component {
  render() {
    const { handleLogOut, handleLogIn, handleRegister, loggedIn } = this.props;
    if (!loggedIn) {
      return (
        <div className="content">
          <Switch>
            <Route
              path="/register"
              component={props => <Register handleRegister={handleRegister} {...this.props} />}
            />
            <Route
              path="/login"
              component={props => <Login handleLogIn={handleLogIn} {...this.props} />}
            />
            <Route
              path="/faq"
              component={props => <Faq {...this.props} />}
            />
            <Route
              path="/"
              component={props => <Home {...this.props} />}
            />
          </Switch>
        </div>
      );
    };
    return (
      <div  className="content">
        <Switch>
          <Route
            path="/faq"
            component={props => <Faq {...this.props} />}
          />
          <Route
            path="/"
            component={props => <Home handleLogOut={handleLogOut} {...this.props} />}
          />
        </Switch>
      </div>
    );
  }
}

export default Content;
