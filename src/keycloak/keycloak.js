import Keycloak from 'keycloak-js';

// Setup client
export let keycloak;

/**
 * Instantiate a keycloak client
 * @param {string} keycloakUrl
 * @param {string|number} realm
 * @param {string|number} clientId
 */
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
      clientId: clientId,
    });
  }
}

/**
 * Get the keycloak instance
 * @returns {Keycloak}
 */
export function getKeycloak() {
  if (!keycloak) {
    throw new Error('Please configure keycloak first');
  }
  return keycloak;
}

/**
 * Calls the keycloak updateToken then calls the onRefresh callback on success if the min validity is reached
 * @param {Function} onRefresh Callback function called on refresh success
 * @param {Number} [minValidity=30] If the token expires within `minValidity` seconds, the token is refreshed.
 */
export const updateToken = (onRefresh, minValidity = 30, loginPath) => {
  const keycloak = getKeycloak();
  keycloak
    .updateToken(minValidity)
    .then((refreshed) => {
      if (refreshed) {
        onRefresh(keycloak.token);
      }
    })
    .catch(function () {
      window.location.replace(loginPath);
    });
};

/**
 * Check if we are authenticated or not on keycloak
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  const keycloak = getKeycloak();
  return keycloak.authenticated;
};
