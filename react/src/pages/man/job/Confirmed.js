import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Navbar from '../../../components/Navbar';
import clockImg from '../../../images/clock.png';
import { manColor } from '../../../Constants';
import DateDetail from './DateDetail';

const styles = theme => ({
  root: {
    height : '100%',
    minHeight : 'calc(100vh - 100px)',
    position : 'relative',
    paddingTop : 100,
    background : `linear-gradient(to top, ${manColor[0]}, ${manColor[1]})`
  },
  fixedNav : {
    position : 'absolute',
    top : 0,
    left : 0,
    right : 0
  },
  img : {
    paddingTop:50,
    width : 60,
  },
  imgContainer : {
    paddingTop : 20
  },
  remaining : {
    marginTop : 20,
    paddingLeft : '10%',
    paddingRight : '10%',
    color : 'white'
  },
  timer : {
    marginTop : 0,
    color : 'white'
  },
});

class Confirmed extends React.Component {

  state = {
    redirect : null,
  }

  render() {
    const { classes } = this.props;
    const { redirect } = this.state;
    return (
      <div className={classes.root}>
        {redirect && <Redirect to={redirect}/>}
        <div className={classes.fixedNav}>
          <Navbar title="My Dates" />
        </div>

        <DateDetail/>

        <img className={classes.img} src={clockImg} alt="clock"/>
        <Typography className={classes.remaining} variant="h6">
          Time remaining to your date:
        </Typography>
        <Typography className={classes.timer} variant="h6">
          01:25:00
        </Typography>
      </div>
    );
  }
}

Confirmed.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Confirmed);

