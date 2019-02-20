import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import { BrowserRouter as Router } from "react-router-dom";

import Main from './woman/index.js';
import Signup from './woman/Signup';
import ProfilePicUploader from './woman/ProfilePicUploader';
import SignupComplete from './woman/SignupComplete';

const ErrorPage = () => (<div>Error 404</div>);

class Woman extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/w" component={Main}/>
            <Route exact path="/w/signup" component={Signup}/>
            <Route exact path="/w/signup/profilePicUploader" component={ProfilePicUploader}/>
            <Route exact path="/w/signup/complete" component={SignupComplete}/>
            <Route component={ErrorPage}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default Woman;
