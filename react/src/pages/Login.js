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

    state = {
        redirect : null,
        Username : null,
        Password : null,
        errors: {},
        errorMessage: '',
    };

    handleInputChange = (event => {
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
    });

    handleFormSubmit = (event => {

        let that = this;

        let response = AuthenticationService.login(this.state);
        response.then(r => {
            this.setState({errors: r.errors, errorMessage: r.errorMessage });
            if (r.status) {
                AuthenticationService.profile().then(sub_r => {
                    Backend.setProfile(sub_r);
                    this.setState({ redirect : sub_r.Gender === "Men" ? '/m' : '/w'});
                });
            }
        });
        event.preventDefault();
    });

    render() {
        const { classes } = this.props;
        const { redirect, errors, errorMessage } = this.state;

        return (
            <div className={classes.root}>
                {redirect && <Redirect to={redirect}/>}
                <Navbar/>
                <form onSubmit={this.handleFormSubmit}>
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
                                        error={errors.hasOwnProperty("Username")}
                                        helperText={errors.hasOwnProperty("Username") && errors["Username"]}
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
                                        error={errors.hasOwnProperty("Password")}
                                        helperText={errors.hasOwnProperty("Password") && errors["Password"]}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        {errorMessage}
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

