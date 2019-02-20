import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { NavLink, Redirect } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Navbar from '../../components/Navbar';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import cheersImg from '../../images/cheers.png';

import { womanColor } from '../../Constants';

import MainButton from '../../components/MainButton';

const grey = '#585858';

const styles = theme => ({
  root: {
    height : '100%',
    minHeight : 'calc(100vh - 100px)',
    position : 'relative',
    paddingTop : 100,
    background : `linear-gradient(to bottom, ${womanColor[0]}, ${womanColor[1]})`
  },
  fixedNav : {
    position : 'absolute',
    top : 0,
    left : 0,
    right : 0
  },
  button : {
    color : womanColor[1],
    maxWidth : 200,
    display : 'block',
    margin : 'auto',
    marginTop : 15,
    fontSize : '1rem',
    fontWeight : 700
  },
  img : {
    marginTop : 30,
    width : 100,
  },
  title : {
    marginTop : 20,
    paddingLeft : '10%',
    paddingRight : '10%',
    color : 'white'
  }
});

class BookingComplete extends React.Component {

  state = {
    redirect : null
  }

  render() {
    const { classes } = this.props;
    const { redirect } = this.state;

    return (
      <div className={classes.root}>
        {redirect && <Redirect to={redirect}/>}
        <div className={classes.fixedNav}>
          <Navbar title=""/>
        </div>
        <img className={classes.img} src={cheersImg}/>
        <Typography className={classes.title} variant="h6">
          DONE!<br/>
          Enjoy your date!
        </Typography>
        <Typography className={classes.title}>
          Get ready for your date! 
          Get ready for your date! 
          Get ready for your date! 
          Get ready for your date! 
          Get ready for your date! 
          Get ready for your date! 
          Get ready for your date! 
        </Typography>
        <div>
          <MainButton className={classes.button}  onClick={() => this.setState({ redirect : '/w/bookingExtension'})}>
            Start Chatting
          </MainButton>
          <MainButton className={classes.button}  onClick={() => this.setState({ redirect : '/w'})}>
            Back to home
          </MainButton>
        </div>
      </div>
    );
  }
}

BookingComplete.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BookingComplete);

