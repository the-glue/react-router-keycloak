import Keycloak from 'keycloak-js';

// Setup client
let keycloak;
export function configureKeycloak(keycloakUrl, realm, clientId) {
  const KEYCLOACK_URL = keycloakUrl;
  const REALM = realm;
  const CLIENT_ID = clientId;
  if (!keycloak) {
    keycloak = new Keycloak({
      url: `${KEYCLOACK_URL}/auth/`,
      realm: REALM,
      clientId: CLIENT_ID
    });
  }
}

export function getKeycloak() {
  if (!keycloak) {
    throw new Error('Please configure keycloak first');
  }
  return keycloak;
}
