import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import CheckCircle from '@material-ui/icons/CheckCircle';
import CheckCircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';

import dummyMan from '../../images/dummyMan.png';

import { womanColor } from '../../Constants';

import NomiButton from '../NomiButton';

const styles = theme => ({
  title : {
    marginTop : 30,
    fontWeight : 700
  },
  container : {
    paddingTop : 20,
    paddingBottom : 20,
    textLeft : 'left',
  },
  alignLeft : {
    textAlign : 'left'
  },
  alignCenter : {
    textAlign : 'center'
  },
  jobAvatar : {
    maxWidth : '100%',
    height : 'auto',
    width   : 100,
  },
  date : {
    color : 'white',
    fontWeight : 700
  },
  manName : {
    fontSize : '1.5rem',
    fontWeight : 700,
  },
  womanColor : {
    color : womanColor[1],
  },
  chatbox : {
    height: 30,
    margin: 'auto',
    padding: 0,
    display: 'block',
    maxWidth: 100,
    fontSize: '1rem',
    fontWeight: 700,
    marginRight: 0,
  }
});

class ManListItem extends React.Component {

  render() {

    let { classes, img, name, location, date, timing, chatbox } = this.props;

    // for demo purpose
    img = dummyMan;

    return (
      <Grid container alignItems="center" className={classes.container} {...this.props}>
        <Grid item xs={4}>
          <Avatar alt="job avatar" src={img} className={classes.jobAvatar}/>
        </Grid>
        <Grid item xs={8} className={classes.alignLeft}>
          <Typography component="span" className={classes.manName}>
            {name}
          </Typography>
          <Typography component="span">
            Location : {location}
          </Typography>
          <Typography component="span" >
            Date : {date}
          </Typography>
          <Typography component="span" >
            Timing : {timing}
          </Typography>
          {chatbox &&
          <NomiButton className={classes.chatbox}>
            Chat
          </NomiButton>
          }
        </Grid>
      </Grid>
    );
  }
}

ManListItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ManListItem);

