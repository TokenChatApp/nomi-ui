import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { NavLink, Redirect } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import { manColor } from "../../../Constants";
import JobList from "./JobList";
import { Backend } from "../../../services/Backend";
import Divider from "@material-ui/core/Divider";

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
  activeTab: {
    color: manColor[1],
    backgroundColor: "white"
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
  },
  navText: {
    color: manColor[1],
    textDecoration: "none"
  },
  navWrapper: {
    textAlign: "left",
    paddingTop: "15px",
    paddingLeft: "5%",
    paddingRight: "10%",
    marginBottom: 5
  }
});

class Job extends React.Component {
  state = {
    redirect: null,
    tab: 0
  };

  handleChange = (event, value) => {
    this.setState({ tab: value });
  };

  renderBookings(type) {
    var items = [];
    for (var [i, booking] of Backend.bookings.data.entries()) {
      let timeString = `${booking.request_start_time.substring(0, 5)}
      – ${booking.request_end_time.substring(0, 5)}`;

      var avatarArray = [];
      var numberOfAccepted = 0;
      for (var user of booking.users) {
        avatarArray.push(Backend.imgUrl + user.avatar);
        if (user.is_accepted) {
          numberOfAccepted++;
        }
      }
      if (
        (booking.status.toLowerCase() === "expired" && type === "expired") ||
        (booking.status.toLowerCase() === "confirmed" &&
          type === "confirmed") ||
        (booking.status.toLowerCase() === "pending" && type === "pending") ||
        (booking.status.toLowerCase() === "on going" && type === "ongoing") ||
        (booking.status.toLowerCase() === "completed" && type === "completed")
      ) {
        items.push(
          <JobList
            key={booking.request_id}
            bookingIndex={i}
            images={avatarArray}
            jobStatus={booking.status.toUpperCase()}
            date={dateFormat(booking.request_date, "yyyy年mm月dd日")}
            time={timeString}
            location={booking.place ? booking.place.place_name : ""}
            numberOfAccepted={numberOfAccepted}
          />
        );
      }
    }
    return items;
  }

  render() {
    const { classes } = this.props;
    const { redirect } = this.state;

    return (
      <div className={classes.root}>
        {redirect && <Redirect to={redirect} />}
        <Navbar title="マイデート" gender="M" />
        <div className={classes.navWrapper}>
          <NavLink to="/m" className={classes.navText}>
            {"< 戻る"}
          </NavLink>
        </div>
        <div className={classes.tabWrapper}>
          {this.renderBookings("ongoing")}
          {this.renderBookings("pending")}
          {this.renderBookings("confirmed")}
        </div>
        <Divider style={{ marginTop: 10, marginBottom: 25 }} />
        <div className={classes.tabWrapper}>
          {this.renderBookings("completed")}
          {this.renderBookings("expired")}
        </div>
      </div>
    );
  }
}

Job.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Job);
