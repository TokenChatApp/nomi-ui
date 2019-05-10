import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import classNames from "classnames";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import login from "../images/login.svg";
import signup from "../images/sign_up.svg";
import logo from "../images/logo.png";
import girlImg from "../images/new-girl.jpeg";
import manImg from "../images/new-guy.jpeg";
import partyImg from "../images/party.jpg";
import dummyGirl from "../images/dummyGirl.png";
import stepsIcon from "../images/steps.svg";
import matchesIcon from "../images/matches.svg";
import usersIcon from "../images/users.svg";
import MainButton from "../components/MainButton";
import NomiButton from "../components/NomiButton";
import GenderSwitch from "../components/GenderSwitch";
import { manColor, womanColor } from "../Constants";
import GirlCard from "./man/GirlCard";
const menIconColor = manColor[1];
const womenIconColor = womanColor[1];

const womanList = [
  { name: "Himiko", age: "20", rating: 3, level: 3, imgUrl: dummyGirl },
  { name: "Himiko", age: "20", rating: 3, level: 2, imgUrl: dummyGirl },
  { name: "Himiko", age: "20", rating: 3, level: 1, imgUrl: dummyGirl },
  { name: "Himiko", age: "20", rating: 3, level: 1, imgUrl: dummyGirl },
  { name: "Himiko", age: "20", rating: 3, level: 1, imgUrl: dummyGirl },
  { name: "Himiko", age: "20", rating: 3, level: 1, imgUrl: dummyGirl },
  { name: "Himiko", age: "20", rating: 3, level: 1, imgUrl: dummyGirl },
  { name: "Himiko", age: "20", rating: 3, level: 1, imgUrl: dummyGirl },
  { name: "Himiko", age: "20", rating: 3, level: 1, imgUrl: dummyGirl }
];

const styles = theme => ({
  heroContainer: {
    backgroundSize: "cover",
    WebkitBackgroundSize: "cover",
    MozBackgroundSize: "cover",
    OBackgroundSize: "cover",
    height: "50vh",
    paddingTop: 10,
    paddingBottom: 10
  },
  subContainer: {
    maxHeight: 300,
    backgroundImage: "url(" + partyImg + ")"
  },
  heroMale: { backgroundImage: "url(" + manImg + ")" },
  heroFemale: { backgroundImage: "url(" + girlImg + ")" },
  title: {
    color: "white",
    fontSize: "6rem",
    fontWeight: 500,
    textAlign: "center"
  },
  colorMen: {
    backgroundColor: "white",
    color: menIconColor
  },
  colorWomen: {
    backgroundColor: "white",
    color: womenIconColor
  },
  userButtonLabel: {
    marginBottom: "0!important"
  },
  userButton: {
    color: "#727272",
    margin: "0",
    fontSize: 16
  },
  maxWidthButton: {
    maxWidth: 180
  },
  alignRight: {
    textAlign: "right"
  },
  description: {
    marginTop: 20,
    marginBottom: 0,
    paddingLeft: 30,
    paddingRight: 30,
    color: "white"
  },
  container: { minHeight: "50vh" },
  menBackground: {
    background: `linear-gradient(${manColor[0]} , ${manColor[1]})`
  },
  womenBackground: {
    background: `linear-gradient(${womanColor[0]} , ${womanColor[1]})`
  },
  img: { width: "80%" },
  logo: { height: "80px" },
  buttonImg: {
    width: 25,
    height: 25,
    paddingRight: 10
  },
  contentContainer: {
    color: "#828282",
    padding: 20
  },
  questionContainer: {
    paddingLeft: 40,
    paddingRight: 40
  },
  whiteText: {
    color: "white"
  },
  text: {
    fontSize: 16,
    color: "#828282",
    margin: "15px 0"
  },
  paddingY: {
    paddingTop: 20,
    paddingBottom: 20
  },
  jobText: {
    fontSize: 16,
    color: "#828282",
    padding: "0 25px",
    textAlign: "left",
    margin: 0
  },
  jobTextContainer: {
    margin: "10px 0"
  },
  questionTitle: {
    textAlign: "left",
    color: "#828282"
  },
  messageField: {
    borderRadius: 0
  }
});

class Landing extends React.Component {
  state = {
    gender: "M",
    redirect: null,
    email: "",
    mobile: "",
    message: ""
  };

  handleChange = type => event => {
    this.setState({ [type]: event.target.value });
  };

  switchGender = gender => () => {
    this.setState({ gender });
  };

  render() {
    const { classes } = this.props;
    const { gender, redirect, email, mobile, message } = this.state;
    const man = gender === "M";

    return (
      <div className={classes.layout}>
        {redirect && <Redirect to={redirect} push />}
        <div>
          <Grid
            container
            alignContent="space-between"
            className={classNames(
              classes.heroContainer,
              man ? classes.heroFemale : classes.heroMale
            )}
          >
            <Grid item xs={12}>
              <GenderSwitch
                gender={gender}
                onClick={this.switchGender(man ? "F" : "M")}
              />
            </Grid>
            <Grid item xs={12}>
              <img src={logo} className={classes.logo} alt="TIPS" />
            </Grid>
          </Grid>
        </div>
        <Grid
          container
          className={classNames(
            classes.container,
            man ? classes.menBackground : classes.womenBackground
          )}
        >
          <Grid item xs={12}>
            <Typography
              className={classes.description}
              style={{ marginTop: 35, fontSize: 18, marginBottom: 0 }}
              variant="h5"
            >
              {man
                ? "今日は可愛い女性と飲みませんか？"
                : "お金持ちの紳士と飲んで稼ぎましょう!"}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <MainButton
              className={classNames(classes.userButton, classes.maxWidthButton)}
              onClick={() => {
                if (man) {
                  this.setState({ redirect: "/m/login" });
                } else {
                  this.setState({ redirect: "/w/login" });
                }
              }}
            >
              <img className={classes.buttonImg} src={login} alt="login" />
              ログイン
            </MainButton>
          </Grid>
          <Grid item xs={12}>
            <Typography
              className={classNames(
                classes.userButtonLabel,
                classes.description
              )}
              style={{ fontSize: 16 }}
            >
              {man
                ? "まだ登録してない方はこちら:"
                : "まだ登録してない方はこちら:"}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <MainButton
              className={classNames(classes.userButton, classes.maxWidthButton)}
              onClick={() => this.setState({ redirect: "/signup" })}
            >
              <img className={classes.buttonImg} src={signup} alt="signup" />
              サインアップ
            </MainButton>
            <br />
            <br />
            <br />
          </Grid>
        </Grid>
      </div>
    );
  }
}

Landing.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Landing);
