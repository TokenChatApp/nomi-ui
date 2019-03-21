import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Navbar from "../../components/Navbar";
import { manColor } from "../../Constants";
import MainButton from "../../components/MainButton";
import StarRate from "@material-ui/icons/StarRate";
import classNames from "classnames";
import { Backend } from "../../services/Backend";
import girlPhoto from "./woman-profile-placeholder.png";
import SimpleSlider from "./SimpleSlider";

import crownGold from "../../images/male/dashboard/crown_gold.svg";
import crownSilver from "../../images/male/dashboard/crown_silver.svg";

const styles = theme => ({
  root: {
    height: "100%",
    minHeight: "calc(100vh - 100px)",
    position: "relative",
    paddingTop: 96,
    background: `#3F9FFB`
  },
  fixedNav: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0
  },
  button: {
    color: manColor[1],
    width: "100%",
    maxWidth: 150,
    display: "block",
    margin: "auto",
    marginTop: 15,
    fontSize: "0.9rem",
    fontWeight: 500
  },
  remove: {
    backgroundColor: "#ff6161",
    color: "white",
    "&:hover": {
      backgroundColor: "#ff6161"
    }
  },
  starFilled: {
    marginLeft: -7,
    marginTop: -6,
    color: "white"
  },
  starEmpty: {
    marginLeft: -7,
    marginTop: -6,
    color: "#a5d1d8"
  },
  container: {
    color: "white",
    textAlign: "left",
    paddingLeft: 35,
    paddingRight: 35
  },
  detailTitle: {
    margin: 0,
    fontSize: 14,
    fontWeight: 500
  },
  detailValue: {
    margin: 0,
    fontSize: 13,
    fontWeight: 400
  },
  detailContainer: {
    padding: 5,
    paddingBottom: 10
  },
  girlName: {
    marginBottom: 7
  },
  crown: {
    width: 40
  }
});

const GenerateStars = withStyles(styles)(props => {
  const totalStars = 5;
  const { classes, rating } = props;
  return (
    <React.Fragment>
      {new Array(rating).fill(0).map(e => (
        <StarRate className={classes.starFilled} />
      ))}
      {new Array(totalStars - rating).fill(0).map(e => (
        <StarRate className={classes.starEmpty} />
      ))}
    </React.Fragment>
  );
});

const Detail = withStyles(styles)(props => {
  const { classes } = props;
  return (
    <React.Fragment>
      <h3 className={classes.detailTitle}>{props.title}</h3>
      <h6 className={classes.detailValue}>{props.value}</h6>
    </React.Fragment>
  );
});

class GirlProfile extends React.Component {
  state = {
    redirect: null,
    checked: false
  };

  handleToggle = event => {
    let { checked } = this.state;
    var url = "/m/listings";
    if (Backend.cameFromPendingPage) {
      url = "/m/dates/pending";
      Backend.bookings.data[Backend.selectedBooking].users[
        Backend.selectedListing
      ].isSelectedForCheckout = !checked;
    } else {
      Backend.listings[Backend.selectedListing].isSelected = !checked;
    }
    this.setState({ checked: !checked, redirect: url });
  };

  render() {
    const { classes } = this.props;
    const { redirect, checked } = this.state;

    var girl = Backend.listings[Backend.selectedListing];

    if (Backend.cameFromPendingPage) {
      girl =
        Backend.bookings.data[Backend.selectedBooking].users[
          Backend.selectedListing
        ];

      if (Backend.bookings.data.length === 0) {
        return <Redirect to={"/m/dates"} />;
      }
    } else {
      if (Backend.listings.length === 0) {
        return <Redirect to={"/m"} />;
      }
    }

    return (
      <div className={classes.root}>
        {redirect && <Redirect to={redirect} />}
        <div className={classes.fixedNav}>
          {Backend.cameFromPendingPage ? (
            <Navbar title="" backTo="/m/dates/pending" />
          ) : (
            <Navbar title="" backTo="/m/listings" />
          )}
        </div>
        <div style={{ paddingBottom: 0 }}>
          {girl.avatar === null || !girl.avatar ? (
            <img style={{ width: "100%" }} src={girlPhoto} alt="girl" />
          ) : (
            <img
              style={{ width: "100%" }}
              src={Backend.imgUrl + girl.avatar}
              alt="girl"
            />
          )}
        </div>
        <Grid container alignItems="center" className={classes.container}>
          <Grid item xs={12} className={classes.detailContainer}>
            {girl.level === 1 || !girl.level ? (
              <div />
            ) : girl.level === 2 ? (
              <img className={classes.crown} alt="crown" src={crownSilver} />
            ) : (
              <img className={classes.crown} alt="crown" src={crownGold} />
            )}

            <h2 className={classes.girlName}>{girl.display_name}</h2>
            <GenerateStars rating={3} />
          </Grid>
          <Grid item xs={12}>
            {checked ? (
              <MainButton
                style={{
                  margin: "auto auto auto 0",
                  marginTop: 10,
                  marginBottom: 25
                }}
                className={classNames(classes.button, classes.remove)}
                onClick={this.handleToggle}
              >
                削除する
              </MainButton>
            ) : (
              <MainButton
                style={{
                  margin: "auto auto auto 0",
                  marginTop: 10,
                  marginBottom: 25
                }}
                className={classes.button}
                onClick={this.handleToggle}
              >
                選ぶ
              </MainButton>
            )}
          </Grid>
        </Grid>

        <Grid
          container
          alignItems="center"
          justify="flex-end"
          className={classes.container}
        >
          <Grid item xs={6} className={classes.detailContainer}>
            <Detail title="年齢" value={girl.age} />
          </Grid>
          <Grid item xs={3} className={classes.detailContainer}>
            <Detail title="体重" value={girl.weight + "kg"} />
          </Grid>
          <Grid item xs={3} className={classes.detailContainer}>
            <Detail title="身長" value={girl.height + "cm"} />
          </Grid>
          <Grid item xs={6} className={classes.detailContainer}>
            <Detail title="国籍" value={girl.nationality} />
          </Grid>
          <Grid item xs={6} className={classes.detailContainer}>
            <Detail title="言語" value={girl.language} />
          </Grid>
          <Grid item xs={6} className={classes.detailContainer}>
            <Detail
              title="レート"
              value={"¥" + girl.rate_per_session.toLocaleString()}
            />
          </Grid>
        </Grid>
        <br />
        <br />
      </div>
    );
  }
}

GirlProfile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GirlProfile);
