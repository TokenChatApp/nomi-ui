import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Navbar from '../../components/Navbar';
import Grid from '@material-ui/core/Grid';
import LocationOn from '@material-ui/icons/LocationOn';
import Check from '@material-ui/icons/Check';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { womanColor } from '../../Constants';

import NomiButton from '../../components/NomiButton';
import { Backend } from "../../services/Backend";

const styles = theme => ({
  root: {
    height : '100%',
    minHeight : '100vh',
    position : 'relative',
  },
  wrapper : {
    margin : 20,
    marginTop :70,
    border : '1px solid #adadad',
  },
  container : {
    padding : 40,
    paddingLeft: '10%',
    paddingRight: '10%',
  },
  button : {
    marginTop : 30,
    maxWidth : 170,
    marginBottom : 20,
  },
  locationIcon : {
    color : womanColor[1],
    fontSize : 70,
  },
  checkIcon : {
    color : 'white',
    marginRight : 10,
    fontSize : 24,
  },
  label : {
    color : '#adadad',
    fontSize : 25,
  },
  formControl : {
    marginTop : 15,
    marginBottom : 15,
    width : '90%'
  }
});

const citySelections = [
  'city 1',
  'city 2',
  'city 3',
  'city 4',
  'city 5',
];

const placeSelections = [
  'place 1',
  'place 2',
  'place 3',
  'place 4',
  'place 5',
  'place 6',
];

class LocationEdit extends React.Component {

  state = {
    redirect : '',
    city : '',
    place : '',
  }

  handleChange = type => event => {
    this.setState({ [type] : event.target.value });
  }

  handleConfirm = event => {
    // send locatoin cahnge request before redirect
    this.setState({ redirect : '/w'});
  }

  render() {
    const { classes } = this.props;
    const { redirect, city, place } = this.state;

    return (
      <div className={classes.root}>
        {redirect && <Redirect to={redirect}/>}
        <Navbar title="Hello, Username" gender="woman"/>

        <div className={classes.wrapper}>
        <Grid container className={classes.container}>
          <Grid item xs={12}>
            <LocationOn className={classes.locationIcon}/>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h3" className={classes.label}>
              Select your current location
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <FormControl className={classes.formControl}>
              <Select
                value={city}
                onChange={this.handleChange('city')}
                displayEmpty
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
              >
                <MenuItem value="" disabled>
                  Place
                </MenuItem>
                {placeSelections.map(e => <MenuItem value={e}>{e}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <NomiButton 
              className={classes.button} 
              gender="woman" 
              onClick={this.handleConfirm}
            >
              <Check className={classes.checkIcon}/>
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
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LocationEdit);

