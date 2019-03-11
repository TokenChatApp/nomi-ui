import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Navbar from "../../components/Navbar";
import { Redirect } from "react-router-dom";
import captureSrc from "../../images/camera.png";
import chooseSrc from "../../images/upload.png";
import { womanColor } from "../../Constants";
import MainButton from "../../components/MainButton";
import ImageUploader from "react-images-upload";
import { Backend } from "../../services/Backend";

const styles = theme => ({
  root: {
    height: "100%",
    minHeight: "calc(100vh - 165px)",
    position: "relative",
    paddingTop: 165,
    background: `linear-gradient(to bottom, ${womanColor[0]}, ${womanColor[1]})`
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
    redirect: null,
    isUploadingImage: false
  };

  constructor(props) {
    super(props);
    this.handleUploadClicked = this.handleUploadClicked.bind(this);
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
    }
    Backend.user.profileImage = this.state.image;
  };

  renderImageUploader() {
    if (this.state.isUploadingImage) {
      return (
        <ImageUploader
          withIcon={true}
          buttonText="Choose images"
          onChange={this.onDrop}
          imgExtension={[".jpg", ".gif", ".png", ".gif"]}
          maxFileSize={5242880}
        />
      );
    } else {
      return;
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {this.state.redirect && <Redirect to={this.state.redirect} />}
        <div className={classes.fixedNav}>
          <Navbar title="SIGN UP" />
          <MainButton
            className={classes.button}
            onClick={() => this.setState({ redirect: "/w/signup" })}
          >
            Back
          </MainButton>
        </div>
        <br />
        <br />
        <div>
          <img
            style={imgStyle}
            src={captureSrc}
            alt="capture"
            onClick={() => this.setState({ isUploadingImage: true })}
          />
          <h6 style={textStyle}>Capture a photo</h6>
        </div>
        <Divider />
        <div>
          <img
            style={imgStyle}
            src={chooseSrc}
            alt="choose"
            onClick={this.handleUploadClicked}
          />
          {this.renderImageUploader()}
          <h6 style={textStyle}>Choose file to upload</h6>
          <br />
          <img style={imgPreviewStyle} id="target" src={this.state.image} />
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
