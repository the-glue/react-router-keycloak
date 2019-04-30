import React from "react";
import { Redirect } from "react-router-dom";
import {keycloak} from "../authHelper";

class Logout extends React.Component {
  constructor(props) {
    super(props);
    
    
  }

  componentDidMount(){
    const { user } = this.props;
    logOut(user.isAuthenticated);
  }

  logOut = () => {
    //axios.defaults.headers.common.Authorization = "";
  
    if (keycloak.authenticated) {
      keycloak.logout().success(() => {
        // TODO: seems this code is never called
      });
    }
  };

  render() {
    return <Redirect to="/" />;
  }
}

export default Logout;
