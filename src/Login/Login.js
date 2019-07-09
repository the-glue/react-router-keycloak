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
        redirectTo: PropTypes.string
      })
    }),
    children: PropTypes.any
  };
  static defaultProps = {
    onSuccess: () => {},
    onFailure: e => console.error(e)
  };

  state = {
    authenticated: false
  };

  componentDidMount() {
    this.logIn();
  }

  logIn = () => {
    const keycloak = getKeycloak();
    keycloak
      .init()
      .success(authenticated => {
        if (authenticated) {
          // Remove the last redirect path from the session storage
          window.sessionStorage.removeItem('keycloak-react-router:redirectTo');
          // Update the state to re-render so it will redirect to the previous private route
          this.setState({ authenticated });
          // Call the onSuccess callback with the provided keycloak token
          this.props.onSuccess(keycloak.token);
        } else {
          try {
            const { location } = this.props;
            if (location.state && location.state.redirectTo) {
              // Store the current path in session storage before leaving the application to log in on keycloak server
              window.sessionStorage.setItem('keycloak-react-router:redirectTo', location.state.redirectTo);
            }
            // Redirect to keycloak login page
            keycloak.login();
          } catch (e) {
            this.props.onFailure(e);
          }
        }
      })
      .error(() => {
        this.props.onFailure('There was an error with initializing keycloak, please check your credentials');
      });
  };

  render() {
    const { children, redirectTo } = this.props;
    if (!this.state.authenticated) {
      // display default loading or the one provided as children
      if (children) {
        return children;
      }

      return <div>Loading...</div>;
    }
    // redirect to the assigned path in the session storage or fallback to the one provided as props
    return <Redirect to={window.sessionStorage.getItem('keycloak-react-router:redirectTo') || redirectTo} />;
  }
}

export default Login;
