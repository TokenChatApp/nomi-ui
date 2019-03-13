import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import { manColor } from "../../../Constants";
import girlImg from "../../../images/male/dashboard/girl_photo_2.jpg";
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

// fake data
const images4 = [girlImg, girlImg, girlImg, girlImg];
const images3 = [girlImg, girlImg, girlImg];
const images2 = [girlImg, girlImg];
const images1 = [girlImg];

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
    console.log(Backend.bookings.data);
    for (var booking of Backend.bookings.data) {
      let timeString = `${booking.request_start_time.substring(0, 5)}
      – ${booking.request_end_time.substring(0, 5)}`;
      items.push(
        <JobList
          key={booking.request_id}
          images={images4}
          jobStatus={booking.status.toUpperCase()}
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
        <div className={classes.tabWrapper}>
          <h3 className={classes.title}>14 Nov 2019</h3>
          {this.renderBookings()}
        </div>
      </div>
    );
  }
}

Job.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Job);
