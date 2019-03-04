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
import LocationEdit from './man/LocationEdit';
import BookingDetail from './man/booking/BookingDetail';
import BookingSent from './man/booking/BookingSent';
import GirlProfile from './man/GirlProfile';
import DateDetail from './man/invitation/DateDetail';
import InvitationSent from './man/invitation/InvitationSent';
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
          <MenRoute exact path="/m/locationEdit" component={LocationEdit}/>
          <MenRoute exact path="/m/booking/detail" component={BookingDetail}/>
          <MenRoute exact path="/m/booking/sent" component={BookingSent}/>
          <MenRoute exact path="/m/girlProfile" component={GirlProfile}/>
          <MenRoute exact path="/m/invitation/detail" component={DateDetail}/>
          <MenRoute exact path="/m/invitation/sent" component={InvitationSent}/>
          {/*<Route component={ErrorPage}/>*/}
        </div>
    );
  }
}

export default Man;
