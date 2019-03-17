import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Navbar from "../../components/Navbar";
import { Redirect } from "react-router-dom";
import captureSrc from "../../images/camera.png";
import chooseSrc from "../../images/upload.png";
import { womanColor, manColor } from "../../Constants";
import MainButton from "../../components/MainButton";
import { Backend } from "../../services/Backend";
import Camera, { FACING_MODES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";

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
    background: `linear-gradient(to top, ${womanColor[0]}, ${womanColor[1]})`
  },
  fixedNav: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0
  },
  button: {
    color: womanColor[0],
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
const imgPreviewStyle = { width: 200 };
const textStyle = {
  color: "white",
  margin: 0,
  fontSize: "1rem",
  fontWeight: 400,
  marginTop: 10
};

class ProfilePicUploader extends React.Component {
  state = {
    redirect: null,
    cameraIsOn: false
  };

  constructor(props) {
    super(props);
    this.handleUploadClicked = this.handleUploadClicked.bind(this);
  }

  onTakePhoto(dataUri) {
    Backend.user.profileImage = dataUri;

    var redirectString = "/w/signup";
    if (this.props.gender === "M") {
      redirectString = "/m/signup";
    }
    this.setState({ redirect: redirectString });
  }

  onDrop(picture) {
    this.setState({
      pictures: this.state.pictures.concat(picture)
    });
  }

  handleUploadClicked(e) {
    this.refs.fileUploader.click();
  }

  onImageChange = event => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = e => {
        this.setState({ image: e.target.result });
        Backend.user.profileImage = e.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
      Backend.user.profileImageFile = event.target.files[0];
    }
    Backend.user.profileImage = this.state.image;

    var redirectString = "/w/signup";
    if (this.props.gender === "M") {
      redirectString = "/m/signup";
    }
    this.setState({ redirect: redirectString });
  };

  render() {
    const { classes } = this.props;
    var redirectString = "/w/signup";
    if (this.props.gender === "M") {
      redirectString = "/m/signup";
    }
    return (
      <div
        className={
          this.props.gender === "M" ? classes.rootMan : classes.rootWoman
        }
      >
        {this.state.redirect && <Redirect to={this.state.redirect} />}
        <div className={classes.fixedNav}>
          <Navbar title="サインアップ" isLoggedIn="false" />
          <MainButton
            className={classes.button}
            onClick={() => this.setState({ redirect: redirectString })}
          >
            戻る
          </MainButton>
        </div>
        <br />
        <br />
        <div>
          {this.state.cameraIsOn ? (
            <Camera
              style={{ width: 200 }}
              onTakePhoto={dataUri => {
                this.onTakePhoto(dataUri);
              }}
              idealFacingMode={FACING_MODES.USER}
              isFullScreen={true}
            />
          ) : (
            <div>
              <img
                style={imgStyle}
                src={captureSrc}
                alt="capture"
                onClick={() => this.setState({ cameraIsOn: true })}
              />
              <h6 style={textStyle}>写真を撮る</h6>
            </div>
          )}
        </div>
        <Divider />
        <div>
          <img
            style={imgStyle}
            src={chooseSrc}
            alt="choose"
            onClick={this.handleUploadClicked}
          />
          <h6 style={textStyle}>写真をアップする</h6>
          <br />
          <img
            alt=""
            style={imgPreviewStyle}
            id="target"
            src={this.state.image}
          />
          <input
            id="file-input"
            type="file"
            ref="fileUploader"
            onChange={this.onImageChange}
            style={{ display: "none" }}
          />
        </div>
      </div>
    );
  }
}

ProfilePicUploader.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfilePicUploader);
