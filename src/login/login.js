import React from "react";
import { keycloak } from "../keycloak";
import { Redirect } from "react-router-dom";

class Login extends React.Component {
  componentDidMount() {
    this.logIn();
  }

  logIn = () => {
    if (!keycloak.authenticated) {
      try {
        keycloak
          .init({ onLoad: "login-required", checkLoginIframe: false })
          .success(() => {
            this.props.userLoggedIn(true, keycloak.token);
          })
          .error(error => {
            console.log(error);
            this.props.userLoggedIn(false, null);
          });
      } catch (e) {
        this.props.userLoggedIn(false, null);
      }
    }
  };

  render() {
    console.log("Authenticated: " + keycloak.authenticated);
    console.log("isAuthenticated: " + keycloak.isAuthenticated);
    if (!keycloak.authenticated) {
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
