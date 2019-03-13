import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { NavLink, Redirect } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Navbar from "../components/Navbar";
import Grid from "@material-ui/core/Grid";
import { manColor, womanColor } from "../Constants";
import maleIcon from "../images/male.png";
import femaleIcon from "../images/female.png";

const styles = theme => ({
  root: {
    height: "100%",
    minHeight: "100vh",
    position: "relative"
  },
  label: {
    marginTop: 10,
    fontSize: "2rem",
    fontWeight: 700
  },
  description: {
    fontSize: "1rem",
    fontWeight: 400
  },
  container: {
    marginTop: 30
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
  navWrapper: {
    textAlign: "left",
    paddingTop: "10px",
    paddingLeft: "5%",
    paddingRight: "10%"
  },
  navText: {
    color: manColor[1],
    textDecoration: "none"
  }
});

const Divider = () => {
  const inlineStyle = {
    display: "inline-block",
    width: "30%"
  };

  return (
    <div
      style={{
        marginTop: 30,
        marginBottom: 30
      }}
    >
      <hr style={inlineStyle} />
      <span
        style={{
          padding: 10,
          fontSize: 20
        }}
      >
        or
      </span>
      <hr style={inlineStyle} />
    </div>
  );
};

const ManButton = props => {
  return (
    <div {...props}>
      <GenderButton gender={1} />
      <div>Man</div>
    </div>
  );
};

const GirlButton = props => {
  return (
    <div {...props}>
      <GenderButton gender={0} />
      <div>Woman</div>
    </div>
  );
};

const GenderButton = props => {
  const backgroundColor = props.gender
    ? `linear-gradient(to top, ${manColor[0]} , ${manColor[1]})`
    : `linear-gradient(to top, ${womanColor[0]} , ${womanColor[1]})`;

  const imgSrc = props.gender ? maleIcon : femaleIcon;
  const imgSize = 150;

  return (
    <div
      style={{
        background: backgroundColor,
        height: imgSize,
        width: imgSize,
        display: "flex",
        margin: "auto",
        borderRadius: "50%",
        cursor: "pointer"
      }}
    >
      <img
        style={{
          height: 80,
          alignSelf: "center",
          margin: "auto"
        }}
        src={imgSrc}
        alt=""
      />
    </div>
  );
};

class Signup extends React.Component {
  state = {
    redirect: ""
  };

  render() {
    const { classes } = this.props;
    const { redirect } = this.state;
    return (
      <div className={classes.root}>
        {redirect && <Redirect to={redirect} />}
        <Navbar title="SIGN UP" gender="F" isLoggedIn="false" />
        <div className={classes.navWrapper}>
          <NavLink to="/" className={classes.navText}>
            {"< Back"}
          </NavLink>
        </div>
        <Typography className={classes.label}>Hi there!</Typography>
        <Typography className={classes.description}>
          Select your gender
        </Typography>
        <Grid container className={classes.container}>
          <Grid item xs={12}>
            <ManButton
              onClick={() => this.setState({ redirect: "/m/signup" })}
            />
            <Divider />
            <GirlButton
              onClick={() => this.setState({ redirect: "/w/login" })}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Signup);
