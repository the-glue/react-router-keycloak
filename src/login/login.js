import React from "react";
import { Redirect } from "react-router-dom";
import { keycloak } from "../keycloak";

class Login extends React.Component {
  constructor(props) {
    super(props);
    //log in should occur before the components are rendered.
    this.logIn();
    this.initDone = false;
  }

  logIn = () => {
    if (!keycloak.authenticated) {
      try {
        keycloak
          .init({ onLoad: "login-required", checkLoginIframe: false })
          .success(() => {
            this.initDone = true;
            this.props.userLoggedIn(true, keycloak.token);
            // component is not rerendered on a local variable, force update to rerender this component and to make sure there is a redirect.
            this.forceUpdate();
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
    if (!this.initDone) {
      // fallback to check if initialization of Keycloak is finished.
      return <p>Loading...</p>;
    }
    return (
      // redirect to the assigned path in the props
      <Redirect
        to={{
          pathname: this.props.path
        }}
      />
    );
  }
}

export { Login };
