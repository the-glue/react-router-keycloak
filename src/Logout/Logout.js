import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import KeycloakContext from '../keycloak/KeycloakContext';
import { getKeycloak } from '../keycloak/keycloak';

class Logout extends Component {
  static contextType = KeycloakContext;

  componentDidMount() {
    this.logOut();
    this.props.onSuccess();
  }

  logOut = () => {
    const keycloak = getKeycloak();
    if (keycloak.authenticated) {
      keycloak.logout().success(() => {
        this.props.onSuccess();
      });
    }
  };

  render() {
    return <Redirect to={this.props.redirectTo} />;
  }
}

export default Logout;
