import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Backend } from "../services/Backend";

var dateFormat = require("dateformat");

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  bgColor: {
    backgroundColor: "#ececec"
  },
  tab: {
    fontWeight: 700
  },
  tabWrapper: {
    width: "100%",
    paddingBottom: 50
  },
  title: {
    fontWeight: 300,
    marginTop: 40,
    marginBottom: 0,
    textAlign: "left",
    paddingLeft: 25
  }
});

class Faq extends React.Component {
  state = {
    redirect: null
  };

  renderContent() {
    if (Backend.user.gender === "M") {
      return (
        <div
          style={{
            paddingLeft: 20,
            paddingRight: 20,
            fontSize: 13,
            textAlign: "left"
          }}
        >
          <br />
          <br />
          <b>How do I use it?</b>
          <br />
          <br />
          1. Create account
          <br />
          <br />
          2. Fill up your personal info
          <br />
          <br />
          3. Choose your desired drinking time and location
          <br />
          <br />
          4. Girls who are in the area will be shown to you. <br />
          <br />
          5. Click on the girl to confirm the booking.
          <br />
          <br />
          6. After making payment, you will see the girl’s lol chat ID
          <br />
          <br />
          7. If you do not have lol chat (100% anonymous chat app which doesn’t
          require phone number to register), please download it and add the
          girl’s ID to initiate the chat with her
          <br />
          <br />
          8. Arrange the location with the girl
          <br />
          <br />
          9. And meet up
          <br />
          <br />
          10. After the event, you will be asked to rate the girl and give
          feedback, if any
          <br />
          <br />
          <br />
          <b>How many girls can I book? </b>
          <br />
          <br />
          Up to 6 girls at a time.
          <br />
          <br />
          <br />
          <b>How do I make payment?</b>
          <br />
          <br />
          Currently we only accept credit card payment.
          <br />
          <br />
          <br />
          <b>How do I contact the girls?</b>
          <br />
          <br />
          You will be shown the girl’s lol chat ID after payment has been made.
          <br />
          <br />
          <br />
          <b>How much is the cost for drinking with a Nomitime girl?</b>
          <br />
          <br />
          Rates for the girls ranges from 10,000 JPY to 20,000 JPY for one
          session.
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      );
    } else {
      return (
        <div style={{ paddingLeft: 20, paddingRight: 20, fontSize: 14 }}>
          <br />
          <b>How do I use it?</b>
          <br />
          <br />
          1. You have to have lol chat installed before you can use TIPS
          platform
          <br />
          <br />
          2. Login with your lol chat username and password
          <br />
          <br />
          3. Fill up your info and upload a profile pic
          <br />
          <br />
          4. Choose your location and you will be shown matches of guys who are
          looking for people to drink with in the same area
          <br />
          <br />
          5. Confirm the guy you want to drink with
          <br />
          <br />
          6. You will be notified after the payment has been made.
          <br />
          <br />
          7. Your lol chat ID will be shown to that guy and he will initiate a
          chat with you on lol chat to arrange the place for drinking
          <br />
          <br />
          8. Show up on time
          <br />
          <br />
          9. After the session has ended, you will be asked to rate the guy and
          to give feedback if any
          <br />
          <br />
          10. Repeat this process to make more money!
          <br />
          <br />
        </div>
      );
    }
  }

  render() {
    const { classes } = this.props;
    const { redirect } = this.state;

    return (
      <div className={classes.root}>
        {redirect && <Redirect to={redirect} />}
        <Navbar title="FAQ" gender={Backend.user.gender} />
        {this.renderContent()}
      </div>
    );
  }
}

Faq.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Faq);
