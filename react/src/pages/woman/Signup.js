import React from "react";
import AuthenticationService from "../../services/AuthenticationService";
import ServerRequest from "../../services/ServerRequest";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Navbar from "../../components/Navbar";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import imgSignup from "../../images/signupWhite.png";
import women, { ethnicityPickList, statePickList } from "../../Constants";
import ProfilePicHolder from "../../components/ProfilePicHolder";
import NomiButton from "../../components/NomiButton";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { Backend } from "../../services/Backend";
import MainButton from "../../components/MainButton";

const grey = "#585858";

const styles = theme => ({
  root: {
    height: "100%",
    minHeight: "100vh",
    position: "relative"
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
    maxWidth: 250
  },
  label: {
    color: grey,
    fontWeight: 700,
    textAlign: "left"
  },
  inputLabel: {
    color: grey,
    fontWeight: 700,
    textAlign: "left"
  },
  title: {
    marginTop: 30,
    color: grey,
    fontWeight: 700
  },
  alignLeft: {
    textAlign: "left"
  },
  stepButton: {
    cursor: "pointer",
    margin: 8,
    textAlign: "right"
  },
  formControl: {
    margin: 8,
    width: "100%"
  },
  selectEmpty: {
    textAlign: "left"
  },
  input: {
    textAlign: "left"
  }
});

const Dot = props => {
  const filled = props.filled;
  const size = filled ? 10 : 8;
  const style = {
    backgroundColor: filled ? grey : "white",
    borderRadius: "50%",
    border: filled ? "none" : `1px solid ${grey}`,
    height: size,
    width: size,
    margin: 10,
    marginRight: 0,
    display: "inline-block"
  };

  return <div style={style} />;
};

class Signup extends React.Component {
  state = {
    redirect: "",
    step: "1",
    gender: "Women",
    age: null,
    avatar: null,
    mobileNumber: null,
    username: null,
    displayName: null,
    emailAddress: null,
    password: null,
    place: null,
    postalCode: null,
    city: null,
    height: null,
    weight: null,
    spokenLanguageArray: [],
    spokenLanguage: "",
    nationality: null,
    errors: {},
    cities: [],
    places: []
  };

  componentDidMount() {
    if (this.state.cities.length === 0) {
      let response = ServerRequest.getCities();
      response.then(r => {
        Backend.cities = r;
        this.setState({ cities: r });
      });
    }
  }

  handleInputChange = event => {
    const target = event.target;
    const name = target.name;
    var value = "";
    value = target.value;
    this.setState({
      [name]: value
    });
  };

  handleInputChangeCity = event => {
    const target = event.target;
    const name = target.name;
    var value = "";
    value = target.value;
    this.setState({
      [name]: value
    });
    for (var city of this.state.cities) {
      if (city.city_name === value) {
        let response = ServerRequest.getPlaces(city.city_id);
        response.then(r => {
          Backend.places = r;
          this.setState({ places: r });
        });
        break;
      }
    }
  };

  handleCheckboxClick = event => {
    const target = event.target;
    const name = target.name;

    if (target.checked) {
      var newArray = this.state.spokenLanguageArray;
      newArray.push(target.value);
      this.setState({ spokenLanguageArray: newArray });
    } else {
      for (const [x, language] of this.state.spokenLanguageArray.entries()) {
        if (language == target.value) {
          var newArray = this.state.spokenLanguageArray;
          newArray.splice(x, 1);
          this.setState({ spokenLanguageArray: newArray });
        }
      }
    }
  };

  handleFormSubmit = event => {
    let string = this.state.spokenLanguageArray.toString();
    this.setState({
      spokenLanguage: string,
      avatar: Backend.user.profileImage
    });
    console.log(this.state);
    let response = AuthenticationService.signUp(this.state);
    response.then(r => {
      this.setState({ errors: r.errors });
      if (r.status) {
        AuthenticationService.profile().then(sub_r => {
          Backend.setProfile(sub_r);
          this.setState({
            redirect:
              sub_r.gender === "Men"
                ? "/m/signup/complete"
                : "/w/signup/complete"
          });
        });
      }
    });
    event.preventDefault();
  };

  renderFields() {
    const { classes } = this.props;
    const { redirect, step, errors } = this.state;

    if (step === "1") {
      return (
        <React.Fragment>
          {/* Render first page */}
          <Grid item xs={12}>
            <TextField
              className={classes.textField}
              fullWidth
              label="Username"
              style={{ margin: 8 }}
              placeholder="username"
              margin="normal"
              value={this.state.username}
              onChange={this.handleInputChange}
              name="username"
              error={errors.hasOwnProperty("username")}
              helperText={
                errors.hasOwnProperty("username") && errors["username"]
              }
              InputLabelProps={{ shrink: true, className: classes.label }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.textField}
              fullWidth
              label="Display Name"
              style={{ margin: 8 }}
              placeholder="display name"
              margin="normal"
              value={this.state.displayName}
              onChange={this.handleInputChange}
              name="displayName"
              error={errors.hasOwnProperty("displayName")}
              helperText={
                errors.hasOwnProperty("displayName") && errors["displayName"]
              }
              InputLabelProps={{ shrink: true, className: classes.label }}
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
              error={errors.hasOwnProperty("email")}
              helperText={errors.hasOwnProperty("email") && errors["email"]}
              InputLabelProps={{ shrink: true, className: classes.label }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.textField}
              fullWidth
              label="Mobile Number"
              style={{ margin: 8 }}
              placeholder="Mobile no."
              margin="normal"
              value={this.state.mobileNumber}
              onChange={this.handleInputChange}
              name="mobileNumber"
              error={errors.hasOwnProperty("mobileNumber")}
              helperText={
                errors.hasOwnProperty("mobileNumber") && errors["mobileNumber"]
              }
              InputLabelProps={{ shrink: true, className: classes.label }}
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
              onChange={this.handleInputChange}
              name="password"
              error={errors.hasOwnProperty("password")}
              helperText={
                errors.hasOwnProperty("password") && errors["password"]
              }
              InputLabelProps={{ shrink: true, className: classes.label }}
            />
          </Grid>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          {/* Render second page */}
          <Grid item xs={12}>
            <TextField
              className={classes.textField}
              fullWidth
              label="Nationality"
              style={{ margin: 8 }}
              placeholder="Nationality"
              type="text"
              margin="normal"
              value={this.state.nationality}
              onChange={this.handleInputChange}
              name="nationality"
              error={errors.hasOwnProperty("nationality")}
              helperText={
                errors.hasOwnProperty("nationality") && errors["nationality"]
              }
              InputLabelProps={{ shrink: true, className: classes.label }}
            />
          </Grid>
          <Grid item xs={12} className={classes.alignLeft}>
            <h6 className={classes.label} style={{ margin: 8 }}>
              Spoken Languages
            </h6>
            <Grid container className={classes.formControl}>
              <Grid item xs={6}>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Japanese"
                  name="spokenLanguageArray"
                  value="Japanese"
                  onChange={this.handleCheckboxClick}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={<Checkbox />}
                  label="English"
                  name="spokenLanguageArray"
                  value="English"
                  onChange={this.handleCheckboxClick}
                />
              </Grid>
              <Grid item xs={12}>
                {errors.hasOwnProperty("spokenLanguageArray") &&
                  errors["spokenLspokenLanguageArrayanguage"]}
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
              value={this.state.age}
              onChange={this.handleInputChange}
              name="age"
              InputLabelProps={{ shrink: true, className: classes.label }}
              error={errors.hasOwnProperty("age")}
              helperText={errors.hasOwnProperty("age") && errors["age"]}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              className={classes.textField}
              fullWidth
              label="Your weight"
              style={{ margin: 8 }}
              placeholder="weight"
              margin="normal"
              value={this.state.weight}
              onChange={this.handleInputChange}
              name="weight"
              InputLabelProps={{ shrink: true, className: classes.label }}
              error={errors.hasOwnProperty("weight")}
              helperText={errors.hasOwnProperty("weight") && errors["weight"]}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              className={classes.textField}
              fullWidth
              label="Your height"
              style={{ margin: 8 }}
              placeholder="height"
              margin="normal"
              value={this.state.height}
              onChange={this.handleInputChange}
              name="height"
              InputLabelProps={{ shrink: true, className: classes.label }}
              error={errors.hasOwnProperty("height")}
              helperText={errors.hasOwnProperty("height") && errors["height"]}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="city-label-placeholder">City</InputLabel>
              <Select
                value={this.state.city}
                onChange={this.handleInputChangeCity}
                inputProps={{
                  name: "city",
                  id: "city-label-placeholder"
                }}
                className={classes.selectEmpty}
                error={errors.hasOwnProperty("city")}
                helperText={errors.hasOwnProperty("city") && errors["city"]}
              >
                <MenuItem disabled value="">
                  <em>None</em>
                </MenuItem>
                {this.renderCitiesMenuItems()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="place-label-placeholder">Place</InputLabel>
              <Select
                value={this.state.place}
                onChange={this.handleInputChange}
                inputProps={{
                  name: "place",
                  id: "place-label-placeholder"
                }}
                className={classes.selectEmpty}
                error={errors.hasOwnProperty("place")}
                helperText={errors.hasOwnProperty("place") && errors["place"]}
              >
                <MenuItem disabled value="">
                  <em>None</em>
                </MenuItem>
                {this.renderPlacesMenuItems()}
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
              helperText={
                errors.hasOwnProperty("PostalCode") && errors["PostalCode"]
              }
            />
          </Grid>
        </React.Fragment>
      );
    }
  }

  renderCitiesMenuItems() {
    var items = [];
    for (const [x, city] of this.state.cities.entries()) {
      const { city_id, city_name } = city;
      items.push(
        <MenuItem key={city_id} value={city_name}>
          {city_name}
        </MenuItem>
      );
    }
    console.log("99999");
    console.log(items);
    return items;
  }

  renderPlacesMenuItems() {
    var items = [];
    for (const [x, place] of this.state.places.entries()) {
      const { place_id, place_name } = place;
      items.push(
        <MenuItem key={place_id} value={place_name}>
          {place_name}
        </MenuItem>
      );
    }
    console.log("8888");
    console.log(items);
    return items;
  }

  render() {
    const { classes } = this.props;
    const { redirect, step, errors } = this.state;

    return (
      <div className={classes.root}>
        {redirect && <Redirect to={redirect} />}
        <Navbar title="SIGN UP" gender="woman" />
        <MainButton
          className={classes.button}
          onClick={() => this.setState({ redirect: "/signup" })}
        >
          Back
        </MainButton>
        <form onSubmit={this.handleFormSubmit}>
          <Typography className={classes.title} variant="h5">
            {step === "1" ? "User Information" : "Personal Particulars"}
          </Typography>
          {step === "1" && (
            <ProfilePicHolder
              onClick={() =>
                this.setState({ redirect: "/w/signup/profilePicUploader" })
              }
            />
          )}

          <Grid container className={classes.container} spacing={8}>
            {this.renderFields()}
            <Grid item xs={6} className={classes.alignLeft}>
              {step === "1" ? (
                <React.Fragment>
                  <Dot filled={true} />
                  <Dot filled={false} />
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Dot filled={false} />
                  <Dot filled={true} />
                </React.Fragment>
              )}
            </Grid>
            <Grid item xs={6}>
              {step === "1" ? (
                <h5
                  className={classes.stepButton}
                  onClick={() => this.setState({ step: "2" })}
                >
                  {"Next > "}
                </h5>
              ) : (
                <h5
                  className={classes.stepButton}
                  onClick={() => this.setState({ step: "1" })}
                >
                  {" < Back"}
                </h5>
              )}
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
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Signup);
