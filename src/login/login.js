import React from "react";
import { keycloak } from "../keycloak";

class Login extends React.Component {
  componentDidMount() {
    this.logIn();
  }

  logIn = () => {
    if (!keycloak.isAuthenticated) {
      try {
        keycloak
          .init({ onLoad: "login-required", checkLoginIframe: false })
          .success(() => {
            this.props.userLoggedIn(true, keycloak.token);
          })
          .error(() => {
            this.props.userLoggedIn(false, null);
          });
      } catch (e) {
        this.props.userLoggedIn(false, null);
      }
    }
  };

  render() {
    <Redirect
      to={{
        pathname: this.props.path
      }}
    />;
  }
}

export { Login };
