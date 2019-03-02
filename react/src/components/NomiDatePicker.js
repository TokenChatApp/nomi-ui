import 'date-fns';
import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';

const styles = {
  fullWidth : {
    width : '100%'
  }
};

class NomiDatePicker extends React.Component {

  render() {
    const { classes, label, selectedDate, handleDateChange } = this.props;

    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container className={classes.fullWidth} justify="space-around">
          <DatePicker
            margin="normal"
            label={label}
            format="dd/MM/yyyy"
            value={selectedDate}
            className={classes.fullWidth}
            onChange={handleDateChange}
          />
        </Grid>
      </MuiPickersUtilsProvider>
    );
  }
}

NomiDatePicker.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NomiDatePicker);

