import 'date-fns';
import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, TimePicker } from 'material-ui-pickers';

const styles = {
  fullWidth : {
    width : '100%'
  }
};

class NomiTimePicker extends React.Component {

  render() {
    const { classes, label, selectedDate, handleDateChange, helperText } = this.props;

    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container className={classes.fullWidth} justify="space-around">
          <TimePicker
            margin="normal"
            label={label}
            ampm={false}
            value={selectedDate}
            className={classes.fullWidth}
            onChange={handleDateChange}
            helperText={helperText}
          />
        </Grid>
      </MuiPickersUtilsProvider>
    );
  }
}

NomiTimePicker.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NomiTimePicker);

