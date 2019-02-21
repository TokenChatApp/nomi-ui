import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { NavLink, Redirect } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Navbar from '../../components/Navbar';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import avatarImg from '../../images/dummyGirl.png';
import dummyMan from '../../images/dummyMan.png';
import penImg from '../../images/pen.png';

import { womanColor } from '../../Constants';

import MainButton from '../../components/MainButton';
import NomiButton from '../../components/NomiButton';

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
    width : '100%',
    color : womanColor[1],
    maxWidth : 200,
    display : 'block',
    margin : 'auto',
    fontSize : '1rem',
    fontWeight : 700
  },
  avatar : {
    width : 130,
    borderRadius : '50%',
    margin: 'auto',
    marginRight: 0,
    display: 'block',
  },
  title : {
    marginTop : 20,
    paddingLeft : '10%',
    paddingRight : '10%',
    color : 'white',
    fontWeight : 700
  },
  alignLeft : {
    textAlign : 'left',
    paddingLeft : 20
  },
  alignCenter : {
    textAlign : 'center'
  },
  whiteColor : {
    color : 'white',
  },
  pen : {
    width : 20,
  },
  select : {
    backgroundColor : 'white',
    color : womanColor[1],
    borderRadius : 0,
    fontSize : '0.9rem',
    width : 100,
    height : 24,
    fontWeight : 700,
    paddingLeft : 10
  },
  badge : {
    backgroundColor : womanColor[1],
  },
  customBadge : {
    color : 'white',
    position : 'absolute',
    top : -16,
    right : 0, 
    backgroundColor : womanColor[1],
    borderRadius : 20,
    padding : '0 10px',
    border : '2px solid white'
  },
  name : {
    marginBottom : 10,
    fontWeight : 700
  },
  jobContainer : {
    padding : '0 25px',
  },
  jobAvatar : {
    width   : 100,
    height  : 100,
  },
  date : {
    color : 'white',
    fontWeight : 700
  },
  manName : {
    color : 'white',
    fontSize : '1.5rem',
    fontWeight : 700,
  },
  chatButton : {
    maxWidth : 100,
    height : 30,
    marginRight : 0,
    color : womanColor[1],
    padding : 0,
    display : 'block',
    margin : 'auto',
    fontSize : '1rem',
    fontWeight : 700
  },
  notification : {
    backgroundColor : 'white',
    position : 'fixed',
    bottom : 0,
    width : 450,
  },
  notiWrapper : {
    borderTop: '1px solid #d6d6d6',
    position : 'relative',
    textAlign : 'left',
    padding : 20,
    paddingTop : 20,
  },
  close : {
    position : 'absolute',
    right : 0,
    top : 0,
    color : womanColor[1],
  }
});

class WomanLanding extends React.Component {

  state = {
    redirect : null,
    notification : true
  }

  handleCloseNotification = () => {
    this.setState({ notification : false });
  }

  render() {
    const { classes } = this.props;
    const { redirect, notification } = this.state;

    return (
      <div className={classes.root}>
        {redirect && <Redirect to={redirect}/>}
        <div className={classes.fixedNav}>
          <Navbar title="" />
        </div>
        <Grid container alignItems="center">
          <Grid item xs={6}>
            <img className={classes.avatar} src={avatarImg}/>
          </Grid>
          <Grid item xs={6}>
            <Grid container className={classNames(classes.alignLeft, classes.whiteColor)}>
              <Grid item xs={12} className={classes.name}>
                Hello, Akari!
                <img src={penImg} className={classes.pen}/>
              </Grid>
              <Grid item xs={12}>
                <Select
                  native
                  name="age"
                  className={classes.select}
                >
                  <option value={10}>Status</option>
                  <option value={20}>Twenty</option>
                  <option value={30}>Thirty</option>
                </Select>

              </Grid>

            </Grid>

          </Grid>
        </Grid>
        <Typography className={classNames(classes.title, classes.alignLeft)} variant="h6">
          Total Earning : 
        </Typography>
        <Typography className={classes.title} variant="h3">
          $100,000
        </Typography>
        <div style={{marginTop :20, position:'relative'}}>
          <MainButton className={classes.button}  onClick={() => this.setState({ redirect : '/w/newBooking'})}>
          <div className={classes.customBadge}>10</div>
            New Booking
          </MainButton>
        </div>
        <div className={classes.jobContainer}>
        <Typography className={classNames(classes.title, classes.alignLeft)} variant="h6" onClick={() => this.setState({ redirect : '/w/pendingJob' })}>
          Pending Job 
        </Typography>
        
        <List>
          <Typography className={classNames(classes.date, classes.alignLeft)} variant="p">
            10 Jan 2019
          </Typography>

          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="job avatar" src={dummyMan} className={classes.jobAvatar}/>
            </ListItemAvatar>
            <ListItemText
              className={classes.whiteColor}
              primary={
                <Typography component="span" className={classes.manName}>
                  Haruto
                </Typography>
              }
              secondary={
                <React.Fragment>
                  <Typography component="span" className={classes.whiteColor}>
                    Location: Tokyo
                  </Typography>
                  <Typography component="span" className={classes.whiteColor}>
                    Date : 10 Jan 2019
                  </Typography>
                  <Typography component="span" className={classes.whiteColor}>
                    Timing : 18:00 - 20:00
                  </Typography>
                  <MainButton className={classes.chatButton}>
                    Chat
                  </MainButton>
                </React.Fragment>
              }
            />
          </ListItem>

          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="job avatar" src={dummyMan} className={classes.jobAvatar}/>
            </ListItemAvatar>
            <ListItemText
              className={classes.whiteColor}
              primary={
                <Typography component="span" className={classes.manName}>
                  Haruto
                </Typography>
              }
              secondary={
                <React.Fragment>
                  <Typography component="span" className={classes.whiteColor}>
                    Location: Tokyo
                  </Typography>
                  <Typography component="span" className={classes.whiteColor}>
                    Date : 10 Jan 2019
                  </Typography>
                  <Typography component="span" className={classes.whiteColor}>
                    Timing : 18:00 - 20:00
                  </Typography>
                  <MainButton className={classes.chatButton}>
                    Chat
                  </MainButton>
                </React.Fragment>
                }
              />
            </ListItem>

          </List>

        </div>

        {/*Notification*/}
        {notification &&
          <div className={classes.notification} >
            <div className={classes.notiWrapper}>
              <IconButton onClick={this.handleCloseNotification} aria-label="Close" className={classes.close}>
                <CloseIcon/>
              </IconButton>
              <h4>You have 3 new requests!</h4>
              <h4>Enable auto accept?</h4>
              <Grid container className={classes.alignCenter}>
                <Grid item xs={6}>
                  <NomiButton>
                    Yes
                  </NomiButton>
                </Grid>
                <Grid item xs={6}>
                  <NomiButton>
                    No
                  </NomiButton>
                </Grid>
              </Grid>
              <FormControlLabel
                control={ <Checkbox /> }
                label="Don't show this message again."
              />
            </div>
          </div>
        }

      </div>
    );
  }
}

WomanLanding.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WomanLanding);

