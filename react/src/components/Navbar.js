import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import classNames from 'classnames';

import { manColor, womanColor } from '../Constants';

const styles = theme => ({
  layout : {
    padding : 10
  },
  title : {
    color : 'white',
    textAlign : 'left',
    fontSize : '3rem',
    fontWeight : 200,
    marginLeft: 20,
    textDecoration : 'none',
    display : 'block'
  },
  subTitle : {
    fontSize : '2rem',
    fontWeight : 700,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
    color : 'white'
  },
  alignRight : {
    textAlign : 'right',
  }
});

class Navbar extends React.Component {

  // this.props :
  // gender
  // title
  // backTo

  render() {
    const { classes, gender, title, backTo } = this.props;

    let backgroundColor;

    switch(gender) {
      case "man" : 
        backgroundColor = `linear-gradient(to top, ${manColor[0]} , ${manColor[1]})`;
        break;
      case "woman" :
        backgroundColor = `linear-gradient(to top, ${womanColor[0]} , ${womanColor[1]})`;
        break;
      default : 
        backgroundColor = 'none';
    }

    return (
      <div className={classes.layout} style={{background : backgroundColor || 'none'}}>
        <Grid container>
          <Grid item xs={8}>
            {backTo && <NavLink to={backTo}>BACK</NavLink>}
            <a href="/" className={classes.title}>
              NOMI
            </a>
            {title &&
              <Typography component="h1" variant="h6" className={classNames(classes.title,classes.subTitle)}>
                {title}
              </Typography>
            }
          </Grid>
          <Grid item xs={4} className={classes.alignRight}>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navbar);

