import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";

import { womanColor } from "../../../Constants";

const statusList = [
  {
    status: "ongoing",
    color: "#7ae43a",
    redirect: "/m/dates/ongoing"
  },
  {
    status: "expired",
    color: "#c3c3c3",
    redirect: "/m/dates/expired"
  },
  {
    status: "accepted",
    color: "#ffc800",
    redirect: "/m/dates/accepted"
  },
  {
    status: "confirmed",
    color: "#04dec2",
    redirect: "/m/dates/confirmed"
  },
  {
    status: "cancelled",
    color: "#c3c3c3",
    redirect: "/m/dates/expired"
  },
  {
    status: "rejected",
    color: "#c3c3c3",
    redirect: "/m/dates/expired"
  },
  {
    status: "completed",
    color: "#e66060",
    redirect: "/m/dates/confirmed"
  }
];

const imgSize = 90;

const styles = theme => ({
  root: {
    flexGrow: 1,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 25
  },
  girlAvatar: {
    width: imgSize,
    height: imgSize,
    borderRadius: "50%",
    marginLeft: -25,
    backgroundColor: "#cccccc"
  },
  badge: {
    left: -40,
    top: 10,
    backgroundColor: womanColor[1],
    right: "auto",
    zIndex: 1200
  },
  alignLeft: {
    textAlign: "left"
  },
  alignRight: {
    textAlign: "right"
  },
  des: {
    margin: 0,
    marginTop: 5,
    color: "#7d7d7d",
    fontWeight: 400,
    fontSize: 13
  },
  label: {
    color: "white",
    borderRadius: 6,
    padding: 4,
    fontSize: 11,
    fontWeight: 700
  },
  name: {
    fontSize: 24,
    margin: 0,
    fontWeight: 500
  },
  avatar: {
    height: imgSize,
    width: imgSize
  }
});

class JobList extends React.Component {
  state = {
    redirect: null,
    stateIndex: 0
  };

  componentDidMount() {
    let { jobStatus } = this.props;
    let stateIndex = statusList.map(e => e.label).indexOf(jobStatus);
    this.setState({ stateIndex });
  }

  handleMore = redirect => event => {
    this.setState({ redirect });
  };

  render() {
    const {
      classes,
      image,
      name,
      time,
      pax,
      location,
      date,
      status
    } = this.props;
    const { stateIndex, redirect } = this.state;
    const jobStatus = statusList[stateIndex];
    var backgroundColor = "";
    for (var statusClass of statusList) {
      if (statusClass.status === status.toLowerCase()) {
        backgroundColor = statusClass.color;
      }
    }
    return (
      <div className={classes.root}>
        {redirect && <Redirect to={redirect} />}
        <Grid container alignItems="center" className={classes.container}>
          <Grid item xs={4} className={classes.alignLeft}>
            <Avatar alt="M" src={image} className={classes.avatar} />
          </Grid>
          <Grid item xs={5} className={classes.alignLeft}>
            <h6 className={classes.name}>{name}</h6>
            <h6 className={classes.des}>{date}</h6>
            <h6 className={classes.des}>{time}</h6>
            <h6 className={classes.des}>{location}</h6>
          </Grid>
          <Grid item xs={3} className={classes.alignRight}>
            <h6 className={classes.des}>
              <span
                className={classes.label}
                style={{ backgroundColor: backgroundColor }}
              >
                {status}
              </span>
            </h6>
          </Grid>
        </Grid>
      </div>
    );
  }
}

JobList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(JobList);
