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
import womanPicPlaceholder from "./woman-profile-placeholder.png";

const styles = theme => ({
  root: {
    marginBottom: 20,
    padding: 10
  },
  avatar: {
    cursor: "pointer",
    width: "150px",
    height: "150px",
    border: `1px solid ${manColor[0]}`,
    objectFit: "cover"
  },
  name: {
    color: "#717171",
    fontWeight: 500,
    fontSize: 15
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

  componentDidMount() {
    if (this.props.cameFromPendingPage) {
      for (var girl of Backend.bookings.data[Backend.selectedBooking].users) {
        if (girl.username === this.props.username) {
          if (girl.isSelectedForCheckout) {
            this.setState({ checked: true });
          }
        }
      }
    } else {
      for (var girl of Backend.listings) {
        if (girl.username === this.props.username) {
          if (girl.isSelected) {
            this.setState({ checked: true });
          }
        }
      }
    }
  }

  handleClick = event => {
    let isChecked = this.state.checked;
    for (var [i, listing] of Backend.listings.entries()) {
      if (listing.username === this.props.username) {
        if (this.props.cameFromPendingPage) {
          Backend.listings[i].isSelectedForCheckout = !isChecked;
        } else {
          Backend.listings[i].isSelected = !isChecked;
        }
      }
    }
    this.setState({ checked: !isChecked });
  };

  handleCrownClick = event => {
    this.props.handleToggleCrown();
  };

  handleRedirect = event => {
    if (this.props.cameFromPendingPage) {
      for (var [i, girl] of Backend.bookings.data[
        Backend.selectedBooking
      ].users.entries()) {
        if (girl.username === this.props.username) {
          Backend.selectedListing = i;
        }
      }
    } else {
      for (var [i, girl] of Backend.listings.entries()) {
        if (girl.username === this.props.username) {
          Backend.selectedListing = i;
        }
      }
    }
    Backend.cameFromPendingPage = this.props.cameFromPendingPage;
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
      noPadding,
      username
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
            {level === 0 || !level ? (
              <div />
            ) : (
              <img
                className={classes.crown}
                src={level === 3 ? crownGold : crownSilver}
                alt="crown"
              />
            )}
          </div>
        )}
        <Grid item xs={12}>
          {avatar === null || !avatar ? (
            <img
              className={classes.avatar}
              src={womanPicPlaceholder}
              alt="girl avatar"
              onClick={this.handleRedirect}
            />
          ) : (
            <img
              className={classes.avatar}
              src={Backend.imgUrl + avatar}
              alt="girl avatar"
              onClick={this.handleRedirect}
            />
          )}
        </Grid>
        <Grid item xs={disabled ? 12 : 9} className={classes.wrapper}>
          <Typography variant="h6">
            <span className={classes.name}>
              {display_name}
              {", "}
              {age}歳
            </span>
            <br />
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
