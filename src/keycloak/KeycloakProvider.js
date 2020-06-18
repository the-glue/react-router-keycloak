import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import KeycloakContext from './KeycloakContext';
import { updateToken, isAuthenticated } from './keycloak';

const propTypes = {
  loginPath: PropTypes.string.isRequired,
  logoutPath: PropTypes.string.isRequired,
  onRefresh: PropTypes.func.isRequired,
  minValidity: PropTypes.number,
  refreshRate: PropTypes.number,
  children: PropTypes.any,
};
const defaultProps = {
  minValidity: 30,
  refreshRate: 10,
};

export default function KeycloakProvider(props) {
  const { loginPath, logoutPath, onRefresh, minValidity, refreshRate, children } = props;
  useEffect(() => {
    const refreshInterval = setInterval(() => {
      if (isAuthenticated()) {
        updateToken(onRefresh, minValidity, props.loginPath);
      }
    }, refreshRate * 1000);
    return () => {
      clearInterval(refreshInterval);
    };
  });
  return (
    <KeycloakContext.Provider value={{ loginPath, logoutPath, onRefresh, minValidity, refreshRate }}>
      {children}
    </KeycloakContext.Provider>
  );
}
KeycloakProvider.propTypes = propTypes;
KeycloakProvider.defaultProps = defaultProps;
