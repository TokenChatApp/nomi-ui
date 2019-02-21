import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { NavLink, Redirect } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Navbar from '../../components/Navbar';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';

import { manColor } from '../../Constants';

import requestIcon from '../../images/male/request.png';
import discoverIcon from '../../images/male/radar.png';

const styles = theme => ({
  root: {
    height : '100%',
    minHeight : '100vh',
    position : 'relative',
    background : `linear-gradient(to top, ${manColor[0]}, ${manColor[1]})`
  },
  label : {
    color : 'white',
    marginTop : 40,
    fontSize : '1.5rem',
    fontWeight : 700,
    padding : '0 40px',
  },
  description : {
    fontSize : '1rem',
    fontWeight : 400
  },
  container : {
    marginTop :30,
    color : 'white'
  },
  img : {
    height : 80,
    alignSelf: 'center',
    margin: 'auto',
  },
  imgContainer : {
    height : 150,
    width  : 150,
    display : 'flex',
    margin : 'auto',
    borderRadius: '50%',
    cursor : 'pointer'
  },
  request : {
    border: '3px solid white',
  },
  discover : {
    backgroundColor : 'white'
  }
});

const Divider = () => {
 
  const inlineStyle = {
    display : 'inline-block',
    width : '30%',
    height : 1,
    border : 0,
    backgroundColor : 'white'
  };

  return (
    <div style={{
      marginTop     : 30,
      marginBottom  : 30,
    }}>     
      <hr style={inlineStyle}/>
      <span style={{
        padding : 10,
        fontSize: 20,
      }}>or</span>
      <hr style={inlineStyle}/>
    </div>
  );
};

class DiscoverSelection extends React.Component {

  state = {
    redirect : ''
  }

  render() {
    const { classes } = this.props;

    const { redirect } = this.state;

    return (
      <div className={classes.root}>
        {redirect && <Redirect to={redirect}/>}
        <Navbar backTo="/m"/>
        <Typography className={classes.label}>
          How would you find your partner ?
        </Typography>
        <Grid container className={classes.container}>
          <Grid item xs={12}>

            <div onClick={ () => this.setState({ redirect : '/m/signup' })}>
               <div className={classNames(classes.request, classes.imgContainer)}>
                  <img className={classes.img} src={requestIcon} />
                </div>
              <h3>Make a request</h3>
            </div>

            <Divider/>

            <div onClick={ () => this.setState({ redirect : '/m/signup' })}>
               <div className={classNames(classes.discover, classes.imgContainer)}>
                  <img className={classes.img} src={discoverIcon} />
                </div>
              <h3>Discover nearby</h3>
            </div>

          </Grid>
        </Grid>
      </div>
    );
  }
}

DiscoverSelection.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DiscoverSelection);

