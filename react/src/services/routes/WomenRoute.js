import React from "react";
import { Backend } from "../Backend";
import { Redirect, Route } from "react-router-dom";

export const WomenRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Backend.isAuthenticated() && Backend.isWomen() ? (
        <Component {...props} />
      ) : (
        <Redirect to="/w/login" />
      )
    }
  />
);
