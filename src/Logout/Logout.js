import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { getKeycloak } from '../keycloak/keycloak';

class Logout extends Component {
  static propTypes = {
    onSuccess: PropTypes.func,
    redirectTo: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        pathname: PropTypes.string,
        search: PropTypes.string,
      }),
    ]).isRequired,
    children: PropTypes.node,
  };
  static defaultProps = {
    onSuccess: () => {},
    onFailure: () => {},
  };
  state = {
    loading: true,
  };
  componentDidMount() {
    const { onSuccess } = this.props;
    const keycloak = getKeycloak();

    if (keycloak.authenticated) {
      // Redirect to keycloak logout page
      keycloak.logout();
    } else {
      this.setState({ loading: false });
      onSuccess();
    }
  }
  render() {
    const { redirectTo, children } = this.props;
    const { loading } = this.state;
    if (loading) {
      // display default loading or the one provided as children
      if (children) {
        return children;
      }

      return <div>Disconnecting...</div>;
    }
    return <Redirect to={redirectTo} />;
  }
}

export default Logout;
