import React from "react";
import AuthenticationService from "../../services/AuthenticationService";
import ServerRequest from "../../services/ServerRequest";
import { Backend } from "../../services/Backend";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import classNames from "classnames";
import Grid from "@material-ui/core/Grid";
import NomiButton from "../../components/NomiButton";
import GenderSwitch from "../../components/GenderSwitch";
import girlImg from "../../images/new-girl.jpeg";
import { womanColor } from "../../Constants";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
    height: "100%",
    minHeight: "100vh",
    position: "relative"
  },
  heroContainer: {
    backgroundSize: "cover",
    WebkitBackgroundSize: "cover",
    MozBackgroundSize: "cover",
    OBackgroundSize: "cover",
    height: "50vh",
    paddingTop: 10,
    paddingBottom: 10
  },
  contentWrapper: {
    padding: "0 50px"
  },
  heroFemale: { backgroundImage: "url(" + girlImg + ")" },
  title: {
    color: "white"
  },
  input: {
    backgroundColor: "transparent",
    border: "none",
    outline: "none"
  },
  button: {
    fontWeight: 600,
    maxWidth: 250
  },
  alignRight: {
    textAlign: "right"
  },
  buttonImg: {
    width: 25,
    height: 25,
    paddingRight: 10
  },
  footer: {
    color: "#8c8c8c",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    width: "100%",
    backgroundColor: "#f5f5f5",
    padding: 15,
    height: 60
  },
  install: {
    color: womanColor[0]
  },
  lolChat: {
    margin: "35px 0"
  },
  divider: {
    height: 20
  },
  womenBackground: {
    background: `linear-gradient(to left, ${womanColor[0]} , ${womanColor[1]})`
  }
});

class Login extends React.Component {
  state = {
    redirect: null,
    gender: "F",
    username: null,
    password: null,
    errors: {},
    errorMessage: ""
  };

  handleInputChange = event => {
    const target = event.target;
    let value = "";
    if (target.type === "checkbox") {
      if (target.checked) {
        value = target.value;
      } else {
        value = "";
      }
    } else {
      value = target.value;
    }
    const name = target.name;
    this.setState({
      [name]: value
    });
  };

  switchGender = gender => () => {
    this.setState({ gender });
  };

  handleFormSubmit = event => {
    let response = AuthenticationService.login(this.state);
    response.then(r => {
      this.setState({ errors: r.errors, errorMessage: r.errorMessage });
      if (r.status) {
        ServerRequest.getOwnProfile().then(sub_r => {
          Backend.setProfile(sub_r);
          ServerRequest.getOwnBookings().then(res2 => {
            this.setState({
              redirect: sub_r.gender === "M" ? "/m" : "/w"
            });
          });
        });
      } else if (r.needSignup) {
        Backend.firstTimeLoginUsername = this.state.username;
        Backend.firstTimeLoginPassword = this.state.password;
        this.setState({ redirect: "/w/signup" });
      }
    });
    event.preventDefault();
  };

  renderFields() {
    const { classes } = this.props;
    const { errors, errorMessage } = this.state;
    return (
      <form onSubmit={this.handleFormSubmit}>
        <Grid container className={classes.contentWrapper} alignItems="center">
          <Grid item xs={12}>
            <Grid container className={classes.form} alignContent="center">
              <br />
              <span style={{ marginTop: 30, marginBottom: 5 }}>
                lol chatでログインする:
              </span>
              <Grid item xs={12}>
                <TextField
                  label="lol chatユーザー名"
                  className={classes.textField}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    className: classes.label
                  }}
                  InputProps={{
                    className: classes.input
                  }}
                  value={this.state.username}
                  onChange={this.handleInputChange}
                  name="username"
                  error={errors.hasOwnProperty("username")}
                  helperText={
                    errors.hasOwnProperty("username") && errors["username"]
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="lol chatパスワード"
                  type="password"
                  className={classes.textField}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    className: classes.label
                  }}
                  InputProps={{
                    className: classes.input
                  }}
                  value={this.state.password}
                  onChange={this.handleInputChange}
                  name="password"
                  error={errors.hasOwnProperty("password")}
                  helperText={
                    errors.hasOwnProperty("password") && errors["password"]
                  }
                />
              </Grid>
            </Grid>
          </Grid>
          {errorMessage}
          <Grid item xs={4} />
          <Grid item xs={8} className={classes.alignRight}>
            <NomiButton
              className={classes.button}
              style={{ fontSize: 16 }}
              gender="F"
              type="submit"
            >
              ログイン
            </NomiButton>
          </Grid>
        </Grid>
        <br />
        <br />
        <Grid container>
          <Grid item xs={12} className={classes.install}>
            lol chatをまだダウンロード方はこちら:
            <NomiButton
              className={classes.button}
              style={{ marginTop: "15px", fontSize: 13 }}
              href="http://lolchat.app.link"
            >
              lol chatをダウンロードする
            </NomiButton>
          </Grid>
        </Grid>
        <br />
        <br />
        <br />
        <br />
      </form>
    );
  }

  render() {
    const { classes } = this.props;
    const { redirect, gender } = this.state;

    return (
      <div className={classes.root}>
        {redirect && <Redirect to={redirect} push />}
        <Grid
          container
          alignContent="space-between"
          className={classNames(classes.heroContainer, classes.heroFemale)}
        >
          <Grid item xs={12}>
            <GenderSwitch
              gender={gender}
              onClick={() => this.setState({ redirect: "/m/login" })}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              className={classes.title}
              variant="h1"
              color="inherit"
              noWrap
            >
              TIPS
            </Typography>
          </Grid>
        </Grid>
        <div className={classNames(classes.divider, classes.womenBackground)} />
        {this.renderFields()}
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Login);
