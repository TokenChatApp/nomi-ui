import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ServerRequest from "../../services/ServerRequest";
import { Redirect } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Navbar from "../../components/Navbar";
import Grid from "@material-ui/core/Grid";
import LocationOn from "@material-ui/icons/LocationOn";
import Check from "@material-ui/icons/Check";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { womanColor } from "../../Constants";
import NomiButton from "../../components/NomiButton";

const styles = theme => ({
  root: {
    height: "100%",
    minHeight: "100vh",
    position: "relative"
  },
  wrapper: {
    margin: 20,
    marginTop: 70,
    border: "1px solid #adadad"
  },
  container: {
    padding: 40,
    paddingLeft: "10%",
    paddingRight: "10%"
  },
  button: {
    marginTop: 30,
    maxWidth: 170,
    marginBottom: 20
  },
  locationIcon: {
    color: womanColor[1],
    fontSize: 70
  },
  checkIcon: {
    color: "white",
    marginRight: 10,
    fontSize: 24
  },
  label: {
    color: "#adadad",
    fontSize: 25
  },
  formControl: {
    marginTop: 15,
    marginBottom: 15,
    width: "90%"
  }
});

const citySelections = ["city 1", "city 2", "city 3", "city 4", "city 5"];

const placeSelections = [
  "place 1",
  "place 2",
  "place 3",
  "place 4",
  "place 5",
  "place 6"
];

class LocationEdit extends React.Component {
  state = {
    redirect: "",
    city: "",
    place: "",
    cities: [],
    places: []
  };

  componentDidMount() {
    if (this.state.cities.length === 0) {
      let response = ServerRequest.getCities();
      response.then(r => {
        this.setState({ cities: r });
      });
    }
  }

  handleChange = type => event => {
    this.setState({ [type]: event.target.value });
  };

  handleConfirm = event => {
    let dict = { city_id: this.state.city_id, place_id: this.state.place_id };
    let request = ServerRequest.updateLocation(dict);
    request.then(r => {
      this.setState({ redirect: "/w" });
    });
  };

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

  render() {
    const { classes } = this.props;
    const { redirect, city, place } = this.state;

    return (
      <div className={classes.root}>
        {redirect && <Redirect to={redirect} />}
        <Navbar title="Hello, Username" gender="F" />

        <div className={classes.wrapper}>
          <Grid container className={classes.container}>
            <Grid item xs={12}>
              <LocationOn className={classes.locationIcon} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h3" className={classes.label}>
                Select your current location
              </Typography>
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

            <Grid item xs={12}>
              <NomiButton
                className={classes.button}
                gender="F"
                onClick={this.handleConfirm}
              >
                <Check className={classes.checkIcon} />
                Confirm
              </NomiButton>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

LocationEdit.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LocationEdit);
