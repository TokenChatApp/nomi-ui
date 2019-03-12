import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Navbar from "../../../components/Navbar";
import starsImg from "../../../images/stars.png";
import { manColor } from "../../../Constants";
import DateDetail from "./DateDetail";
import MainButton from "../../../components/MainButton";

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
    padding: 20,
    width: 70
  },
  imgContainer: {
    paddingTop: 20
  },
  description: {
    paddingLeft: "10%",
    paddingRight: "10%",
    color: "white"
  },
  title: {
    marginTop: 30,
    fontWeight: 700,
    fontSize: 23,
    color: "white"
  },
  button: {
    color: manColor[0],
    marginTop: 15,
    maxWidth: 200
  }
});

class Ended extends React.Component {
  state = {
    redirect: null
  };

  render() {
    const { classes } = this.props;
    const { redirect } = this.state;
    return (
      <div className={classes.root}>
        {redirect && <Redirect to={redirect} />}
        <div className={classes.fixedNav}>
          <Navbar title="" backTo="/m/dates" />
        </div>

        <DateDetail />

        <Typography className={classes.title} variant="h6">
          You have finished your date
        </Typography>
        <img className={classes.img} src={starsImg} alt="stars" />
        <Typography className={classes.description} variant="h6">
          How is your date?
        </Typography>
        <MainButton
          className={classes.button}
          onClick={() => this.setState({ redirect: "/m/dates/rating" })}
        >
          Rate the girls
        </MainButton>
      </div>
    );
  }
}

Ended.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Ended);
