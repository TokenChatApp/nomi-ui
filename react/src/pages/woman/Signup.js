import React from "react";
import AuthenticationService from "../../services/AuthenticationService";
import ServerRequest from "../../services/ServerRequest";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { NavLink, Redirect } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Navbar from "../../components/Navbar";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import imgSignup from "../../images/signupWhite.png";
import ProfilePicHolder from "../../components/ProfilePicHolder";
import NomiButton from "../../components/NomiButton";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { Backend } from "../../services/Backend";
import { womanColor, manColor } from "../../Constants";

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
    maxWidth: 250,
    marginBottom: 30
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
    marginTop: 10,
    color: grey,
    fontWeight: 700
  },
  alignLeft: {
    textAlign: "left"
  },
  formControl: {
    margin: 8,
    width: "100%"
  },
  selectEmpty: {
    textAlign: "left"
  },
  backButton: {
    color: womanColor[0],
    maxWidth: 200,
    display: "block",
    margin: "auto",
    marginTop: 15,
    fontSize: "1rem",
    fontWeight: 700
  },
  input: {
    textAlign: "left"
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
    gender: "F",
    age: null,
    avatar: null,
    username: null,
    password: null,
    mobile_no: null,
    display_name: null,
    email: null,
    place: "恵比寿",
    city: "東京",
    height: null,
    weight: null,
    referral: null,
    spokenLanguageArray: [],
    language: "",
    nationality: null,
    errors: {},
    cities: [],
    places: [],
    ages: [],
    height: [],
    weights: [],
    noProfilePicError: false
  };

  componentWillMount() {
    if (this.state.cities.length === 0) {
      let response = ServerRequest.getCities();
      response.then(r => {
        for (var city of r) {
          if (city.city_name === "東京") {
            let response = ServerRequest.getPlaces(city.city_id);
            response.then(res => {
              for (var place of res) {
                if (place.place_name === "恵比寿") {
                  this.setState({
                    city_id: city.city_id,
                    place_id: place.place_id,
                    places: res,
                    cities: r
                  });
                }
              }
            });
            break;
          }
        }
      });
    }
    var ages = [];
    var heights = [];
    var weights = [];
    for (var i = 18; i < 81; i++) {
      ages.push(i);
    }
    for (i = 140; i < 201; i++) {
      heights.push(i.toString());
    }
    for (i = 35; i < 81; i++) {
      weights.push(i);
    }
    this.setState({
      ages: ages,
      heights: heights,
      weights: weights,
      noProfilePicError: false,
      nationalities: ["日本人", "シンガポール人"]
    });
  }

  handleInputChange = event => {
    const target = event.target;
    const name = target.name;
    var value = "";
    value = target.value;
    this.setState({
      [name]: value
    });
    if (name === "place") {
      for (var place of this.state.places) {
        if (place.place_name === value) {
          this.setState({ place_id: place.place_id });
        }
      }
    }
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
          this.setState({ city_id: city.city_id, places: r });
        });
        break;
      }
    }
  };

  handleCheckboxClick = event => {
    const target = event.target;

    if (target.checked) {
      var newArray = this.state.spokenLanguageArray;
      newArray.push(target.value);
      this.setState({ spokenLanguageArray: newArray });
    } else {
      for (const [x, language] of this.state.spokenLanguageArray.entries()) {
        if (language === target.value) {
          newArray = this.state.spokenLanguageArray;
          newArray.splice(x, 1);
          this.setState({ spokenLanguageArray: newArray });
        }
      }
    }
  };

  handleFormSubmit = event => {
    if (!Backend.user.profileImage || Backend.user.profileImage === null) {
      this.setState({ noProfilePicError: true });
      event.preventDefault();
      return;
    }
    var formData = new FormData();
    let string = this.state.spokenLanguageArray.toString();
    formData.set("gender", this.state.gender);
    formData.set("age", this.state.age);
    formData.set("display_name", this.state.display_name);
    formData.set("mobile_no", this.state.mobile_no);
    formData.set("username", Backend.firstTimeLoginUsername);
    formData.set("email", this.state.email);
    formData.set("password", Backend.firstTimeLoginPassword);
    formData.set("referral", this.state.referral);
    formData.set("nationality", this.state.nationality);
    formData.set("language", string);
    formData.set("weight", this.state.weight);
    formData.set("height", this.state.height);
    formData.set("city_id", this.state.city_id);
    formData.set("place_id", this.state.place_id);
    formData.set("intro", this.state.intro);
    formData.append("avatar", Backend.user.profileImageFile);
    let response = AuthenticationService.signUp(formData);
    response.then(r => {
      this.setState({ errors: r.errors, noProfilePicError: false });
      if (r.status) {
        ServerRequest.getOwnProfile().then(sub_r => {
          Backend.setProfile(sub_r);
        });
      }
    });
    event.preventDefault();
  };

  renderFields() {
    const { classes } = this.props;
    const { errors } = this.state;

    return (
      <React.Fragment>
        <Grid item xs={12}>
          <TextField
            className={classes.textField}
            fullWidth
            label="ニックネーム"
            style={{ margin: 8 }}
            placeholder="ニックネーム"
            margin="normal"
            value={this.state.display_name}
            onChange={this.handleInputChange}
            name="display_name"
            error={errors.hasOwnProperty("display_name")}
            helperText={
              errors.hasOwnProperty("display_name") && errors["display_name"]
            }
            InputLabelProps={{ shrink: true, className: classes.label }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            className={classes.textField}
            fullWidth
            label="メールアドレス"
            style={{ margin: 8 }}
            placeholder="メールアドレス"
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
            label="携帯番号"
            style={{ margin: 8 }}
            placeholder="携帯番号"
            margin="normal"
            value={this.state.mobile_no}
            onChange={this.handleInputChange}
            name="mobile_no"
            error={errors.hasOwnProperty("mobile_no")}
            helperText={
              errors.hasOwnProperty("mobile_no") && errors["mobile_no"]
            }
            InputLabelProps={{ shrink: true, className: classes.label }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            className={classes.textField}
            fullWidth
            label="紹介コード"
            style={{ margin: 8 }}
            placeholder="紹介コード"
            margin="normal"
            value={this.state.referral}
            name="referral"
            onChange={this.handleInputChange}
            InputLabelProps={{ shrink: true, className: classes.label }}
            error={errors.hasOwnProperty("referral")}
            helperText={errors.hasOwnProperty("referral") && errors["referral"]}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControl className={classes.formControl}>
            <InputLabel>国籍</InputLabel>
            <Select
              value={this.state.nationality}
              onChange={this.handleInputChange}
              inputProps={{
                name: "nationality",
                id: "nationality-label-placeholder"
              }}
              className={classes.selectEmpty}
              error={errors.hasOwnProperty("nationality")}
              helperText={
                errors.hasOwnProperty("nationality") && errors["nationality"]
              }
            >
              {this.renderNationalityMenuItems()}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} className={classes.alignLeft}>
          <h6 className={classes.label} style={{ margin: 8 }}>
            言語
          </h6>
          <Grid container className={classes.formControl}>
            <Grid item xs={6}>
              <FormControlLabel
                control={<Checkbox />}
                label="日本語"
                name="spokenLanguageArray"
                value="Japanese"
                onChange={this.handleCheckboxClick}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                control={<Checkbox />}
                label="英語"
                name="spokenLanguageArray"
                value="English"
                onChange={this.handleCheckboxClick}
              />
            </Grid>
            <Grid item xs={12}>
              {errors.hasOwnProperty("spokenLanguageArray") &&
                errors["spokenLanguageArray"]}
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={4}>
          <FormControl className={classes.formControl}>
            <InputLabel>年齢</InputLabel>
            <Select
              value={this.state.age}
              onChange={this.handleInputChange}
              inputProps={{
                name: "age",
                id: "age-label-placeholder"
              }}
              className={classes.selectEmpty}
              error={errors.hasOwnProperty("age")}
              helperText={errors.hasOwnProperty("age") && errors["age"]}
            >
              {this.renderAgeMenuItems()}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl className={classes.formControl}>
            <InputLabel>身長</InputLabel>
            <Select
              value={this.state.height}
              onChange={this.handleInputChange}
              inputProps={{
                name: "height",
                id: "height-label-placeholder"
              }}
              className={classes.selectEmpty}
              error={errors.hasOwnProperty("height")}
              helperText={errors.hasOwnProperty("height") && errors["height"]}
            >
              {this.renderHeightMenuItems()}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl className={classes.formControl}>
            <InputLabel>体重</InputLabel>
            <Select
              value={this.state.weight}
              onChange={this.handleInputChange}
              inputProps={{
                name: "weight",
                id: "weight-label-placeholder"
              }}
              className={classes.selectEmpty}
              error={errors.hasOwnProperty("weight")}
              helperText={errors.hasOwnProperty("weight") && errors["weight"]}
            >
              {this.renderWeightMenuItems()}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl className={classes.formControl}>
            <InputLabel>都市</InputLabel>
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
              {this.renderCitiesMenuItems()}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl className={classes.formControl}>
            <InputLabel>エリア</InputLabel>
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
              {this.renderPlacesMenuItems()}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <TextField
            className={classes.textField}
            fullWidth
            multiline
            rows={5}
            label="自己紹介"
            style={{ margin: 8 }}
            placeholder="自己紹介"
            margin="normal"
            value={this.state.intro}
            onChange={this.handleInputChange}
            name="intro"
            InputLabelProps={{ shrink: true, className: classes.label }}
            error={errors.hasOwnProperty("intro")}
            helperText={errors.hasOwnProperty("intro") && errors["intro"]}
          />
        </Grid>
      </React.Fragment>
    );
  }

  renderCitiesMenuItems() {
    var items = [];
    for (const city of this.state.cities) {
      const { city_id, city_name } = city;
      items.push(
        <MenuItem key={city_id} value={city_name}>
          {city_name}
        </MenuItem>
      );
    }
    return items;
  }

  renderPlacesMenuItems() {
    var items = [];
    for (const place of this.state.places) {
      const { place_id, place_name } = place;
      items.push(
        <MenuItem key={place_id} value={place_name}>
          {place_name}
        </MenuItem>
      );
    }
    return items;
  }

  renderNationalityMenuItems() {
    var items = [];
    for (const nationality of this.state.nationalities) {
      items.push(
        <MenuItem key={nationality} value={nationality}>
          {nationality}
        </MenuItem>
      );
    }
    return items;
  }

  renderAgeMenuItems() {
    var items = [];
    for (const age of this.state.ages) {
      items.push(
        <MenuItem key={age} value={age}>
          {age}
        </MenuItem>
      );
    }
    return items;
  }

  renderHeightMenuItems() {
    var items = [];
    for (const height of this.state.heights) {
      items.push(
        <MenuItem key={height} value={height}>
          {height}
        </MenuItem>
      );
    }
    return items;
  }

  renderWeightMenuItems() {
    var items = [];
    for (const weight of this.state.weights) {
      items.push(
        <MenuItem key={weight} value={weight}>
          {weight}
        </MenuItem>
      );
    }
    return items;
  }

  render() {
    const { classes } = this.props;
    const { redirect } = this.state;

    return (
      <div className={classes.root}>
        {redirect && <Redirect to={redirect} />}
        <Navbar title="サインアップ" gender="F" isLoggedIn="false" />
        <div className={classes.navWrapper}>
          <NavLink to="/signup" className={classes.navText}>
            {"< 戻る"}
          </NavLink>
        </div>
        <form onSubmit={this.handleFormSubmit}>
          <Typography className={classes.title} variant="h5">
            サインアップ
          </Typography>
          <ProfilePicHolder
            onClick={() =>
              this.setState({ redirect: "/w/signup/profilePicUploader" })
            }
          />

          <Grid container className={classes.container} spacing={8}>
            {this.renderFields()}
            {this.state.noProfilePicError ? (
              <span style={{ color: "red" }}>
                <br />
                Please upload a profile picture
                <br />
                <br />
              </span>
            ) : (
              <div />
            )}
            <Grid item xs={12}>
              <NomiButton
                className={classes.button}
                gender="F"
                src={imgSignup}
                type="submit"
              >
                サインアップ
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
