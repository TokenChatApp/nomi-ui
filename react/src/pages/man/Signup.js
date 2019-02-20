import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { NavLink, Redirect } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Navbar from '../../components/Navbar';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import imgSignup from '../../images/signupWhite.png';

import { manColor } from '../../Constants';

import ProfilePicHolder from '../../components/ProfilePicHolder';
import NomiButton from '../../components/NomiButton';

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

  state = {
    redirect : ''
  }

  render() {
    const { classes } = this.props;
    const { redirect } = this.state;

    return (
      <div className={classes.root}>
        {redirect && <Redirect to={redirect}/>}
        <Navbar title="SIGN UP" gender="man"/>

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
              InputLabelProps={{ shrink: true, className : classes.label }}
            />
          </Grid>
          <Grid item xs={12}>
            <NomiButton 
              className={classes.button} 
              gender="man" 
              src={imgSignup}
              onClick={() => this.setState({ redirect : '/m/signup/complete' })}
            >
              Sign Up
            </NomiButton>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Signup);

