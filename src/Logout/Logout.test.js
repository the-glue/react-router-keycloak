import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { Logout } from '../index';
import { configureKeycloak } from '../keycloak/keycloak';

describe('Logout', () => {
  beforeAll(() => {
    configureKeycloak('dummy url', 'dummy realm', 'dummy id');
  });
  it('renders without crashing given the required props', () => {
    const props = {
      redirectTo: '/dummy',
      onSuccess: jest.fn()
    };
    const wrapper = renderer
      .create(
        <MemoryRouter initialEntries={['/logout']}>
          <Route path="/logout" render={() => <Logout {...props} />} />
        </MemoryRouter>
      )
      .toJSON();
    expect(wrapper).toMatchSnapshot();
  });
  it('onSuccess should be called when logging out and keycloak is available', () => {
    const props = {
      redirectTo: '/dummy',
      onSuccess: jest.fn()
    };

    renderer
      .create(
        <MemoryRouter initialEntries={['/logout']}>
          <Route path="/logout" render={() => <Logout {...props} />} />
        </MemoryRouter>
      )
      .toJSON();
    expect(props.onSuccess).toHaveBeenCalled();
  });
});
