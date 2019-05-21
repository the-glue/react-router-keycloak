'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.keycloakConfig = keycloakConfig;
exports.keycloak = void 0;

var _keycloakJs = _interopRequireDefault(require('keycloak-js'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

// Setup client
var keycloak;
exports.keycloak = keycloak;

function keycloakConfig(keycloakUrl, realm, clientId) {
  var KEYCLOACK_URL = keycloakUrl;
  var REALM = realm;
  var CLIENT_ID = clientId;
  console.log('we are getting in keycloak init');

  if (!keycloak) {
    exports.keycloak = keycloak = new _keycloakJs['default']({
      url: ''.concat(KEYCLOACK_URL, '/auth/'),
      realm: REALM,
      clientId: CLIENT_ID
    });
  }
}
