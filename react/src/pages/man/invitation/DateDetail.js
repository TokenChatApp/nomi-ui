import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { NavLink, Redirect } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import NomiDatePicker from "../../../components/NomiDatePicker";
import NomiTimePicker from "../../../components/NomiTimePicker";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Cancel from "@material-ui/icons/Cancel";
import InputLabel from "@material-ui/core/InputLabel";
import { Backend } from "../../../services/Backend";
import ServerRequest from "../../../services/ServerRequest";

import NomiButton from "../../../components/NomiButton";

import { manColor } from "../../../Constants";

import girlImg from "../../../images/male/dashboard/girl_photo_2.jpg";
import wineImg from "../../../images/male/dashboard/wine_glass.png";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  wrapper: {
    paddingLeft: "10%",
    paddingRight: "10%"
  },
  title: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: "1.2rem",
    color: "#888"
  },
  img: {
    width: 70,
    borderRadius: "50%"
  },
  whiteBackground: {
    backgroundColor: "white"
  },
  formControl: {
    width: "100%",
    textAlign: "left",
    marginTop: 15,
    marginBottom: 15
  },
  container: {
    marginBottom: 30
  },
  textField: {
    marginTop: 15,
    marginBottom: 15
  },
  alignLeft: {
    textAlign: "left",
    color: "rgba(0, 0, 0, 0.54)",
    padding: 0,
    fontSize: "0.8rem",
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    lineHeight: 1
  },
  alignRight: {
    textAlign: "right",
    fontWeight: 500,
    color: "#6f6f6f"
  },
  girlContainer: {
    padding: 10,
    position: "relative"
  },
  iconWrapper: {
    paddingTop: 10,
    overflowX: "auto"
  },
  cancelIcon: {
    color: manColor[0],
    position: "absolute",
    top: 7,
    right: 0
  },
  navWrapper: {
    textAlign: "left",
    paddingLeft: "10%",
    paddingRight: "10%"
  },
  navText: {
    color: manColor[1],
    textDecoration: "none"
  },
  endWrapper: {
    paddingLeft: 30
  }
});

const GirlList = withStyles(styles)(props => {
  const { classes } = props;
  return (
    <Grid className={classes.girlContainer}>
      <Cancel className={classes.cancelIcon} />
      <img className={classes.img} src={girlImg} alt="Girl" />
    </Grid>
  );
});

class DateDetail extends React.Component {
  state = {
    selectedDate: new Date(),
    selectedTime: new Date(),
    endingTime: new Date()
      .toLocaleTimeString()
      .split(":")
      .splice(0, 2)
      .join(":"),
    city: "",
    place: "",
    redirect: null,
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

  handleDateChange = date => {
    var endDate = date;
    endDate.setHours(date.getHours() + 4);
    console.log(endDate);
    this.setState({ selectedDate: date, endingTime: endDate });
  };

  handleChange = type => event => {
    this.setState({ [type]: event.target.value });
  };

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

  handleConfirm = () => {
    Backend.selectedCity = this.state.city;
    Backend.selectedPlace = this.state.place;
    this.setState({ redirect: "/m/listings" });
  };

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
    return items;
  }

  render() {
    const { classes } = this.props;
    const { redirect } = this.state;
    const { selectedDate, endingTime, city, place } = this.state;

    return (
      <div className={classes.root}>
        {redirect && <Redirect to={redirect} />}
        <Navbar title="Girls around you" gender="M" />
        <div className={classes.wrapper}>
          <Typography className={classes.title} align="left">
            Pick a time and place!
          </Typography>

          <Grid container className={classes.container}>
            <Grid item xs={12}>
              <NomiDatePicker
                label="DATE"
                selectedDate={selectedDate}
                handleDateChange={this.handleDateChange}
              />
            </Grid>

            <Grid item xs={6}>
              <NomiTimePicker
                label="STARTING TIME"
                selectedDate={selectedDate}
                handleDateChange={this.handleDateChange}
                helperText="* 2 hours per date"
              />
            </Grid>

            <Grid item xs={6} className={classes.endWrapper}>
              <TextField
                label="ENDING TIME"
                defaultValue={endingTime}
                margin="normal"
                InputProps={{
                  readOnly: true
                }}
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
                >
                  <MenuItem disabled value="">
                    <em>None</em>
                  </MenuItem>
                  {this.renderPlacesMenuItems()}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <NomiButton
            className={classes.button}
            gender="M"
            onClick={this.handleConfirm}
          >
            <img
              src={wineImg}
              alt="glass"
              style={{ width: 15, paddingRight: 10 }}
            />
            Show me the Zhabors
          </NomiButton>
        </div>
      </div>
    );
  }
}

DateDetail.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DateDetail);
