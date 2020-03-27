import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { getKeycloak } from '../keycloak/keycloak';

class Login extends React.Component {
  static propTypes = {
    onSuccess: PropTypes.func,
    onFailure: PropTypes.func,
    redirectTo: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        pathname: PropTypes.string,
        search: PropTypes.string,
      }),
    ]),
    location: PropTypes.shape({
      state: PropTypes.shape({
        redirectTo: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.shape({
            pathname: PropTypes.string,
            search: PropTypes.string,
          }),
        ]),
      }),
    }),
    children: PropTypes.node,
  };
  static defaultProps = {
    onSuccess: () => {},
    onFailure: (e) => console.error(e),
  };

  state = {
    loading: true,
  };

  componentDidMount() {
    const { location, onSuccess, onFailure } = this.props;
    const keycloak = getKeycloak();
    keycloak
      .init({ checkLoginIframe: false })
      .then((authenticated) => {
        if (authenticated) {
          // Update the state to re-render so it will redirect to the previous private route
          this.setState({ loading: false });
          // Call the onSuccess callback with the provided keycloak token
          onSuccess(keycloak.token);
        } else {
          if (location.state && location.state.redirectTo) {
            // Store the current path in session storage before leaving the application to log in on keycloak server
            window.sessionStorage.setItem(
              'keycloak-react-router:redirectTo',
              JSON.stringify(location.state.redirectTo)
            );
          }
          // Redirect to keycloak login page
          keycloak.login();
        }
      })
      .catch(() => {
        onFailure('There was an error with initializing keycloak, please check your credentials');
      });
  }
  render() {
    const { children, redirectTo } = this.props;
    const { loading } = this.state;
    if (loading) {
      // display default loading or the one provided as children
      if (children) {
        return children;
      }

      return <div>Connecting...</div>;
    }
    // redirect to the assigned path in the session storage or fallback to the one provided as props
    return (
      <Redirect
        to={JSON.parse(window.sessionStorage.getItem('keycloak-react-router:redirectTo') || 'null') || redirectTo}
      />
    );
  }
}

export default Login;
