import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Backend } from "../services/Backend";
import ServerRequest from "../services/ServerRequest";
import Icon from "@material-ui/core/Icon";
import NomiButton from "../components/NomiButton";

var dateFormat = require("dateformat");

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  bgColor: {
    backgroundColor: "#ececec"
  },
  tab: {
    fontWeight: 700
  },
  tabWrapper: {
    width: "100%",
    paddingBottom: 50
  },
  title: {
    fontWeight: 300,
    marginTop: 40,
    marginBottom: 0,
    textAlign: "left",
    paddingLeft: 25
  },
  button: {
    color: "white",
    maxWidth: 200,
    display: "block",
    margin: "auto",
    marginTop: 15,
    fontSize: "1rem",
    fontWeight: 700
  }
});

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

class MyProfile extends React.Component {
  state = {
    redirect: null
  };

  componentWillMount() {
    if (isEmpty(Backend.editProfile)) {
      Backend.editProfile = JSON.parse(JSON.stringify(Backend.user));
    }
  }

  async handleSaveChanges() {
    var photoIDsToDelete = [];
    for (var photo of Backend.user.photos) {
      for (var photo_pos of new Set(Backend.photoPositionsToDelete)) {
        if (photo.photo_pos === photo_pos) {
          photoIDsToDelete.push(photo.photo_id);
        }
      }
    }

    if (Backend.user.avatar !== Backend.editProfile.avatar) {
      var formDataAvatar = new FormData();
      formDataAvatar.append("avatar", Backend.editProfile.profileImageFile);
      await ServerRequest.uploadAvatar(formDataAvatar);
    }

    if (photoIDsToDelete.length > 0) {
      let deleteIDString = photoIDsToDelete.join();
      await ServerRequest.removePhotos({ photo_ids: deleteIDString });
    }
    if (
      Backend.editProfile.photoFiles &&
      Backend.editProfile.photoFiles.length > 0
    ) {
      var formDataPhotos = new FormData();
      for (var fileDict of Backend.editProfile.photoFiles) {
        console.log(fileDict);
        let name = fileDict.name + "." + fileDict.file.type.split("/")[1];
        console.log(name);
        formDataPhotos.append("photos[]", fileDict.file, name.toString());
      }
      console.log(formDataPhotos);
      await ServerRequest.uploadPhotos(formDataPhotos);
    }
    // window.location.reload();
  }

  handleUploadClicked(value) {
    if (
      (!Backend.editProfile.avatar || Backend.editProfile.avatar === null) &&
      value > 0
    ) {
      return;
    } else if (value > Backend.editProfile.photos.length + 1) {
      return;
    }
    Backend.whichImageUploading = value;
    this.setState({ redirect: "/profile/upload" });
  }

  getPhotoWithPosition(array, position) {
    for (var item of array) {
      if (item.photo_pos === position) {
        return item;
      }
    }
    return null;
  }

  renderPhotos() {
    var photosArray = [];
    console.log(Backend.editProfile);
    for (var i = 0; i < 5; i++) {
      if (!Backend.editProfile.photos) {
        photosArray.push(
          "http://www.stleos.uq.edu.au/wp-content/uploads/2016/08/image-placeholder-350x350.png"
        );
        continue;
      }
      var photo = this.getPhotoWithPosition(Backend.editProfile.photos, i + 1);
      if (!photo) {
        photosArray.push(
          "http://www.stleos.uq.edu.au/wp-content/uploads/2016/08/image-placeholder-350x350.png"
        );
      } else {
        if (photo.type === "uri") {
          photosArray.push(photo.photo_url);
        } else {
          photosArray.push(Backend.imgUrl + photo.photo_url);
        }
      }
    }
    var photoLength = 0;
    if (photosArray) {
      photoLength = photosArray.length;
    }
    if (!photoLength || photoLength === null || photoLength === "") {
      photoLength = 0;
    }
    if (photoLength < 5) {
      for (var i = 0; i < 5 - photoLength; i++) {
        photosArray.push(
          "http://www.stleos.uq.edu.au/wp-content/uploads/2016/08/image-placeholder-350x350.png"
        );
      }
    }
    var avatar = Backend.imgUrl + Backend.editProfile.avatar;
    if (avatar.length > 300) {
      avatar = Backend.editProfile.avatar;
    }
    if (!Backend.editProfile.avatar || Backend.editProfile.avatar === null) {
      avatar =
        "http://www.stleos.uq.edu.au/wp-content/uploads/2016/08/image-placeholder-350x350.png";
    }
    return (
      <div>
        <img
          style={{
            width: "66%",
            height: "230px",
            borderRadius: 5,
            display: "inline-block",
            float: "left",
            objectFit: "cover"
          }}
          onClick={() => this.handleUploadClicked(0)}
          src={avatar}
        />
        <div
          style={{
            position: "absolute",
            color: "white",
            marginTop: 5,
            marginLeft: 10,
            fontSize: 25,
            fontWeight: "bold"
          }}
        >
          1
        </div>
        <div
          style={{
            position: "absolute",
            marginTop: "5px",
            left: "68%",
            color: "white",
            fontSize: 25,
            fontWeight: "bold",
            zIndex: 2
          }}
        >
          2
        </div>
        <img
          style={{
            position: "relative",
            marginBottom: "0.3%",
            marginLeft: "2%",
            width: "32%",
            height: "110px",
            objectFit: "cover",
            borderRadius: 5
          }}
          onClick={() => this.handleUploadClicked(1)}
          src={photosArray[0]}
        />
        <div
          style={{
            position: "absolute",
            marginTop: "5px",
            left: "68%",
            color: "white",
            fontSize: 25,
            fontWeight: "bold",
            zIndex: 2
          }}
        >
          3
        </div>
        <img
          style={{
            marginTop: "1%",
            marginLeft: "2%",
            width: "32%",
            height: "110px",
            objectFit: "cover",
            borderRadius: 5
          }}
          onClick={() => this.handleUploadClicked(2)}
          src={photosArray[1]}
        />
        <div
          style={{
            position: "absolute",
            marginTop: "5px",
            left: "68%",
            color: "white",
            fontSize: 25,
            fontWeight: "bold",
            zIndex: 2
          }}
        >
          4
        </div>
        <div
          style={{
            position: "absolute",
            marginTop: "5px",
            left: "37%",
            color: "white",
            fontSize: 25,
            fontWeight: "bold",
            zIndex: 2
          }}
        >
          5
        </div>
        <div
          style={{
            position: "absolute",
            marginTop: "5px",
            left: "6%",
            color: "white",
            fontSize: 25,
            fontWeight: "bold",
            zIndex: 2
          }}
        >
          6
        </div>
        <img
          style={{
            marginTop: "1%",
            width: "32%",
            height: "110px",
            objectFit: "cover",
            borderRadius: 5
          }}
          onClick={() => this.handleUploadClicked(5)}
          src={photosArray[4]}
        />
        <img
          style={{
            marginLeft: "2%",
            marginTop: "1.5%",
            width: "32%",
            height: "110px",
            objectFit: "cover",
            borderRadius: 5
          }}
          onClick={() => this.handleUploadClicked(4)}
          src={photosArray[3]}
        />
        <img
          style={{
            marginLeft: "2%",
            marginTop: "1.5%",
            width: "32%",
            height: "110px",
            objectFit: "cover",
            borderRadius: 5
          }}
          onClick={() => this.handleUploadClicked(3)}
          src={photosArray[2]}
        />
      </div>
    );
  }

  renderOtherFields() {
    if (Backend.editProfile.gender === "M") {
      return <div />;
    } else {
      return <div />;
    }
  }

  renderContent() {
    return (
      <div
        style={{
          paddingLeft: 20,
          paddingRight: 20,
          fontSize: 15,
          textAlign: "left"
        }}
      >
        <br />
        <b>写真</b>
        <br />
        <br />
        {this.renderPhotos()}
        <br />
        {this.renderOtherFields()}
        <br />
        <NomiButton
          className={this.props.classes.button}
          gender="M"
          onClick={() => this.handleSaveChanges()}
          style={{
            fontSize: "1rem"
          }}
        >
          Save Changes
        </NomiButton>
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }

  render() {
    const { classes } = this.props;
    const { redirect } = this.state;

    return (
      <div className={classes.root}>
        {redirect && <Redirect to={redirect} />}
        <Navbar
          title="プロフィール情報を変更"
          gender={Backend.editProfile.gender}
        />
        {this.renderContent()}
      </div>
    );
  }
}

MyProfile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MyProfile);
