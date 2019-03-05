import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import Navbar from '../../../components/Navbar';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { manColor } from '../../../Constants';
import girlImg from '../../../images/male/dashboard/girl_photo_2.jpg';

import JobList from './JobList';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  bgColor : {
    backgroundColor : '#ececec',
  },
  tab : {
    fontWeight : 700
  },
  activeTab : {
    color : manColor[1],
    backgroundColor : 'white'
  },
  tabWrapper : {
    width : '100%',
    paddingBottom : 50
  }, 
  title : {
    fontWeight : 300,
    marginTop : 40,
    marginBottom : 0,
    textAlign : 'left',
    paddingLeft : 25
  }
});

// fake data
const images4 = [girlImg, girlImg, girlImg, girlImg];
const images3 = [girlImg, girlImg, girlImg];
const images2 = [girlImg, girlImg];
const images1 = [girlImg];

class Job extends React.Component {
  state = {
    redirect : null,
    tab : 0,
  };

  handleChange = (event, value) => {
    this.setState({ tab : value });
  }

  render() {
    const { classes } = this.props;
    const { tab, redirect } = this.state;

    return (
      <div className={classes.root}>
        {redirect && <Redirect to={redirect}/>}
        <Navbar title="My Dates" gender="man"/>
        <Tabs value={tab} 
          onChange={this.handleChange} 
          variant="fullWidth"
          TabIndicatorProps={{color : 'blue'}}
          classes={{
            root : classes.bgColor
          }}
        >
          <Tab label="INVITATION" className={classes.tab} classes={{selected : classes.activeTab}}/>
          <Tab label="BOOKING" className={classes.tab} classes={{selected : classes.activeTab}} />
        </Tabs>
        {tab === 0 && 
          <div className={classes.tabWrapper}>
            <h3 className={classes.title}>14 Nov 2019</h3>
            <JobList images={images4} jobStatus="ON GOING" time="10:00 - 12:00" location="市区町村 都道府県"/>
            <JobList images={images3} jobStatus="EXPIRED" time="10:00 - 12:00" location="市区町村 都道府県"/>
            <JobList images={[]} jobStatus="ENDED" time="10:00 - 12:00" location="市区町村 都道府県"/>
            <h3 className={classes.title}>13 Nov 2019</h3>
            <JobList images={images2} jobStatus="PENDING" time="10:00 - 12:00" location="市区町村 都道府県"/>
            <JobList images={images1} jobStatus="CONFIRMED" time="10:00 - 12:00" location="市区町村 都道府県"/>
            <JobList images={[]} jobStatus="ENDED" time="10:00 - 12:00" location="市区町村 都道府県"/>
          </div>
        }
        {tab === 1 && 
          <div className={classes.tabWrapper}>
            <h3 className={classes.title}>15 Nov 2019</h3>
            <JobList images={images1} jobStatus="ON GOING" time="10:00 - 12:00" location="市区町村 都道府県"/>
            <JobList images={images2} jobStatus="EXPIRED" time="10:00 - 12:00" location="市区町村 都道府県"/>
            <JobList images={images3} jobStatus="PENDING" time="10:00 - 12:00" location="市区町村 都道府県"/>
            <JobList images={images4} jobStatus="CONFIRMED" time="10:00 - 12:00" location="市区町村 都道府県"/>
            <JobList images={[]} jobStatus="ENDED" time="10:00 - 12:00" location="市区町村 都道府県"/>
          </div>
        }
      </div>
    );
  }
}

Job.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Job);

