"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.keycloak = void 0;

var _keycloakJs = _interopRequireDefault(require("keycloak-js"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

// Setup client
var KEYCLOACK_URL = process.env.REACT_APP_KEYCLOAK_URL;
var REALM = process.env.REACT_APP_PARAMETER_REALM;
var CLIENT_ID = process.env.REACT_APP_PARAMETER_CLIENT_ID;
var keycloak = new _keycloakJs["default"]({
  url: "".concat(KEYCLOACK_URL, "/auth/"),
  realm: REALM,
  clientId: CLIENT_ID
});
exports.keycloak = keycloak;
