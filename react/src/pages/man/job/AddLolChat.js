import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { NavLink, Redirect } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Navbar from "../../../components/Navbar";
import { manColor } from "../../../Constants";
import MainButton from "../../../components/MainButton";
import dummyGirl from "../../../images/dummyGirl.png";

const styles = theme => ({
  root: {
    height: "100%",
    minHeight: "calc(100vh - 100px)",
    position: "relative",
    paddingTop: 100,
    background: `linear-gradient(to top, ${manColor[0]}, ${manColor[1]})`
  },
  fixedNav: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0
  },
  button: {
    maxWidth: 200,
    color: manColor[0],
    display: "block",
    margin: "auto",
    marginTop: 10,
    fontSize: "1rem",
    fontWeight: 500
  },
  title: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 50,
    paddingLeft: "10%",
    paddingRight: "10%",
    color: "white"
  },
  backHome: {
    textDecoration: "none",
    color: "white"
  },
  wrapper: {
    padding: 20
  },
  girlImg: {
    width: 80,
    borderRadius: "50%"
  },
  girlChatID: {
    textAlign: "left",
    color: "white",
    margin: 10,
    marginLeft: 20,
    fontWeight: 300
  },
  girlName: {
    textAlign: "left",
    color: "white",
    margin: 10,
    marginLeft: 20
  }
});

const nameList = [
  { name: "Hanako", chatID: "123456" },
  { name: "Hanako", chatID: "123456" },
  { name: "Hanako", chatID: "123456" }
];

const GirlList = withStyles(styles)(props => {
  const { classes, name, chatID } = props;
  return (
    <Grid container alignItems="center" justify="center">
      <Grid item>
        <img src={dummyGirl} className={classes.girlImg} alt="girl" />
      </Grid>
      <Grid item>
        <h4 className={classes.girlName}>{name}</h4>
        <h4 className={classes.girlChatID}>
          lol chat ID: <br />
          {chatID}
        </h4>
      </Grid>
    </Grid>
  );
});

class AddLolChat extends React.Component {
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
        <Typography className={classes.title}>
          Please add the girl's ID into your lol chat app after your
          installation.
        </Typography>
        <Grid container className={classes.wrapper}>
          {nameList.map(e => (
            <GirlList {...e} />
          ))}
        </Grid>

        <div>
          <MainButton
            className={classes.button}
            href="http://bit.ly/lolchat-android"
          >
            lol chatをダウンロード
          </MainButton>
          <div style={{ marginTop: 30 }}>
            <NavLink to="/m" className={classes.backHome}>
              {"< 戻る"}
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}

AddLolChat.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AddLolChat);
