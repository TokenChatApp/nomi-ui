import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Navbar from '../../../components/Navbar';
import { manColor } from '../../../Constants';
import MainButton from '../../../components/MainButton';
import girlImg from '../../../images/dummyGirl.png';
import StarRate from '@material-ui/icons/StarRate';
import classNames from 'classnames';

// Dialog imports
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';

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
  img : {
    width : 90,
    borderRadius : '50%',
  },
  description : {
    paddingLeft : '10%',
    paddingRight : '10%',
    color : 'white'
  },
  title : {
    marginTop : 30,
    fontWeight : 700,
    fontSize : 23,
    color : 'white'
  },
  listWrapper : {
    padding : 20
  },
  name : {
    color : '#484848',
    margin: 0,
    fontWeight : 300,
    fontSize : 16,
  },
  button : {
    color : manColor[0],
    marginTop : 15,
    marginBottom : 50,
    maxWidth : 200
  },
  list : {
    paddingTop : 15,
    paddingBottom : 15
  },
  alignLeft : {
    textAlign : 'left'
  },
  alignCenter : {
    textAlign : 'center'
  },
  star : {
    fontSize : 30,
    cursor : 'pointer'
  },
  filled : {
    color : 'white'
  },
  empty : {
    color : 'rgba(255, 255, 255, 0.5)'
  },
  agree : {
    color : manColor[0],
    margin : 'auto'
  }
});


const GirlList = withStyles(styles)(props => {
  const { classes, setRating, rating } = props;

  return (
    <Grid container alignItems="center" className={classes.list}>
      <Grid item xs={5}>
        <img className={classes.img} src={girlImg} alt="girl"/>
      </Grid>
      <Grid item xs={7} className={classes.alignLeft}>
        <h6 className={classes.name}>Yamada Hanako</h6>
        {
          new Array(5).fill(0).map((e, i) => {
            return i < rating
              ? <StarRate className={classNames(classes.star, classes.filled)} onClick={setRating(i + 1)}/>
              : <StarRate className={classNames(classes.star, classes.empty)} onClick={setRating(i + 1)}/>
          })
        }
      </Grid>
    </Grid>
  );
});

class Rating extends React.Component {

  state = {
    redirect : null,
    dialog : false,
    girlRating : [3, 3, 3, 3],
  }

  setRating = index => rate => event => {
    var { girlRating } = this.state;
    girlRating[index] = rate;
    this.setState({ girlRating });
  }

  handleSubmit = event => {
    this.setState({ active : false })
  }

  handleToggle = event => {
    var { dialog } = this.state;
    this.setState({ dialog : !dialog });
  }

  render() {
    const { classes } = this.props;
    const { girlRating, dialog, redirect } = this.state;
    return (
      <div className={classes.root}>
        {redirect && <Redirect to={redirect}/>}
        <div className={classes.fixedNav}>
          <Navbar title="My Dates" />
        </div>
        <Typography className={classes.title} variant="h6">
          Thank you for using NOMI
        </Typography>
        <Typography className={classes.description} variant="h6">
          Let us know how is your date by rating the girls
        </Typography>
        <div className={classes.listWrapper}>
          {girlRating.map((e, i) => <GirlList rating={e} setRating={this.setRating(i)}/>)}
        </div>
        <MainButton className={classes.button}  onClick={this.handleToggle}>
          Submit
        </MainButton>

        <Dialog
          open={dialog}
          onClose={this.handleClose}
        >
          <DialogContent>
            <DialogContentText className={classes.alignCenter}>
              We have received your feedback <br/> Thank you
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.setState({ redirect : '/m' })} className={classes.agree} autoFocus>
              Back to home
            </Button>
          </DialogActions>
        </Dialog>

      </div>
    );
  }
}

Rating.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Rating);

