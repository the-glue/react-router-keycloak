import React from "react";
import { Redirect } from "react-router-dom";
import {keycloak} from "../authHelper";
import { connect } from "react-redux";
import { userLoggedIn } from "../action";

export class Login extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  componentDidMount(){
    const token = this.logIn();
    console.log(this.props);
  }

  logIn = () => {
    if (!keycloak.isAuthenticated) {
      try {
        keycloak.init({ onLoad: "login-required", checkLoginIframe: false }).success(() => {
          //axios.defaults.headers.common.Authorization = `Bearer ${this.keycloak.token}`;
          //this.props.userLoggedIn();
          console.log(this.props);
        }).error(() => {
        console.log("failed to log in");
      });
      } catch (e) {
        console.log("failed to log in");
        console.log(e)
      }
    }
  };
  
  render() {
    return <h1>Success!</h1>;
  }
  
}

const mapDispatchToProps = (dispatch) =>{
  return {
    userLoggedIn: () => dispatch(userLoggedIn())
  };
}

export default connect(null, mapDispatchToProps)(Login);
