import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Navbar from "../../components/Navbar";
import heartImgSrc from "../../images/heart.png";
import { womanColor } from "../../Constants";
import MainButton from "../../components/MainButton";

const styles = theme => ({
  root: {
    height: "100%",
    minHeight: "calc(100vh - 100px)",
    position: "relative",
    paddingTop: 100,
    background: `linear-gradient(to bottom, ${womanColor[0]}, ${womanColor[1]})`
  },
  fixedNav: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0
  },
  button: {
    color: womanColor[0],
    maxWidth: 200,
    display: "block",
    margin: "auto",
    marginTop: 15,
    fontSize: "1rem",
    fontWeight: 700,
    position: "fixed",
    bottom: 14,
    left: "10%",
    right: "10%"
  },
  img: {
    width: 150
  },
  title: {
    marginTop: 20,
    paddingLeft: "10%",
    paddingRight: "10%",
    color: "white"
  }
});

class SignupComplete extends React.Component {
  state = {
    redirect: null
  };

  render() {
    const { classes } = this.props;
    const { redirect } = this.state;

    return (
      <div className={classes.root}>
        {redirect && <Redirect to={redirect} />}
        <div className={classes.fixedNav}>
          <Navbar title="" />
        </div>
        <img className={classes.img} src={heartImgSrc} alt="heart" />
        <Typography
          className={classes.title}
          style={{ marginTop: 10 }}
          variant="h6"
        >
          TIPSプラットフームの使い方：
        </Typography>
        <Typography className={classes.title}>
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
          ５．お約束の飲み会の時間の少し前（5分前）に着つけば、良い印象のアピールにばります
          <br />
          <br />
          ６．さあ楽しい時間を過ごしましょう！
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </Typography>
        <div>
          <MainButton
            className={classes.button}
            onClick={() => this.setState({ redirect: "/w" })}
          >
            すぐ予約しよう！
          </MainButton>
        </div>
      </div>
    );
  }
}

SignupComplete.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignupComplete);
