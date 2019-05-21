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
  var KEYCLOACK_URL = keycloakUrl;
  var REALM = realm;
  var CLIENT_ID = clientId;

  if (!keycloak) {
    keycloak = new _keycloakJs['default']({
      url: ''.concat(KEYCLOACK_URL, '/auth/'),
      realm: REALM,
      clientId: CLIENT_ID
    });
  }
}

function getKeycloak() {
  if (!keycloak) {
    throw new Error('Please configure keycloak first');
  }

  return keycloak;
}
