import React from "react";
import { keycloak } from "../keycloak";
import { Redirect } from "react-router-dom";

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
    if (!keycloak.isAuthenticated) {
      // TODO: Create a meaningfull error page
      return (
        <Redirect
          to={{
            pathname: "/"
          }}
        />
      );
    }

    return (
      <Redirect
        to={{
          pathname: this.props.path
        }}
      />
    );
  }
}

export { Login };
