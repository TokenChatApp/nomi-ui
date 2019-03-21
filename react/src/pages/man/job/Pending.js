import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { NavLink, Redirect } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Navbar from "../../../components/Navbar";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import GirlCard from "../GirlCard";

import { manColor } from "../../../Constants";

import dummyGirl from "../../../images/dummyGirl.png";
import crownGold from "../../../images/male/dashboard/crown_gold.svg";
import crownSilver from "../../../images/male/dashboard/crown_silver.svg";

import NomiButton from "../../../components/NomiButton";
import { Backend } from "../../../services/Backend";

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
    fontWeight: 500,
    fontSize: 18,
    maxWidth: 250
  },
  pendingText: {
    color: manColor[1],
    fontSize: 16,
    width: "100%",
    margin: 15
  },
  pendingText2: {
    color: manColor[1],
    fontSize: 16,
    width: "100%",
    margin: 15,
    marginTop: 30
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
  },
  nav: {
    fontWeight: 400,
    color: manColor[1],
    textDecoration: "none"
  }
});

const womanList = [
  { name: "Himiko", age: "20", rating: 3, level: 3, imgUrl: dummyGirl },
  { name: "Himiko", age: "20", rating: 3, level: 2, imgUrl: dummyGirl },
  { name: "Himiko", age: "20", rating: 3, level: 1, imgUrl: dummyGirl },
  { name: "Himiko", age: "20", rating: 3, level: 1, imgUrl: dummyGirl }
];

class Pending extends React.Component {
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

  render() {
    const { classes } = this.props;
    const { redirect, womanList } = this.state;
    let girls = Backend.bookings.data[Backend.selectedBooking].users;
    var acceptedGirls = [];
    var pendingGirls = [];
    for (var girl of girls) {
      if (girl.is_accepted) {
        acceptedGirls.push(girl);
      } else {
        pendingGirls.push(girl);
      }
    }
    return (
      <div className={classes.root}>
        {redirect && <Redirect to={redirect} />}
        <Navbar title="女性を確認するページ" gender="M" />
        <div className={classes.navWrapper}>
          <NavLink to="/m/dates" className={classes.navText}>
            {"< 戻る"}
          </NavLink>
        </div>
        <Grid container className={classes.container}>
          {acceptedGirls.length > 0 ? (
            <Typography variant="h4" className={classes.pendingText}>
              {acceptedGirls.length} 人があなたのリクエストに返事した！
              <br />
              好きな女の子を選んでください。
            </Typography>
          ) : (
            <div />
          )}

          {acceptedGirls.map(e => (
            <Grid item xs={6}>
              <GirlCard
                {...e}
                handleToggleCrown={this.handleToggleCrown}
                cameFromPendingPage
                username={e.username}
              />
            </Grid>
          ))}

          {acceptedGirls.length > 0 ? (
            <Grid item xs={12}>
              <NomiButton
                className={classes.button}
                gender="M"
                onClick={() => this.setState({ redirect: "/m/payment" })}
              >
                支払いページまで
              </NomiButton>
            </Grid>
          ) : (
            <div />
          )}

          {pendingGirls.length > 0 ? (
            <Typography variant="h4" className={classes.pendingText2}>
              {pendingGirls.length} 人がまだ返事していないません:
            </Typography>
          ) : (
            <div />
          )}

          {pendingGirls.map(e => (
            <Grid item xs={6}>
              <GirlCard
                {...e}
                handleToggleCrown={this.handleToggleCrown}
                username={e.username}
                cameFromPendingPage
                disabled
              />
            </Grid>
          ))}
        </Grid>
        <br />
        <br />

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

Pending.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Pending);
