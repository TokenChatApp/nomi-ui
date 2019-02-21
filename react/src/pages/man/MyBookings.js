import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { NavLink, Redirect } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Navbar from '../../components/Navbar';
import Grid from '@material-ui/core/Grid';

import WomanListItem from '../../components/woman/WomanListItem';

const styles = theme => ({
  root: {
    height : '100%',
    minHeight : '100vh',
    position : 'relative',
  },
  container : {
    padding : '0 20px',
  },
});

// fake data
const bookingList = [
  {
    name      : 'Akari',
    age       : '29',
    rate      : '100/hr',
    timing    : '18:00 - 20:00',
  },
  {
    name      : 'Akari',
    age       : '29',
    rate      : '100/hr',
    timing    : '18:00 - 20:00',
  },
];

const Divider = props => {
  let date = props.date;
  let style = {
    float : 'left',
    margin : 10,
    fontWeight : 700,
  };
  return (
    <Grid item xs={12}>
      <span style={style}>{date}</span>
      <hr style={{marginTop : 18}} />
    </Grid>
  );
}

class MyBookings extends React.Component {

  state = {
    redirect : '',
  }

  render() {
    const { classes } = this.props;
    const { redirect } = this.state;

    return (
      <div className={classes.root}>
        {redirect && <Redirect to={redirect}/>}
        <Navbar title="My Bookings" gender="man" backTo="/m"/>

        <button>Confirmed</button>
        <button>Pending</button>

        <Grid container className={classes.container}>
            <Divider date="03 Jan 2019"/>
            {
              bookingList.map((bookingItem, index) => (
                <Grid item xs={12}>
                  <WomanListItem
                    name={bookingItem.name}
                    age={bookingItem.age}
                    rate={bookingItem.rate}
                    timing={bookingItem.timing}
                  />
                </Grid>
              ))
            }
            <Divider date="04 Jan 2019"/>
            {
              bookingList.map((bookingItem, index) => (
                <Grid item xs={12}>
                  <WomanListItem
                    name={bookingItem.name}
                    age={bookingItem.age}
                    rate={bookingItem.rate}
                    timing={bookingItem.timing}
                  />
                </Grid>
              ))
            }
        </Grid>
      </div>
    );
  }
}

MyBookings.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MyBookings);

