import { configureKeycloak } from '../keycloak/keycloak';

describe('keycloak', () => {
  test('configureKeycloak should fail when a parameter is missing', () => {
    expect(() => configureKeycloak('dummy keycloak url', 'dummy realm')).toThrow('There is no client id configured');
  });
});
