import React, { Component } from 'react';
//import { Switch, Route, Redirect } from 'react-router';
import { Backend } from '../Backend';
import { Redirect, Route } from 'react-router-dom'

export const WomenRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            Backend.isAuthenticated() && Backend.isWomen() ? (
                <Component {...props} />
            ) : (
                <Redirect to='/login' />
            )
        }
    />
);
