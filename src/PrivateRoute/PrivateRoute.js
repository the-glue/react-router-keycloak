import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import KeycloakContext from '../keycloak/KeycloakContext';
import { getKeycloak } from '../keycloak/keycloak';

const updateToken = onRefresh => {
  const keycloak = getKeycloak();
  // refresh the token if it is about to expire within 5 minutes.
  keycloak.updateToken(300).success(refreshed => {
    if (refreshed) {
      onRefresh(keycloak.token);
    }
  });
};

const checkLogin = onRefresh => {
  const keycloak = getKeycloak();
  updateToken(onRefresh);
  return keycloak.authenticated;
};
const PrivateRoute = ({ component: Component, ...rest }) => (
  <KeycloakContext.Consumer>
    {context => (
      <Route
        {...rest}
        render={props =>
          checkLogin(context.onRefresh) ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: context.loginPath,
                state: { from: props.location }
              }}
            />
          )
        }
      />
    )}
  </KeycloakContext.Consumer>
);

export default PrivateRoute;
