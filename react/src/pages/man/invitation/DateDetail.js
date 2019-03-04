import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { NavLink, Redirect } from 'react-router-dom';
import Navbar from '../../../components/Navbar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import NomiDatePicker from '../../../components/NomiDatePicker';
import NomiTimePicker from '../../../components/NomiTimePicker';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Cancel from '@material-ui/icons/Cancel';
import InputLabel from '@material-ui/core/InputLabel';

import NomiButton from '../../../components/NomiButton';

import { manColor } from '../../../Constants';

import girlImg from '../../../images/male/dashboard/girl_photo_2.jpg';
import wineImg from '../../../images/male/dashboard/wine_glass.png';

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
    width : 70,
    borderRadius : '50%',
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
  girlContainer : {
    padding : 10,
    position : 'relative'
  },
  iconWrapper : {
    paddingTop : 10,
    overflowX: 'auto'
  },
  cancelIcon : {
    color : manColor[0],
    position : 'absolute',
    top : 7,
    right : 0
  },
  navWrapper : {
    textAlign:'left',
    paddingLeft : '10%',
    paddingRight : '10%',
  },
  navText : {
    color : manColor[1],
    textDecoration : 'none'
  },
  endWrapper : {
    paddingLeft : 30
  }
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

const GirlList = withStyles(styles)(props => {
  const { classes } = props;
  return(
    <Grid className={classes.girlContainer}>
      <Cancel className={classes.cancelIcon}/>
      <img className={classes.img} src={girlImg}/>
    </Grid>
  );
});

class DateDetail extends React.Component {
  state = {
    selectedDate : new Date(),
    selectedTime : new Date(),
    endingTime : new Date().toLocaleTimeString().split(':').splice(0,2).join(':'),
    city : '',
    place : '',
    redirect : null,
  };

  handleDateChange = date => {
    this.setState({ selectedDate : date });
  }

  handleChange = type => event => {
    this.setState({ [type] : event.target.value})
  }

  handleConfirm = () => {
    this.setState({ redirect : '/m/invitation/sent' });
  }

  render() {
    const { classes } = this.props;
    const { redirect } = this.state;
    const { selectedDate, selectedTime, endingTime, city, place } = this.state;

    return (
      <div className={classes.root}>
        {redirect && <Redirect to={redirect}/>}
        <Navbar title="Girls around you" gender="man"/>
        <Grid container className={classes.iconWrapper} justify="center">
          <GirlList/>
          <GirlList/>
          <GirlList/>
        </Grid>
        <div className={classes.navWrapper}>
          <NavLink to="/m" className={classes.navText}>{"< Back to selection"}</NavLink>
        </div>
        <div className={classes.wrapper}>
          <Typography className={classes.title} align="left">
            Invitation details
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
          </Grid>
          <NomiButton 
            className={classes.button} 
            gender="man" 
            onClick={this.handleConfirm}
          >
            <img src={wineImg} alt="glass" style={{width : 15, paddingRight : 10}}/>            
            Send Invitation
          </NomiButton>

        </div>
      </div>
    );
  }
}

DateDetail.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DateDetail);

