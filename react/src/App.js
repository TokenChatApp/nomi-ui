import React, { Component } from "react";
import { AuthRoute } from "./services/routes/AuthRoute";
import { RedirectRoute } from "./services/routes/RedirectRoute";
//import { Switch, Route } from 'react-router';
import { Route, Switch } from "react-router-dom";
import "./App.css";

import LoginMan from "./pages/man/Login";
import ForgotPasswordMan from "./pages/man/ForgotPassword";
import LoginWoman from "./pages/woman/Login";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";

import Man from "./pages/Man";
import Woman from "./pages/Woman";
import Faq from "./pages/Faq";
import MyProfile from "./pages/MyProfile";
import Enquiry from "./pages/Enquiry";
import EmergencyContact from "./pages/EmergencyContact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ResetPassword from "./pages/ResetPassword";
import ProfilePicUploader from "./pages/woman/ProfilePicUploader";

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
            <AuthRoute exact path="/m/login" component={LoginMan} />
            <AuthRoute
              exact
              path="/m/forgotPassword"
              component={ForgotPasswordMan}
            />
            <AuthRoute path="/login/forgotPassword" component={ResetPassword} />
            <AuthRoute exact path="/w/login" component={LoginWoman} />
            <AuthRoute exact path="/signup" component={Signup} />
            <Route path="/m" component={Man} />
            <Route path="/w" component={Woman} />
            <Route path="/faq" component={Faq} />
            <Route exact path="/profile" component={MyProfile} />
            <Route
              exact
              path="/profile/upload"
              component={ProfilePicUploader}
            />
            <Route path="/emergencyContact" component={EmergencyContact} />
            <Route path="/enquiry" component={Enquiry} />
            <Route path="/privacyPolicy" component={PrivacyPolicy} />
            <Route component={ErrorPage} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
