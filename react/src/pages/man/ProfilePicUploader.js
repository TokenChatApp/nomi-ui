import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Navbar from "../../components/Navbar";
import { Redirect } from "react-router-dom";
import captureSrc from "../../images/camera.png";
import chooseSrc from "../../images/upload.png";
import { manColor } from "../../Constants";
import MainButton from "../../components/MainButton";

const styles = theme => ({
  rootMan: {
    height: "100%",
    minHeight: "calc(100vh - 165px)",
    position: "relative",
    paddingTop: 165,
    background: `linear-gradient(to top, ${manColor[0]}, ${manColor[1]})`
  },
  rootWoman: {
    height: "100%",
    minHeight: "calc(100vh - 165px)",
    position: "relative",
    paddingTop: 165,
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
  }
});

const Divider = () => {
  const inlineStyle = {
    display: "inline-block",
    width: "30%",
    height: 1,
    border: 0,
    backgroundColor: "white"
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
          fontSize: 20,
          color: "white"
        }}
      >
        or
      </span>
      <hr style={inlineStyle} />
    </div>
  );
};

const imgStyle = { width: 50 };
const textStyle = {
  color: "white",
  margin: 0,
  fontSize: "1rem",
  fontWeight: 400,
  marginTop: 10
};

const CapturePhoto = props => {
  return (
    <div {...props}>
      <img style={imgStyle} src={captureSrc} alt="capture" />
      <h6 style={textStyle}>Capture a photo</h6>
    </div>
  );
};

const ChoosePhoto = props => {
  return (
    <div {...props}>
      <img style={imgStyle} src={chooseSrc} alt="choose" />
      <h6 style={textStyle}>Choose file to upload</h6>
    </div>
  );
};

class ProfilePicUploader extends React.Component {
  state = {
    redirect: null
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.rootMan}>
        {this.state.redirect && <Redirect to={this.state.redirect} />}
        <div className={classes.fixedNav}>
          <Navbar title="SIGN UP" isLoggedIn="false" />
          <MainButton
            className={classes.button}
            onClick={() => this.setState({ redirect: "/m/signup" })}
          >
            Back
          </MainButton>
        </div>
        <br />
        <br />
        <CapturePhoto />
        <Divider />
        <ChoosePhoto />
      </div>
    );
  }
}

ProfilePicUploader.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfilePicUploader);
