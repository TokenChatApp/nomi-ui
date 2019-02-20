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

const styles = theme => ({
  title : {
    marginTop : 30,
    fontWeight : 700
  },
  container : {
    padding : 20,
    textLeft : 'left',
    cursor : 'pointer'
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
  manName : {
    fontSize : '1.5rem',
    fontWeight : 700,
  },
  womanColor : {
    color : womanColor[1],
  }
});

class ManListItemWithCheckBox extends React.Component {

  render() {

    let { classes, img, name, location, date, timing, checked } = this.props;

    // for demo purpose
    img = dummyMan;

    return (
      <Grid container alignItems="center" className={classes.container} {...this.props}>
        <Grid item xs={4}>
          <Avatar alt="job avatar" src={img} className={classes.jobAvatar}/>
        </Grid>
        <Grid item xs={6} className={classes.alignLeft}>
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
        </Grid>
        <Grid item xs={2} className={classes.alignCenter}>
          {checked 
          ? <CheckCircle className={classes.womanColor}/>
          : <CheckCircleUnchecked className={classes.womanColor}/>
          }
        </Grid>
      </Grid>
    );
  }
}

ManListItemWithCheckBox.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ManListItemWithCheckBox);

