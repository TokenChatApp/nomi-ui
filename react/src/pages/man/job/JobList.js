import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Badge from "@material-ui/core/Badge";
import { Backend } from "../../../services/Backend";

import { manColor } from "../../../Constants";

const statusList = [
  {
    labelJap: "進行中",
    label: "ON GOING",
    color: "#7ae43a",
    redirect: "/m/dates/ongoing"
  },
  {
    labelJap: "期限切れ",
    label: "EXPIRED",
    color: "#c3c3c3",
    redirect: "/m/dates/expired"
  },
  {
    labelJap: "ペンディング",
    label: "PENDING",
    color: "#ffc800",
    redirect: "/m/dates/pending"
  },
  {
    labelJap: "確認済み",
    label: "CONFIRMED",
    color: "#04dec2",
    redirect: "/m/dates/confirmed"
  },
  {
    labelJap: "終了",
    label: "COMPLETED",
    color: "#e66060",
    redirect: "/m/dates/ended"
  }
];

const imgSize = 60;

const styles = theme => ({
  root: {
    flexGrow: 1,
    paddingLeft: 50,
    paddingTop: 25
  },
  girlAvatar: {
    width: imgSize,
    height: imgSize,
    borderRadius: "50%",
    marginLeft: -25,
    backgroundColor: "#cccccc",
    objectFit: "cover"
  },
  badge: {
    left: -40,
    top: 10,
    backgroundColor: manColor[1],
    right: "auto",
    zIndex: 1200
  },
  alignLeft: {
    textAlign: "left"
  },
  desTop: {
    margin: 0,
    marginTop: 10,
    color: "#7d7d7d",
    fontWeight: 400,
    fontSize: 13
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
    padding: 6,
    marginLeft: -6,
    fontWeight: 700
  },
  more: {
    cursor: "pointer",
    backgroundColor: manColor[1],
    color: "white",
    padding: 7,
    paddingBottom: 10,
    paddingTop: 0,
    borderRadius: 20,
    fontSize: 23,
    fontWeight: 900
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

  renderBadge() {
    const { classes, images } = this.props;
    return (
      <Grid item xs={5} className={classes.alignLeft}>
        <Badge
          badgeContent={images.length}
          color="primary"
          classes={{ badge: classes.badge }}
        >
          {images.length ? (
            images.map((e, i) =>
              i > 2 ? (
                ""
              ) : (
                <img
                  className={classes.girlAvatar}
                  style={{ zIndex: 1000 - i }}
                  src={e}
                  alt="girlAvatar"
                />
              )
            )
          ) : (
            <div className={classes.girlAvatar} />
          )}
        </Badge>
      </Grid>
    );
  }

  renderDotsButton() {
    const { classes, numberOfAccepted } = this.props;
    const jobStatus = statusList[this.state.stateIndex];
    if (
      jobStatus.label === "PENDING" ||
      jobStatus.label === "CONFIRMED" ||
      jobStatus.label === "ENDED"
    ) {
      Backend.selectedBooking = this.props.bookingIndex;
      return (
        <Grid item xs={2} className={classes.alignLeft}>
          <span
            className={classes.more}
            onClick={this.handleMore(jobStatus.redirect)}
          >
            ...
          </span>
        </Grid>
      );
    } else {
      return;
    }
  }

  renderLabel() {
    const { classes, numberOfAccepted } = this.props;
    const jobStatus = statusList[this.state.stateIndex];
    if (numberOfAccepted > 0 && jobStatus.label === "PENDING") {
      return (
        <h6 className={classes.des}>
          <span
            className={classes.label}
            style={{ backgroundColor: "#04dec2" }}
          >
            {numberOfAccepted} 人受け取った!
          </span>
        </h6>
      );
    }
    return (
      <h6 className={classes.des}>
        <span
          className={classes.label}
          style={{ backgroundColor: jobStatus.color }}
        >
          {jobStatus.labelJap}
        </span>
      </h6>
    );
  }

  render() {
    const { classes, time, date, location } = this.props;
    const { stateIndex, redirect } = this.state;
    const jobStatus = statusList[stateIndex];
    return (
      <div className={classes.root}>
        {redirect && <Redirect to={redirect} />}
        <Grid container alignItems="center" className={classes.container}>
          {this.renderBadge()}
          <Grid item xs={5} className={classes.alignLeft}>
            {this.renderLabel()}
            <h6 className={classes.desTop}>{date}</h6>
            <h6 className={classes.des}>{time}</h6>
            <h6 className={classes.des}>{location}</h6>
          </Grid>
          {this.renderDotsButton()}
        </Grid>
      </div>
    );
  }
}

JobList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(JobList);
