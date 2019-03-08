import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import login from '../images/login.svg';
import signup from '../images/sign_up.svg';
import girlImg from '../images/girl.jpg';
import manImg from '../images/man.png';
import partyImg from '../images/party.jpg';
import dummyGirl from '../images/dummyGirl.png';
import stepsIcon from '../images/steps.svg';
import matchesIcon from '../images/matches.svg';
import usersIcon from '../images/users.svg';
import MainButton from '../components/MainButton';
import NomiButton from '../components/NomiButton';
import GenderSwitch from '../components/GenderSwitch';
import { manColor, womanColor } from '../Constants';
import GirlCard from './man/GirlCard';
const menIconColor = manColor[1];
const womenIconColor = womanColor[1];

const womanList = [
  { name : 'Himiko', age : '20', rating : 3, level : 3, imgUrl : dummyGirl },
  { name : 'Himiko', age : '20', rating : 3, level : 2, imgUrl : dummyGirl },
  { name : 'Himiko', age : '20', rating : 3, level : 1, imgUrl : dummyGirl },
  { name : 'Himiko', age : '20', rating : 3, level : 1, imgUrl : dummyGirl },
  { name : 'Himiko', age : '20', rating : 3, level : 1, imgUrl : dummyGirl },
  { name : 'Himiko', age : '20', rating : 3, level : 1, imgUrl : dummyGirl },
  { name : 'Himiko', age : '20', rating : 3, level : 1, imgUrl : dummyGirl },
  { name : 'Himiko', age : '20', rating : 3, level : 1, imgUrl : dummyGirl },
  { name : 'Himiko', age : '20', rating : 3, level : 1, imgUrl : dummyGirl },
];

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
  subContainer : {
    maxHeight : 300,
    backgroundImage : 'url(' + partyImg + ')'
  },
  heroMale : { backgroundImage : 'url(' + manImg + ')' },
  heroFemale : { backgroundImage : 'url(' + girlImg + ')' },
  title : {
    color : 'white',
    fontSize : '6rem',
    fontWeight : 500,
    textAlign : 'center',
  },
  colorMen : {
    backgroundColor : 'white',
    color : menIconColor,
  },
  colorWomen : {
    backgroundColor : 'white',
    color : womenIconColor,
  },
  userButtonLabel : {
    marginBottom : '0!important',
  },
  userButton : {
    color : '#727272',
    margin : '10px 0',
  },
  maxWidthButton : {
    maxWidth : 150
  },
  alignRight : {
    textAlign : 'right'
  },
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
  img : { width : '80%' },
  buttonImg : {
    width : 25,
    height : 25,
    paddingRight : 10,
  },
  contentContainer : {
    color : '#828282',
    padding : 20
  },
  questionContainer : {
    paddingLeft : 40,
    paddingRight : 40,
  },
  whiteText : {
    color : 'white',
  },
  text : {
    fontSize : 16,
    color : '#828282',
    margin : '15px 0'
  },
  paddingY : {
    paddingTop : 20,
    paddingBottom : 20,
  },
  jobText : {
    fontSize : 16,
    color : '#828282',
    padding : '0 25px',
    textAlign : 'left',
    margin : 0
  },
  jobTextContainer : {
    margin : '10px 0',
  },
  questionTitle : {
    textAlign : 'left',
    color : '#828282',
  },
  messageField : {
    borderRadius : 0
  }
});

class Landing extends React.Component {

  state = {
    gender : 'woman',
    redirect : null,
    email : '',
    mobile : '',
    message : ''

  }

  handleChange = type => event => {
    this.setState({ [type] : event.target.value })
  }

  switchGender = gender => () => {
    this.setState({ gender });
  }

  render() {
    const { classes } = this.props;
    const { gender, redirect, email, mobile, message } = this.state;
    const man = gender === 'man';

    return (
      <div className={classes.layout}>
        {redirect && <Redirect to={redirect} push/>}
        <div>
          <Grid
            container
            alignContent="space-between"
            className={classNames(classes.heroContainer, man ? classes.heroFemale : classes.heroMale)}
          >
            <Grid item xs={12}>
              <GenderSwitch gender={gender} onClick={this.switchGender(man ? 'woman' : 'man')}/>
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.title} variant="h1" color="inherit" noWrap >NOMI</Typography>
            </Grid>
          </Grid>
        </div>
        <Grid container className={classNames(classes.container, man ? classes.menBackground : classes.womenBackground)}>
          <Grid item xs={12}>
            <Typography className={classes.description} variant="h5">
              {man
                ? 'Drink with beautiful ladies'
                : 'Make extra income by having fun with rich smart guy'
              }
            </Typography>
            <Typography className={classNames(classes.userButtonLabel, classes.description)}>
              {man && 'Browse the available ladies today!'}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <MainButton
              className={classNames(classes.userButton, classes.maxWidthButton)}
              onClick={() => this.setState({ redirect : '/login'})}
            >
              <img className={classes.buttonImg} src={login} alt="login"/>
              Login
            </MainButton>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classNames(classes.userButtonLabel, classes.description)}>
              {man
                ? 'Not a member? Sign up now to see the ladies!'
                : 'Not a member? Sign up now start earning!'
              }
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <MainButton
              className={classNames(classes.userButton, classes.maxWidthButton)}
              onClick={() => this.setState({ redirect : '/signup'})}
            >
              <img className={classes.buttonImg} src={signup} alt="signup"/>
              Sign Up
            </MainButton>
          </Grid>
        </Grid>

        <Grid container alignItems="center" className={classes.contentContainer}>
          <Grid item xs={12}>
            <Typography variant="h5" className={classes.text}>
              {man
                ? 'Over 1000 model graded girls for your choice!'
                : 'Over 1000 Jobs to start right away!'
              }
            </Typography>
          </Grid>
          <Grid item xs={4} className={classes.paddingY}>
            <img className={classes.img} src={usersIcon} alt="800+ users"/>
          </Grid>
          <Grid item xs={4} className={classes.paddingY}>
            <img className={classes.img} src={matchesIcon} alt="200+ matches "/>
          </Grid>
          <Grid item xs={4} className={classes.paddingY}>
            <img className={classes.img} src={stepsIcon} alt="3 Steps "/>
          </Grid>
          {man
            // Man Section
            ? <React.Fragment>
              {womanList.map(e =>
                <Grid item xs={4}>
                  <GirlCard
                    {...e}
                    disabled
                    noPadding
                    handleToggleCrown={this.handleToggleCrown}
                  />
                </Grid>)}
                <Grid item xs={12}>
                  <NomiButton gender="man" className={classes.maxWidthButton}>
                    Sign up now
                  </NomiButton>
                </Grid>
              </React.Fragment>
            // Girl Section
            : <React.Fragment>
                <Grid item xs={12} className={classes.jobTextContainer}>
                  <Typography variant="h5" className={classes.jobText}>
                    東京  恵比寿
                  </Typography>
                   <Typography variant="h5" className={classes.jobText}>
                    300 jobs available now
                  </Typography>
                </Grid>
                <Grid item xs={12} className={classes.jobTextContainer}>
                  <Typography variant="h5" className={classes.jobText}>
                    東京  渋谷
                  </Typography>
                   <Typography variant="h5" className={classes.jobText}>
                    50 jobs available now
                  </Typography>
                </Grid>
                <Grid item xs={12} className={classes.jobTextContainer}>
                  <Typography variant="h5" className={classes.jobText}>
                    東京  渋谷
                  </Typography>
                   <Typography variant="h5" className={classes.jobText}>
                    50 jobs available now
                  </Typography>
                </Grid>
              </React.Fragment>
          }
          </Grid>
          {!man &&
            <Grid
              container
              alignItems="center"
              className={classNames(classes.heroContainer, classes.subContainer)}
            >
              <Grid item xs={12}>
                <Typography variant="h5" className={classNames(classes.contentContainer, classes.whiteText)}>
                  Earn up to ¥1000 every 2 hours
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <MainButton className={classNames(classes.maxWidthButton, classes.colorWomen)}>
                  Sign up now
                </MainButton>
              </Grid>
            </Grid>
          }
          <Grid container className={classNames(classes.contentContainer, classes.questionContainer)}>
            <Grid item xs={12}>
              <Typography variant="h5" className={classes.questionTitle}>
                Question? Let us know!
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={email}
                onChange={this.handleChange('email')}
                fullWidth
                label="Email address"
                margin="dense"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={mobile}
                onChange={this.handleChange('mobile')}
                fullWidth
                label="Mobile No."
                margin="dense"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={message}
                classes={{notchedOutline: classes.messageField}}
                onChange={this.handleChange('message')}
                fullWidth
                label="Type your message"
                variant="outlined"
                multiline
                rows={4}
                margin="dense"
              />
            </Grid>
            <Grid item xs={12} className={classes.alignRight}>
              <NomiButton gender="man" className={classes.maxWidthButton}>
                Send
              </NomiButton>
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
