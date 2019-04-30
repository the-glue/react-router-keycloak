import React from "react";
import {
  Route,
  // Link,
  Redirect
} from "react-router-dom";
import {keycloak} from "../authHelper";

const checkLogin = () => {
  console.log(keycloak)
  updateToken();
  return keycloak.authenticated;
}
const updateToken = () => {
  keycloak.updateToken(30).success(refreshed => {
    if (refreshed) {
      //axios.defaults.headers.common.Authorization = `Bearer ${keycloak.token}`;
    }
  });
};
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      checkLogin() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/log-in",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

/* PrivateRoute.propTypes = {
  component: PropType.func.isRequired,
}; */

export { PrivateRoute };
