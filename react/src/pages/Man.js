import React, { Component } from "react";
//import { Switch, Route } from 'react-router';
//import { BrowserRouter as Router } from "react-router-dom";
import { Route } from "react-router-dom";

import Landing from "./man/index";
import Signup from "./man/Signup";
import MyBookings from "./man/MyBookings";
import DiscoverSelection from "./man/DiscoverSelection";
import ProfilePicUploader from "./woman/ProfilePicUploader";
import SignupComplete from "./man/SignupComplete";
import LocationEdit from "./man/LocationEdit";
import BookingDetail from "./man/booking/BookingDetail";
import BookingSent from "./man/booking/BookingSent";
import GirlProfile from "./man/GirlProfile";
import DateDetail from "./man/invitation/DateDetail";
import InvitationSent from "./man/invitation/InvitationSent";
import Job from "./man/job/index";
import JobExpired from "./man/job/Expired";
import JobOnGoing from "./man/job/OnGoing";
import JobConfirmed from "./man/job/Confirmed";
import JobEnded from "./man/job/Ended";
import JobRating from "./man/job/Rating";
import JobPending from "./man/job/Pending";
import Payment from "./man/job/Payment";
import PaymentDone from "./man/job/PaymentDone";
import AddLolChat from "./man/job/AddLolChat";
import { MenRoute } from "../services/routes/MenRoute";

class Man extends Component {
  render() {
    return (
      <div>
        <MenRoute exact path="/m" component={Landing} />
        <MenRoute exact path="/m/myBookings" component={MyBookings} />
        <MenRoute
          exact
          path="/m/discoverSelection"
          component={DiscoverSelection}
        />
        <Route exact path="/m/signup" component={Signup} />
        <Route
          exact
          path="/m/signup/profilePicUploader"
          render={props => <ProfilePicUploader gender="male" {...props} />}
        />
        <MenRoute exact path="/m/signup/complete" component={SignupComplete} />
        <MenRoute exact path="/m/locationEdit" component={LocationEdit} />
        <MenRoute exact path="/m/booking/detail" component={BookingDetail} />
        <MenRoute exact path="/m/booking/sent" component={BookingSent} />
        <MenRoute exact path="/m/girlProfile" component={GirlProfile} />
        <MenRoute exact path="/m/invitation/detail" component={DateDetail} />
        <MenRoute exact path="/m/invitation/sent" component={InvitationSent} />
        <MenRoute exact path="/m/dates" component={Job} />
        <MenRoute exact path="/m/dates/expired" component={JobExpired} />
        <MenRoute exact path="/m/dates/ongoing" component={JobOnGoing} />
        <MenRoute exact path="/m/dates/confirmed" component={JobConfirmed} />
        <MenRoute exact path="/m/dates/ended" component={JobEnded} />
        <MenRoute exact path="/m/dates/rating" component={JobRating} />
        <MenRoute exact path="/m/dates/pending" component={JobPending} />
        <MenRoute exact path="/m/payment" component={Payment} />
        <MenRoute exact path="/m/paymentDone" component={PaymentDone} />
        <MenRoute exact path="/m/addLolChat" component={AddLolChat} />
        {/*<Route component={ErrorPage}/>*/}
      </div>
    );
  }
}

export default Man;
