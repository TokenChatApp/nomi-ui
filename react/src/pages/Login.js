import React from 'react';
import AuthenticationService from '../services/AuthenticationService';
import { Backend } from '../services/Backend';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { NavLink, Redirect } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Navbar from '../components/Navbar';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import NomiButton from '../components/NomiButton'
import GenderSwitch from '../components/GenderSwitch';
import girlImg from '../images/girl.jpg';
import manImg from '../images/man.png';
import { womanColor, manColor } from '../Constants';

const styles = theme => ({
    root: {
        height : '100%',
        minHeight : '100vh',
        position : 'relative',
    },
    heroContainer : {
        backgroundSize : 'cover',
        WebkitBackgroundSize : 'cover',
        MozBackgroundSize : 'cover',
        OBackgroundSize : 'cover',
        height: '50vh',
        paddingTop : 10,
        paddingBottom : 10,
    },
    contentWrapper : {
        padding : '0 50px'
    },
    heroMale : { backgroundImage : 'url(' + manImg + ')' },
    heroFemale : { backgroundImage : 'url(' + girlImg + ')' },
    title : {
        color : 'white'
    },
    input : {
        backgroundColor : 'transparent',
        border : 'none',
        outline: 'none',
    },
    button : {
        fontWeight : 600,
        maxWidth : 250,
    },
    alignRight : {
        textAlign : 'right'
    },
    buttonImg : {
        width : 25,
        height : 25,
        paddingRight : 10,
    },
    footer : {
        color : '#8c8c8c',
        position : 'absolute',
        bottom : 0,
        left : 0,
        right : 0,
        width : '100%',
        backgroundColor : '#f5f5f5',
        padding : 15,
        height : 60,
    },
    install : {
        color : womanColor[0]
    },
    lolChat : {
        margin : '35px 0'
    },
    divider : {
        height : 20,
    },
    menBackground : { background : `linear-gradient(to left, ${manColor[0]} , ${manColor[1]})` },
    womenBackground : { background : `linear-gradient(to left, ${womanColor[0]} , ${womanColor[1]})` },
});

class Login extends React.Component {

    state = {
        redirect : null,
        gender : "man",
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

    switchGender = gender => () => {
        this.setState({ gender });
    }

    handleFormSubmit = (event => {

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
        const { redirect, gender, errors, errorMessage } = this.state;
        const man = gender === 'man';

        return (
            <div className={classes.root}>
                {redirect && <Redirect to={redirect} push/>}
                <Grid 
                    container 
                    alignContent="space-between" 
                    className={classNames(classes.heroContainer, man ? classes.heroFemale : classes.heroMale)}
                >
                    <Grid item xs={12}>
                        <GenderSwitch gender={gender} onClick={this.switchGender(man ? 'woman' : 'man')}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography className={classes.title} variant="h1" color="inherit" noWrap >NOMI</Typography>
                    </Grid>
                </Grid>
                <div className={classNames(classes.divider, man ? classes.menBackground : classes.womenBackground)}/>
                {man ?
                <form onSubmit={this.handleFormSubmit}>
                    <Grid container className={classes.contentWrapper} alignItems="center">
                        <Grid item xs={12}>
                            <Grid container className={classes.form} alignContent="center">
                                <Grid item xs={12}>
                                    <TextField
                                        label="Username"
                                        className={classes.textField}
                                        fullWidth
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
                                        fullWidth
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
                        <Grid item xs={6}>
                            <Typography className={classes.label}>
                                Forget Password ?
                            </Typography>
                        </Grid>
                        <Grid item xs={6} className={classes.alignRight}>
                            <NomiButton className={classes.button} gender="man" type="submit">
                                GO
                            </NomiButton>
                        </Grid>
                        <Grid item xs={12} className={classes.footer}>
                            Log in with LOL Chat
                        </Grid>
                    </Grid>
                </form>
                :
                <Grid container>
                    <Grid item xs={12}>
                        <NomiButton className={classNames(classes.button, classes.lolChat)} gender="woman" >
                            Log in with LOL Chat
                        </NomiButton>
                    </Grid>
                    <Grid item xs={12} className={classes.install}>
                        Install lol chat
                    </Grid>
                </Grid>
                }
            </div>
        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);

