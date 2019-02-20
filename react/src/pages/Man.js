import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import { BrowserRouter as Router } from "react-router-dom";

import Signup from './man/Signup';
import ProfilePicUploader from './man/ProfilePicUploader';
import SignupComplete from './man/SignupComplete';

const ErrorPage = () => (<div>Error 404</div>);

class Man extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/m/signup" component={Signup}/>
            <Route exact path="/m/signup/profilePicUploader" component={ProfilePicUploader}/>
            <Route exact path="/m/signup/complete" component={SignupComplete}/>
            <Route component={ErrorPage}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default Man;