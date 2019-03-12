import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { NavLink, Redirect } from "react-router-dom";
import Navbar from "../../components/Navbar";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import imgSignup from "../../images/signupWhite.png";
import ProfilePicHolder from "../../components/ProfilePicHolder";
import NomiButton from "../../components/NomiButton";
import AuthenticationService from "../../services/AuthenticationService";
import { Backend } from "../../services/Backend";
import MainButton from "../../components/MainButton";
import { manColor } from "../../Constants";

const grey = "#585858";

const styles = theme => ({
  root: {
    height: "100%",
    minHeight: "100vh",
    position: "relative"
  },
  label: {
    //marginTop : 40,
    //fontSize : '14px',
    fontWeight: 700,
    color: grey
  },
  description: {
    fontSize: "1rem",
    fontWeight: 400
  },
  container: {
    marginTop: 30,
    paddingLeft: "10%",
    paddingRight: "10%"
  },
  button: {
    color: manColor[0],
    maxWidth: 200,
    display: "block",
    margin: "auto",
    marginTop: 15,
    fontSize: "1rem",
    fontWeight: 700
  },
  input: {
    color: grey
  },
  navWrapper: {
    textAlign: "left",
    paddingTop: "10px",
    paddingLeft: "5%",
    paddingRight: "10%"
  },
  navText: {
    color: manColor[1],
    textDecoration: "none"
  }
});

class Signup extends React.Component {
  state = {
    redirect: "",
    gender: "M",
    age: null,
    display_name: null,
    mobile_no: null,
    username: null,
    email: null,
    password: null,
    referral: null,
    errors: {}
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

  handleFormSubmit = event => {
    let response = AuthenticationService.signUp(this.state);
    response.then(r => {
      this.setState({ errors: r.errors });
      if (r.status) {
        AuthenticationService.profile().then(sub_r => {
          Backend.setProfile(sub_r);
          this.setState({
            redirect:
              sub_r.gender === "M" ? "/m/signup/complete" : "/w/signup/complete"
          });
        });
      }
    });
    event.preventDefault();
  };

  render() {
    const { classes } = this.props;
    const { redirect, errors } = this.state;

    return (
      <div className={classes.root}>
        {redirect && <Redirect to={redirect} />}
        <Navbar title="SIGN UP" gender="M" isLoggedIn="false" />
        <div className={classes.navWrapper}>
          <NavLink to="/signup" className={classes.navText}>
            {"< Back"}
          </NavLink>
        </div>
        <br />
        <form onSubmit={this.handleFormSubmit}>
          <ProfilePicHolder
            onClick={() =>
              this.setState({ redirect: "/m/signup/profilePicUploader" })
            }
          />

          <Grid container className={classes.container} spacing={8}>
            <Grid item xs={12}>
              <TextField
                className={classes.textField}
                fullWidth
                label="Username"
                style={{ margin: 8 }}
                placeholder="username"
                margin="normal"
                value={this.state.username}
                name="username"
                onChange={this.handleInputChange}
                InputLabelProps={{ shrink: true, className: classes.label }}
                error={errors.hasOwnProperty("username")}
                helperText={
                  errors.hasOwnProperty("username") && errors["username"]
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.textField}
                fullWidth
                label="Display Name"
                style={{ margin: 8 }}
                placeholder="Display Name"
                margin="normal"
                value={this.state.display_name}
                onChange={this.handleInputChange}
                name="display_name"
                error={errors.hasOwnProperty("display_name")}
                helperText={
                  errors.hasOwnProperty("display_name") &&
                  errors["display_name"]
                }
                InputLabelProps={{ shrink: true, className: classes.label }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                className={classes.textField}
                fullWidth
                label="Your age"
                style={{ margin: 8 }}
                placeholder="Age"
                margin="normal"
                value={this.state.age}
                name="age"
                onChange={this.handleInputChange}
                InputLabelProps={{ shrink: true, className: classes.label }}
                error={errors.hasOwnProperty("age")}
                helperText={errors.hasOwnProperty("age") && errors["age"]}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                className={classes.textField}
                fullWidth
                label="Mobile number"
                style={{ margin: 8 }}
                placeholder="Mobile no."
                margin="normal"
                value={this.state.mobile_no}
                name="mobile_no"
                onChange={this.handleInputChange}
                InputLabelProps={{ shrink: true, className: classes.label }}
                error={errors.hasOwnProperty("mobile_no")}
                helperText={
                  errors.hasOwnProperty("mobile_no") && errors["mobile_no"]
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.textField}
                fullWidth
                label="Email Address"
                style={{ margin: 8 }}
                placeholder="Email Address"
                margin="normal"
                value={this.state.email}
                name="email"
                onChange={this.handleInputChange}
                InputLabelProps={{ shrink: true, className: classes.label }}
                error={errors.hasOwnProperty("email")}
                helperText={errors.hasOwnProperty("email") && errors["email"]}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.textField}
                fullWidth
                label="Create password"
                style={{ margin: 8 }}
                placeholder="Create password"
                type="password"
                margin="normal"
                value={this.state.password}
                name="password"
                onChange={this.handleInputChange}
                InputLabelProps={{ shrink: true, className: classes.label }}
                error={errors.hasOwnProperty("password")}
                helperText={
                  errors.hasOwnProperty("password") && errors["password"]
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.textField}
                fullWidth
                label="Referral Code"
                style={{ margin: 8 }}
                placeholder="Referral Code"
                margin="normal"
                value={this.state.referral}
                name="referral"
                onChange={this.handleInputChange}
                InputLabelProps={{ shrink: true, className: classes.label }}
                error={errors.hasOwnProperty("referral")}
                helperText={
                  errors.hasOwnProperty("referral") && errors["referral"]
                }
              />
            </Grid>
            <Grid item xs={12}>
              <NomiButton
                className={classes.button}
                gender="M"
                src={imgSignup}
                type="submit"
              >
                Sign Up
              </NomiButton>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Signup);
