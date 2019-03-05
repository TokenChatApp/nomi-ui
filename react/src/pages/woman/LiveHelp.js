import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Send from '@material-ui/icons/Send';
import classNames from 'classnames';
import { womanColor } from '../../Constants';

const styles = theme => ({
  root: {
    height : '100%',
    minHeight : '100vh',
    position : 'relative',
  },
  container : {
    padding : 20,
    maxHeight : 'calc(100vh - 280px)',
    overflowY : 'scroll',
  },
  inputWrapper : {
    backgroundColor : 'white',
    position: 'fixed',
    width : '100%',
    maxWidth : 410,
    bottom : 0,
    left : 0,
    right : 0,
    margin : 'auto'
  },
  alignLeft : {
    textAlign : 'left'
  },
  alignRight : {
    color : womanColor[1],
    textAlign : 'right'
  },
  chat : {
    marginTop : 10,
    marginBottom : 10,
  },
});

class LiveHelp extends React.Component {

  state = {
    redirect : '',
  }

  render() {
    const { classes } = this.props;
    const { redirect } = this.state;

    return (
      <div className={classes.root}>
        {redirect && <Redirect to={redirect}/>}
        <Navbar title="24/7 Live Help" gender="woman" backTo="/w"/>

        <Grid container className={classes.container}>
          <Grid item xs={12} className={classNames(classes.chat, classes.alignLeft)}>
            <p>Anything can I help you?
              Anything can I help you?
              Anything can I help you?
              Anything can I help you?
              Anything can I help you?
              Anything can I help you?
            </p>
          </Grid>
          <Grid item xs={12} className={classNames(classes.chat, classes.alignRight)}>
            <p>
              Anything can I help you?
              Anything can I help you?
              Anything can I help you?
              Anything can I help you?
              Anything can I help you?
              Anything can I help you?

            </p>
          </Grid>
          <Grid item xs={12} className={classNames(classes.chat, classes.alignLeft)}>
            <p>
              Anything can I help you?
            </p>
          </Grid>
          <Grid item xs={12} className={classNames(classes.chat, classes.alignRight)}>
            <p>
              Anything can I help you?
            </p>
          </Grid>
        </Grid>
        <div style={{position : 'relative'}}>
        <div className={classes.inputWrapper}>
           <TextField
            placeholder="Message"
            fullWidth
            margin="dense"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            InputProps={{
              style : {padding : 0, borderRadius : 0},
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <Send/>
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <h5>Hotline : 0000000</h5>
        </div>
      </div>
      </div>
    );
  }
}

LiveHelp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LiveHelp);

