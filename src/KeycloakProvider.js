import React from 'react';
import PropTypes from 'prop-types';
import KeycloakContext from './KeycloakContext';

class KeycloakProvider extends React.Component {
  static propTypes = {
    loginPath: PropTypes.string.isRequired,
    logoutPath: PropTypes.string.isRequired,
    onRefresh: PropTypes.func.isRequired
  };

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
