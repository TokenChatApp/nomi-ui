import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import { Backend } from "../services/Backend";

const color = "#9e9e9e";

const styles = theme => ({
  container: {
    height: 120,
    width: 120,
    margin: "auto",
    marginTop: 15,
    borderRadius: "50%",
    border: `1px solid ${color}`
  },
  plus: {
    color,
    marginTop: 14,
    fontSize: "4rem"
  },
  description: {
    color,
    margin: 0,
    marginTop: -10,
    fontSize: "0.7rem",
    fontWeight: 500
  },
  profileImage: {
    height: 130,
    width: 130,
    margin: "auto",
    marginTop: 40,
    borderRadius: "50%",
    border: `1px solid ${color}`,
    objectFit: "cover"
  }
});

class ProfilePicHolder extends React.Component {
  render() {
    const { classes } = this.props;

    if (Backend.user.profileImage) {
      return (
        <img
          alt=""
          className={classes.profileImage}
          id="target"
          src={Backend.user.profileImage}
          onClick={this.props.onClick}
        />
      );
    } else {
      return (
        <div className={classes.container} onClick={this.props.onClick}>
          <AddIcon className={classes.plus} />
          <p className={classes.description}>
            プロフィール写真
            <br />
            をアップする
          </p>
        </div>
      );
    }
  }
}

ProfilePicHolder.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfilePicHolder);
