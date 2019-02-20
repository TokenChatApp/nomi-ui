import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';

const color = '#9e9e9e';

const styles = theme => ({
  container : {
    height : 130,
    width : 130,
    margin : 'auto',
    marginTop : 40,
    borderRadius : '50%',
    border : `1px solid ${color}`,
  },
  plus : {
    color,
    marginTop: 14,
    fontSize : '4rem',
  },
  description : {
    color,
    margin: 0,
    marginTop: -10,
    fontSize: '0.7rem',
    fontWeight : 500,
  },
});

class ProfilePicHolder extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container} onClick={this.props.onClick}>
        <AddIcon className={classes.plus}/>
        <p className={classes.description}>Add your<br/>profile picture</p>
      </div>
    );
  }
}

ProfilePicHolder.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfilePicHolder);

