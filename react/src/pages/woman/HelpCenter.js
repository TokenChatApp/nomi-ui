import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { NavLink, Redirect } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import NomiButton from '../../components/NomiButton';

const styles = theme => ({
  root: {
    height : '100%',
    minHeight : '100vh',
    position : 'relative',
  },
  container : {
    padding : 20,
  },
  textField : {
    border : '1px solid #b5b5b5',
    borderRadius : 4,
  },
  button : {
    margin : 'auto',
    marginTop : 30,
  }
});

class HelpCenter extends React.Component {

  state = {
    redirect : '',
  }

  render() {
    const { classes } = this.props;
    const { redirect } = this.state;

    return (
      <div className={classes.root}>
        {redirect && <Redirect to={redirect}/>}
        <Navbar title="Help Center" gender="woman" backTo="/w"/>

        <Grid container className={classes.container}>
          <TextField
            fullWidth
            select
            variant="outlined"
            SelectProps={{ native: true }}
            margin="dense"
            InputProps={{className : classes.textField}}
          >
            {['Complaint'].map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </TextField>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Job No."
            margin="dense"
            InputProps={{className : classes.textField}}
          />
          <TextField
            fullWidth
            multiline
            rows="10"
            variant="outlined"
            placeholder="Message"
            margin="dense"
            InputProps={{className : classes.textField}}
          />
          <NomiButton className={classes.button} onClick={() => this.setState({ redirect : '/w' })}>
            Accept
          </NomiButton>
        </Grid>
      </div>
    );
  }
}

HelpCenter.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HelpCenter);

