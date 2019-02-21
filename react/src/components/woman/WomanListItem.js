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

import dummyGirl from '../../images/dummyGirl.png';

import { manColor } from '../../Constants';

import NomiButton from '../NomiButton';

const styles = theme => ({
  title : {
    marginTop : 30,
    fontWeight : 700
  },
  container : {
    padding : 20,
    textLeft : 'left',
  },
  alignLeft : {
    textAlign : 'left'
  },
  alignCenter : {
    textAlign : 'center'
  },
  jobAvatar : {
    width   : 100,
    height  : 100,
  },
  date : {
    color : 'white',
    fontWeight : 700
  },
  womanName : {
    fontSize : '1.5rem',
    fontWeight : 700,
  },
  manColor : {
    color : manColor[1],
  },
  more : {
    backgroundColor : manColor[1],
    borderRadius : 33,
    color : 'white',
    padding : 7,
    paddingBottom : 11,
    paddingTop : 0,
    fontSize : 18,
    fontWeight : 900,
    cursor : 'pointer'
  }
});

class WomanListItem extends React.Component {

  render() {

    let { classes, img, name, age, rate, timing } = this.props;

    // for demo purpose
    img = dummyGirl;

    return (
      <Grid container alignItems="center" className={classes.container} {...this.props}>
        <Grid item xs={4}>
          <Avatar alt="job avatar" src={img} className={classes.jobAvatar}/>
        </Grid>
        <Grid item xs={6} className={classes.alignLeft}>
          <Typography component="span" className={classes.womanName}>
            {name}
          </Typography>
          <Typography component="span">
            Age : {age}
          </Typography>
          <Typography component="span" >
            Rate : {rate}
          </Typography>
          <Typography component="span" >
            Timing : {timing}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <span className={classes.more}>...</span>
        </Grid>
      </Grid>
    );
  }
}

WomanListItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WomanListItem);

