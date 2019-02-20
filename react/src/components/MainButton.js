import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';

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
    width : `calc(100% - ${buttonOffset}px)`,
    height : buttonHeight,
    borderRadius : buttonHeight / 2,
    marginTop : 10,
    marginBottom : 10,
  }
});

class MainButton extends React.Component {

  render() {
    const { classes, children } = this.props;

    return (
      <Button 
        {...this.props}
        className={classNames(this.props.className, classes.button)}
        variant="contained"
      >
        {children}
      </Button>
    );
  }
}

MainButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainButton);

