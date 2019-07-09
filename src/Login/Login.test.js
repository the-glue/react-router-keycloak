import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Login from './Login';
import { configureKeycloak } from '../keycloak/keycloak';

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
          <Route path="/login" render={() => <Login {...props} />} />
        </MemoryRouter>
      )
      .toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
