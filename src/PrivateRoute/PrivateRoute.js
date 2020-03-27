import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import KeycloakContext from '../keycloak/KeycloakContext';
import { isAuthenticated } from '../keycloak/keycloak';

const propTypes = {
  component: PropTypes.any,
  location: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      pathname: PropTypes.string,
      search: PropTypes.string,
    }),
  ]),
};

export default function PrivateRoute({ component: Component, ...rest }) {
  return (
    <KeycloakContext.Consumer>
      {(context) => (
        <Route
          {...rest}
          render={(props) => {
            if (isAuthenticated()) {
              return <Component {...props} />;
            } else {
              return (
                <Redirect
                  to={{
                    pathname: context.loginPath,
                    state: { redirectTo: props.location },
                  }}
                />
              );
            }
          }}
        />
      )}
    </KeycloakContext.Consumer>
  );
}
PrivateRoute.propTypes = propTypes;
