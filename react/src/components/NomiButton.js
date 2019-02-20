import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';

import { manColor, womanColor } from '../Constants';

const buttonOffset = 50;
const buttonHeight = 44;

const styles = theme => ({
  button : {
    fontSize : '1.2rem',
    fontWeight : 300,
    textTransform : 'none',
    whiteSpace : 'nowrap',
    backgroundColor : 'white',
    boxShadow : 'none',
    maxWidth : 300,
    color : 'white',
    width : `calc(100% - ${buttonOffset}px)`,
    height : buttonHeight,
    borderRadius : buttonHeight / 2,
    marginTop : 10,
    marginBottom : 10,
  },
  manBackground : {
    background : `linear-gradient(to left, ${manColor[0]}, ${manColor[1]})`,
  },
  womanBackground : {
    background : `linear-gradient(to left, ${womanColor[0]}, ${womanColor[1]})`,
  },
  buttonImg : {
    width : 25,
    height : 25,
    paddingRight : 10,
  },
});

class NomiButton extends React.Component {

  render() {

    // childern, gender, src
    const { classes, children, gender, src } = this.props;

    const background = gender === "man"
      ? classes.manBackground
      : classes.womanBackground;

    return (
      <Button 
        {...this.props}
        className={classNames(this.props.className, classes.button, background)}
        variant="contained"
      >
        {src && <img className={classes.buttonImg} src={src} alt="button image"/>}
        {children}
      </Button>
    );
  }
}

NomiButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NomiButton);

