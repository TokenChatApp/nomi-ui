import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { NavLink, Redirect } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { womanColor } from "../../../Constants";
import manPicPlaceholder from "./man-profile-placeholder.png";
import { Backend } from "../../../services/Backend";
import Divider from "@material-ui/core/Divider";
import JobList from "./JobList";

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
    color: womanColor[1],
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
    color: womanColor[1],
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

  renderListings(type) {
    var array = [];
    for (var booking of Backend.bookings.data) {
      let timeString =
        booking.request_start_time.substring(0, 5) +
        " – " +
        booking.request_end_time.substring(0, 5);

      var manImg = Backend.imgUrl + booking.requestor.avatar;
      if (booking.requestor.avatar == null || !booking.requestor.avatar) {
        manImg = manPicPlaceholder;
      }

      if (
        (booking.status.toLowerCase() === "expired" && type === "expired") ||
        (booking.status.toLowerCase() === "confirmed" &&
          type === "confirmed") ||
        (booking.status.toLowerCase() === "pending" && type === "pending") ||
        (booking.status.toLowerCase() === "on going" && type === "ongoing") ||
        (booking.status.toLowerCase() === "completed" &&
          type === "completed") ||
        (booking.status.toLowerCase() === "accepted" && type === "accepted") ||
        (booking.status.toLowerCase() === "cancelled" &&
          type === "cancelled") ||
        (booking.status.toLowerCase() === "rejected" && type === "rejected")
      ) {
        array.push(
          <JobList
            image={manImg}
            jobStatus={booking.status.toUpperCase()}
            name={booking.requestor.display_name}
            date={booking.request_date}
            status={booking.status}
            pax={2}
            time={timeString}
            location={booking.place ? booking.place.place_name : ""}
          />
        );
      }
    }
    return array;
  }

  render() {
    const { classes } = this.props;
    const { tab, redirect } = this.state;

    return (
      <div className={classes.root}>
        {redirect && <Redirect to={redirect} />}
        <Navbar title="マイジョブページ" gender="F" />

        <div className={classes.navWrapper}>
          <NavLink to="/w" className={classes.navText}>
            {"< 戻る"}
          </NavLink>
        </div>
        <div className={classes.tabWrapper}>
          {this.renderListings("ongoing")}
          {this.renderListings("pending")}
          {this.renderListings("accepted")}
          {this.renderListings("confirmed")}
          {this.renderListings("rejected")}
          {this.renderListings("cancelled")}
        </div>
        <Divider />
        {this.renderListings("completed")}
        {this.renderListings("expired")}
        <br />
        <br />
        <br />
      </div>
    );
  }
}

Job.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Job);
