import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import KeycloakContext from '../keycloak/KeycloakContext';
import Login from '../Login';

const propTypes = {
  redirectTo: PropTypes.string.isRequired,
  onSuccess: PropTypes.func,
  onFailure: PropTypes.func,
  loader: PropTypes.node
};
const defaultProps = {
  loader: null
};

export default function LoginRoute({ redirectTo, onSuccess, onFailure, loader, ...rest }) {
  console.log('LoginRoute props', { redirectTo, onSuccess, onFailure, loader, rest });
  return (
    <KeycloakContext.Consumer>
      {context => {
        console.log('LoginRoute context', context);
        return (
          <Route
            {...rest}
            path={context.loginPath}
            render={props => (
              <Login redirectTo={redirectTo} onSuccess={onSuccess} onFailure={onFailure} {...props}>
                {loader}
              </Login>
            )}
          />
        );
      }}
    </KeycloakContext.Consumer>
  );
}
LoginRoute.propTypes = propTypes;
LoginRoute.defaultProps = defaultProps;
