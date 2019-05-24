import Keycloak from 'keycloak-js';

// Setup client
export let keycloak;
export function configureKeycloak(keycloakUrl, realm, clientId) {
  if (!keycloakUrl) {
    throw new Error('There is no Keycloak url configured');
  }
  if (!realm) {
    throw new Error('There is no realm configured');
  }
  if (!clientId) {
    throw new Error('There is no client id configured');
  }
  if (!keycloak) {
    keycloak = new Keycloak({
      url: `${keycloakUrl}/auth/`,
      realm: realm,
      clientId: clientId
    });
  }
}

export function getKeycloak() {
  if (!keycloak) {
    throw new Error('Please configure keycloak first');
  }
  return keycloak;
}
