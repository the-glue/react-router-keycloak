# react-router-keycloak

React components to integrate the Identity Service Component based on KeyCloak.

Consists of:

- Keycloak provider: provide keycloak context to the components
- Login component: authenticate via Keycloak and start a new session
- Logout component: terminate an ongoing session
- Private Route component: check the user token for private routes and refreshes the token if necessary

# Installation

`npm install --save react-router-keycloak`

# Usage

You'll need to add a provider around your application that will pass the context to the other components:

```
import KeycloakProvider, {configureKeycloak} from "react-router-keycloak"

configureKeycloak(KEYCLOAK_URL, REALM, CLIENT_ID);

<KeycloakProvider loginPath="LOGIN_PATH" logoutPath="LOGOUT_PATH" onRefresh="FUNCTION_TO_GET_REFRESHED_TOKEN">
<App/>
</KeycloakProvider>
```

Mount the login, logout and Private route components anywhere in your application. Assign the following function props to the components:

- Login: onSuccess, onFailure, redirectTo and the actual render props from the Route itself
- Logout: onSuccess, redirectTo and the actual render props from the Route itself
- PrivateRoute: path, component

The Login component can contain a child component to have your customized loading element.

```
import { Login, Logout, PrivateRoute } from "react-router-keycloak";

class App extends Component {
  render() {
    return (
        <Router>
          <div>
              <Switch>
                <Route path="/log-in" render={props => <Login onSuccess={this.props.userLoggedIn} redirectTo="/authenticated-only" {...props} />}><div>Loading...</div> </Login>
                <Route path="/log-out" render={props => <Logout onSuccess={this.props.userLoggedOut} redirectTo="log-in" {...props} />} />
                <Route exact path="/" component={Home} />
                <PrivateRoute path="/authenticated-only" component={AuthenticatedOnly} onSuccess={this.props.userLoggedIn} />
              </Switch>
            </div>
          </div>
        </Router>
    );
  }
}
```

To dispatch the function to the store you can do the following:

```
const mapDispatchToProps = (dispatch) =>{
  return {
    userLoggedIn: (token) => dispatch(userLoggedIn(token)),
    userLoggedOut: () => dispatch(userLoggedOut())
  };
}

```

As you can see the userLoggedIn will return a token. This token can be used for further calls to backends.

## Examples:

**reducer.js**

```
function user(state = { isAuthenticated: false }, action) {
  switch (action.type) {
    case USER_LOGGED_IN:
      axios.defaults.headers.common.Authorization = `Bearer ${action.token}`;
      return {
        ...state,
        isAuthenticated: action.isAuthenticated
      };
    case USER_LOGGED_OUT:
      axios.defaults.headers.common.Authorization = "";
      return {
        ...state,
        isAuthenticated: action.isAuthenticated
      };
    default:
      return state;
  }
}
```

**actions.js**

```
export function userLoggedIn(loggedIn, token) {
  return {
    type: USER_LOGGED_IN,
    isAuthenticated: loggedIn,
    token
  };
}

export function userLoggedOut() {

  return {
    type: USER_LOGGED_OUT,
    isAuthenticated: false
  };
}
```

# Contribution

Create a pull request for every change. Make sure unit tests are written and working, run lint and rebuild your files.
