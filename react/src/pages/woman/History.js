import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Grid from '@material-ui/core/Grid';
import ManListItem from '../../components/man/ManListItem';

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

class History extends React.Component {

  state = {
    redirect : '',
  }

  render() {
    const { classes } = this.props;
    const { redirect } = this.state;

    return (
      <div className={classes.root}>
        {redirect && <Redirect to={redirect}/>}
        <Navbar title="History" gender="woman" backTo="/w"/>

        <Grid container className={classes.container}>
            <Divider date="03 Jan 2019"/>
            {
              bookingList.map((bookingItem, index) => (
                <Grid item xs={12}>
                  <ManListItem
                    name={bookingItem.name}
                    location={bookingItem.location}
                    date={bookingItem.date}
                    timing={bookingItem.timing}
                  />
                </Grid>
              ))
            }
            <Divider date="04 Jan 2019"/>
            {
              bookingList.map((bookingItem, index) => (
                <Grid item xs={12}>
                  <ManListItem
                    name={bookingItem.name}
                    location={bookingItem.location}
                    date={bookingItem.date}
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

History.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(History);

