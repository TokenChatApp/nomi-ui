import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import Navbar from "../../../components/Navbar";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { womanColor } from "../../../Constants";
import manImg from "../../../images/dummyMan.png";

import JobList from "./JobList";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  bgColor: {
    backgroundColor: "#ececec"
  },
  tab: {
    fontWeight: 700
  },
  activeTab: {
    color: womanColor[1],
    backgroundColor: "white"
  },
  tabWrapper: {
    width: "100%",
    paddingBottom: 50
  },
  title: {
    fontWeight: 300,
    marginTop: 40,
    marginBottom: 0,
    textAlign: "left",
    paddingLeft: 25
  }
});

const manList = [
  { name: "Hanako", pax: 2, time: "10:00 - 12:00", location: "City, Place" },
  { name: "Hanako", pax: 2, time: "10:00 - 12:00", location: "City, Place" },
  { name: "Hanako", pax: 2, time: "10:00 - 12:00", location: "City, Place" },
  { name: "Hanako", pax: 2, time: "10:00 - 12:00", location: "City, Place" }
];

class Job extends React.Component {
  state = {
    redirect: null,
    tab: 0,
    manList: manList
  };

  handleChange = (event, value) => {
    this.setState({ tab: value });
  };

  render() {
    const { classes } = this.props;
    const { tab, redirect } = this.state;

    return (
      <div className={classes.root}>
        {redirect && <Redirect to={redirect} />}
        <Navbar title="My Jobs" gender="F" />
        <Tabs
          value={tab}
          onChange={this.handleChange}
          variant="fullWidth"
          TabIndicatorProps={{ color: "blue" }}
          classes={{
            root: classes.bgColor
          }}
        >
          <Tab
            label="INVITED BY USER"
            className={classes.tab}
            classes={{ selected: classes.activeTab }}
          />
          <Tab
            label="MATCHED BOOKING"
            className={classes.tab}
            classes={{ selected: classes.activeTab }}
          />
        </Tabs>
        {tab === 0 && (
          <div className={classes.tabWrapper}>
            <h3 className={classes.title}>14 Nov 2019</h3>
            <JobList
              image={manImg}
              jobStatus="ENDED"
              name="Hanako"
              pax={2}
              time="10:00 - 12:00"
              location="City, Place"
            />
            <JobList
              image={manImg}
              jobStatus="ON GOING"
              name="Hanako"
              pax={2}
              time="10:00 - 12:00"
              location="City, Place"
            />
            <JobList
              image={manImg}
              jobStatus="CONFIRMED"
              name="Hanako"
              pax={2}
              time="10:00 - 12:00"
              location="City, Place"
            />
            <h3 className={classes.title}>15 Nov 2019</h3>
            <JobList
              image={manImg}
              jobStatus="PENDING"
              name="Hanako"
              pax={2}
              time="10:00 - 12:00"
              location="City, Place"
            />
            <JobList
              image={manImg}
              jobStatus="EXPIRED"
              name="Hanako"
              pax={2}
              time="10:00 - 12:00"
              location="City, Place"
            />
          </div>
        )}
        {tab === 1 && (
          <div className={classes.tabWrapper}>
            <h3 className={classes.title}>15 Nov 2019</h3>
            <JobList
              image={manImg}
              jobStatus="PENDING"
              name="Hanako"
              pax={2}
              time="10:00 - 12:00"
              location="City, Place"
            />
            <JobList
              image={manImg}
              jobStatus="ON GOING"
              name="Hanako"
              pax={2}
              time="10:00 - 12:00"
              location="City, Place"
            />
          </div>
        )}
      </div>
    );
  }
}

Job.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Job);
