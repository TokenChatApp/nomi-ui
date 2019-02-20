import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { NavLink, Redirect } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import classNames from 'classnames';

import { manColor, womanColor } from '../Constants';
import MainButton from './MainButton';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

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
  },
  dialog : {
    backgroundColor : 'rgba(0, 0, 0, 0.4)'
  },
  close : {
    color : 'white',
    alignSelf: 'flex-end'
  },
  redirectButton : {
    margin : 'auto',
    marginTop     : 20,
    marginBottom  : 20,
    display : 'block',
    fontWeight: 600
  },
  manColor : {
    color : manColor[1],
  },
  womanColor : {
    color : womanColor[1],
  }
});

const helpStyle = {
  height: 60,
  width: 60,
  margin: 'auto',
  marginTop: 80,
  marginBottom : 0,
  fontSize: '2rem',
  fontWeight: 900,
  backgroundColor: 'white',
  borderRadius: '50%',
  border : 0,
  cursor : 'pointer'
};

const helpText = {
  textAlign: 'center',
  color: 'white',
  fontSize: '1rem'
}

const ManButtons = props => {

  const { handleRedirect } = props;

  return (
    <React.Fragment>
      <MainButton {...props} onClick={handleRedirect('/w')} >
        My Bookings
      </MainButton>
      <MainButton {...props} onClick={handleRedirect('/w')} >
        History
      </MainButton>
      <MainButton {...props} onClick={handleRedirect('/w')} >
        Help Center
      </MainButton>
      <MainButton {...props} onClick={handleRedirect('/w')} >
        Launch my Lolchat
      </MainButton>
      <MainButton {...props} onClick={handleRedirect('/w')} >
        Privacy
      </MainButton>
      <button {...props} style={helpStyle} onClick={handleRedirect('/w')}>!</button>
      <h1 style={helpText}>Live Help</h1>
    </React.Fragment>
  );
}

const WomanButtons = props => {

  const { handleRedirect } = props;

  return (
    <React.Fragment>
      <MainButton {...props} onClick={handleRedirect('/w/myRequest')} >
        My Request
      </MainButton>
      <MainButton {...props} onClick={handleRedirect('/w/history')} >
        History
      </MainButton>
      <MainButton {...props} onClick={handleRedirect('/w')} >
        Help Center
      </MainButton>
      <MainButton {...props} onClick={handleRedirect('/w')} >
        Launch my Lolchat
      </MainButton>
      <MainButton {...props} onClick={handleRedirect('/w')} >
        Privacy
      </MainButton>
      <button {...props} style={helpStyle} onClick={handleRedirect('/w/liveHelp')}>!</button>
      <h1 style={helpText}>Live Help</h1>
    </React.Fragment>
  );
}

class Navbar extends React.Component {

  state = {
    open : false,
    redirect : null
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  };

  handleClose = () => {
    this.setState({ open: false })
  };

  handleRedirect = url => () => {
    this.setState({ redirect : url })
  }

  // this.props :
  // gender
  // title
  // backTo

  render() {
    const { redirect } = this.state;
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
        {redirect && <Redirect to={redirect}/>}
        <Grid container>
          <Grid item xs={8}>
            {backTo 
              ? <NavLink className={classes.title} to={backTo}>{'< NOMI'}</NavLink>
              : <a href="/" className={classes.title}>NOMI</a>
            }
            {title &&
              <Typography component="h1" variant="h6" className={classNames(classes.title,classes.subTitle)} noWrap>
                {title}
              </Typography>
            }
          </Grid>
          <Grid item xs={4} className={classes.alignRight}>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.handleClickOpen}>
              <MenuIcon />
            </IconButton>
          </Grid>
        </Grid>

        {/* Dialog */}

        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
          PaperProps={{className : classes.dialog}}
        >
          <IconButton color="inherit" onClick={this.handleClose} aria-label="Close" className={classes.close}>
            <CloseIcon/>
          </IconButton>
          {gender === 'man'
            ? <ManButtons className={classNames(classes.redirectButton, classes.manColor)} handleRedirect={this.handleRedirect} />
            : <WomanButtons className={classNames(classes.redirectButton, classes.womanColor)} handleRedirect={this.handleRedirect} />
          }
        </Dialog>
      </div>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navbar);

