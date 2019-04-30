(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('react-router-dom'), require('keycloak-js'), require('react-redux')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'react-router-dom', 'keycloak-js', 'react-redux'], factory) :
  (global = global || self, factory(global.AuthComponents = {}, global.React, global.reactRouterDom, global.Keycloak, global.reactRedux));
}(this, function (exports, React, reactRouterDom, Keycloak, reactRedux) { 'use strict';

  React = React && React.hasOwnProperty('default') ? React['default'] : React;
  Keycloak = Keycloak && Keycloak.hasOwnProperty('default') ? Keycloak['default'] : Keycloak;

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  const KEYCLOACK_URL = process.env.REACT_APP_KEYCLOAK_URL;
  const REALM = process.env.REACT_APP_PARAMETER_REALM;
  const CLIENT_ID = process.env.REACT_APP_PARAMETER_CLIENT_ID;
  const keycloak = new Keycloak({
    url: `${KEYCLOACK_URL}/auth/`,
    realm: REALM,
    clientId: CLIENT_ID
  });

  const USER_LOGGED_IN = "USER_LOGGED_IN";
  function userLoggedIn() {
    const status = {
      isAuthenticated: true
    };
    return {
      type: USER_LOGGED_IN,
      payload: status
    };
  }

  class Login extends React.Component {
    constructor(props) {
      super(props);

      _defineProperty(this, "logIn", () => {
        if (!keycloak.isAuthenticated) {
          try {
            keycloak.init({
              onLoad: "login-required",
              checkLoginIframe: false
            }).success(() => {
              //axios.defaults.headers.common.Authorization = `Bearer ${this.keycloak.token}`;
              this.props.userLoggedIn();
              console.log(this.props);
            }).error(() => {
              console.log("failed to log in");
            });
          } catch (e) {
            console.log("failed to log in");
            console.log(e);
          }
        }
      });

      console.log(props);
    }

    componentDidMount() {
      const token = this.logIn();
      console.log(this.props);
    }

    render() {
      return React.createElement("h1", null, "Success!");
    }

  }

  const mapDispatchToProps = dispatch => {
    return {
      userLoggedIn: () => dispatch(userLoggedIn())
    };
  };

  reactRedux.connect(null, mapDispatchToProps)(Login);

  class Logout extends React.Component {
    constructor(props) {
      super(props);

      _defineProperty(this, "logOut", () => {
        //axios.defaults.headers.common.Authorization = "";
        if (keycloak.authenticated) {
          keycloak.logout().success(() => {// TODO: seems this code is never called
          });
        }
      });
    }

    componentDidMount() {
      const {
        user
      } = this.props;
      logOut(user.isAuthenticated);
    }

    render() {
      return React.createElement(reactRouterDom.Redirect, {
        to: "/"
      });
    }

  }

  const checkLogin = () => {
    console.log(keycloak);
    updateToken();
    return keycloak.authenticated;
  };

  const updateToken = () => {
    keycloak.updateToken(30).success(refreshed => {
    });
  };

  const PrivateRoute = ({
    component: Component,
    ...rest
  }) => React.createElement(reactRouterDom.Route, _extends({}, rest, {
    render: props => checkLogin() ? React.createElement(Component, props) : React.createElement(reactRouterDom.Redirect, {
      to: {
        pathname: "/log-in",
        state: {
          from: props.location
        }
      }
    })
  }));

  exports.Login = Login;
  exports.PrivateRoute = PrivateRoute;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
