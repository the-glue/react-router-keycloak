import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import KeycloakContext from '../keycloak/KeycloakContext';
import Logout from '../Logout';

const propTypes = {
  redirectTo: PropTypes.string.isRequired,
  onSuccess: PropTypes.func,
  onFailure: PropTypes.func
};

export default function LogoutRoute({ redirectTo, onSuccess, onFailure, ...rest }) {
  console.log('LogoutRoute props', { redirectTo, onSuccess, onFailure, rest });
  return (
    <KeycloakContext.Consumer>
      {context => {
        console.log('Logout context', context);
        return (
          <Route
            {...rest}
            path={context.logoutPath}
            render={props => <Logout redirectTo={redirectTo} onSuccess={onSuccess} onFailure={onFailure} {...props} />}
          />
        );
      }}
    </KeycloakContext.Consumer>
  );
}
LogoutRoute.propTypes = propTypes;
