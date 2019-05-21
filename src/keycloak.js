import Keycloak from 'keycloak-js';

// Setup client
export let keycloak;
export function keycloakConfig(keycloakUrl, realm, clientId) {
  const KEYCLOACK_URL = keycloakUrl;
  const REALM = realm;
  const CLIENT_ID = clientId;
  console.log('we are getting in keycloak init');
  if (!keycloak) {
    keycloak = new Keycloak({
      url: `${KEYCLOACK_URL}/auth/`,
      realm: REALM,
      clientId: CLIENT_ID
    });
  }
}
