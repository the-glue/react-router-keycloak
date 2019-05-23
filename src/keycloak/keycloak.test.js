import React from 'react';
import { shallow } from 'enzyme';
import { configureKeycloak } from '../keycloak/keycloak';

describe('Keycloak', () => {
  test('configeKeycloak should fail when a parameter is missing', () => {
    expect(() => configureKeycloak('dummy keycloak url', 'dummy realm')).toThrow('There is no client id configured');
  });
});
