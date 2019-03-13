import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { NavLink, Redirect } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Dialog from "@material-ui/core/Dialog";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Avatar from "@material-ui/core/Avatar";
import AuthenticationService from "../services/AuthenticationService";
import classNames from "classnames";
import { manColor, womanColor } from "../Constants";
import MainButton from "./MainButton";
import { Backend } from "../services/Backend";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const styles = theme => ({
  layout: {
    padding: 10
  },
  title: {
    color: "white",
    textAlign: "left",
    fontSize: "2rem",
    fontWeight: 400,
    marginLeft: 20,
    textDecoration: "none",
    display: "block"
  },
  subTitle: {
    fontSize: "1rem",
    fontWeight: 400
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
    color: "white"
  },
  alignRight: {
    textAlign: "right"
  },
  dialog: {
    backgroundColor: "rgba(0, 0, 0, 0.4)"
  },
  close: {
    color: "white",
    alignSelf: "flex-end"
  },
  redirectButton: {
    marginLeft: "auto",
    marginRight: "auto",
    display: "block",
    fontWeight: 400,
    maxWidth: 230
  },
  manColor: {
    color: manColor[1]
  },
  womanColor: {
    color: womanColor[1]
  },
  text: {
    color: "white",
    fontSize: 13,
    alignItems: "center",
    justifyContent: "center",
    display: "flex"
  },
  avatar: {
    marginLeft: "auto",
    marginRight: 0
  },
  backButton: {
    color: "white",
    textDecoration: "none",
    textAlign: "left",
    paddingTop: "10px",
    paddingLeft: "0",
    paddingRight: "10%",
    marginLeft: 20,
    display: "block"
  }
});

const helpStyle = {
  height: 40,
  width: "100%",
  maxWidth: 230,
  margin: "auto",
  fontSize: "1rem",
  fontWeight: 500,
  backgroundColor: "#e84646",
  borderRadius: 30,
  padding: "0 30px",
  border: 0,
  color: "white",
  cursor: "pointer"
};

const privacyText = {
  textAlign: "center",
  color: "white",
  fontSize: "1rem",
  marginBottom: 40
};

const wrapperStyle = {
  margin: "auto",
  width: "100%"
};

const Divider = props => <div style={{ height: props.height || 20 }} />;

const ManButtons = props => {
  const { handleRedirect } = props;
  const { handleLogout } = props;

  return (
    <React.Fragment>
      <div style={wrapperStyle}>
        <MainButton {...props} onClick={handleRedirect("/m/dates")}>
          My Dates
        </MainButton>
        <Divider />
        <MainButton {...props} onClick={handleRedirect("/m/locationEdit")}>
          Change Location
        </MainButton>
        <Divider />
        <MainButton {...props} onClick={handleRedirect("/m")}>
          FAQ
        </MainButton>
        <Divider />
        <MainButton {...props} onClick={handleRedirect("/m")}>
          Help Center
        </MainButton>
        <Divider />
        <MainButton {...props} onClick={handleRedirect("/m")}>
          Launch my Lolchat
        </MainButton>
        <Divider />
      </div>
      <Divider height={30} />
      <div style={wrapperStyle}>
        <MainButton {...props} onClick={handleLogout}>
          Sign Out
        </MainButton>
        <Divider />
        <button {...props} style={helpStyle} onClick={handleRedirect("/m")}>
          Emergency contact
        </button>
      </div>
      <h1 style={privacyText}>Privacy Policy</h1>
    </React.Fragment>
  );
};

const WomanButtons = props => {
  const { handleRedirect } = props;
  const { handleLogout } = props;

  return (
    <React.Fragment>
      <div style={wrapperStyle}>
        <MainButton {...props} onClick={handleRedirect("/w")}>
          My Jobs
        </MainButton>
        <Divider />
        <MainButton {...props} onClick={handleRedirect("/w/locationEdit")}>
          Change Location
        </MainButton>
        <Divider />
        <MainButton {...props} onClick={handleRedirect("/w/helpCenter")}>
          FAQ
        </MainButton>
        <Divider />
        <MainButton {...props} onClick={handleRedirect("/w")}>
          Help Center
        </MainButton>
        <Divider />
        <MainButton {...props} onClick={handleRedirect("/w")}>
          Launch my lol chat
        </MainButton>
        <Divider />
      </div>
      <Divider height={30} />
      <div style={wrapperStyle}>
        <MainButton {...props} onClick={handleLogout}>
          Sign Out
        </MainButton>
        <Divider />
        <button
          {...props}
          style={helpStyle}
          onClick={handleRedirect("/w/liveHelp")}
        >
          Emergency contact
        </button>
      </div>
      <h1 style={privacyText}>Privacy Policy</h1>
    </React.Fragment>
  );
};

class Navbar extends React.Component {
  state = {
    open: false,
    redirect: null
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleRedirect = url => () => {
    this.setState({ redirect: url });
  };

  handleLogout = () => {
    let that = this;
    AuthenticationService.logout().then(function() {
      that.setState({ redirect: "/" });
    });
  };

  renderDialogue() {
    const { classes, gender, isLoggedIn } = this.props;
    if (isLoggedIn === "false") {
      return;
    }
    return (
      <Dialog
        fullScreen
        open={this.state.open}
        onClose={this.handleClose}
        TransitionComponent={Transition}
        PaperProps={{ className: classes.dialog }}
      >
        <IconButton
          color="inherit"
          onClick={this.handleClose}
          aria-label="Close"
          className={classes.close}
        >
          <CloseIcon />
        </IconButton>
        {gender === "F" ? (
          <WomanButtons
            className={classNames(classes.redirectButton, classes.womanColor)}
            handleRedirect={this.handleRedirect}
            handleLogout={this.handleLogout}
          />
        ) : (
          <ManButtons
            className={classNames(classes.redirectButton, classes.manColor)}
            handleRedirect={this.handleRedirect}
            handleLogout={this.handleLogout}
          />
        )}
      </Dialog>
    );
  }

  renderHamburgerIcon() {
    const { classes, isLoggedIn } = this.props;
    if (isLoggedIn === "false") {
      return;
    }
    return (
      <Grid item xs={6}>
        <IconButton
          className={classes.menuButton}
          color="inherit"
          aria-label="Menu"
          onClick={this.handleClickOpen}
        >
          <MenuIcon />
        </IconButton>
      </Grid>
    );
  }

  renderLoggedInButtons() {
    const { classes, isLoggedIn } = this.props;
    let imgSrc = `data:image/jpeg;base64,${Backend.avatar}`;
    if (isLoggedIn === "false") {
      return;
    }
    return (
      <Grid item xs={4} className={classes.alignRight}>
        <Grid container alignItems="center">
          <Grid item xs={6}>
            {this.renderAvatar()}
          </Grid>
          {this.renderHamburgerIcon()}
        </Grid>
      </Grid>
    );
  }

  renderAvatar() {
    const { classes } = this.props;
    if (Backend.avatar !== null && Backend.avatar !== "") {
      let imgSrc = `data:image/jpeg;base64,${Backend.avatar}`;
      return (
        <Avatar alt="man or girl" src={imgSrc} className={classes.avatar} />
      );
    } else {
      return (
        <Avatar
          alt="man or girl"
          src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
          className={classes.avatar}
        />
      );
    }
  }

  render() {
    const { redirect } = this.state;
    const { classes, gender, title, backTo } = this.props;

    let backgroundColor;

    switch (gender) {
      case "M":
        backgroundColor = `linear-gradient(to top, ${manColor[0]} , ${
          manColor[1]
        })`;
        break;
      case "F":
        backgroundColor = `linear-gradient(to top, ${womanColor[0]} , ${
          womanColor[1]
        })`;
        break;
      default:
        backgroundColor = "none";
    }

    return (
      <div
        className={classes.layout}
        style={{ background: backgroundColor || "none" }}
      >
        {redirect && <Redirect to={redirect} />}
        <Grid container alignItems="center">
          <Grid item xs={8}>
            <a href="/" className={classes.title}>
              NOMI
            </a>
          </Grid>
          {this.renderLoggedInButtons()}
          <Grid item xs={8}>
            {backTo && (
              <NavLink className={classes.backButton} to={backTo}>
                {"< Back"}
              </NavLink>
            )}
            {title && (
              <Typography
                component="h1"
                variant="h6"
                className={classNames(classes.title, classes.subTitle)}
                noWrap
              >
                {title}
              </Typography>
            )}
          </Grid>
          <Grid item xs={4} className={classes.alignRight}>
            <Typography
              component="h1"
              align="right"
              variant="h6"
              className={classes.text}
            >
              <span>
                {gender === "M"
                  ? ""
                  : // : '3 confirmed jobs >
                    ""}
              </span>
            </Typography>
          </Grid>
        </Grid>
        {this.renderDialogue()}
      </div>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Navbar);
