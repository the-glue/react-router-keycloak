import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { getKeycloak } from '../keycloak/keycloak';

class Logout extends Component {
  static propTypes = {
    onSuccess: PropTypes.func,
    onFailure: PropTypes.func,
    redirectTo: PropTypes.string.isRequired
  };
  static defaultProps = {
    onSuccess: () => {},
    onFailure: () => {}
  };
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
