import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { NavLink, Redirect } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Navbar from "../../../components/Navbar";
import heartImgSrc from "../../../images/heart.png";
import { manColor } from "../../../Constants";
import MainButton from "../../../components/MainButton";

const styles = theme => ({
  root: {
    height: "100%",
    minHeight: "calc(100vh - 100px)",
    position: "relative",
    paddingTop: 100,
    background: `linear-gradient(to top, ${manColor[0]}, ${manColor[1]})`
  },
  fixedNav: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0
  },
  button: {
    color: manColor[0],
    maxWidth: 200,
    display: "block",
    margin: "auto",
    marginTop: 15,
    fontSize: "1rem",
    fontWeight: 500
  },
  img: {
    width: 150
  },
  title: {
    marginTop: 20,
    paddingLeft: "10%",
    paddingRight: "10%",
    color: "white"
  },
  backHome: {
    textDecoration: "none",
    color: "white"
  }
});

class BookingSent extends React.Component {
  state = {
    redirect: null
  };

  render() {
    const { classes } = this.props;
    const { redirect } = this.state;

    return (
      <div className={classes.root}>
        {redirect && <Redirect to={redirect} />}
        <div className={classes.fixedNav}>
          <Navbar title="" />
        </div>
        <img className={classes.img} src={heartImgSrc} alt="heart" />
        <Typography className={classes.title} variant="h6">
          今リクエストが出しました！
        </Typography>
        <Typography className={classes.title}>
          女性の受け取りが来たら、 ショートメールにてお知らせします。
        </Typography>
        <Typography className={classes.title}>
          「マイデート」で飲み会のリクエスト の状態もチェックできます。
        </Typography>
        <div>
          <MainButton
            className={classes.button}
            onClick={() => this.setState({ redirect: "/m/dates" })}
          >
            マイデートページまで
          </MainButton>
          <div style={{ marginTop: 30 }}>
            <NavLink to="/m" className={classes.backHome}>
              {"< ホームページに戻る"}
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}

BookingSent.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BookingSent);
