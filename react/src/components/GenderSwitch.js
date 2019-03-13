import React from "react";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import maleIcon from "../images/male.png";
import femaleIcon from "../images/female.png";
import { manColor, womanColor } from "../Constants";
const menIconColor = manColor[1];
const womenIconColor = womanColor[1];

const styles = theme => ({
  genderSwitchButton: {
    cursor: "pointer",
    fontWeight: 700,
    width: "auto",
    maxWidth: 200,
    padding: 4,
    borderRadius: 25,
    fontSize: 14,
    backgroundColor: "white"
  },
  genderText: {
    padding: "0 10px"
  },
  colorMen: {
    backgroundColor: "white",
    color: menIconColor
  },
  colorWomen: {
    backgroundColor: "white",
    color: womenIconColor
  },
  avatar: {
    padding: 5,
    height: 25,
    width: 25
  },
  avatarMen: { backgroundColor: menIconColor },
  avatarWomen: { backgroundColor: womenIconColor }
});

const avatarStyle = {
  objectFit: "contain"
};

const GenderSwitch = props => {
  const { classes, gender, onClick } = props;
  const man = gender === "M";
  return (
    <Grid
      container
      alignItems="center"
      justify="space-between"
      className={classNames(
        classes.genderSwitchButton,
        man ? classes.colorWomen : classes.colorMen
      )}
      onClick={onClick}
    >
      {man && (
        <Grid item>
          <Avatar
            className={classNames(classes.avatar, classes.avatarWomen)}
            imgProps={{ style: avatarStyle }}
            alt="Female"
            src={femaleIcon}
          />
        </Grid>
      )}
      <Grid item className={classes.genderText}>
        Switch to {man ? "Girl" : "Man"} user
      </Grid>
      {!man && (
        <Grid item>
          <Avatar
            className={classNames(classes.avatar, classes.avatarMen)}
            imgProps={{ style: avatarStyle }}
            alt="Male"
            src={maleIcon}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default withStyles(styles)(GenderSwitch);
