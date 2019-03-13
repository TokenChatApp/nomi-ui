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

const womanList = [
  { name: "Himiko", age: "20", rating: 5, level: 3, imgUrl: dummyGirl },
  { name: "Himiko", age: "20", rating: 5, level: 2, imgUrl: dummyGirl },
  { name: "Himiko", age: "20", rating: 5, level: 1, imgUrl: dummyGirl },
  { name: "Himiko", age: "20", rating: 5, level: 1, imgUrl: dummyGirl },
  { name: "Himiko", age: "20", rating: 5, level: 1, imgUrl: dummyGirl },
  { name: "Himiko", age: "20", rating: 5, level: 1, imgUrl: dummyGirl },
  { name: "Himiko", age: "20", rating: 5, level: 1, imgUrl: dummyGirl },
  { name: "Himiko", age: "20", rating: 5, level: 1, imgUrl: dummyGirl },
  { name: "Himiko", age: "20", rating: 5, level: 1, imgUrl: dummyGirl },
  { name: "Himiko", age: "20", rating: 5, level: 1, imgUrl: dummyGirl }
];

class ManLanding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: "",
      womanList: womanList,
      user: Backend.user,
      crown: false
    };
  }

  handleToggleCrown = () => {
    let { crown } = this.state;
    this.setState({ crown: !crown });
  };

  handleSendInvitationClicked = () => {
    this.setState({ redirect: "/m/booking/sent" });
  };

  render() {
    const { classes } = this.props;
    const { redirect, womanList } = this.state;
    let title = `Hello, ${Backend.user.display_name}`;
    return (
      <div className={classes.root}>
        {redirect && <Redirect to={redirect} />}
        <Navbar title={title} gender="M" />
        <div className={classes.navWrapper}>
          <NavLink to="/m" className={classes.navText}>
            {"< Back"}
          </NavLink>
        </div>
        <Grid container className={classes.container}>
          <Grid item xs={12}>
            <NomiButton
              className={classes.button}
              gender="M"
              onClick={this.handleSendInvitationClicked}
            >
              <Favorite className={classes.favIcon} />
              SEND INVITATION
            </NomiButton>
          </Grid>
          <Typography variant="h4" className={classes.explore}>
            Explore the girls around {Backend.selectedPlace},{" "}
            {Backend.selectedCity}
          </Typography>
          {womanList.map(e => (
            <Grid item xs={6}>
              <GirlCard {...e} handleToggleCrown={this.handleToggleCrown} />
            </Grid>
          ))}
          <Grid item xs={12}>
            <NomiButton
              className={classes.button}
              gender="M"
              onClick={() =>
                this.setState({ redirect: "/m/invitation/detail" })
              }
            >
              <Favorite className={classes.favIcon} />
              SEND INVITATION
            </NomiButton>
          </Grid>
        </Grid>
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
