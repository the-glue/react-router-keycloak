import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { keycloak } from "../keycloak";

class Logout extends Component {
  constructor(props) {
    super(props);
    this.logOut();
    this.props.userLoggedOut();
  }

  logOut = () => {
    if (keycloak.authenticated) {
      keycloak.logout().success(() => {
        this.props.userLoggedOut();
      });
    }
  };

  render() {
    return <Redirect to="/" />;
  }
}

export { Logout };
