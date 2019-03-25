import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { NavLink, Redirect } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Navbar from "../../../components/Navbar";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Clear from "@material-ui/icons/Clear";
import classNames from "classnames";

import { manColor } from "../../../Constants";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

import dummyGirl from "../../../images/dummyGirl.png";
import ServerRequest from "../../../services/ServerRequest";
import NomiButton from "../../../components/NomiButton";
import { Backend } from "../../../services/Backend";
import StripeCheckout from "react-stripe-checkout";

var dateFormat = require("dateformat");

const styles = theme => ({
  root: {
    height: "100%",
    minHeight: "100vh",
    position: "relative"
  },
  container: {
    color: "#8a8a8a",
    fontWeight: 300,
    marginTop: 20,
    paddingLeft: "5%",
    paddingRight: "5%"
  },
  button: {
    height: 56,
    borderRadius: 30,
    fontWeight: 500,
    maxWidth: 250
  },
  themeText: {
    color: manColor[1],
    fontSize: 17,
    width: "100%"
  },
  dialog: {
    padding: 20,
    color: "#9c9c9c"
  },
  dialogTitle: {
    textAlign: "center",
    color: "#9c9c9c"
  },
  detailTitle: {
    fontWeight: 500,
    padding: 5,
    fontSize: 20,
    textAlign: "left"
  },
  nav: {
    fontWeight: 400,
    color: manColor[1],
    textDecoration: "none"
  },
  alignLeft: {
    padding: 5,
    textAlign: "left"
  },
  alignRight: {
    padding: 5,
    textAlign: "right"
  },
  divider: {
    marginTop: 30,
    marginBottom: 30
  },
  description: {
    paddingLeft: 10,
    textAlign: "left",
    margin: 0,
    marginTop: 2,
    fontSize: 12
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    objectFit: "cover"
  },
  girlList: {
    border: "1px solid #e0e0e0",
    minHeight: 90
  },
  head: {
    paddingBottom: 10,
    fontSize: 12
  },
  name: {
    paddingLeft: 10,
    textAlign: "left",
    margin: 0,
    fontSize: 15
  },
  text: {
    color: "#696969",
    padding: 40,
    textAlign: "left",
    margin: 0,
    fontWeight: 300
  },
  total: {
    padding: 13,
    border: "1px solid #e0e0e0",
    textAlign: "right"
  },
  alignCenter: {
    textAlign: "center"
  },
  mAuto: {
    margin: "auto"
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
  { name: "Himiko1", age: "20", imgUrl: dummyGirl, rate: 100, hr: 1 },
  { name: "Himiko2", age: "20", imgUrl: dummyGirl, rate: 100, hr: 1 },
  { name: "Himiko3", age: "20", imgUrl: dummyGirl, rate: 100, hr: 1 },
  { name: "Himiko4", age: "20", imgUrl: dummyGirl, rate: 100, hr: 1 },
  { name: "Himiko5", age: "20", imgUrl: dummyGirl, rate: 100, hr: 1 }
];

const PaymentList = withStyles(styles)(props => {
  const {
    classes,
    display_name,
    age,
    avatar,
    rate_per_session,
    hr,
    handleDelete
  } = props;
  return (
    <Grid container alignItems="center" className={classes.girlList}>
      <Grid item xs={2}>
        <img
          src={Backend.imgUrl + avatar}
          alt="girl"
          className={classes.avatar}
        />
      </Grid>
      <Grid item xs={7}>
        <h6 className={classes.name}>{display_name}</h6>
        <h6 className={classes.description}>{age} 歳</h6>
        <h6 className={classes.description}>
          レート：¥{rate_per_session.toLocaleString()}
        </h6>
      </Grid>
      <Grid item xs={3}>
        {rate_per_session.toLocaleString()}
      </Grid>
    </Grid>
  );
});

class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: "",
      womanList: womanList,
      user: Backend.user,
      dialog: false
    };
  }

  handleDelete = name => event => {
    var { womanList } = this.state;
    var index = womanList.map(e => e.name).indexOf(name);
    womanList.splice(index, 1);
    this.setState({ womanList });
  };

  handleClose = () => this.setState({ dialog: false });

  onToken = token => {
    let booking = Backend.bookings.data[Backend.selectedBooking];
    var profileIds = [];
    for (var girl of booking.users) {
      if (girl.isSelectedForCheckout) {
        profileIds.push(girl.user_id);
      }
    }
    let dict = {
      request_id: booking.request_id,
      profile_ids: profileIds.toString(),
      stripe_token: token.id
    };

    console.log(dict);

    let response = ServerRequest.confirmBooking(dict);
    response.then(res => {
      if (res.status) {
        Backend.successfulBooking = res;
        this.setState({ redirect: "/m/addLolChat" });
      } else {
        alert("お支払いはできませんでした。もう一度試してください。");
      }
    });
  };

  render() {
    const { classes } = this.props;
    const { redirect, womanList, dialog } = this.state;

    let booking = Backend.bookings.data[Backend.selectedBooking];
    if (!booking || booking === null) {
      return <Redirect to={"/m/dates"} />;
    }

    let timeString = `${booking.request_start_time.substring(0, 5)}
      – ${booking.request_end_time.substring(0, 5)}`;
    var grandTotal = 0;
    for (var user of booking.users) {
      if (user.isSelectedForCheckout) {
        grandTotal += user.rate_per_session;
      }
    }

    return (
      <div className={classes.root}>
        {redirect && <Redirect to={redirect} />}
        <Navbar title="予約概要" gender="M" />
        <div className={classes.navWrapper}>
          <NavLink to="/m/dates/pending" className={classes.navText}>
            {"< 戻る"}
          </NavLink>
        </div>
        <Grid container className={classes.container}>
          <Grid item xs={12} className={classes.detailTitle}>
            飲み会の詳細を確かめてください。
          </Grid>
          <Grid item xs={12} className={classes.alignLeft}>
            {dateFormat(booking.request_date, "yyyy年mm月dd日")}
          </Grid>
          <Grid item xs={12} className={classes.alignLeft}>
            {timeString}
          </Grid>
          <Grid item xs={12} className={classes.alignLeft}>
            {booking.place ? booking.place.place_name : ""}
          </Grid>
        </Grid>

        <Grid container alignItems="center" className={classes.container}>
          <Grid item xs={9} />
          <Grid item xs={3} className={classes.head}>
            {" "}
            レート（日本円)
          </Grid>
          {booking.users.map(e => {
            if (e.isSelectedForCheckout) {
              return (
                <Grid item xs={12}>
                  <PaymentList {...e} handleDelete={this.handleDelete} />
                </Grid>
              );
            }
          })}
          <Grid className={classes.total} item xs={12}>
            合計：{" ¥"}
            {grandTotal.toLocaleString()}
          </Grid>
        </Grid>

        <Grid container alignItems="center" className={classes.container}>
          <Grid item xs={12}>
            <StripeCheckout
              email={Backend.user.email}
              name="TIPS支払いページ" // the pop-in header title
              description="クレジットカードで支払い" // the pop-in header subtitle
              ComponentClass="div"
              panelLabel="合計：" // prepended to the amount in the bottom pay button
              amount={grandTotal} // cents
              currency={"JPY"}
              // stripeKey="pk_live_lQoRfxV0m85nmh69Ncd4wLcu"
              stripeKey="pk_test_CdF5wQIrKPDYGUBKmq9BBRHQ"
              locale="ja"
              token={token => this.onToken(token)} // submit callback
              reconfigureOnUpdate={false}
            >
              <NomiButton
                className={classNames(classes.button, classes.mAuto)}
                gender="M"
              >
                支払いページまで
              </NomiButton>
            </StripeCheckout>
            <br />
            <br />
          </Grid>
        </Grid>

        {/* Dialog */}
        <Dialog
          open={dialog}
          onClose={this.handleClose}
          className={classes.alignCenter}
        >
          <DialogContent>
            <DialogContentText>
              Ops! Your credit is insufficient.
              <br />
              Please top up to continue.
            </DialogContentText>
          </DialogContent>
          <NomiButton
            className={classNames(classes.button, classes.mAuto)}
            gender="M"
            onClick={() => this.setState({ redirect: "/m/paymentDone" })}
          >
            Top up credit
          </NomiButton>
          <h6>
            <Button onClick={this.handleClose} autoFocus>
              Cancel
            </Button>
          </h6>
        </Dialog>
      </div>
    );
  }
}

Payment.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Payment);
