import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import girlImg from "../../../images/dummyGirl.png";
import classNames from "classnames";
import { Backend } from "../../../services/Backend";
import NomiButton from "../../../components/NomiButton";

var dateFormat = require("dateformat");

const styles = theme => ({
  girlImg: {
    width: 70,
    height: 70,
    borderRadius: "50%",
    padding: 5,
    objectFit: "cover"
  },
  imgContainer: {
    paddingTop: 20
  },
  arrow: {
    cursor: "pointer",
    fontSize: 27
  },
  title: {
    margin: 0,
    fontWeight: 400,
    fontSize: 24
  },
  detailWrapper: {
    color: "#8a8a8a",
    backgroundColor: "white",
    padding: 15
  },
  alignLeft: {
    textAlign: "left",
    padding: 10
  },
  alignRight: {
    textAlign: "right",
    padding: 10
  },
  button: {
    maxWidth: "80%",
    marginTop: 15,
    fontSize: "0.9rem"
  }
});

class DateDetail extends React.Component {
  state = {
    girls: [],
    currentGirls: [],
    page: 0
  };

  componentDidMount() {
    var girls = [];
    for (var girl of Backend.bookings.data[Backend.selectedBooking].users) {
      if (girl.is_selected) {
        girls.push(girl);
      }
    }
    this.setState({ girls });
  }

  handleBack = () => {
    let { page } = this.state;
    if (page === 0) return false;
    this.getCurrentGirl(page - 1);
  };

  render() {
    const { classes } = this.props;
    const { girls } = this.state;
    let booking = Backend.bookings.data[Backend.selectedBooking];
    let timeString = `${booking.request_start_time.substring(0, 5)}
      – ${booking.request_end_time.substring(0, 5)}`;
    var placeName = "";

    if (!booking.place || booking.place === null) {
    } else {
      placeName = booking.place.place_name;
    }

    return (
      <Grid container className={classes.detailWrapper}>
        <Grid item xs={12} className={classes.alignLeft}>
          {dateFormat(booking.request_date, "yyyy年 mm月 dd日")}
        </Grid>
        <Grid item xs={12} className={classes.alignLeft}>
          {timeString}
        </Grid>
        <Grid item xs={12} className={classes.alignLeft}>
          {placeName}
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            className={classes.imgContainer}
            alignItems="center"
            justify="space-between"
          >
            <Grid item xs={12}>
              <div>
                {girls.map(girl => (
                  <div>
                    <img
                      className={classes.girlImg}
                      src={Backend.imgUrl + girl.avatar}
                      alt="girl"
                    />
                    <br />
                    <b>{girl.display_name}</b>
                    <br />

                    <Grid item xs={12}>
                      <NomiButton
                        className={classes.button}
                        gender="M"
                        type="submit"
                        href={"https://chat.lolchat.net/" + girl.username}
                      >
                        chatで @{girl.username} に連絡する
                      </NomiButton>
                    </Grid>
                    <br />
                    <br />
                    <br />
                  </div>
                ))}
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

DateDetail.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DateDetail);
