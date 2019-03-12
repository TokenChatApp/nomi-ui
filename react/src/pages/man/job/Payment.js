import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { NavLink, Redirect } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Navbar from '../../../components/Navbar';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Clear from '@material-ui/icons/Clear';
import classNames from 'classnames';

import { manColor } from '../../../Constants';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import dummyGirl from '../../../images/dummyGirl.png';

import NomiButton from '../../../components/NomiButton';
import { Backend } from "../../../services/Backend";

const styles = theme => ({
  root: {
    height : '100%',
    minHeight : '100vh',
    position : 'relative',
  },
  container : {
    color : '#8a8a8a',
    fontWeight : 300,
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
  themeText : {
    color : manColor[1],
    fontSize : 17,
    width : '100%'
  },
  dialog : {
    padding : 20,
    color : '#9c9c9c'
  },
  dialogTitle : {
    textAlign: 'center',
    color : '#9c9c9c',
  },
  detailTitle : {
    fontWeight : 500,
    padding : 5,
    fontSize : 20,
    textAlign : 'left'
  },
  nav : {
    fontWeight : 400,
    color : manColor[1],
    textDecoration : 'none'
  },
  alignLeft : {
    padding: 5,
    textAlign : 'left'
  },
  alignRight : {
    padding: 5,
    textAlign : 'right'
  },
  divider : {
    marginTop : 30,
    marginBottom : 30
  },
  description : {
    paddingLeft : 10,
    textAlign : 'left',
    margin : 0,
    fontWeight : 300
  },
  avatar : {
    width : 40,
    borderRadius : '50%'
  },
  girlList : {
    border : '1px solid #e0e0e0',
    minHeight : 90
  },
  head : {
    paddingBottom : 10
  },
  name : {
    paddingLeft : 10,
    textAlign : 'left',
    margin : 0,
    fontSize : 15
  },
  text : {
    color : '#696969',
    padding : 40,
    textAlign : 'left',
    margin : 0,
    fontWeight : 300
  },
  total : {
    padding : 13,
    border : '1px solid #e0e0e0',
    textAlign : 'right'
  },
  alignCenter : {
    textAlign : 'center'
  },
  mAuto : {
    margin : 'auto'
  }
});

const womanList = [
  { name : 'Himiko1', age : '20', imgUrl : dummyGirl, rate : 100, hr : 1 },
  { name : 'Himiko2', age : '20', imgUrl : dummyGirl, rate : 100, hr : 1 },
  { name : 'Himiko3', age : '20', imgUrl : dummyGirl, rate : 100, hr : 1 },
  { name : 'Himiko4', age : '20', imgUrl : dummyGirl, rate : 100, hr : 1 },
  { name : 'Himiko5', age : '20', imgUrl : dummyGirl, rate : 100, hr : 1 },
];

const PaymentList = withStyles(styles)(props => {
  const { classes, name, age, imgUrl, rate, hr, handleDelete } = props;
  return (
    <Grid container alignItems="center" className={classes.girlList}>
      <Grid item xs={2}>
        <img src={imgUrl} alt="girl" className={classes.avatar}/>
      </Grid>
      <Grid item xs={3}>
        <h6 className={classes.name}>{name}</h6>
        <h6 className={classes.description}>{age} years old</h6>
        <h6 className={classes.description}>Rate :{rate}/hr</h6>
      </Grid>
      <Grid item xs={3}>
        {hr} hr
      </Grid>
      <Grid item xs={3}>
        {rate}
      </Grid>
      <Grid item xs={1}>
        <Clear onClick={handleDelete(name)}/>
      </Grid>
    </Grid>
  );
});

class Payment extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      redirect : '',
      womanList : womanList,
      user: Backend.user,
      dialog : false
    };
  }

  handleDelete = name => event => {
    var { womanList } = this.state;
    var index = womanList.map(e => e.name).indexOf(name);
    womanList.splice(index, 1);
    this.setState({ womanList });
  }

  handleClose = () => this.setState({ dialog : false})

  render() {
    const { classes } = this.props;
    const { redirect, womanList, dialog } = this.state;

    return (
      <div className={classes.root}>
        {redirect && <Redirect to={redirect}/>}
        <Navbar title="Summary" gender="M"/>
        <Grid container className={classes.container}>
          <Grid item xs={12} className={classes.detailTitle}>
            Date Detail
          </Grid>
          <Grid item xs={6} className={classes.alignLeft}>
            Invitation
          </Grid>
          <Grid item xs={6} className={classes.alignRight}>
            12 Nov 2019
          </Grid>
          <Grid item xs={6} className={classes.alignLeft}>
            市区町村 都道府県
          </Grid>
          <Grid item xs={6} className={classes.alignRight}>
            10:00 - 12:00
          </Grid>
        </Grid>
        <Divider className={classes.divider} variant="middle" />
        <Grid container alignItems="center" className={classes.container}>
          <Grid item xs={6} className={classes.detailTitle}>
            Order Detail
          </Grid>
          <Grid item xs={6} className={classes.alignRight}>
              <NavLink className={classes.nav} to="/m/dates/pending">{"< Back to selection"}</NavLink>
          </Grid>
        </Grid>

        <Grid container alignItems="center" className={classes.container}>
          <Grid item xs={5}/>
          <Grid item xs={3} className={classes.head}> Duration </Grid>
          <Grid item xs={3} className={classes.head}> Credit </Grid>
          <Grid item xs={1}/>
          {womanList.map(e => 
            <Grid item xs={12}>
              <PaymentList {...e} handleDelete={this.handleDelete}/>
            </Grid>
          )}
          <Grid className={classes.total} item xs={12}>
            Total : {womanList.reduce((a, v) => a + v.rate, 0)}
          </Grid>
        </Grid>
        
          <Typography variant="p" className={classes.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempus ac ex id bibendum. Proin in nunc nec ex blandit laoreet. Duis dignissim tellus ex, a consequat velit scelerisque ac. Maecenas id nibh aliquet, blandit diam ac, rutrum nisi. Praesent ac mi quis quam finibus posuere a a diam. Aliquam mattis est non magna mollis, ut pretium nisl hendrerit. Suspendisse potenti. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut vulputate quis dolor ut tempus. In ut consectetur ante. Maecenas condimentum non nibh nec placerat. Integer faucibus ex posuere, molestie mauris ut, tristique quam.
          </Typography>

          <Typography variant="h6" className={classes.themeText}>
            Your credit balance : 100
          </Typography>

        <Grid container alignItems="center" className={classes.container}>
          <Grid item xs={12}>
            <NomiButton 
              className={classes.button} 
              gender="M" 
              onClick={() => this.setState({ redirect : '/m/paymentDone' })}
            >
              Pay now
            </NomiButton>
            <h5>
              <NavLink className={classes.nav} to="/m/dates">+ Top up credit</NavLink>
            </h5>
          </Grid>
        </Grid>

        {/* Dialog */}
        <Dialog
          open={dialog}
          onClose={this.handleClose}
          className={classes.alignCenter}
        >
          <DialogContent>
            <DialogContentText>
              Ops! Your credit is insufficient.<br/>
              Please top up to continue.
            </DialogContentText>
          </DialogContent>
          <NomiButton 
            className={classNames(classes.button, classes.mAuto)} 
            gender="M" 
            onClick={() => this.setState({ redirect : '/m/paymentDone' })}
          >
            Top up credit
          </NomiButton>
          <h6>
            <Button onClick={this.handleClose} autoFocus>
              Cancel
            </Button>
          </h6>
        </Dialog>


      </div>
    );
  }
}

Payment.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Payment);

