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

import dummyMan from "../../images/dummyMan.png";
import crown from "../../images/male/dashboard/crown_gold.svg";

import { womanColor } from "../../Constants";

import NomiButton from "../../components/NomiButton";

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
  goldLabel: {
    color: "#b38e34",
    paddingLeft: 10
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
    width: 30
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
    width: "auto",
    margin: 0,
    height: "auto",
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
  const { classes, name, pax, time, location, method } = props;
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
          {pax}pax | {time}
        </Typography>
        <Typography className={classes.label} variant="h6">
          {location}
        </Typography>
        <Typography className={classes.tag} variant="span">
          {method}
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <NomiButton
          className={classes.acceptButton}
          onClick={() => alert("accept")}
        >
          Accept
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

  renderListing() {
    var items = [];
    console.log(Backend.bookings);
    for (var listing of Backend.bookings.data) {
      items.push(<ManList name={listing.display_name} />);
    }
    return items;
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
                Total Earning :
              </Typography>
              <Typography className={classes} variant="h6">
                2,000
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
              <Grid item>
                <img className={classes.crown} src={crown} alt="crown" />
              </Grid>
              <Grid item xs={8}>
                <span className={classes.goldLabel}>Prestige</span>
              </Grid>
              <Typography className={classes.description} variant="h6">
                20,000 / session
              </Typography>
            </Grid>
            <Grid item xs={6} className={classes.infoWrapper}>
              <Grid container className={classes.alignLeft}>
                <Grid item xs={12}>
                  <FormControl className={classes.formControl}>
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
            <Grid item>
              <Typography className={classes.title} variant="h6">
                Today's recommended jobs
              </Typography>
            </Grid>
            <Grid
              item
              className={classes.refresh}
              onClick={() => alert("Refresh")}
            >
              <Refresh className={classes.refreshIcon} />
              <span> Refresh</span>
            </Grid>
            <Grid item xs={12}>
              {this.renderListing()}
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.title} variant="h6">
                14 Nov 2019
              </Typography>
            </Grid>
            <Grid item xs={12}>
              {manList.map(e => (
                <ManList {...e} />
              ))}
            </Grid>
            {/* Render this if no man found */}
            <Grid item xs={12} className={classes.tinyText}>
              There is no available job
            </Grid>
            <Grid
              item
              xs={12}
              className={classNames(classes.refresh, classes.alignCenter)}
              onClick={() => alert("Refresh")}
            >
              <Refresh className={classes.refreshIcon} />
              <span> Refresh</span>
            </Grid>
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
