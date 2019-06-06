import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { getKeycloak } from '../keycloak/keycloak';

class Login extends React.Component {
  static propTypes = {
    onSuccess: PropTypes.func,
    onFailure: PropTypes.func,
    redirectTo: PropTypes.string.isRequired,
    location: PropTypes.shape({
      state: PropTypes.shape({
        from: PropTypes.string
      })
    }),
    children: PropTypes.any
  };
  static defaultProps = {
    onSuccess: () => {},
    onFailure: e => console.error(e)
  };
  state = { isLoading: true };

  componentDidMount() {
    this.logIn();
  }

  logIn = () => {
    const keycloak = getKeycloak();
    if (!keycloak.authenticated) {
      try {
        keycloak
          .init({ onLoad: 'login-required', checkLoginIframe: false })
          .success(() => {
            this.setState({ isLoading: false });
            this.props.onSuccess(keycloak.token);
          })
          .error(() => {
            this.props.onFailure('there was an error with initializing keycloak, please check your credentials');
          });
      } catch (e) {
        this.props.onFailure(e);
      }
    }
  };

  render() {
    const keycloak = getKeycloak();
    const { children, redirectTo } = this.props;
    if (!keycloak.token && this.state.isLoading) {
      // fallback to check if initialization of Keycloak is finished.
      if (children) {
        return children;
      }

      return <div>Loading...</div>;
    }
    return (
      // redirect to the assigned path in the props
      <Redirect
        to={{
          pathname: redirectTo
        }}
      />
    );
  }
}

export default Login;
