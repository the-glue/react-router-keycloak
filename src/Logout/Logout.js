import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import KeycloakContext from '../KeycloakContext';
import { keycloak } from '../keycloak';

class Logout extends Component {
  static contextType = KeycloakContext;

  componentDidMount() {
    this.logOut();
    this.props.onSuccess();
  }

  logOut = () => {
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