'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.configureKeycloak = configureKeycloak;
exports.getKeycloak = getKeycloak;

var _keycloakJs = _interopRequireDefault(require('keycloak-js'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

// Setup client
var keycloak;

function configureKeycloak(keycloakUrl, realm, clientId) {
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
    keycloak = new _keycloakJs['default']({
      url: ''.concat(keycloakUrl, '/auth/'),
      realm: realm,
      clientId: clientId
    });
  }
}

function getKeycloak() {
  if (!keycloak) {
    throw new Error('Please configure keycloak first');
  }

  return keycloak;
}
