import React from "react";
import { Backend } from "../Backend";
import { Redirect, Route } from "react-router-dom";

export const RedirectRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !Backend.isAuthenticated() ? (
        <Component {...props} />
      ) : Backend.isWomen() ? (
        <Redirect to="/w" />
      ) : (
        <Redirect to="/m" />
      )
    }
  />
);
