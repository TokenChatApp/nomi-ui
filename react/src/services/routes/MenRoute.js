import React, { Component } from "react";
//import { Switch, Route, Redirect } from 'react-router';
import { Backend } from "../Backend";
import { Redirect, Route } from "react-router-dom";

export const MenRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Backend.isAuthenticated() && Backend.isMen() ? (
        <Component {...props} />
      ) : (
        <Redirect to="/m/login" />
      )
    }
  />
);
