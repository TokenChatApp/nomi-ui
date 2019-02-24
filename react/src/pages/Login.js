import React from 'react';
import AuthenticationService from '../services/AuthenticationService';
import { Backend } from '../services/Backend';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { NavLink, Redirect } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Navbar from '../components/Navbar';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import MainButton from '../components/MainButton'

import loginImg from '../images/female/loginGirl.png';

const styles = theme => ({
    root: {
        background : 'linear-gradient(#ff9954 , #ff268a)',
        height : '100%',
        minHeight : '100vh',
        position : 'relative',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '100%',
        maxWidth : 250
    },
    input : {
        backgroundColor : 'transparent',
        border : 'none',
        color : 'white',
        outline: 'none',
    },
    label : {
        color : 'white!important'
    },
    form : {
        minHeight : 300
    },
    button : {
        fontWeight : 700,
        color : '#ff666d'
    },
    buttonImg : {
        width : 25,
        height : 25,
        paddingRight : 10,
    },
    footer : {
        color : '#ff268a',
        position : 'absolute',
        bottom : 0,
        left : 0,
        right : 0,
        width : '100%',
        backgroundColor : 'white',
        padding : 15,
        height : 60,
    },
    footerColor : {
        color : '#ff268a',
    }
});

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect : null,
            Username : null,
            Password : null,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        let value = "";
        if (target.type === 'checkbox') {
            if (target.checked){
                value = target.value;
            }else{
                value = "";
            }
        } else{
            value = target.value;
        }
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {

        let that = this;

        let response = AuthenticationService.login(this.state);
        response.then(res => {
            if (res.status) {
                AuthenticationService.profile().then(function(r){
                    Backend.setProfile(r);
                    if (r.Gender === "Men"){
                        that.setState({ redirect : '/m'});
                    }
                    if (r.Gender === "Women"){
                        that.setState({ redirect : '/w'});
                    }
                });
            }
        });
        event.preventDefault();
    }

    render() {
        const { classes } = this.props;
        const { redirect } = this.state;

        return (
            <div className={classes.root}>
                {redirect && <Redirect to={redirect}/>}
                <Navbar/>
                <form onSubmit={this.handleSubmit}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Grid container className={classes.form} alignContent="center">
                                <Grid item xs={12}>
                                    <TextField
                                        label="Username"
                                        className={classes.textField}
                                        margin="normal"
                                        InputLabelProps={{
                                            className: classes.label
                                        }}
                                        InputProps={{
                                            className: classes.input
                                        }}
                                        value={this.state.Username}
                                        onChange={this.handleInputChange}
                                        name="Username"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Password"
                                        type="password"
                                        className={classes.textField}
                                        margin="normal"
                                        InputLabelProps={{
                                            className: classes.label
                                        }}
                                        InputProps={{
                                            className: classes.input
                                        }}
                                        value={this.state.Password}
                                        onChange={this.handleInputChange}
                                        name="Password"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <MainButton className={classes.button} type="submit">
                                <img className={classes.buttonImg} src={loginImg} alt="login"/>
                                Login
                            </MainButton>
                            <Typography className={classes.label}>
                                Forget Password ?
                            </Typography>
                        </Grid>
                        <Grid item xs={12} className={classes.footer}>
                            {"Don't have an account? "}
                            <NavLink to="/" className={classes.footerColor}>SIGN UP</NavLink>
                        </Grid>
                    </Grid>
                </form>
            </div>
        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);

