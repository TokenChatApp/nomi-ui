import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import StarRate from "@material-ui/icons/StarRate";
import classNames from "classnames";
import CheckCircle from "@material-ui/icons/CheckCircle";
import RadioButtonUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import { manColor } from "../../Constants";
import crownGold from "../../images/male/dashboard/crown_gold.svg";
import crownSilver from "../../images/male/dashboard/crown_silver.svg";
import { Backend } from "../../services/Backend";

const styles = theme => ({
  root: {
    marginBottom: 20,
    padding: 10
  },
  avatar: {
    cursor: "pointer",
    maxWidth: "90%",
    border: `1px solid ${manColor[0]}`,
    objectFit: "cover"
  },
  name: {
    color: "#717171",
    fontWeight: 500,
    fontSize: 17
  },
  age: {
    color: "#a9a9a9",
    fontWeight: 300,
    fontSize: 8
  },
  starFilled: {
    marginLeft: -7,
    marginTop: -6,
    color: "#888"
  },
  starEmpty: {
    marginLeft: -7,
    marginTop: -6,
    color: "#dadada"
  },
  wrapper: {
    textAlign: "left",
    paddingLeft: 10
  },
  manColor: {
    color: manColor[0]
  },
  crownContainer: {
    position: "relative",
    display: "block",
    textAlign: "right",
    marginLeft: "auto",
    marginRight: 15
  },
  crown: {
    cursor: "pointer",
    width: 30,
    marginBottom: -135
  },
  starWrapper: {
    lineHeight: "1px",
    margin: 0
  },
  noPadding: {
    padding: 0
  }
});

const GenerateStars = withStyles(styles)(props => {
  const totalStars = 5;

  const { classes, rating } = props;

  return (
    <React.Fragment>
      {new Array(rating).fill(0).map((e, index) => (
        <StarRate key={index} className={classes.starFilled} />
      ))}
      {new Array(totalStars - rating).fill(0).map((e, index) => (
        <StarRate key={index} className={classes.starEmpty} />
      ))}
    </React.Fragment>
  );
});

class GirlCard extends React.Component {
  state = {
    redirect: null,
    crown: false,
    checked: false
  };

  handleClick = event => {
    let isChecked = this.state.checked;
    for (var [i, listing] of Backend.listings.entries()) {
      if (listing.username === this.props.username) {
        Backend.listings[i].isSelected = !isChecked;
      }
    }
    console.log(this.props);
    this.setState({ checked: !isChecked });
    console.log(Backend.listings);
  };

  handleCrownClick = event => {
    this.props.handleToggleCrown();
  };

  handleRedirect = event => {
    this.setState({ redirect: "/m/girlProfile" });
  };

  render() {
    const {
      classes,
      display_name,
      age,
      level,
      avatar,
      disabled,
      noPadding
    } = this.props;
    const rating = 5;
    const { redirect, checked } = this.state;

    return (
      <Grid
        container
        className={classNames(classes.root, noPadding && classes.noPadding)}
        alignItems="center"
      >
        {redirect && <Redirect to={redirect} />}
        {!disabled && (
          <div
            className={classes.crownContainer}
            onClick={this.handleCrownClick}
          >
            <img
              className={classes.crown}
              src={level === 3 ? crownGold : crownSilver}
              alt="crown"
            />
          </div>
        )}
        <Grid item xs={12}>
          <img
            className={classes.avatar}
            src={Backend.imgUrl + avatar}
            alt="girl avatar"
            onClick={this.handleRedirect}
          />
        </Grid>
        <Grid item xs={disabled ? 12 : 9} className={classes.wrapper}>
          <Typography variant="h6">
            <span className={classes.name}>{display_name} </span>{" "}
            <span className={classes.age}>{age}years old</span>
            <span className={classes.starWrapper}>
              <GenerateStars rating={rating} />
            </span>
          </Typography>
        </Grid>
        {!disabled && (
          <Grid
            item
            xs={3}
            className={classes.manColor}
            onClick={this.handleClick}
          >
            {checked ? <CheckCircle /> : <RadioButtonUnchecked />}
          </Grid>
        )}
      </Grid>
    );
  }
}

GirlCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GirlCard);
