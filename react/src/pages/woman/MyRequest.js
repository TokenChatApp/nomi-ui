import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { NavLink, Redirect } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Navbar from '../../components/Navbar';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import ManListItemWithCheckBox from '../../components/man/ManListItemWithCheckBox';

import dummyMan from '../../images/dummyMan.png';

import { womanColor } from '../../Constants';

import NomiButton from '../../components/NomiButton';

const styles = theme => ({
  root: {
    height : '100%',
    minHeight : '100vh',
    position : 'relative',
  },
  button : {
    maxWidth : 250,
  },
  title : {
    textAlign : 'left',
    marginTop : 10,
    marginBottom : 0,
    fontSize : '1rem',
    fontWeight : 700
  },
  container : {
    padding : '0 20px',
  },
  alignLeft : {
    textAlign : 'left'
  },
  alignRight : {
    textAlign : 'right'
  },
  iOSSwitchBase: {
    '&$iOSChecked': {
      color: theme.palette.common.white,
      '& + $iOSBar': {
        backgroundColor: womanColor[1],
      },
    },
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.sharp,
    }),
  },
  iOSChecked: {
    transform: 'translateX(15px)',
    '& + $iOSBar': {
      opacity: 1,
      border: 'none',
    },
  },
  iOSBar: {
    borderRadius: 13,
    width: 42,
    height: 26,
    marginTop: -13,
    marginLeft: -21,
    border: 'solid 1px',
    borderColor: womanColor[1],
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  iOSIcon: {
    width: 24,
    height: 25,
  },
  iOSIconChecked: {
    boxShadow: theme.shadows[1],
  },
  label : {
    alignItems: 'flex-end'
  }
});

// fake data
const bookingList = [
  {
    name      : 'Haruto',
    location  : 'Tokyo',
    date      : '10 Jan 2019',
    timing    : '18:00 - 20:00',
    checked   : true
  },
  {
    name      : 'Haruto',
    location  : 'Tokyo',
    date      : '10 Jan 2019',
    timing    : '18:00 - 20:00',
    checked   : false
  }
];

class MyRequest extends React.Component {

  state = {
    redirect : '',
    bookingList : bookingList,
    autoAccept : false,
  }

  toggleAutoAccept = () => {
    let checked = this.state.autoAccept;
    this.setState({ autoAccept : !checked });
  }

  toggleChecked = index => () => {
    let { bookingList } = this.state;
    let checked = bookingList[index].checked;
    bookingList[index].checked = !checked;
    this.setState({ bookingList });
  }

  render() {
    const { classes } = this.props;
    const { redirect, bookingList, autoAccept } = this.state;

    return (
      <div className={classes.root}>
        {redirect && <Redirect to={redirect}/>}
        <Navbar title="My Request" gender="woman" backTo="/w"/>

        <Grid container className={classes.container}>

          <Grid item xs={12} className={classes.alignRight}>
            <FormControlLabel
              control={
                <Switch
                  checked={autoAccept}
                  onChange={this.toggleAutoAccept}
                  classes={{
                    switchBase: classes.iOSSwitchBase,
                    bar: classes.iOSBar,
                    icon: classes.iOSIcon,
                    iconChecked: classes.iOSIconChecked,
                    checked: classes.iOSChecked,
                  }}
                  disableRipple
                />
              }
              label="Enable auto accept"
              labelPlacement="bottom"
              className={classes.label}
            />
          </Grid>

          {
            autoAccept 
            ? <h3>You have enable auto accept, All request will be accepted automatically.</h3>
            : <React.Fragment>
            {
              bookingList.map((bookingItem, index) => (
                <Grid item xs={12}>
                  <ManListItemWithCheckBox
                    name={bookingItem.name}
                    location={bookingItem.location}
                    date={bookingItem.date}
                    timing={bookingItem.timing}
                    checked={bookingItem.checked}
                    onClick={this.toggleChecked(index)}
                  />
                </Grid>
              ))
            }
            <Grid item xs={12}>
              <NomiButton 
                className={classes.button} 
                gender="woman" 
                onClick={() => this.setState({ redirect : '/w' })}
              >
                Accept
              </NomiButton>
            </Grid>
          </React.Fragment>
          }
        </Grid>
      </div>
    );
  }
}

MyRequest.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MyRequest);

