import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Login from './Login';
import { configureKeycloak } from '../keycloak/keycloak';

describe('Login', () => {
  const location = window.location;
  beforeAll(() => {
    delete window.location;
    window.location = { replace: jest.fn() };
    configureKeycloak('dummy url', 'dummy realm', 'dummy id');
  });

  afterAll(() => {
    window.location = location;
  });

  it('renders without crashing given the required props', () => {
    const props = {
      redirectTo: '/',
      onSuccess: jest.fn(),
      onFailure: jest.fn(),
    };
    const wrapper = renderer
      .create(
        <MemoryRouter initialEntries={['/login']}>
          <Route path="/login" render={(routeProps) => <Login {...props} {...routeProps} />} />
        </MemoryRouter>
      )
      .toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
