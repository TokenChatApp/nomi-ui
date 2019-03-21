import React from "react";
import { Backend } from "../../services/Backend";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import classNames from "classnames";
import Typography from "@material-ui/core/Typography";
import Navbar from "../../components/Navbar";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Refresh from "@material-ui/icons/Refresh";
import Avatar from "@material-ui/core/Avatar";
import ServerRequest from "../../services/ServerRequest";
import dummyMan from "../../images/dummyMan.png";
import crownGold from "../../images/male/dashboard/crown_gold.svg";
import crownSilver from "../../images/male/dashboard/crown_silver.svg";

import { womanColor } from "../../Constants";

import NomiButton from "../../components/NomiButton";

var dateFormat = require("dateformat");

const styles = theme => ({
  root: {
    height: "100%",
    minHeight: "calc(100vh - 100px)",
    position: "relative",
    paddingTop: 100
  },
  fixedNav: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0
  },
  wrapper: {
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    textAlign: "left"
  },
  avatar: {
    width: 90,
    height: 90
  },
  button: {
    width: "100%",
    color: "white",
    maxWidth: 200,
    display: "block",
    margin: "auto",
    fontSize: "1rem",
    fontWeight: 700
  },
  earning: {
    fontSize: 16
  },
  title: {
    paddingTop: 20,
    color: "#a2a2a2",
    fontSize: 16
  },
  label: {
    color: "#434343",
    fontSize: 12
  },
  bubbleLabel: {
    color: "white",
    borderRadius: 6,
    padding: 4,
    fontSize: 11,
    fontWeight: 700
  },
  pinkLabel: {
    color: "#ff4e77"
  },
  infoWrapper: {
    padding: 10
  },
  description: {
    color: "#434343",
    fontSize: 10
  },
  des: {
    margin: 0,
    marginTop: 5,
    marginBottom: 10,
    color: "#7d7d7d",
    fontWeight: 400,
    fontSize: 13
  },
  alignLeft: {
    textAlign: "left"
  },
  alignCenter: {
    textAlign: "center"
  },
  formControl: {
    width: "100%"
  },
  select: {
    backgroundColor: "white",
    color: womanColor[1],
    borderRadius: 0,
    fontSize: "0.9rem",
    width: "100%",
    height: 24,
    fontWeight: 700,
    paddingLeft: 10
  },
  badge: {
    backgroundColor: womanColor[1]
  },
  crown: {
    width: 30,
    paddingRight: 10
  },
  refresh: {
    color: womanColor[1]
  },
  refreshIcon: {
    fontSize: 14
  },
  listContainer: {
    paddingTop: 30,
    paddingBottom: 30
  },
  manList: {
    paddingTop: 20,
    paddingBottom: 20
  },
  customBadge: {
    color: "white",
    position: "absolute",
    top: -16,
    right: 0,
    backgroundColor: womanColor[1],
    borderRadius: 20,
    padding: "0 10px",
    border: "2px solid white"
  },
  acceptButton: {
    fontSize: 16,
    width: "100px",
    margin: 0,
    height: "32px",
    padding: "0 19px"
  },
  rejectButton: {
    fontSize: 16,
    width: "100px",
    margin: 0,
    marginTop: 10,
    height: "32px",
    padding: "0 19px"
  },
  tag: {
    fontSize: 10,
    backgroundColor: "#ded2b5",
    color: "white",
    borderRadius: 5,
    padding: "3px 13px",
    display: "inline"
  },
  tinyText: {
    fontSize: 10,
    color: "#434343",
    textAlign: "center",
    marginTop: 30,
    marginBottom: 30
  }
});

const ManList = withStyles(styles)(props => {
  const { classes, name, pax, date, time, location, isInvited } = props;
  return (
    <Grid container className={classes.manList}>
      <Grid item xs={4}>
        <Avatar
          alt="M"
          src={"https://react.semantic-ui.com/images/avatar/large/matthew.png"}
          className={classes.avatar}
        />
      </Grid>
      <Grid item xs={5}>
        <Typography className={classes.earning} variant="h6">
          {name}
        </Typography>

        <h6 className={classes.des}>
          <span
            className={classes.bubbleLabel}
            style={{ backgroundColor: "#04dec2" }}
          >
            {isInvited ? "誘われた" : "お勧め"}
          </span>
        </h6>

        <Typography className={classes.label} variant="h6">
          {date}
        </Typography>
        <Typography className={classes.label} variant="h6">
          {time}
        </Typography>
        <Typography className={classes.label} variant="h6">
          {location}
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <NomiButton
          className={classes.acceptButton}
          onClick={() => props.handleAccept(props.request_id)}
        >
          受け取る
        </NomiButton>
        <NomiButton
          className={classes.rejectButton}
          onClick={() => props.handleReject(props.request_id)}
          isGray="true"
        >
          否定する
        </NomiButton>
      </Grid>
    </Grid>
  );
});

class WomanLanding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null
    };
  }

  handleAccept = request_id => {
    let dict = { request_id: request_id, accepted: 1 };
    let response = ServerRequest.acceptBooking(dict);
    response.then(r => {
      ServerRequest.getOwnBookings().then(r => {
        Backend.bookings = r;
        window.location.reload();
        alert(`この飲み会を受け取った！男性の確認の待ちです。`);
      });
    });
  };
  handleReject = request_id => {
    let dict = { request_id: request_id, accepted: 2 };
    let response = ServerRequest.acceptBooking(dict);
    response.then(r => {
      ServerRequest.getOwnBookings().then(r => {
        Backend.bookings = r;
        this.setState = { lol: "lol" };
      });
      alert(`You have rejected this job.`);
    });
  };

  renderListing() {
    var items = [];
    for (var booking of Backend.bookings.data) {
      if (booking.status == "Pending") {
        let dateString = dateFormat(booking.request_date, "yyyy年mm月dd日");
        let timeString =
          booking.request_start_time.substring(0, 5) +
          " – " +
          booking.request_end_time.substring(0, 5);

        var isInvited = false;
        for (var user of booking.users) {
          if (user.username === Backend.user.username) {
            isInvited = true;
          }
        }

        items.push(
          <ManList
            name={booking.requestor.display_name}
            time={timeString}
            date={dateString}
            location={booking.place ? booking.place.place_name : ""}
            handleAccept={this.handleAccept}
            handleReject={this.handleReject}
            request_id={booking.request_id}
            isInvited={isInvited}
          />
        );
      }
    }
    return items;
  }

  renderContent() {
    const { classes } = this.props;
    if (Backend.bookings === null) {
      return (
        <Grid item xs={12} className={classes.tinyText}>
          There are no jobs available at this moment.
        </Grid>
      );
    }
    if (Backend.bookings.data.length === 0) {
      return (
        <Grid item xs={12} className={classes.tinyText}>
          There are no jobs available at this moment.
        </Grid>
      );
    } else {
      return (
        <Grid item xs={12}>
          {this.renderListing()}
        </Grid>
      );
    }
  }

  renderCrown() {
    const { classes } = this.props;
    if (Backend.user.rate_level === 1) {
      return;
    } else if (Backend.user.rate_level === 2) {
      return (
        <Grid item>
          <img className={classes.crown} src={crownSilver} alt="crown" />
        </Grid>
      );
    } else {
      return (
        <Grid item>
          <img className={classes.crown} src={crownGold} alt="crown" />
        </Grid>
      );
    }
  }

  render() {
    const { classes } = this.props;
    const { redirect } = this.state;

    let welcomeString = `${Backend.user.display_name}, こんにちは`;

    var counter = 0;
    for (var booking of Backend.bookings.data) {
      if (
        booking.status.toLowerCase() === "confirmed" ||
        booking.status.toLowerCase() === "ongoing"
      ) {
        counter++;
      }
    }

    return (
      <div className={classes.root}>
        {redirect && <Redirect to={redirect} />}
        <div className={classes.fixedNav}>
          <Navbar title={welcomeString} gender="F" />
        </div>
        <div className={classes.wrapper}>
          <Grid container alignItems="center">
            <Grid item xs={6} className={classes.infoWrapper}>
              <Typography className={classes.earning} variant="h6">
                集めたポイント:
              </Typography>
              <Typography className={classes} variant="h6">
                ¥0
              </Typography>
            </Grid>
            <Grid item xs={6} className={classes.infoWrapper}>
              <NomiButton
                className={classes.button}
                onClick={() => this.setState({ redirect: "/w/dates" })}
              >
                {counter !== 0 ? (
                  <div className={classes.customBadge}>{counter}</div>
                ) : (
                  <div />
                )}
                マイジョブ
              </NomiButton>
            </Grid>
            <Grid
              item
              container
              xs={6}
              alignItems="center"
              className={classes.infoWrapper}
            >
              <Grid item xs={12}>
                <Typography className={classes.label} variant="h6">
                  マイランク
                </Typography>
              </Grid>
              {this.renderCrown()}
              <Grid item xs={8}>
                <span className={classes.pinkLabel}>
                  レベル {Backend.user.rate_level}
                </span>
              </Grid>
              <Typography className={classes.description} variant="h6">
                レート： ¥{Backend.user.rate_per_session.toLocaleString()}
              </Typography>
            </Grid>
            <Grid item xs={6} className={classes.infoWrapper}>
              <Grid container className={classes.alignLeft}>
                <Grid item xs={12}>
                  <FormControl className={classes.formControl} disabled>
                    <InputLabel shrink className={classes.inputLabel}>
                      状態
                    </InputLabel>
                    <Select native label="age" className={classes.select}>
                      <option value={0}>オンライン</option> // Available
                      <option value={1}>オフライン</option> // Offline
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            alignItems="center"
            justify="space-between"
            className={classes.listContainer}
          >
            {this.renderContent()}
          </Grid>
        </div>
      </div>
    );
  }
}

WomanLanding.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(WomanLanding);
