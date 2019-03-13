import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import { manColor } from "../../../Constants";
import JobList from "./JobList";
import { Backend } from "../../../services/Backend";

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

  renderBookings() {
    var items = [];
    for (var booking of Backend.bookings.data) {
      console.log(booking);
      let timeString = `${booking.request_start_time.substring(0, 5)}
      – ${booking.request_end_time.substring(0, 5)}`;

      var avatarArray = [];
      for (var user of booking.users) {
        avatarArray.push(Backend.imgUrl + user.avatar);
      }
      items.push(
        <JobList
          key={booking.request_id}
          images={avatarArray}
          jobStatus={booking.status.toUpperCase()}
          date={booking.request_date}
          time={timeString}
          location={booking.place ? booking.place.place_name : ""}
        />
      );
    }
    return items;
  }

  render() {
    const { classes } = this.props;
    const { redirect } = this.state;

    return (
      <div className={classes.root}>
        {redirect && <Redirect to={redirect} />}
        <Navbar title="My Dates" gender="M" />
        <div className={classes.tabWrapper}>{this.renderBookings()}</div>
      </div>
    );
  }
}

Job.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Job);
