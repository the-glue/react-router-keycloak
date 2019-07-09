import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import KeycloakContext from '../keycloak/KeycloakContext';
import { getKeycloak } from '../keycloak/keycloak';

const updateToken = onRefresh => {
  const keycloak = getKeycloak();
  // refresh the token if it is about to expire within 4 minutes.
  // default keycloak validity is 5 min, so we need to add less to avoid refresh loop
  keycloak.updateToken(240).success(refreshed => {
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

const propTypes = {
  component: PropTypes.any,
  location: PropTypes.shape({
    pathname: PropTypes.string
  })
};
const PrivateRoute = ({ component: Component, ...rest }) => (
  <KeycloakContext.Consumer>
    {context => (
      <Route
        {...rest}
        render={props => {
          if (checkLogin(context.onRefresh)) {
            return <Component {...props} />;
          } else {
            return (
              <Redirect
                to={{
                  pathname: context.loginPath,
                  state: { redirectTo: props.location.pathname }
                }}
              />
            );
          }
        }}
      />
    )}
  </KeycloakContext.Consumer>
);
PrivateRoute.propTypes = propTypes;

export default PrivateRoute;
