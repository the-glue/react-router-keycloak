# react-router-keycloak

React components to integrate the Identity Service Component based on KeyCloak.

## Installation

`npm install --save react-router-keycloak`

## Usage

You'll need to wrap your application in a `KeycloakProvider` which will provide the right context to the other components.

Then use the `Login`, `Logout` and `PrivateRoute` anywhere as you would do with a `react-router` route.

You can pass a child to the `Login` component to display a custom loading if necessary.

The module consists of:

- `configureKeycloak`: instantiate the keycloak library with the right options
  - keycloakUrl: (**required**) The `url` to your keycloak server
  - realm: (**required**) The keycloak `realm` to use
  - clientId: (**required**) The keycloak `client_id` to use
- `KeycloakProvider`: provide keycloak context to the components
  - loginPath: (**required**) A `react-router` path to the Login component
  - logoutPath: (**required**) A `react-router` path to the Logout component
  - onRefresh: (**required**) Called every time the token is refreshed so you can update it locally
  - refreshRate: (**optional**) An interval expressed in seconds before trying to refresh the token. _Default set to 10 seconds_
  - minValidity: (**optional**) If the token expires within `MIN_VALIDITY` seconds, the token is refreshed. _Default set to 30 seconds_
- `Login`: authenticate via Keycloak and start a new session
  - redirectTo: (**required**)
  - onSuccess: (**optional**) Called after a successful login
  - onFailure: (**optional**) Called after a login failure
  - children: (**optional**) Used to display during loading
- `Logout`: terminate an ongoing session
  - redirectTo: (**required**) A `react-router` path to a public component
  - onSuccess: (**optional**) Called after a successful logout
  - children: (**optional**) Used to display during loading
- `PrivateRoute`: check the user token for private routes and refreshes the token if necessary
  - path: (**required**) A `react-router` path to render you component
  - component: (**required**) The component you want to make private

## Example

```jsx harmony
import React from 'react';
import Router, { Route } from 'react-router';
import KeycloakProvider, { configureKeycloak, PrivateRoute, Login, Logout } from 'react-router-keycloak';

const KEYCLOAK_URL = 'The `url` to your keycloak server';
const KEYCLOAK_REALM = 'The keycloak `realm` to use';
const KEYCLOAK_CLIENT_ID = 'The keycloak `client_id` to use';

function handleRefresh(token) {
  console.log('Called every time the token is refreshed so you can update it locally', token);
}

// Initialize a keycloak instance that will be used in every sub-components
configureKeycloak(KEYCLOAK_URL, KEYCLOAK_REALM, KEYCLOAK_CLIENT_ID);

export default () => (
  <KeycloakProvider loginPath="/login" logoutPath="/logout" onRefresh={handleRefresh}>
    <Router>
      <Route exact path="/" render={() => <div>A public home page</div>} />
      <Route path="/login" render={props => <Login redirectTo="/private" {...props} />} />
      <Route path="/log-out" render={props => <Logout redirectTo="/" {...props} />} />
      <PrivateRoute path="/private" component={() => <div>A private page</div>} />
    </Router>
  </KeycloakProvider>
);
```

## Contribution

Create a pull request for every change. Make sure unit tests are written and working, run lint and rebuild your files.
