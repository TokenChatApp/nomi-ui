import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { NavLink, Redirect } from 'react-router-dom';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import maleIcon from '../images/male.png';
import femaleIcon from '../images/female.png';
import maleLogin from '../images/male/loginMan.png';
import femaleLogin from '../images/female/loginGirl.png';
import maleSignup from '../images/male/signupMan.png';
import femaleSignup from '../images/female/signupGirl.png';
import dummyGirl from '../images/girl.jpg';
import dummyMan from '../images/man.png';
import stepsIcon from '../images/male/3stepsMan.png';
import matchesIcon from '../images/male/200matchMan.png';
import usersIcon from '../images/male/800usersMan.png';
import MainButton from '../components/MainButton';
import { manColor, womanColor } from '../Constants';
const menIconColor = manColor[1];
const womenIconColor = womanColor[1];

const styles = theme => ({
  heroContainer : {
    backgroundSize : 'cover',
    WebkitBackgroundSize : 'cover',
    MozBackgroundSize : 'cover',
    OBackgroundSize : 'cover',
    height: '50vh',
    paddingTop : 10,
    paddingBottom : 10,
  },
  heroMale : { backgroundImage : 'url(' + dummyGirl + ')' },
  heroFemale : { backgroundImage : 'url(' + dummyMan + ')' },
  title : {
    color : 'white',
    fontSize : '6rem',
    fontWeight : 500,
    textAlign : 'center',
  },
  chip : {
    fontWeight : 700,
    height : 44,
    borderRadius : 22,
    backgroundColor : 'white',
    float : 'left',
    marginLeft : 5,
    '&:focus' : {
      backgroundColor : 'white',
    }
  },
  colorMen : { 
    backgroundColor : 'white',
    color : menIconColor,
  },
  colorWomen : { 
    backgroundColor : 'white',
    color : womenIconColor, 
  },
  avatar : {
    padding : 5,
    height : 25,
    width : 25,
  },
  avatarMen : { backgroundColor : menIconColor },
  avatarWomen : { backgroundColor : womenIconColor },
  avatarImg : { objectFit : 'contain' },
  description : {
    marginTop : 20,
    marginBottom : 20,
    paddingLeft : 30,
    paddingRight : 30,
    color : 'white',
  },
  container : { minHeight : '50vh' },
  menBackground : { background : `linear-gradient(${manColor[0]} , ${manColor[1]})` },
  womenBackground : { background : `linear-gradient(${womanColor[0]} , ${womanColor[1]})` },
  img : { width : '90%' },
  buttonImg : {
    width : 25,
    height : 25,
    paddingRight : 10,
  },
});

const avatarStyle = {
  objectFit : 'contain',
}

class Landing extends React.Component {

  state = {
    gender : 'men',
    redirect : null,
  }

  switchGender = gender => () => {
    this.setState({ gender });
  }

  render() {
    const { classes } = this.props;
    const { gender, redirect } = this.state;
    const men = gender === 'men';

    return (
      <div className={classes.layout}>
        {redirect && <Redirect to={redirect}/>}
        <div className={classes.hero}>
          <Grid 
            container 
            alignContent="space-between" 
            className={classNames(classes.heroContainer, men ? classes.heroMale : classes.heroFemale)}
          >
            <Grid item xs={12}>
              {men ?
                <Chip
                  label="Switch to Girls user"
                  onClick={this.switchGender('women')}
                  className={classNames(classes.chip, classes.colorWomen)}
                  icon={
                    <Avatar
                      className={classNames(classes.avatar, classes.avatarWomen)} 
                      imgProps={{style: avatarStyle}}
                      alt="Female" 
                      src={femaleIcon}
                    />
                  }
                />
                :
                <Chip
                  label="Switch to Man user"
                  onClick={this.switchGender('men')}
                  className={classNames(classes.chip, classes.colorMen)}
                  icon={
                    <Avatar
                      className={classNames(classes.avatar, classes.avatarMen)}
                      imgProps={{style: avatarStyle}}
                      alt="Male"
                      src={maleIcon}
                    />
                  }
                />
              }
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.title} variant="h1" color="inherit" noWrap >NOMI</Typography>
            </Grid>
          </Grid>
        </div>
        <Grid container className={classNames(classes.container, men ? classes.menBackground : classes.womenBackground)}>
          <Grid item xs={12}>
            <Typography className={classes.description} variant="h5">
              {men
                ? 'Have a drink with our beautiful ladies'
                : 'Make extra income while having fun with rich smart guy'
              }
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <MainButton className={men ? classes.colorMen : classes.colorWomen} onClick={() => this.setState({ redirect : '/login'})}>
              <img className={classes.buttonImg} src={men ? maleLogin : femaleLogin} alt="login"/>
              Login
            </MainButton>
          </Grid>
          <Grid item xs={6}>
            <MainButton className={men ? classes.colorMen : classes.colorWomen} onClick={() => this.setState({ redirect : '/signup'})}>
              <img className={classes.buttonImg} src={men ? maleSignup : femaleSignup} alt="login"/>
              Sign Up
            </MainButton>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.description} variant="h6">
              {men 
                ? 'Sign up now to see the ladies!'
                : 'Sign up now start earning!'
              }
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <img className={classes.img} src={usersIcon} alt="800+ users"/>
          </Grid>
          <Grid item xs={4}>
            <img className={classes.img} src={matchesIcon} alt="200+ matches "/>
          </Grid>
          <Grid item xs={4}>
            <img className={classes.img} src={stepsIcon} alt="3 Steps "/>
          </Grid>
          <Grid item xs={12}>
            <p style={{ color : 'white' }}>Terms of use | Privacy Policy</p>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Landing.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Landing);
