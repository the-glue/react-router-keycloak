import React from "react";
import { Route, Redirect } from "react-router-dom";
import { keycloak } from "../keycloak";

const updateToken = props => {
  keycloak.updateToken(3000).success(refreshed => {
    if (refreshed) {
      props.userLoggedIn(true, keycloak.token);
    }
  });
};

const checkLogin = props => {
  updateToken(props);
  return keycloak.authenticated;
};
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      checkLogin(rest) ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/log-in",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

export { PrivateRoute };
