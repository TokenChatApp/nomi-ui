import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { NavLink, Redirect } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Navbar from '../../components/Navbar';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

import imgSignup from '../../images/signupWhite.png';

import { womanColor } from '../../Constants';

import ProfilePicHolder from '../../components/ProfilePicHolder';
import NomiButton from '../../components/NomiButton';

const grey = '#585858';

const styles = theme => ({
  root: {
    height : '100%',
    minHeight : '100vh',
    position : 'relative',
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
  label : {
    color : grey,
    fontWeight : 700,
    textAlign : 'left'
  },
  title : {
    marginTop : 30,
    color : grey,
    fontWeight : 700
  },
  alignLeft : {
    textAlign : 'left'
  },
  stepButton : {
    cursor : 'pointer',
    margin : 8,
    textAlign : 'right'
  },
  formControl : {
    margin : 8
  }
});

const Dot = props => {
  const filled = props.filled;
  const size = filled ? 10 : 8;
  const style = {
    backgroundColor : filled ? grey : 'white' ,
    borderRadius : '50%',
    border : filled ? 'none' : `1px solid ${grey}`,
    height : size, 
    width : size,
    margin : 10,
    marginRight : 0,
    display : 'inline-block',
  }; 
  
  return(<div style={style}/>);
}

class Signup extends React.Component {

  state = {
    redirect : '',
    step : '1'
  }

  handleChange = type => event => {
    this.setState({ [type] : event.target.value });
  }

  render() {
    const { classes } = this.props;
    const { redirect, step } = this.state;

    return (
      <div className={classes.root}>
        {redirect && <Redirect to={redirect}/>}
        <Navbar title="SIGN UP" gender="woman"/>

        <Typography className={classes.title} variant="h5">
        {step === '1' 
          ? 'User Information'
          : 'Personal Particular'
        }
        </Typography>

        {step === '1' && <ProfilePicHolder onClick={() => this.setState({ redirect : '/w/signup/profilePicUploader' })}/>}

        <Grid container className={classes.container} spacing={8}>

        {/* Render differect text field accoring to step */}
        {step === '1' ? 
          <React.Fragment>
          {/* Render first page */}
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
          <Grid item xs={4}>
            <TextField
              className={classes.textField}
              label="Rate"
              style={{ margin: 8 }}
              placeholder="Rate"
              margin="normal"
              InputLabelProps={{ shrink: true, className : classes.label }}
              InputProps={{
                endAdornment: <InputAdornment position="end">/Hour</InputAdornment>,
              }}
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
              label="Create password"
              style={{ margin: 8 }}
              placeholder="Create password"
              type="password"
              margin="normal"
              InputLabelProps={{ shrink: true, className : classes.label }}
            />
          </Grid>
          </React.Fragment>
          :
          <React.Fragment>
          {/* Render second page */}
          <Grid item xs={12}>
            <TextField
              select
              label="Ethinicity"
              fullWidth
              className={classes.textField}
              style={{ margin: 8 }}
              SelectProps={{
                native: true,
                MenuProps: { className: classes.menu },
              }}
              InputLabelProps={{ shrink: true, className : classes.label }}
              margin="normal"
            >
              {['1', '2', '3'].map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </TextField>    
          </Grid>
          <Grid item xs={12} className={classes.alignLeft} >
            <h6 className={classes.label} style={{margin : 8}}>Spoken Language</h6>
          
            <Grid container className={classes.formControl}>
              <Grid item xs={6}>
                <FormControlLabel
                  control={ <Checkbox /> }
                  label="Japanese"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={ <Checkbox /> }
                  label="English"
                />
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel
                  control={ <Checkbox /> }
                  label="Other"
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  className={classes.textField}
                  fullWidth
                  style={{ margin: 8 }}
                  margin="normal"
                  InputLabelProps={{ shrink: true, className : classes.label }}
                />
              </Grid>
            </Grid>

          </Grid>
          <Grid item xs={12}>
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
          <Grid item xs={6}>
            <TextField
              className={classes.textField}
              fullWidth
              label="Your weight"
              style={{ margin: 8 }}
              placeholder="Weight"
              margin="normal"
              InputLabelProps={{ shrink: true, className : classes.label }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              className={classes.textField}
              fullWidth
              label="Your height"
              style={{ margin: 8 }}
              placeholder="Height"
              margin="normal"
              InputLabelProps={{ shrink: true, className : classes.label }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.textField}
              fullWidth
              label="Location"
              style={{ margin: 8 }}
              placeholder="City"
              margin="normal"
              InputLabelProps={{ shrink: true, className : classes.label }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.textField}
              fullWidth
              style={{ margin: 8 }}
              placeholder="Perfecture"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.textField}
              fullWidth
              style={{ margin: 8 }}
              placeholder="Postal code"
              margin="normal"
            />
          </Grid>
          </React.Fragment>
        }


          <Grid item xs={6} className={classes.alignLeft}>
          {step === '1' ?
            <React.Fragment>
              <Dot filled={true}/>
              <Dot filled={false}/>
            </React.Fragment>
            :
            <React.Fragment>
              <Dot filled={false}/>
              <Dot filled={true}/>
            </React.Fragment>
          }
          </Grid>
          <Grid item xs={6}>
            {step === '1' ?
              <h5 className={classes.stepButton} onClick={() => this.setState({ step : '2' })}>{"Next > "}</h5>
              :
              <h5 className={classes.stepButton} onClick={() => this.setState({ step : '1' })}>{" < Back"}</h5>
            }
          </Grid>
          <Grid item xs={12}>
            <NomiButton 
              className={classes.button} 
              gender="woman" 
              src={imgSignup}
              onClick={() => this.setState({ redirect : '/w/signup/complete' })}
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

