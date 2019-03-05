import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Badge from '@material-ui/core/Badge';

import { manColor } from '../../../Constants';

const statusList = [
  { 
    label : 'ON GOING', 
    color : '#7ae43a',
    redirect : '/m/dates/ongoing',
  },
  { 
    label : 'EXPIRED',
    color : '#c3c3c3',
    redirect : '/m/dates/expired',
  },
  {
    label : 'PENDING',
    color : '#ffc800',
    redirect : '/m/dates',
  },
  {
    label : 'CONFIRMED',
    color : '#04dec2',
    redirect : '/m/dates/confirmed',
  },
  {
    label : 'ENDED',
    color : '#e66060',
    redirect : '/m/dates/ended',
  }
];

const imgSize = 60;

const styles = theme => ({
  root: {
    flexGrow: 1,
    paddingLeft : 50,
    paddingTop : 25
  },
  girlAvatar : {
    width : imgSize,
    height : imgSize,
    borderRadius : '50%',
    marginLeft : -25,
    backgroundColor : '#cccccc',
  },
  badge : {
    left : -40,
    top : 10,
    backgroundColor : manColor[1],
    right : 'auto',
    zIndex : 1200
  },
  alignLeft : {
    textAlign : 'left'
  },
  des : {
    margin : 0,
    marginTop : 5,
    color : '#7d7d7d',
    fontWeight : 400,
    fontSize : 13,
  },
  label : {
    color : 'white',
    borderRadius : 6,
    padding : 4,
    fontWeight : 700
  },
  more : {
    cursor : 'pointer',
    backgroundColor : manColor[1],
    color : 'white',
    padding : 7,
    paddingBottom : 10,
    paddingTop : 0,
    borderRadius : 20,
    fontSize : 23,
    fontWeight : 900
  }
});


class JobList extends React.Component {
  state = {
    redirect : null,
    stateIndex : 0
  };

  componentDidMount() {
    let { jobStatus } = this.props;
    let stateIndex = statusList.map(e => e.label).indexOf(jobStatus);
    this.setState({ stateIndex });
  }

  handleMore = redirect => event => {
    this.setState({ redirect });
  }

  render() {

    // props = { images, state, time, location }

    const { classes, images, time, location } = this.props;
    const { stateIndex, redirect } = this.state;
    const jobStatus = statusList[stateIndex];
    return (
      <div className={classes.root}>
        {redirect && <Redirect to={redirect}/>}
        <Grid container alignItems="center" className={classes.container}>
          <Grid item xs={5} className={classes.alignLeft}>
            <Badge badgeContent={images.length} color="primary" classes={{ badge : classes.badge}}>
              {images.length 
                ? images.map((e, i) => i > 2 ? '' : <img className={classes.girlAvatar} style={{zIndex : 1000 - i}} src={e} alt="girlAvatar"/>)
                : <div className={classes.girlAvatar}/>
              }
            </Badge>
          </Grid>
          <Grid item xs={5} className={classes.alignLeft}>
            <h6 className={classes.des}><span className={classes.label} style={{backgroundColor : jobStatus.color}}>{jobStatus.label}</span></h6>
            <h6 className={classes.des}>{time}</h6>
            <h6 className={classes.des}>{location}</h6>
          </Grid>
          <Grid item xs={2} className={classes.alignLeft}>
            <span className={classes.more} onClick={this.handleMore(jobStatus.redirect)}>...</span>
          </Grid>
        </Grid>
      </div>
    );
  }
}

JobList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(JobList);

