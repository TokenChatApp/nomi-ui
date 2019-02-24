import React, { Component } from 'react';
//import { Switch, Route } from 'react-router';
//import { BrowserRouter as Router } from "react-router-dom";
import { Route } from "react-router-dom";

import Landing from './man/index';
import Signup from './man/Signup';
import MyBookings from './man/MyBookings';
import DiscoverSelection from './man/DiscoverSelection';
import ProfilePicUploader from './man/ProfilePicUploader';
import SignupComplete from './man/SignupComplete';
import { MenRoute } from '../services/routes/MenRoute';

const ErrorPage = () => (<div>Error 404</div>);

class Man extends Component {
  render() {
    return (
        <div>
          <MenRoute exact path="/m" component={Landing}/>
          <MenRoute exact path="/m/myBookings" component={MyBookings}/>
          <MenRoute exact path="/m/discoverSelection" component={DiscoverSelection}/>
          <Route exact path="/m/signup" component={Signup}/>
          <Route exact path="/m/signup/profilePicUploader" component={ProfilePicUploader}/>
          <MenRoute exact path="/m/signup/complete" component={SignupComplete}/>
          {/*<Route component={ErrorPage}/>*/}
        </div>
    );
  }
}

export default Man;
