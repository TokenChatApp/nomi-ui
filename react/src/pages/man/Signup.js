import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import imgSignup from '../../images/signupWhite.png';
import ProfilePicHolder from '../../components/ProfilePicHolder';
import NomiButton from '../../components/NomiButton';
import AuthenticationService from "../../services/AuthenticationService";
import {Backend} from "../../services/Backend";

const grey = '#585858';

const styles = theme => ({
  root: {
    height : '100%',
    minHeight : '100vh',
    position : 'relative',
  },
  label : {
    //marginTop : 40,
    //fontSize : '14px',
    fontWeight : 700,
    color : grey,
  },
  description : {
    fontSize : '1rem',
    fontWeight : 400
  },
  container : {
    marginTop :30,
    paddingLeft: '10%',
    paddingRight: '10%',
  },
  button : {
    maxWidth : 250,
  },
  input : {
    color : grey
  },
});

class Signup extends React.Component {

  state = {
    redirect: '',
    Gender: 'Men',
    Age: null,
    MobileNumber: null,
    Username: null,
    Email: null,
    Password: null,
    errors: {},
  };

  handleInputChange = (event => {
    const target = event.target;
    let value = "";
    if (target.type === 'checkbox') {
      if (target.checked){
        value = target.value;
      }else{
        value = "";
      }
    } else{
      value = target.value;
    }
    const name = target.name;

    this.setState({
      [name]: value
    });
  });

  handleFormSubmit = (event => {
    let response = AuthenticationService.signUp(this.state);
    response.then(r => {
      this.setState({ errors: r.errors });
      if (r.status) {
        AuthenticationService.profile().then(sub_r => {
          Backend.setProfile(sub_r);
          this.setState({ redirect: sub_r.Gender === "Men" ? '/m/signup/complete' : '/w/signup/complete' });
        });
      }
    });
    event.preventDefault();
  });

  render() {
    const { classes } = this.props;
    const { redirect, errors } = this.state;

    return (
        <div className={classes.root}>
          {redirect && <Redirect to={redirect}/>}
          <Navbar title="SIGN UP" gender="man"/>
          <form onSubmit={this.handleFormSubmit}>

            <ProfilePicHolder onClick={() => this.setState({ redirect : '/m/signup/profilePicUploader' })}/>

            <Grid container className={classes.container} spacing={8}>
              <Grid item xs={12}>
                <TextField
                    className={classes.textField}
                    fullWidth
                    label="Choose an username"
                    style={{ margin: 8 }}
                    placeholder="Username"
                    margin="normal"
                    value={this.state.Username}
                    name="Username"
                    onChange={this.handleInputChange}
                    InputLabelProps={{ shrink: true, className : classes.label }}
                    error={errors.hasOwnProperty("Username")}
                    helperText={errors.hasOwnProperty("Username") && errors["Username"]}
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
                    value={this.state.Age}
                    name="Age"
                    onChange={this.handleInputChange}
                    InputLabelProps={{ shrink: true, className : classes.label }}
                    error={errors.hasOwnProperty("Age")}
                    helperText={errors.hasOwnProperty("Age") && errors["Age"]}
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
                    value={this.state.MobileNumber}
                    name="MobileNumber"
                    onChange={this.handleInputChange}
                    InputLabelProps={{ shrink: true, className : classes.label }}
                    error={errors.hasOwnProperty("MobileNumber")}
                    helperText={errors.hasOwnProperty("MobileNumber") && errors["MobileNumber"]}
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
                    value={this.state.Email}
                    name="Email"
                    onChange={this.handleInputChange}
                    InputLabelProps={{ shrink: true, className : classes.label }}
                    error={errors.hasOwnProperty("Email")}
                    helperText={errors.hasOwnProperty("Email") && errors["Email"]}
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
                    value={this.state.Password}
                    name="Password"
                    onChange={this.handleInputChange}
                    InputLabelProps={{ shrink: true, className : classes.label }}
                    error={errors.hasOwnProperty("Password")}
                    helperText={errors.hasOwnProperty("Password") && errors["Password"]}
                />
              </Grid>
              <Grid item xs={12}>
                <NomiButton
                    className={classes.button}
                    gender="man"
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
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Signup);

