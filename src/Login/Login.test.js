import React from 'react';
import renderer from 'react-test-renderer';
import { Login } from '../index';
import { configureKeycloak } from '../keycloak/keycloak';

describe('Login', () => {
  beforeAll(() => {
    configureKeycloak('dummy url', 'dummy realm', 'dummy id');
  });
  it('renders without crashing given the required props', () => {
    const props = {
      onSuccess: jest.fn(),
      onFailure: jest.fn()
    };
    const wrapper = renderer.create(<Login {...props} />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
