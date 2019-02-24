import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { NavLink, Redirect } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Navbar from '../../components/Navbar';
import Grid from '@material-ui/core/Grid';

import { manColor } from '../../Constants';

import dummyGirl from '../../images/dummyGirl.png';

import NomiButton from '../../components/NomiButton';
import {Backend} from "../../services/Backend";

const styles = theme => ({
  root: {
    height : '100%',
    minHeight : '100vh',
    position : 'relative',
  },
  description : {
    fontSize : '1rem',
    fontWeight : 400
  },
  container : {
    marginTop :30,
    paddingLeft: '10%',
    paddingRight: '10%',
  },
  button : {
    maxWidth : 250,
    marginBottom : 20,
  },
  womanImg : {
    width : '90%',
    borderRadius : 30,
    marginBottom : 20,
  },
  imgContainer : {
    position : 'relative',
    cursor : 'pointer'
  },
  name : {
    fontWeight : 700 
  },
  text : {
    color : 'white',
    textAlign : 'center',
    position : 'absolute',
    bottom : 35,
    padding : 5,
    fontSize : 10,
    textAlign : 'center',
    left :0,
    right : 0,
  },
  label : {
    backgroundColor : 'rgba(0, 0, 0, 0.7)',
    borderRadius : 12,
    padding : '5px 20px',
  }
});

const womanList = [
  { name : 'Himiko', age : '20' },
  { name : 'Himiko', age : '20' },
  { name : 'Himiko', age : '20' },
  { name : 'Himiko', age : '20' },
  { name : 'Himiko', age : '20' },
  { name : 'Himiko', age : '20' },
  { name : 'Himiko', age : '20' },
];

class ManLanding extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      redirect : '',
      womanList : womanList,
      user: Backend.user,
    };
  }

  render() {
    const { classes } = this.props;
    const { redirect, womanList } = this.state;

    return (
      <div className={classes.root}>
        {redirect && <Redirect to={redirect}/>}
        <Navbar title="Home" gender="man"/>

        <Grid container className={classes.container}>
          <Grid item xs={12}>
            <NomiButton 
              className={classes.button} 
              gender="man" 
              onClick={() => this.setState({ redirect : '/m/discoverSelection' })}
            >
              Make a request
            </NomiButton>
          </Grid>

          {
            womanList.map(e => 
              <Grid item xs={6}>
                <div className={classes.imgContainer}>
                  <img className={classes.womanImg} src={dummyGirl} alt="girlProfilePic"/>
                  <Typography variant="h3" className={classes.text}>
                    <span className={classes.label}>
                      <span className={classes.name}>{e.name}</span> {e.age} years old
                    </span>
                  </Typography>
                </div>
              </Grid>
            )
          }

        </Grid>
      </div>
    );
  }
}

ManLanding.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ManLanding);

