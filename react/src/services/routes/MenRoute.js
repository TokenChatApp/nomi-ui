import React from "react";
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
