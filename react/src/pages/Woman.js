import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import { BrowserRouter as Router } from "react-router-dom";

import Main from './woman/index.js';
import Signup from './woman/Signup';
import ProfilePicUploader from './woman/ProfilePicUploader';
import SignupComplete from './woman/SignupComplete';
import NewBooking from './woman/NewBooking';
import BookingComplete from './woman/BookingComplete';
import BookingExtension from './woman/BookingExtension';
import MyRequest from './woman/MyRequest';
import History from './woman/History';

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
            <Route exact path="/w/newBooking" component={NewBooking}/>
            <Route exact path="/w/bookingComplete" component={BookingComplete}/>
            <Route exact path="/w/bookingExtension" component={BookingExtension}/>
            <Route exact path="/w/myRequest" component={MyRequest}/>
            <Route exact path="/w/history" component={History}/>
            <Route component={ErrorPage}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default Woman;
