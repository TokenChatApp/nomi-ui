import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import girlImg from '../../../images/dummyGirl.png';
import classNames from 'classnames';

const styles = theme => ({
  girlImg : {
    width : 70,
    borderRadius : '50%',
    padding : 5
  },
  imgContainer : {
    paddingTop : 20
  },
  arrow : {
    cursor : 'pointer',
    fontSize : 27
  },
  title : {
    margin : 0,
    fontWeight : 400,
    fontSize : 24,
  },
  detailWrapper : {
    color : '#8a8a8a',
    backgroundColor : 'white',
    padding : 15,
  },
  alignLeft : {
    textAlign : 'left',
    padding : 10,
  },
  alignRight : {
    textAlign : 'right',
    padding : 10,
  }
});

const allGirls = [girlImg, girlImg, girlImg, girlImg, girlImg];

class DateDetail extends React.Component {

  state = {
    allGirls,
    totalPages : parseInt(allGirls.length / 3),
    currentGirls : [],
    page : 0
  }

  componentDidMount() {
    this.getCurrentGirl(0);
  }

  handleNext = () => {
    let { page, totalPages } = this.state;
    // end of pages
    if(page === totalPages) return false;
    this.getCurrentGirl(page + 1);
  }

  handleBack = () => {
    let { page } = this.state;
    if(page === 0) return false;
    this.getCurrentGirl(page - 1);
  }

  getCurrentGirl = page => {
    let { allGirls } = this.state;
    let indexes = [page * 3, page * 3 + 1, page * 3 + 2];
    let tmp = indexes.map(e => allGirls[e]);
    let girls = tmp.filter(e => e);
    this.setState({ currentGirls : girls, page });
  }

  render() {
    const { classes } = this.props;
    const { currentGirls } = this.state;
    return (
        <Grid container className={classes.detailWrapper}>
          <Grid item xs={12}>
            <h1 className={classNames(classes.title, classes.alignLeft)}>Date Detail</h1>
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
          <Grid item xs={12}>
            <Grid container className={classes.imgContainer} alignItems="center" justify="space-between">
              <Grid item onClick={this.handleBack}>
                <span className={classes.arrow}>{"<"}</span>
              </Grid>
              <Grid item>
                <div>
                  {currentGirls.map(e => <img className={classes.girlImg} src={e} alt='girl'/>)}
                </div>
              </Grid>
              <Grid item onClick={this.handleNext}>
                <span className={classes.arrow}>{">"}</span>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
    );
  }
}

DateDetail.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DateDetail);

