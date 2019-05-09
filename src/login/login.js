import React from "react";
import { keycloak } from "../keycloak";
import { Redirect } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
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
            this.forceUpdate();
            console.log("Authenticate success");
          })
          .error(error => {
            console.log(error);
            this.props.userLoggedIn(false, null);
          });
      } catch (e) {
        console.log(e);
        this.props.userLoggedIn(false, null);
      }
    }
  };

  render() {
    console.log(this.initDone);
    if (!this.initDone) {
      console.log("init not done");
      return <p>Loading...</p>;
    } else {
      console.log("init done");
      return (
        <Redirect
          to={{
            pathname: this.props.path
          }}
        />
      );
    }
  }
}

export { Login };
