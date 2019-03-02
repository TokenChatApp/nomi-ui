import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { NavLink, Redirect } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import StarRate from '@material-ui/icons/StarRate';

import { manColor } from '../../Constants';
import { Backend } from "../../services/Backend";

const styles = theme => ({
  root : {
    marginBottom : 20,
  },
  avatar : {
    maxWidth : '90%',
    border : `1px solid ${manColor[0]}`
  },
  name : {
    color : '#717171',
    fontWeight : 500,
    fontSize : 17
  },
  age : {
    color : '#a9a9a9',
    fontWeight : 300,
    fontSize : 12,
  },
  starFilled : {
    marginLeft : -7,
    marginTop : -6,
    color : '#888'
  },
  starEmpty : {
    marginLeft : -7,
    marginTop : -6,
    color : '#dadada'
  },
  starWrapper : {
    textAlign : 'left',
    paddingLeft : 7,
  }
});

const GenerateStars = withStyles(styles)(props => {

  const totalStars = 5;

  const { classes, rating } = props;

  return (
    <React.Fragment>
      {new Array(rating).fill(0).map(e => <StarRate className={classes.starFilled}/>)}
      {new Array(totalStars - rating).fill(0).map(e => <StarRate className={classes.starEmpty}/>)}
    </React.Fragment>
  );
});

class GirlCard extends React.Component {

  state = {
    redirect : null
  }

  render() {
    const { classes, name, age, rating, level, imgUrl } = this.props;
    const { redirect } = this.state;

    return (
      <Grid container className={classes.root}>
        {redirect && <Redirect to={redirect}/>}
        <Grid item xs={12}>
          <img className={classes.avatar} src={imgUrl} alt="girl avatar"/>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">
            <span className={classes.name}>{name} </span> <span className={classes.age}>{age}years old</span>
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.starWrapper}>
          <GenerateStars rating={rating}/>
        </Grid>
      </Grid>
    );
  }
}

GirlCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GirlCard);

