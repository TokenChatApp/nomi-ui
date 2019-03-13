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

const manList = [
  {
    name: "Hanako",
    pax: 2,
    time: "10:00 - 12:00",
    location: "City, Place",
    method: "BY INVITATION"
  },
  {
    name: "Hanako",
    pax: 2,
    time: "10:00 - 12:00",
    location: "City, Place",
    method: "BY INVITATION"
  },
  {
    name: "Hanako",
    pax: 2,
    time: "10:00 - 12:00",
    location: "City, Place",
    method: "BY INVITATION"
  },
  {
    name: "Hanako",
    pax: 2,
    time: "10:00 - 12:00",
    location: "City, Place",
    method: "BY INVITATION"
  }
];

const ManList = withStyles(styles)(props => {
  const { classes, name, pax, date, time, location } = props;
  return (
    <Grid container className={classes.manList}>
      <Grid item xs={4}>
        <Avatar alt="M" src={dummyMan} className={classes.avatar} />
      </Grid>
      <Grid item xs={5}>
        <Typography className={classes.earning} variant="h6">
          {name}
        </Typography>
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
          Accept
        </NomiButton>
        <NomiButton
          className={classes.rejectButton}
          onClick={() => props.handleReject(props.request_id)}
          isGray="true"
        >
          Reject
        </NomiButton>
      </Grid>
    </Grid>
  );
});

class WomanLanding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
      manList: manList
    };
  }

  handleAccept = request_id => {
    let dict = { request_id: request_id, accepted: 1 };
    let response = ServerRequest.acceptBooking(dict);
    response.then(r => {
      ServerRequest.getOwnBookings().then(r => {
        Backend.bookings = r;
        this.setState = { lol: "lol" };
      });
    });
  };
  handleReject = request_id => {
    alert(`reject ${request_id}`);
  };

  renderListing() {
    var items = [];
    for (var listing of Backend.bookings.data) {
      let dateString = dateFormat(listing.request_date, "dd mmm yyyy");
      let timeString =
        listing.request_start_time.substring(0, 5) +
        " – " +
        listing.request_end_time.substring(0, 5);

      items.push(
        <ManList
          name={listing.requestor.display_name}
          time={timeString}
          date={dateString}
          location={listing.place ? listing.place.place_name : ""}
          handleAccept={this.handleAccept}
          handleReject={this.handleReject}
          request_id={listing.request_id}
        />
      );
    }
    return items;
  }

  renderContent() {
    const { classes } = this.props;

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
    const { redirect, manList } = this.state;

    let welcomeString = `Hello, ${Backend.user.display_name}`;

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
                Total Earnings:
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
                <div className={classes.customBadge}>10</div>
                My Jobs
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
                  MY LEVEL
                </Typography>
              </Grid>
              {this.renderCrown()}
              <Grid item xs={8}>
                <span className={classes.pinkLabel}>
                  Level {Backend.user.rate_level}
                </span>
              </Grid>
              <Typography className={classes.description} variant="h6">
                ¥{Backend.user.rate_per_session.toLocaleString()} / session
              </Typography>
            </Grid>
            <Grid item xs={6} className={classes.infoWrapper}>
              <Grid container className={classes.alignLeft}>
                <Grid item xs={12}>
                  <FormControl className={classes.formControl} disabled>
                    <InputLabel shrink className={classes.inputLabel}>
                      MY STATUS
                    </InputLabel>
                    <Select native label="age" className={classes.select}>
                      <option value={0}>Available</option>
                      <option value={1}>Not-Available</option>
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
