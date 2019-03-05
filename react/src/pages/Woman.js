import React, { Component } from 'react';
//import { Switch, Route } from 'react-router';
import { Route } from "react-router-dom";

import Main from './woman/index.js';
import Signup from './woman/Signup';
import ProfilePicUploader from './woman/ProfilePicUploader';
import SignupComplete from './woman/SignupComplete';
import NewBooking from './woman/NewBooking';
import BookingComplete from './woman/BookingComplete';
import BookingExtension from './woman/BookingExtension';
import MyRequest from './woman/MyRequest';
import History from './woman/History';
import LiveHelp from './woman/LiveHelp';
import HelpCenter from './woman/HelpCenter';
import PendingJob from './woman/PendingJob';
import LocationEdit from './woman/LocationEdit';
import { WomenRoute } from '../services/routes/WomenRoute';

//const ErrorPage = () => (<div>Error 404</div>);

class Woman extends Component {

  render() {
    return (
        <div>
          <WomenRoute exact path="/w/signup/complete" component={SignupComplete}/>
          <WomenRoute exact path="/w/newBooking" component={NewBooking}/>
          <WomenRoute exact path="/w/bookingComplete" component={BookingComplete}/>
          <WomenRoute exact path="/w/bookingExtension" component={BookingExtension}/>
          <WomenRoute exact path="/w/myRequest" component={MyRequest}/>
          <WomenRoute exact path="/w/history" component={History}/>
          <WomenRoute exact path="/w/liveHelp" component={LiveHelp}/>
          <WomenRoute exact path="/w/helpCenter" component={HelpCenter}/>
          <WomenRoute exact path="/w/pendingJob" component={PendingJob}/>
          <WomenRoute exact path="/w" component={Main}/>
          <Route exact path="/w/signup" component={Signup}/>
          <Route exact path="/w/signup/profilePicUploader" component={ProfilePicUploader}/>
          <WomenRoute exact path="/w/locationEdit" component={LocationEdit}/>
          {/*<Route component={ErrorPage}/>*/}
        </div>
    );
  }
}

export default Woman;
