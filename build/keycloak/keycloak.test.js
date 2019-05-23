'use strict';

var _react = _interopRequireDefault(require('react'));

var _enzyme = require('enzyme');

var _keycloak = require('../keycloak/keycloak');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

describe('Keycloak', function() {
  test('configeKeycloak should fail when a parameter is missing', function() {
    expect(function() {
      return (0, _keycloak.configureKeycloak)('dummy keycloak url', 'dummy realm');
    }).toThrow('There is no client id configured');
  });
});
