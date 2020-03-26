import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Login from './Login';
import { configureKeycloak } from '../keycloak/keycloak';

window.location.replace = jest.fn();

describe('Login', () => {
  beforeAll(() => {
    configureKeycloak('dummy url', 'dummy realm', 'dummy id');
  });

  it('renders without crashing given the required props', () => {
    const props = {
      redirectTo: '/',
      onSuccess: jest.fn(),
      onFailure: jest.fn()
    };
    const wrapper = renderer
      .create(
        <MemoryRouter initialEntries={['/login']}>
          <Route path="/login" render={routeProps => <Login {...props} {...routeProps} />} />
        </MemoryRouter>
      )
      .toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
