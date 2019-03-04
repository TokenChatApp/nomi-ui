import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { NavLink, Redirect } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Navbar from '../../../components/Navbar';
import invitationImgSrc from '../../../images/male/dashboard/invitation_sent.png';
import { manColor } from '../../../Constants';
import MainButton from '../../../components/MainButton';

const grey = '#585858';

const styles = theme => ({
  root: {
    height : '100%',
    minHeight : 'calc(100vh - 100px)',
    position : 'relative',
    paddingTop : 100,
    background : `linear-gradient(to top, ${manColor[0]}, ${manColor[1]})`
  },
  fixedNav : {
    position : 'absolute',
    top : 0,
    left : 0,
    right : 0
  },
  button : {
    color : manColor[0],
    maxWidth : 200,
    display : 'block',
    margin : 'auto',
    marginTop : 50,
    fontSize : '1rem',
    fontWeight : 500
  },
  img : {
    paddingTop:50,
    width : 100,
  },
  title : {
    marginTop : 20,
    paddingLeft : '10%',
    paddingRight : '10%',
    color : 'white'
  },
  backHome : {
    textDecoration : 'none',
    color : 'white'
  }
});

class InvitationSent extends React.Component {

  state = {
    redirect : null
  }

  render() {
    const { classes } = this.props;
    const { redirect } = this.state;

    return (
        <div className={classes.root}>
          {redirect && <Redirect to={redirect}/>}
          <div className={classes.fixedNav}>
            <Navbar title="Girls around you"/>
          </div>
          <img className={classes.img} src={invitationImgSrc}/>
          <Typography className={classes.title} variant="h6">
            Your Invitation has been sent!
          </Typography>
          <Typography className={classes.title}>
            You will be notified by SMS when the girls response to your invitation. Your invitation will expire 15min before the starting time.
          </Typography>
          <Typography className={classes.title}>
            You may also check the status from "my dates"
          </Typography>
          <div>
          <MainButton className={classes.button}  onClick={() => this.setState({ redirect : '/m'})}>
            Go to My Dates
          </MainButton>
          <div style={{marginTop : 30}}>
            <NavLink to="/m" className={classes.backHome}>
              {'< Back to home'}
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}

InvitationSent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InvitationSent);

