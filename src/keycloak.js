import Keycloak from "keycloak-js";

// Setup client

const KEYCLOACK_URL = process.env.REACT_APP_KEYCLOAK_URL;
const REALM = process.env.REACT_APP_PARAMETER_REALM;
const CLIENT_ID = process.env.REACT_APP_PARAMETER_CLIENT_ID;

const keycloak = new Keycloak({
  url: `${KEYCLOACK_URL}/auth/`,
  realm: REALM,
  clientId: CLIENT_ID
});

export { keycloak };
