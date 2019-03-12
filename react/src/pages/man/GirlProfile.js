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

import SimpleSlider from "./SimpleSlider";

import crownGold from "../../images/male/dashboard/crown_gold.svg";

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
  button: {
    color: manColor[1],
    width: "100%",
    maxWidth: 200,
    display: "block",
    margin: "auto",
    marginTop: 15,
    fontSize: "1rem",
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
    this.setState({ checked: !checked });
  };

  render() {
    const { classes } = this.props;
    const { redirect, checked } = this.state;

    return (
      <div className={classes.root}>
        {redirect && <Redirect to={redirect} />}
        <div className={classes.fixedNav}>
          <Navbar title="" backTo="/m/listings" />
        </div>
        <div style={{ paddingBottom: 30 }}>
          <SimpleSlider />
        </div>
        <Grid container alignItems="center" className={classes.container}>
          <Grid item xs={6} className={classes.detailContainer}>
            <img className={classes.crown} alt="crown" src={crownGold} />
            <h2 className={classes.girlName}>Hanako</h2>
            <GenerateStars rating={3} />
          </Grid>
          <Grid item xs={6}>
            {checked ? (
              <MainButton
                className={classNames(classes.button, classes.remove)}
                onClick={this.handleToggle}
              >
                Remove
              </MainButton>
            ) : (
              <MainButton
                className={classes.button}
                onClick={this.handleToggle}
              >
                SELECT
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
            <Detail title="AGE" value="29" />
          </Grid>
          <Grid item xs={3} className={classes.detailContainer}>
            <Detail title="WEIGHT" value="50" />
          </Grid>
          <Grid item xs={3} className={classes.detailContainer}>
            <Detail title="HEIGHT" value="160" />
          </Grid>
          <Grid item xs={6} className={classes.detailContainer}>
            <Detail title="NATIONALITY" value="Japan" />
          </Grid>
          <Grid item xs={6} className={classes.detailContainer}>
            <Detail title="SPOKEN LANGUAGE" value="Japanese, English" />
          </Grid>
          <Grid item xs={6} className={classes.detailContainer}>
            <Detail title="RATE" value="100/session" />
          </Grid>
        </Grid>
      </div>
    );
  }
}

GirlProfile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GirlProfile);
