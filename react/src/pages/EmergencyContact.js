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

class EmergencyContact extends React.Component {
  state = {
    redirect: null
  };

  renderContent() {
    return (
      <div
        style={{
          paddingLeft: 20,
          paddingRight: 20,
          fontSize: 16,
          textAlign: "left"
        }}
      >
        <br />
        <br />
        <b style={{ fontSize: "1rem" }}>緊急連絡:</b>
        <br />
        <br />
        <div>
          <img
            style={{
              width: 25,
              height: 25,
              marginRight: 8,
              verticalAlign: "middle"
            }}
            src={
              "data:image/jpeg;base64,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"
            }
          />{" "}
          <span style={{ verticalAlign: "middle" }}>
            <a href="tel:09012345678">090 1234 5678</a>
          </span>
        </div>
        <br />
        <div>
          <img
            style={{
              width: 25,
              height: 25,
              marginRight: 8,
              verticalAlign: "middle"
            }}
            src={
              "data:image/png;base64,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"
            }
          />{" "}
          <span style={{ verticalAlign: "middle" }}>
            <a href="mailto:support@nomitime.com">support@nomitime.com</a>
          </span>
        </div>
        <br />
        <br />
      </div>
    );
  }

  render() {
    const { classes } = this.props;
    const { redirect } = this.state;

    return (
      <div className={classes.root}>
        {redirect && <Redirect to={redirect} />}
        <Navbar title="緊急連絡" gender={Backend.user.gender} />
        {this.renderContent()}
      </div>
    );
  }
}

EmergencyContact.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EmergencyContact);
