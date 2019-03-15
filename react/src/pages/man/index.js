import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { NavLink, Redirect } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Navbar from "../../components/Navbar";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Favorite from "@material-ui/icons/Favorite";
import GirlCard from "./GirlCard";

import { manColor } from "../../Constants";
import dummyGirl from "../../images/dummyGirl.png";
import crownGold from "../../images/male/dashboard/crown_gold.svg";
import crownSilver from "../../images/male/dashboard/crown_silver.svg";

import NomiButton from "../../components/NomiButton";
import { Backend } from "../../services/Backend";
import ServerRequest from "../../services/ServerRequest";

var dateFormat = require("dateformat");

const styles = theme => ({
  root: {
    height: "100%",
    minHeight: "100vh",
    position: "relative"
  },
  container: {
    marginTop: 10,
    paddingLeft: "5%",
    paddingRight: "5%"
  },
  button: {
    height: 56,
    borderRadius: 30,
    maxWidth: 250
  },
  womanImg: {
    width: "90%",
    borderRadius: 30,
    marginBottom: 20
  },
  imgContainer: {
    position: "relative",
    cursor: "pointer"
  },
  name: {
    fontWeight: 700
  },
  text: {
    color: "white",
    textAlign: "center",
    position: "absolute",
    bottom: 35,
    padding: 5,
    fontSize: 10,
    left: 0,
    right: 0
  },
  label: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 12,
    padding: "5px 20px"
  },
  favIcon: {
    color: "white",
    fontSize: 37,
    marginRight: 10
  },
  disabledText: {
    color: "#8c8b8b",
    fontSize: 15,
    width: "100%",
    marginTop: 50,
    textAlign: "center"
  },
  divider: {
    marginTop: 20,
    marginBottom: 20
  },
  viewMore: {
    color: manColor[1],
    cursor: "pointer"
  },
  viewMoreContainer: {
    marginBottom: 30
  },
  explore: {
    fontSize: 22,
    width: "100%",
    margin: 15,
    marginBottom: 30,
    color: "#888"
  },
  dialog: {
    padding: 20,
    color: "#9c9c9c"
  },
  dialogTitle: {
    textAlign: "center",
    color: "#9c9c9c"
  },
  crown: {
    width: "100%"
  },
  crownTitle: {
    paddingLeft: 10
  },
  navWrapper: {
    textAlign: "left",
    paddingTop: "15px",
    paddingLeft: "5%",
    paddingRight: "10%"
  },
  navText: {
    color: manColor[1],
    textDecoration: "none"
  }
});

class ManLanding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: "",
      user: Backend.user,
      crown: false
    };
  }

  handleToggleCrown = () => {
    let { crown } = this.state;
    this.setState({ crown: !crown });
  };

  handleSendInvitationClicked = () => {
    var userIds = [];
    for (const listing of Backend.listings) {
      if (listing.isSelected) {
        userIds.push(listing.user_id);
      }
    }
    if (userIds.length === 0) {
      alert("Please select at least one girl");
      return;
    }
    let profileString = userIds.join();
    let dateString = dateFormat(Backend.selectedDate, "yyyy-mm-dd HH:MM");
    console.log(Backend.selectedPlaceId);
    let dict = {
      profile_ids: profileString,
      request_date: dateString,
      place_id: Backend.selectedPlaceId
    };
    let response = ServerRequest.postBooking(dict);
    response.then(r => {
      let bookings = ServerRequest.getOwnBookings();
      bookings.then(r => {
        this.setState({ redirect: "/m/booking/sent" });
      });
    });
  };

  renderContent() {
    const { classes } = this.props;
    let dateString = dateFormat(Backend.selectedDate, "dd mmm, HH:MM");

    if (Backend.listings.length === 0) {
      return (
        <div>
          <Redirect to={"/m"} />
        </div>
      );
    } else {
      return (
        <Grid container className={classes.container}>
          <Grid item xs={12}>
            {Backend.listings.length > 8 ? (
              <NomiButton
                className={classes.button}
                gender="M"
                onClick={this.handleSendInvitationClicked}
              >
                <Favorite className={classes.favIcon} />
                SEND INVITATION
              </NomiButton>
            ) : (
              <div />
            )}
          </Grid>
          <span style={{ marginTop: 15 }}>
            空いてる女性リスト：{Backend.selectedPlace}, {Backend.selectedCity}{" "}
            at {dateString}
          </span>
          {Backend.listings.map(e => (
            <Grid key={e.username} item xs={6}>
              <GirlCard
                {...e}
                handleToggleCrown={this.handleToggleCrown}
                username={e.username}
                cameFromPendingPage={false}
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <NomiButton
              className={classes.button}
              gender="M"
              onClick={this.handleSendInvitationClicked}
            >
              <Favorite className={classes.favIcon} />
              誘う！
            </NomiButton>
          </Grid>
        </Grid>
      );
    }
  }

  render() {
    const { classes } = this.props;
    const { redirect } = this.state;
    let title = `${Backend.user.display_name}、こんにちは`;
    let dateString = dateFormat(Backend.selectedDate, "dd mmm, HH:MM");

    return (
      <div className={classes.root}>
        {redirect && <Redirect to={redirect} />}
        <Navbar title={title} gender="M" />
        <div className={classes.navWrapper}>
          <NavLink to="/m" className={classes.navText}>
            {"< 戻る"}
          </NavLink>
        </div>
        {this.renderContent()}
        <Dialog onClose={this.handleToggleCrown} open={this.state.crown}>
          <DialogTitle className={classes.dialogTitle}>
            Our Selected Girls
          </DialogTitle>
          <Grid container alignItems="center" className={classes.dialog}>
            <Grid item xs={2}>
              <img className={classes.crown} src={crownGold} alt="crown" />
            </Grid>
            <Grid item xs={10} className={classes.crownTitle}>
              Prestige Girls
            </Grid>
            <Grid item xs={10}>
              *Customer provide write up of description*
            </Grid>
          </Grid>
          <Grid container alignItems="center" className={classes.dialog}>
            <Grid item xs={2}>
              <img className={classes.crown} src={crownSilver} alt="crown" />
            </Grid>
            <Grid item xs={10} className={classes.crownTitle}>
              Premium Girls
            </Grid>
            <Grid item xs={10}>
              *Customer provide write up of description*
            </Grid>
          </Grid>
        </Dialog>
      </div>
    );
  }
}

ManLanding.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ManLanding);
