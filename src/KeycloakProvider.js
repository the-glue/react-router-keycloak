import React from 'react';
import PropTypes from 'prop-types';
import { keycloakConfig } from './keycloak';
import KeycloakContext from './KeycloakContext';

class KeycloakProvider extends React.Component {
  static propTypes = {
    loginPath: PropTypes.string.isRequired,
    logoutPath: PropTypes.string.isRequired,
    keycloakUrl: PropTypes.string.isRequired,
    realm: PropTypes.string.isRequired,
    clientId: PropTypes.string.isRequired,
    onRefresh: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    keycloakConfig(this.props.keycloakUrl, this.props.realm, this.props.clientId);
  }

  render() {
    const { loginPath, logoutPath, onRefresh } = this.props;
    return (
      <KeycloakContext.Provider value={{ loginPath, logoutPath, onRefresh }}>
        {this.props.children}
      </KeycloakContext.Provider>
    );
  }
}

export default KeycloakProvider;
