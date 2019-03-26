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

const toFile = require("data-uri-to-file");

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

var BASE64_MARKER = ";base64,";
function convertDataURIToBlob(dataURI) {
  var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
  var base64 = dataURI.substring(base64Index);
  var raw = window.atob(base64);
  var rawLength = raw.length;
  var array = new Uint8Array(new ArrayBuffer(rawLength));

  for (var i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i);
  }
  let blob = new Blob([array], {
    type: "image/png"
  });
  return blob;
}

class ProfilePicUploader extends React.Component {
  state = {
    redirect: null,
    cameraIsOn: false
  };

  async onTakePhoto(dataUri) {
    var blob = null;
    await toFile(dataUri).then(file => {
      blob = convertDataURIToBlob(dataUri);
    });
    if (window.location.href.includes("/profile/upload")) {
      if (Backend.whichImageUploading == 0) {
        Backend.editProfile.avatar = dataUri;
        toFile(dataUri).then(file => {
          Backend.editProfile.profileImageFile = blob;
        });
      } else {
        if (!Backend.editProfile.photoFiles) {
          Backend.editProfile.photoFiles = [];
          Backend.editProfile.photoFiles.push(blob);
        } else if (
          Backend.editProfile.photoFiles.length < Backend.whichImageUploading
        ) {
          Backend.editProfile.photoFiles.push(blob);
        } else {
          Backend.editProfile.photoFiles[
            Backend.whichImageUploading - 1
          ] = blob;
        }
        console.log(Backend.editProfile.photoFiles);
        Backend.editProfile.photos[Backend.whichImageUploading - 1] = dataUri;
      }
    } else {
      Backend.user.profileImage = dataUri;
      toFile(dataUri).then(file => {
        Backend.user.profileImageFile = convertDataURIToBlob(dataUri);
      });
    }

    var redirectString = "/w/signup";
    if (window.location.href.includes("/profile/upload")) {
      redirectString = "/profile";
    } else if (this.props.gender === "M") {
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
        if (window.location.href.includes("/profile/upload")) {
          if (Backend.whichImageUploading == 0) {
            Backend.editProfile.avatar = e.target.result;
            console.log(Backend.editProfile);
          } else {
            Backend.editProfile.photos[Backend.whichImageUploading - 1] =
              e.target.result;
          }
        } else {
          console.log(e.target.result);
          console.log("??????");
          Backend.user.profileImage = e.target.result;
        }

        var redirectString = "/w/signup";
        if (window.location.href.includes("/profile/upload")) {
          redirectString = "/profile";
        } else if (this.props.gender === "M") {
          redirectString = "/m/signup";
        }
        this.setState({ redirect: redirectString });
      };
      reader.readAsDataURL(event.target.files[0]);
      console.log(event.target.files[0]);
      if (window.location.href.includes("/profile")) {
        if (Backend.whichImageUploading == 0) {
          Backend.editProfile.profileImageFile = event.target.files[0];
        } else {
          if (!Backend.editProfile.photoFiles) {
            Backend.editProfile.photoFiles = [];
            Backend.editProfile.photoFiles.push(event.target.files[0]);
          } else if (
            Backend.editProfile.photoFiles.length < Backend.whichImageUploading
          ) {
            Backend.editProfile.photoFiles.push(event.target.files[0]);
          } else {
            Backend.editProfile.photoFiles[Backend.whichImageUploading - 1] =
              event.target.files[0];
          }
        }
      } else {
        Backend.user.profileImageFile = event.target.files[0];
      }
    }
  };

  render() {
    const { classes } = this.props;
    var redirectString = "/w/signup";
    if (window.location.href.includes("/profile/upload")) {
      redirectString = "/profile";
    } else if (this.props.gender === "M") {
      redirectString = "/m/signup";
    }

    var gender = this.props.gender;
    if (window.location.href.includes("/profile/upload")) {
      gender = Backend.user.gender;
    }
    return (
      <div className={gender === "M" ? classes.rootMan : classes.rootWoman}>
        {this.state.redirect && <Redirect to={this.state.redirect} />}
        <div className={classes.fixedNav}>
          <Navbar title="サインアップ" isLoggedIn="false" gender={gender} />
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
            onClick={() => this.handleUploadClicked()}
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
            accept="image/*"
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
