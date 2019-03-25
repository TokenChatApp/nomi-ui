import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Backend } from "../services/Backend";

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
  }
});

class Faq extends React.Component {
  state = {
    redirect: null
  };

  renderContent() {
    if (Backend.user.gender === "M") {
      return (
        <div
          style={{
            paddingLeft: 20,
            paddingRight: 20,
            fontSize: 13,
            textAlign: "left"
          }}
        >
          <br />
          <br />
          <b>TIPSプラットフームの使い方(男性版)</b>
          <br />
          <br />
          １．ご希望の時間と場所をご指定ください
          <br />
          <br />
          ２．好みの女性をご指定ください
          <br />
          <br />
          ３．あなたのリクエストを受け取った女性からお返事がございましたら
          <br />
          <br />
          ４．支払いページで料金精算のあと、飲み会をご確認ください
          <br />
          <br />
          ５．”lol chat” から、お約束の女性と連絡を取ります
          <br />
          <br />
          ６．ご予定の時間と場所で有意義な飲み会をお楽しみください
          <br />
          <br />
          <br />
          <b>How many girls can I book? </b>
          <br />
          <br />
          Up to 6 girls at a time.
          <br />
          <br />
          <br />
          <b>How do I make payment?</b>
          <br />
          <br />
          Currently we only accept credit card payment.
          <br />
          <br />
          <br />
          <b>How do I contact the girls?</b>
          <br />
          <br />
          You will be shown the girl’s lol chat ID after payment has been made.
          <br />
          <br />
          <br />
          <b>How much is the cost for drinking with a Nomitime girl?</b>
          <br />
          <br />
          Rates for the girls ranges from 10,000 JPY to 20,000 JPY for one
          session.
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      );
    } else {
      return (
        <div
          style={{
            paddingLeft: 20,
            paddingRight: 20,
            fontSize: 13,
            textAlign: "left"
          }}
        >
          <br />
          <br />
          <b>TIPSプラットフームの使い方(女性版)</b>
          <br />
          <br />
          １．ご希望の時間と場所をお選びください
          <br />
          <br />
          ２．男性からのリクエストをお受け取りください。
          <br />
          <br />
          ３．男性側のお支払い確認の後、あなたのlol chat
          IDが相手に伝えられます。その際、ご確認のショートメールが届きます。
          <br />
          <br />
          ４．お約束の男性とlol chat でご予定（時間と場所）を確認しましょう。
          <br />
          <br />
          ５．お約束の飲み会の時間の少し前（5分前）に着つけば、良い印象のアピールになります。
          <br />
          <br />
          ６．さあ楽しい時間を過ごしましょう！
          <br />
          <br />
        </div>
      );
    }
  }

  render() {
    const { classes } = this.props;
    const { redirect } = this.state;

    return (
      <div className={classes.root}>
        {redirect && <Redirect to={redirect} />}
        <Navbar title="FAQ" gender={Backend.user.gender} />
        {this.renderContent()}
      </div>
    );
  }
}

Faq.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Faq);
