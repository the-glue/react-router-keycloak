'use strict';

var _keycloak = require('../keycloak/keycloak');

describe('keycloak', function() {
  test('configureKeycloak should fail when a parameter is missing', function() {
    expect(function() {
      return (0, _keycloak.configureKeycloak)('dummy keycloak url', 'dummy realm');
    }).toThrow('There is no client id configured');
  });
});
