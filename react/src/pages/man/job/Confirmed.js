import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Navbar from "../../../components/Navbar";
import clockImg from "../../../images/clock.png";
import { manColor } from "../../../Constants";
import DateDetail from "./DateDetail";
import { Backend } from "../../../services/Backend";

const styles = theme => ({
  root: {
    height: "100%",
    minHeight: "calc(100vh - 100px)",
    position: "relative",
    paddingTop: 100,
    background: `linear-gradient(to top, ${manColor[0]}, ${manColor[1]})`
  },
  fixedNav: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0
  },
  img: {
    paddingTop: 50,
    width: 60
  },
  imgContainer: {
    paddingTop: 20
  },
  remaining: {
    marginTop: 20,
    paddingLeft: "10%",
    paddingRight: "10%",
    color: "white"
  },
  timer: {
    marginTop: 0,
    color: "white"
  }
});

class Confirmed extends React.Component {
  state = {
    redirect: null
  };

  render() {
    const { classes } = this.props;
    const { redirect } = this.state;

    // let selectedBooking = Backend.bookings.data[Backend.selectedBooking];
    // var date1 = new Date();
    // var date2 = Date(
    //   selectedBooking.request_date + "T" + selectedBooking.request_start_time
    // );
    // console.log(date2);
    // var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    // var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return (
      <div className={classes.root}>
        {redirect && <Redirect to={redirect} />}
        <div className={classes.fixedNav}>
          <Navbar title="" backTo="/m/dates" />
        </div>

        <DateDetail />

        <img className={classes.img} src={clockImg} alt="clock" />
        <Typography className={classes.remaining} variant="h6">
          飲み会がスタートするまで：
        </Typography>
        <Typography className={classes.timer} variant="h6">
          2日、2時、1分
        </Typography>
      </div>
    );
  }
}

Confirmed.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Confirmed);
