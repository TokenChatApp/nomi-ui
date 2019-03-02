import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { NavLink, Redirect } from 'react-router-dom';
import Navbar from '../../../components/Navbar';
import Grid from '@material-ui/core/Grid';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import NomiDatePicker from '../../../components/NomiDatePicker';
import NomiTimePicker from '../../../components/NomiTimePicker';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';

import NomiButton from '../../../components/NomiButton';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import { manColor } from '../../../Constants';

const Range = Slider.Range;

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  wrapper : {
    paddingLeft : '10%',
    paddingRight : '10%',
  },
  title : {
    marginTop : 20,
    marginBottom : 10,
    fontSize : '1.2rem',
    color : '#888'
  },
  img: {
    height: 255,
    overflow: 'hidden',
    display: 'block',
    width: '100%',
  },
  dotActive: {
    backgroundColor : manColor[1]
  },
  whiteBackground : {
    backgroundColor : 'white'
  },
  formControl : {
    width : '100%',
    textAlign : 'left',
    marginTop : 15,
    marginBottom : 15
  },
  container : {
    marginBottom : 30
  },
  textField : {
    marginTop : 15,
    marginBottom : 15
  },
  alignLeft : { 
    textAlign: 'left',
    color: 'rgba(0, 0, 0, 0.54)',
    padding: 0,
    fontSize: '0.8rem',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    lineHeight: 1
  },
  alignRight : { 
    textAlign: 'right',
    fontWeight : 500,
    color : '#6f6f6f',
  },
  leftLabel : {
    fontWeight : 300,
    color : '#888',
    textAlign : 'left',
    fontSize : '0.8rem',
  },
  rightLabel : {
    fontWeight : 300,
    color : '#888',
    textAlign : 'right',
    fontSize : '0.8rem',
  },
});

const citySelections = [
  'city 1',
  'city 2',
  'city 3',
  'city 4',
];

const placeSelections = [
  'place 1',
  'place 2',
  'place 3',
  'place 4',
];

const languages = [
  'Japanese',
  'English',
  'Chinese'
];

const ageBoundaries = [18, 80];
const heightBoundaries = [100, 200];
const weightBoundaries = [40, 100];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

class BookingDetail extends React.Component {
  state = {
    activeStep: 0,
    selectedDate : new Date(),
    selectedTime : new Date(),
    endingTime : new Date().toLocaleTimeString().split(':').splice(0,2).join(':'),
    city : '',
    place : '',
    ethnicity : '',
    selectedLanguages : [],
    ageRange : [20, 30],
    heightRange : [100, 160],
    weightRange : [40, 70],
    redirect : null,
  };

  handleNext = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1,
    }));
  };

  handleDateChange = date => {
    this.setState({ selectedDate : date });
  }

  handleChange = type => event => {
    this.setState({ [type] : event.target.value})
  }

  handleRangeChange = type => value => {
    this.setState({ [type] : value });
  }

  handleConfirm = () => {
    this.setState({ redirect : '/m/booking/sent' });
  }

  render() {
    const { classes } = this.props;
    const { activeStep, redirect } = this.state;
    const { selectedDate, selectedTime, endingTime, city, place, ethnicity, selectedLanguages } = this.state;
    const { ageRange, heightRange, weightRange } = this.state;
    const labels = ['Booking details', 'Girl Preference'];
    const maxSteps = 2;

    return (
      <div className={classes.root}>
        {redirect && <Redirect to={redirect}/>}
        <Navbar title="Make a booking" gender="man"/>
        <div className={classes.wrapper}>
          <Typography className={classes.title} align="left">
            {labels[activeStep]}
          </Typography>

          <Grid container className={classes.container}>
          {
            activeStep === 0 ? 
              <React.Fragment>
                {/* Booking details */}
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

                <Grid item xs={6}>
                 <TextField
                    label="ENDING TIME"
                    defaultValue={endingTime}
                    margin="normal"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl className={classes.formControl}>
                    <InputLabel shrink>Location</InputLabel>
                    <Select
                      value={city}
                      onChange={this.handleChange('city')}
                      displayEmpty
                      fullWidth
                    >
                      <MenuItem value="" disabled>
                        City
                      </MenuItem>
                      {citySelections.map(e => <MenuItem value={e}>{e}</MenuItem>)}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl className={classes.formControl}>
                    <Select
                      value={place}
                      onChange={this.handleChange('place')}
                      displayEmpty
                      fullWidth
                    >
                      <MenuItem value="" disabled>
                        Place
                      </MenuItem>
                      {placeSelections.map(e => <MenuItem value={e}>{e}</MenuItem>)}
                    </Select>
                  </FormControl>
                </Grid>
              </React.Fragment>
            : 
              <React.Fragment>
                {/* Girl Preference */}
                <Grid item xs={12}>
                  <TextField
                    label="ETHNICITY"
                    className={classes.textField}
                    fullWidth
                    value={ethnicity}
                    onChange={this.handleChange('ethnicity')}
                    InputLabelProps={{shrink:true}}
                    placeholder="ALL"
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="select-multiple-checkbox" shrink>LANGUAGES</InputLabel>
                    <Select
                      multiple
                      value={selectedLanguages}
                      onChange={this.handleChange('selectedLanguages')}
                      input={<Input id="select-multiple-checkbox" />}
                      renderValue={selected => selected.join(', ')}
                      MenuProps={MenuProps}
                    >
                      {languages.map(language => (
                        <MenuItem key={language} value={language}>
                          <Checkbox checked={selectedLanguages.indexOf(language) > -1} />
                          <ListItemText primary={language} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Grid container className={classes.formControl}>
                    <Grid item xs={6} className={classes.alignLeft}>
                      AGE
                    </Grid>
                    <Grid item xs={6} className={classes.alignRight}>
                      {`${ageRange[0]} - ${ageRange[1]}`}
                    </Grid>
                    <Grid item xs={12}>
                      <Range 
                        min={ageBoundaries[0]}
                        max={ageBoundaries[1]}
                        value={ageRange}
                        onChange={this.handleRangeChange('ageRange')}
                        allowCross={false}
                      />
                    </Grid>
                    <Grid item xs={6} className={classes.leftLabel}>
                      {ageBoundaries[0]}
                    </Grid>
                    <Grid item xs={6} className={classes.rightLabel}>
                      {ageBoundaries[1]}
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Grid container className={classes.formControl}>
                    <Grid item xs={6} className={classes.alignLeft}>
                      HEIGHT
                    </Grid>
                    <Grid item xs={6} className={classes.alignRight}>
                      {`${heightRange[0]} - ${heightRange[1]} cm`}
                    </Grid>
                    <Grid item xs={12}>
                      <Range 
                        min={heightBoundaries[0]}
                        max={heightBoundaries[1]}
                        value={heightRange}
                        onChange={this.handleRangeChange('heightRange')}
                        allowCross={false}
                      />
                    </Grid>
                    <Grid item xs={6} className={classes.leftLabel}>
                      {heightBoundaries[0]}cm
                    </Grid>
                    <Grid item xs={6} className={classes.rightLabel}>
                      {heightBoundaries[1]}cm
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Grid container className={classes.formControl}>
                    <Grid item xs={6} className={classes.alignLeft}>
                      WEIGHT
                    </Grid>
                    <Grid item xs={6} className={classes.alignRight}>
                      {`${weightRange[0]} - ${weightRange[1]} kg`}
                    </Grid>
                    <Grid item xs={12}>
                      <Range 
                        min={weightBoundaries[0]}
                        max={weightBoundaries[1]}
                        value={weightRange}
                        onChange={this.handleRangeChange('weightRange')}
                        allowCross={false}
                      />
                    </Grid>
                    <Grid item xs={6} className={classes.leftLabel}>
                      {weightBoundaries[0]}kg
                    </Grid>
                    <Grid item xs={6} className={classes.rightLabel}>
                      {weightBoundaries[1]}kg
                    </Grid>
                  </Grid>
                </Grid>

              </React.Fragment>
          }
          </Grid>
          <MobileStepper
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            className={classes.mobileStepper}
            classes={{
              dotActive : classes.dotActive,
              root : classes.whiteBackground
            }}
            nextButton={
              <Button size="small" onClick={this.handleNext} disabled={activeStep === maxSteps - 1}>
                Next
                <KeyboardArrowRight />
              </Button>
            }
            backButton={
              <Button size="small" onClick={this.handleBack} disabled={activeStep === 0}>
                <KeyboardArrowLeft />
                Back
              </Button>
            }
          />
          <NomiButton 
            className={classes.button} 
            gender="man" 
            onClick={this.handleConfirm}
          >
            Confirm
          </NomiButton>

        </div>
      </div>
    );
  }
}

BookingDetail.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BookingDetail);

