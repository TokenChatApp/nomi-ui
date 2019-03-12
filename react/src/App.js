import React, { Component } from "react";
import { AuthRoute } from "./services/routes/AuthRoute";
import { RedirectRoute } from "./services/routes/RedirectRoute";
//import { Switch, Route } from 'react-router';
import { Route, Switch } from "react-router-dom";
import "./App.css";

import Login from "./pages/Login";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";

import Man from "./pages/Man";
import Woman from "./pages/Woman";

// get pages from pages directory
const ErrorPage = () => <div>Error 404</div>;

const styles = {
  borderLeft: "1px solid #e4e4e4",
  borderRight: "1px solid #e4e4e4",
  width: "100%",
  maxWidth: 450,
  minHeight: "100vh",
  margin: "auto"
};

class App extends Component {
  render() {
    return (
      <div className="App" style={{ minHeight: "100vh" }}>
        <div style={styles}>
          <Switch>
            <RedirectRoute exact path="/" component={Landing} />
            <AuthRoute exact path="/login" component={Login} />
            <AuthRoute exact path="/signup" component={Signup} />
            <Route path="/m" component={Man} />
            <Route path="/w" component={Woman} />
            <Route component={ErrorPage} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
