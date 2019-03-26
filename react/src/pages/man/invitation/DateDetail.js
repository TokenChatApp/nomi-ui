import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import NomiDatePicker from "../../../components/NomiDatePicker";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { Backend } from "../../../services/Backend";
import ServerRequest from "../../../services/ServerRequest";
import JobList from "../job/JobList";

import NomiButton from "../../../components/NomiButton";

import { manColor } from "../../../Constants";

import wineImg from "../../../images/male/dashboard/wine_glass.png";

var dateFormat = require("dateformat");

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  wrapper: {
    paddingLeft: "10%",
    paddingRight: "10%"
  },
  title: {
    marginTop: 30,
    marginBottom: 10,
    fontSize: 16,
    color: manColor[1]
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
  textFieldTime: {
    marginTop: 15,
    marginBottom: 15,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
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

class DateDetail extends React.Component {
  state = {
    selectedDate: new Date(),
    selectedHour: "18",
    endHour: "20",
    selectedMinute: "00",
    place: "恵比寿",
    city: "東京",
    redirect: null,
    cities: [],
    places: [],
    selectedPlaceId: 1,
    noGirlsFound: false
  };

  componentDidMount() {
    var currentHour = new Date().getHours();
    var currentMinute = new Date().getMinutes();
    currentMinute = (currentMinute + 30) % 60;
    if (currentMinute > 23) {
      currentHour += 1;
    }
    if (currentMinute < 8 || currentMinute > 53) {
      currentMinute = 0;
    } else if (currentMinute < 23) {
      currentMinute = 15;
    } else if (currentMinute < 43) {
      currentMinute = 30;
    } else {
      currentMinute = 45;
    }
    var hourString = currentHour.toString();
    if (hourString.length === 1) {
      hourString = "0" + hourString;
    } else if (hourString === "24") {
      hourString = "23";
    }
    var minuteString = currentMinute.toString();
    if (minuteString.length === 1) {
      minuteString = "0" + minuteString;
    }
    var endHourString = ((Number(hourString) + 2) % 23).toString();
    if (endHourString.length === 1) {
      endHourString = "0" + endHourString;
    }
    this.setState({
      selectedHour: hourString,
      selectedMinute: minuteString,
      endHour: endHourString,
      noGirlsFound: false
    });
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
                    selectedCityId: city.city_id,
                    selectedPlaceId: place.place_id,
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
  }

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };

  handleTimeChange = event => {
    const target = event.target;
    const name = target.name;
    var value = "";
    value = target.value;
    if (name === "selectedHour") {
      var newString = ((Number(value) + 2) % 24).toString();
      if (newString.length === 1) {
        newString = "0" + newString;
      }
      this.setState({
        [name]: value,
        endHour: newString
      });
    } else {
      this.setState({
        [name]: value
      });
    }
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
    if (name === "place") {
      for (var place of this.state.places) {
        if (place.place_name === value) {
          this.setState({ selectedPlaceId: place.place_id });
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
          this.setState({ selectedCityId: city.city_id, places: r });
        });
        break;
      }
    }
  };

  handleConfirm = () => {
    const {
      selectedDate,
      selectedHour,
      selectedMinute,
      selectedCityId,
      selectedPlaceId
    } = this.state;

    if (
      this.state.city === null ||
      this.state.city === "" ||
      this.state.place === null ||
      this.state.place === ""
    ) {
      return;
    }

    var finalDate = selectedDate;
    finalDate.setHours(selectedHour);
    finalDate.setMinutes(selectedMinute);
    let dict = {
      city_id: selectedCityId,
      place_id: selectedPlaceId,
      request_date: finalDate
    };
    let response = ServerRequest.getListing(dict);
    response.then(r => {
      Backend.listings = r;
      Backend.selectedCity = this.state.city;
      Backend.selectedPlace = this.state.place;
      Backend.selectedPlaceId = selectedPlaceId;
      Backend.selectedDate = finalDate;
      if (r.length === 0) {
        this.setState({ noGirlsFound: true });
      } else {
        this.setState({ redirect: "/m/listings", noGirlsFound: false });
      }
    });
  };

  renderHourMenuItems() {
    var items = [];
    for (var i = 0; i < 24; i++) {
      var newString = i.toString();
      if (newString.length === 1) {
        newString = "0" + newString;
      }
      items.push(
        <MenuItem key={i} value={newString}>
          {newString}
        </MenuItem>
      );
    }
    return items;
  }

  renderMinuteMenuItems() {
    var items = [];
    let array = ["00", "15", "30", "45"];
    for (var [i, minute] of array.entries()) {
      items.push(
        <MenuItem key={i} value={minute}>
          {minute}
        </MenuItem>
      );
    }
    return items;
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

  renderTopNotificationBar() {
    const { classes } = this.props;
    for (var [i, booking] of Backend.bookings.data.entries()) {
      let timeString = `${booking.request_start_time.substring(0, 5)}
      – ${booking.request_end_time.substring(0, 5)}`;

      var avatarArray = [];
      var numberOfAccepted = 0;

      for (var user of booking.users) {
        avatarArray.push(Backend.imgUrl + user.avatar);
        if (user.is_accepted) {
          numberOfAccepted++;
        }
      }
      if (numberOfAccepted > 0 && booking.status.toLowerCase() === "pending") {
        return (
          <div style={{ marginTop: 20, color: manColor[1] }}>
            {numberOfAccepted} 人がリクエストを受け取った! <br />
            <JobList
              key={booking.request_id}
              bookingIndex={i}
              images={avatarArray}
              jobStatus={booking.status.toUpperCase()}
              date={dateFormat(booking.request_date, "yyyy年mm月dd日")}
              time={timeString}
              location={booking.place ? booking.place.place_name : ""}
              numberOfAccepted={numberOfAccepted}
            />
            <br />
            <br />
            <NomiButton
              className={classes.button}
              gender="M"
              onClick={() => this.setState({ redirect: "/m/dates" })}
              style={{
                fontSize: "1rem"
              }}
            >
              <img
                src={wineImg}
                alt="glass"
                style={{ width: 15, paddingRight: 15 }}
              />
              リクエストを全て見る
            </NomiButton>
          </div>
        );
      }
    }
    return <div />;
  }

  render() {
    const { classes } = this.props;
    const { redirect } = this.state;
    const { selectedDate, endingTime } = this.state;

    return (
      <div className={classes.root}>
        {redirect && <Redirect to={redirect} />}
        <Navbar title="飲みに行こう！" gender="M" />
        <div className={classes.wrapper}>
          {this.renderTopNotificationBar()}
          <Typography className={classes.title} align="left">
            場所と時間を選んでください。
          </Typography>

          <Grid container className={classes.container}>
            <Grid item xs={4}>
              <NomiDatePicker
                label="日にち"
                selectedDate={selectedDate}
                handleDateChange={this.handleDateChange}
              />
            </Grid>

            <Grid item xs={4} className={classes.endWrapper}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="hour-label-placeholder">時</InputLabel>
                <Select
                  value={this.state.selectedHour}
                  onChange={this.handleTimeChange}
                  inputProps={{
                    name: "selectedHour",
                    id: "hour-label-placeholder"
                  }}
                  className={classes.selectEmpty}
                >
                  {this.renderHourMenuItems()}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4} className={classes.endWrapper}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="minute-label-placeholder">分</InputLabel>
                <Select
                  value={this.state.selectedMinute}
                  onChange={this.handleTimeChange}
                  inputProps={{
                    name: "selectedMinute",
                    id: "minute-label-placeholder"
                  }}
                  className={classes.selectEmpty}
                >
                  {this.renderMinuteMenuItems()}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} style={{ marginBottom: 20, textAlign: "left" }}>
              <span style={{ fontSize: "13px", color: manColor[1] }}>
                飲み会は {this.state.endHour}時{this.state.selectedMinute}分{" "}
                までです。
              </span>
            </Grid>
            <Grid item xs={5}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="city-label-placeholder">都市</InputLabel>
                <Select
                  value={this.state.city}
                  onChange={this.handleInputChangeCity}
                  inputProps={{
                    name: "city",
                    id: "city-label-placeholder"
                  }}
                  className={classes.selectEmpty}
                >
                  {this.renderCitiesMenuItems()}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} className={classes.endWrapper}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="place-label-placeholder">場所</InputLabel>
                <Select
                  value={this.state.place}
                  onChange={this.handleInputChange}
                  inputProps={{
                    name: "place",
                    id: "place-label-placeholder"
                  }}
                  className={classes.selectEmpty}
                >
                  {this.renderPlacesMenuItems()}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          {this.state.noGirlsFound ? (
            <span>
              No girls found. Please refine your search.
              <br />
              <br />
            </span>
          ) : (
            <div />
          )}
          <NomiButton
            className={classes.button}
            gender="M"
            onClick={this.handleConfirm}
            style={{
              fontSize: "1rem"
            }}
          >
            <img
              src={wineImg}
              alt="glass"
              style={{ width: 15, paddingRight: 15 }}
            />
            すぐ検索する！
          </NomiButton>
        </div>
        <br />
        <br />
        <br />
      </div>
    );
  }
}

DateDetail.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DateDetail);
