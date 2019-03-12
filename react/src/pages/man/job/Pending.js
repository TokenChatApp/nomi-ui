import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { NavLink, Redirect } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Navbar from '../../../components/Navbar';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import GirlCard from '../GirlCard';

import { manColor } from '../../../Constants';

import dummyGirl from '../../../images/dummyGirl.png';
import crownGold from '../../../images/male/dashboard/crown_gold.svg';
import crownSilver from '../../../images/male/dashboard/crown_silver.svg';

import NomiButton from '../../../components/NomiButton';
import { Backend } from "../../../services/Backend";

const styles = theme => ({
  root: {
    height : '100%',
    minHeight : '100vh',
    position : 'relative',
  },
  container : {
    marginTop :30,
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  button : {
    height : 56,
    borderRadius : 30,
    fontWeight : 500,
    maxWidth : 250,
  },
  pendingText : {
    color : manColor[0],
    fontSize : 22,
    width : '100%',
    margin : 15,
  },
  dialog : {
    padding : 20,
    color : '#9c9c9c'
  },
  dialogTitle : {
    textAlign: 'center',
    color : '#9c9c9c',
  },
  crown : {
    width : '100%',
  },
  crownTitle : {
    paddingLeft : 10
  },
  nav : {
    fontWeight : 400,
    color : manColor[1],
    textDecoration : 'none'
  }
});

const womanList = [
  { name : 'Himiko', age : '20', rating : 3, level : 3, imgUrl : dummyGirl },
  { name : 'Himiko', age : '20', rating : 3, level : 2, imgUrl : dummyGirl },
  { name : 'Himiko', age : '20', rating : 3, level : 1, imgUrl : dummyGirl },
  { name : 'Himiko', age : '20', rating : 3, level : 1, imgUrl : dummyGirl },
];

class Pending extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      redirect : '',
      womanList : womanList,
      user: Backend.user,
      crown : false,
    };
  }

  handleToggleCrown = () => {
    let { crown } = this.state;
    this.setState({ crown : !crown });
  }

  render() {
    const { classes } = this.props;
    const { redirect, womanList } = this.state;

    return (
      <div className={classes.root}>
        {redirect && <Redirect to={redirect}/>}
        <Navbar title="My Dates" gender="M"/>
        <Grid container className={classes.container}>
          <Typography variant="h4" className={classes.pendingText}>
            4 responses received, select the girl you like
          </Typography>
          {
            womanList.map(e => 
              <Grid item xs={6}>
                <GirlCard
                  {...e}
                  handleToggleCrown={this.handleToggleCrown}
                />
              </Grid>
            )
          }

          <Grid item xs={12}>
            <NomiButton 
              className={classes.button} 
              gender="M" 
              onClick={() => this.setState({ redirect : '/m/payment' })}
            >
              Checkout
            </NomiButton>
            <h5>
              <NavLink className={classes.nav} to="/m/dates">x Cancel date</NavLink>
            </h5>
          </Grid>
        </Grid>

        {/*Dialog*/}

        <Dialog onClose={this.handleToggleCrown} open={this.state.crown}>
          <DialogTitle className={classes.dialogTitle}>Our Selected Girls</DialogTitle>
          <Grid container alignItems="center" className={classes.dialog}>
            <Grid item xs={2}>
              <img className={classes.crown} src={crownGold} alt="crown"/>
            </Grid>
            <Grid item xs={10} className={classes.crownTitle}>
              Prestige Girls
            </Grid>
            <Grid item xs={10}>
              *Customer provide write up of description*
            </Grid>
          </Grid>
          <Grid container alignItems="center" className={classes.dialog}>
            <Grid item xs={2}>
              <img className={classes.crown} src={crownSilver} alt="crown"/>
            </Grid>
            <Grid item xs={10} className={classes.crownTitle}>
              Premium Girls
            </Grid>
            <Grid item xs={10}>
              *Customer provide write up of description*
            </Grid>
          </Grid>
        </Dialog>

      </div>
    );
  }
}

Pending.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Pending);

