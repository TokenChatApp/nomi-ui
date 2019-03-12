import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import ManListItemWithCheckBox from '../../components/man/ManListItemWithCheckBox';
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
  filterButton : {
    height: 28,
    width: 80,
    fontSize: 17,
    fontWeight: 500,
    padding: '0 20px',
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
  filterForm : {
    padding : 5
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

class NewBooking extends React.Component {

  state = {
    redirect : '',
    filter : false,
    bookingList : bookingList
  }

  toggleFilter = () => {
    let { filter } = this.state;
    this.setState({ filter : !filter });
  }

  toggleChecked = index => () => {
    let { bookingList } = this.state;
    let checked = bookingList[index].checked;
    bookingList[index].checked = !checked;
    this.setState({ bookingList });
  }

  render() {
    const { classes } = this.props;
    const { redirect, filter, bookingList } = this.state;

    return (
      <div className={classes.root}>
        {redirect && <Redirect to={redirect}/>}
        <Navbar title="New Booking" gender="F" backTo="/w"/>

        <Grid container className={classes.container}>

          {filter &&
            <Grid item xs={12}>
              <Grid container>

                <Grid item xs={12} className={classes.filterForm}>
                  <h5 className={classes.title}>Location</h5>
                </Grid>

                <Grid item xs={6} className={classes.filterForm}>
                  <TextField
                    fullWidth
                    select
                    className={classes.textField}
                    SelectProps={{
                      native: true,
                    }}
                    margin="normal"
                  >
                    {['Tokyo'].map(option => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={6} className={classes.filterForm}>
                  <TextField
                    fullWidth
                    className={classes.textField}
                    placeholder="Perfecture"
                    margin="normal"
                  >
                  </TextField>
                </Grid>

                <Grid item xs={6} className={classes.filterForm}>
                  <h5 className={classes.title}>Date</h5>
                </Grid>

                <Grid item xs={6} className={classes.filterForm}>
                  <h5 className={classes.title}>Timing</h5>
                </Grid>

                 <Grid item xs={6} className={classes.filterForm}>
                  <TextField
                    fullWidth
                    select
                    className={classes.textField}
                    SelectProps={{ native: true }}
                    margin="normal"
                  >
                    {['From'].map(option => (
                      <option key={option} value={option}> {option} </option>
                    ))}
                  </TextField>
                </Grid>

                 <Grid item xs={6} className={classes.filterForm}>
                  <TextField
                    fullWidth
                    select
                    className={classes.textField}
                    SelectProps={{ native: true }}
                    margin="normal"
                  >
                    {['From'].map(option => (
                      <option key={option} value={option}> {option} </option>
                    ))}
                  </TextField>
                </Grid>

                 <Grid item xs={6} className={classes.filterForm}>
                  <TextField
                    fullWidth
                    select
                    className={classes.textField}
                    SelectProps={{ native: true }}
                    margin="normal"
                  >
                    {['To'].map(option => (
                      <option key={option} value={option}> {option} </option>
                    ))}
                  </TextField>
                </Grid>

                 <Grid item xs={6} className={classes.filterForm}>
                  <TextField
                    fullWidth
                    select
                    className={classes.textField}
                    SelectProps={{ native: true }}
                    margin="normal"
                  >
                    {['To'].map(option => (
                      <option key={option} value={option}> {option} </option>
                    ))}
                  </TextField>
                </Grid>

              </Grid>
            </Grid>
          }

          <Grid item xs={12} className={classes.alignRight}>
            <NomiButton
              className={classes.filterButton}
              gender="F"
               onClick={this.toggleFilter}
            >
            Filter
            </NomiButton>
          </Grid>

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
              gender="F" 
              onClick={() => this.setState({ redirect : '/w/bookingComplete' })}
            >
              Submit
            </NomiButton>
          </Grid>
        </Grid>
      </div>
    );
  }
}

NewBooking.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewBooking);

