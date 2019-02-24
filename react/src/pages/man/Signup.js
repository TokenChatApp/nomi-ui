import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { NavLink, Redirect } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import imgSignup from '../../images/signupWhite.png';
import { manColor } from '../../Constants';
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
    marginTop : 40,
    fontSize : '2rem',
    fontWeight : 700
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
  label : {
    color : grey,
    fontWeight : 700
  },
});

class Signup extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      redirect: '',
      Gender: 'Men',
      Age: '',
      MobileNumber: '',
      Username: null,
      EmailAddress: '',
      Password: '',
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

  }

  handleInputChange(event) {
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
  }

  handleFormSubmit(event) {
    let that = this;
    let response = AuthenticationService.signUp(this.state);
    response.then(res => {
      if (res.status) {
        AuthenticationService.profile().then(function(r){
          Backend.setProfile(r);
          if (r.Gender === "Men"){
            that.setState({ redirect : '/m/signup/complete'});
          }
          if (r.Gender === "Women"){
            that.setState({ redirect : '/w/signup/complete'});
          }
        });
      }
    });
    event.preventDefault();
  }

  render() {
    const { classes } = this.props;
    const { redirect } = this.state;

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

