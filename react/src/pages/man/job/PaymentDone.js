import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { NavLink, Redirect } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Navbar from '../../../components/Navbar';
import cheersImg from '../../../images/cheers.png';
import { manColor } from '../../../Constants';
import MainButton from '../../../components/MainButton';

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
    display : 'block',
    margin : 'auto',
    marginTop : 10,
    fontSize : '1rem',
    fontWeight : 500
  },
  img : {
    paddingTop:50,
    width : 100,
  },
  title : {
    marginTop : 20,
    marginBottom:50,
    paddingLeft : '10%',
    paddingRight : '10%',
    color : 'white'
  },
  backHome : {
    textDecoration : 'none',
    color : 'white'
  }
});

class PaymentDone extends React.Component {

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
            <Navbar title=""/>
          </div>
          <img className={classes.img} src={cheersImg} alt="payment"/>
          <Typography className={classes.title} variant="h6">
            DONE <br/> Enjoy your date!
          </Typography>
          <Typography className={classes.title}>
            Thanks for your payment, the date is confirmed, you can get in touch with the girls by LOL chat
          </Typography>
          <div>
          <MainButton className={classes.button}  onClick={() => this.setState({ redirect : '/m/addLolChat'})}>
            Start Chatting with lolchat
          </MainButton>
          <MainButton className={classes.button}  onClick={() => this.setState({ redirect : '/m/addLolChat'})}>
            Click here if you don't have lolchat
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

PaymentDone.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaymentDone);

