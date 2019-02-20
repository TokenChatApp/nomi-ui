import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Navbar from '../../components/Navbar';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import captureSrc from '../../images/camera.png';
import chooseSrc from '../../images/upload.png';

import imgSignup from '../../images/signupWhite.png';

import { womanColor } from '../../Constants';

import NomiButton from '../../components/NomiButton';
import MainButton from '../../components/MainButton';

const grey = '#585858';

const styles = theme => ({
  root: {
    height : '100%',
    minHeight : 'calc(100vh - 165px)',
    position : 'relative',
    paddingTop : 165,
    background : `linear-gradient(to bottom, ${womanColor[0]}, ${womanColor[1]})`
  },
  fixedNav : {
    position : 'absolute',
    top : 0,
    left : 0,
    right : 0
  },
  button : {
    color : womanColor[0],
    maxWidth : 200,
    display : 'block',
    margin : 'auto',
    marginTop : 15,
    fontSize : '1rem',
    fontWeight : 700
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
        color : 'white'
      }}>or</span>
      <hr style={inlineStyle}/>
    </div>
  );
};

const imgStyle = { width : 50 };
const textStyle = {
  color : 'white',
  margin: 0,
  fontSize: '1rem',
  fontWeight: 400,
  marginTop: 10
};

const CapturePhoto = props => {

  return (
    <div {...props}>
      <img style={imgStyle} src={captureSrc}/>
      <h6 style={textStyle}>Capture a photo</h6>
    </div>    
  );
}

const ChoosePhoto = props => {

  return (
    <div {...props}>
      <img style={imgStyle} src={chooseSrc}/>
      <h6 style={textStyle}>Choose file to upload</h6>
    </div>    
  );
}

class ProfilePicUploader extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.fixedNav}>
          <Navbar title="SIGN UP"/>
        </div>
        <CapturePhoto/>
        <Divider/>
        <ChoosePhoto/>
        <Divider/>
        <div>
          <MainButton className={classes.button}>
            URL
          </MainButton>
          <MainButton className={classes.button}>
            Google Drive
          </MainButton>
          <MainButton className={classes.button}>
            Dropbox
          </MainButton>
        </div>
      </div>
    );
  }
}

ProfilePicUploader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfilePicUploader);
