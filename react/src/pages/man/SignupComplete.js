import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Navbar from "../../components/Navbar";
import heartImgSrc from "../../images/heart.png";
import { manColor } from "../../Constants";
import MainButton from "../../components/MainButton";

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
    color: manColor[0],
    maxWidth: 200,
    display: "block",
    margin: "auto",
    marginTop: 15,
    fontSize: "1rem",
    fontWeight: 700
  },
  img: {
    width: 150
  },
  title: {
    marginTop: 20,
    paddingLeft: "10%",
    paddingRight: "10%",
    color: "white"
  }
});

class SignupComplete extends React.Component {
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
          <Navbar title="" />
        </div>
        <img className={classes.img} src={heartImgSrc} alt="heart" />
        <Typography className={classes.title} variant="h6">
          Get ready for your date!
        </Typography>
        <Typography className={classes.title}>
          Get ready for your date! Get ready for your date! Get ready for your
          date! Get ready for your date! Get ready for your date! Get ready for
          your date! Get ready for your date!
        </Typography>
        <div>
          <MainButton
            className={classes.button}
            onClick={() => this.setState({ redirect: "/m" })}
          >
            すぐ予約しよう！
          </MainButton>
        </div>
      </div>
    );
  }
}

SignupComplete.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignupComplete);
