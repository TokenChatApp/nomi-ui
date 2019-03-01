import React from 'react';
import AuthenticationService from '../../services/AuthenticationService';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Navbar from '../../components/Navbar';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import imgSignup from '../../images/signupWhite.png';
import women, {ethnicityPickList, statePickList} from '../../Constants';
import ProfilePicHolder from '../../components/ProfilePicHolder';
import NomiButton from '../../components/NomiButton';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import {Backend} from "../../services/Backend";

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
  inputLabel : {
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
  formControl: {
    margin : 8,
    width: '100%',
  },
  selectEmpty:{
    textAlign: 'left',
  },
  input: {
    textAlign: 'left',
  },
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
    step : '1',
    Gender: 'Women',
    Age: null,
    MobileNumber: null,
    Username: null,
    EmailAddress: null,
    Password: null,
    State: null,
    RatePerHour: null,
    PostalCode: null,
    City: null,
    Height: null,
    Weight: null,
    SpokenLanguage: [],
    OtherSpokenLanguage: null,
    Ethnicity: null,
    errors: {},
  };

  // handleChange = type => event => {
  //   this.setState({ [type] : event.target.value });
  // }

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
      this.setState({errors: r.errors});
      if (r.status){
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
    const { redirect, step, errors } = this.state;

    return (
        <div className={classes.root}>
          {redirect && <Redirect to={redirect}/>}
          <Navbar title="SIGN UP" gender="woman"/>
          <form onSubmit={this.handleFormSubmit}>
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
                        value={this.state.Username}
                        onChange={this.handleInputChange}
                        name="Username"
                        error={errors.hasOwnProperty("Username")}
                        helperText={errors.hasOwnProperty("Username") && errors["Username"]}
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
                        error={errors.hasOwnProperty("Email")}
                        helperText={errors.hasOwnProperty("Email") && errors["Email"]}
                        InputLabelProps={{ shrink: true, className : classes.label }}
                    />
                  </Grid>
                  {/*<Grid item xs={4}>*/}
                    {/*<TextField*/}
                        {/*className={classes.textField}*/}
                        {/*label="Rate"*/}
                        {/*style={{ margin: 8 }}*/}
                        {/*placeholder="Rate"*/}
                        {/*margin="normal"*/}
                        {/*value={this.state.RatePerHour}*/}
                        {/*onChange={this.handleInputChange}*/}
                        {/*name="RatePerHour"*/}
                        {/*InputLabelProps={{ shrink: true, className : classes.label }}*/}
                        {/*InputProps={{*/}
                          {/*endAdornment: <InputAdornment position="end">/Hour</InputAdornment>,*/}
                        {/*}}*/}
                    {/*/>*/}
                  {/*</Grid>*/}
                  <Grid item xs={12}>
                    <TextField
                        className={classes.textField}
                        fullWidth
                        label="Mobile Number"
                        style={{ margin: 8 }}
                        placeholder="Mobile no."
                        margin="normal"
                        value={this.state.MobileNumber}
                        onChange={this.handleInputChange}
                        name="MobileNumber"
                        error={errors.hasOwnProperty("MobileNumber")}
                        helperText={errors.hasOwnProperty("MobileNumber") && errors["MobileNumber"]}
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
                        onChange={this.handleInputChange}
                        name="Password"
                        error={errors.hasOwnProperty("Password")}
                        helperText={errors.hasOwnProperty("Password") && errors["Password"]}
                        InputLabelProps={{ shrink: true, className : classes.label }}
                    />
                  </Grid>
                </React.Fragment>
                :
                <React.Fragment>
                  {/* Render second page */}
                  <Grid item xs={12}>
                    <TextField
                        className={classes.textField}
                        fullWidth
                        label="Ethnicity"
                        style={{ margin: 8 }}
                        placeholder="Ethnicity"
                        type="text"
                        margin="normal"
                        value={this.state.Ethnicity}
                        onChange={this.handleInputChange}
                        name="Ethnicity"
                        error={errors.hasOwnProperty("Ethnicity")}
                        helperText={errors.hasOwnProperty("Ethnicity") && errors["Ethnicity"]}
                        InputLabelProps={{ shrink: true, className : classes.label }}
                    />
                  </Grid>

                  <Grid item xs={12}>


                    {/*<TextField*/}
                        {/*select*/}
                        {/*label="Ethinicity"*/}
                        {/*fullWidth*/}
                        {/*className={classes.textField}*/}
                        {/*style={{ margin: 8 }}*/}
                        {/*SelectProps={{*/}
                          {/*native: true,*/}
                          {/*MenuProps: { className: classes.menu },*/}
                        {/*}}*/}
                        {/*InputLabelProps={{ shrink: true, className : classes.label }}*/}
                        {/*margin="normal"*/}
                    {/*>*/}
                      {/*{['1', '2', '3'].map(option => (*/}
                          {/*<option key={option} value={option}>*/}
                            {/*{option}*/}
                          {/*</option>*/}
                      {/*))}*/}
                    {/*</TextField>*/}
                  </Grid>
                  <Grid item xs={12} className={classes.alignLeft} >
                    <h6 className={classes.label} style={{margin : 8}}>Spoken Language</h6>

                    <Grid container className={classes.formControl}>
                      <Grid item xs={6}>
                        <FormControlLabel
                            control={ <Checkbox /> }
                            label="Japanese"
                            name="SpokenLanguage[Japanese]"
                            value="Japanese"
                            onChange={this.handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormControlLabel
                            control={ <Checkbox /> }
                            label="English"
                            name="SpokenLanguage[English]"
                            value="English"
                            onChange={this.handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <FormControlLabel
                            control={ <Checkbox /> }
                            label="Other"
                            name="SpokenLanguage[Others]"
                            value="Others"
                            onChange={this.handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={8}>
                        <TextField
                            disabled={ this.state["SpokenLanguage[Others]"] !== "Others" }
                            className={classes.textField}
                            fullWidth
                            style={{ margin: 8 }}
                            margin="normal"
                            value={this.state.OtherSpokenLanguage}
                            onChange={this.handleInputChange}
                            InputLabelProps={{ shrink: true, className : classes.label }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        {errors.hasOwnProperty("SpokenLanguage") && errors["SpokenLanguage"]}
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
                        value={this.state.Age}
                        onChange={this.handleInputChange}
                        name="Age"
                        InputLabelProps={{ shrink: true, className : classes.label }}
                        error={errors.hasOwnProperty("Age")}
                        helperText={errors.hasOwnProperty("Age") && errors["Age"]}
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
                        value={this.state.Weight}
                        onChange={this.handleInputChange}
                        name="Weight"
                        InputLabelProps={{ shrink: true, className : classes.label }}
                        error={errors.hasOwnProperty("Weight")}
                        helperText={errors.hasOwnProperty("Weight") && errors["Weight"]}
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
                        value={this.state.Height}
                        onChange={this.handleInputChange}
                        name="Height"
                        InputLabelProps={{ shrink: true, className : classes.label }}
                        error={errors.hasOwnProperty("Height")}
                        helperText={errors.hasOwnProperty("Height") && errors["Height"]}
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
                        value={this.state.City}
                        onChange={this.handleInputChange}
                        name="City"
                        InputLabelProps={{ shrink: true, className : classes.label }}
                        error={errors.hasOwnProperty("City")}
                        helperText={errors.hasOwnProperty("City") && errors["City"]}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {/*<TextField*/}
                        {/*className={classes.textField}*/}
                        {/*fullWidth*/}
                        {/*style={{ margin: 8 }}*/}
                        {/*placeholder="State"*/}
                        {/*margin="normal"*/}
                    {/*/>*/}
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="state-label-placeholder">State</InputLabel>
                      <Select
                          value={this.state.State}
                          onChange={this.handleInputChange}
                          inputProps={{
                            name: 'State',
                            id: 'state-label-placeholder',
                          }}
                          className={classes.selectEmpty}
                          error={errors.hasOwnProperty("State")}
                          helperText={errors.hasOwnProperty("State") && errors["State"]}

                      >
                        <MenuItem disabled value="">
                          <em>None</em>
                        </MenuItem>
                        {
                          Object.keys(statePickList).map(key =>
                              <MenuItem value={key}>{statePickList[key]}</MenuItem>
                          )
                        }
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                        className={classes.textField}
                        fullWidth
                        style={{ margin: 8 }}
                        placeholder="Postal code"
                        margin="normal"
                        value={this.state.PostalCode}
                        onChange={this.handleInputChange}
                        name="PostalCode"
                        error={errors.hasOwnProperty("PostalCode")}
                        helperText={errors.hasOwnProperty("PostalCode") && errors["PostalCode"]}
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

