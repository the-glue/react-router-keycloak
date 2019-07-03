import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { Login } from '../index';
import { configureKeycloak, getKeycloak } from '../keycloak/keycloak';

jest.mock('../keycloak/keycloak');

describe('Login', () => {
  beforeAll(() => {
    configureKeycloak('dummy url', 'dummy realm', 'dummy id');
  });

  it('renders without crashing given the required props', () => {
    const keycloak = {
      authenticated: false,
      token: 'token'
    };
    getKeycloak.mockImplementation(() => Promise.resolve(keycloak));
    const props = {
      redirectTo: '/',
      onSuccess: jest.fn(),
      onFailure: jest.fn()
    };
    const wrapper = renderer
      .create(
        <MemoryRouter initialEntries={['/login']}>
          {' '}
          <Route path="/login" render={() => <Login {...props} />} />
        </MemoryRouter>
      )
      .toJSON();
    expect(wrapper).toMatchSnapshot();
  });
  //todo make this work
  /*it('call onSuccess', () => {
    const props = {
      onSuccess: jest.fn(),
      onFailure: jest.fn()
    };
    const keycloak = {
      init: jest.fn(),
      authenticated: false,
      token: "token"
    }
   //const result = keycloak.init(() => { return {success: jest.fn((callback) => callback) }});
    
    const wrapper = renderer.create(<MemoryRouter initialEntries={['/login']}> <Route path="/login" render={() => <Login {...props} />}/></MemoryRouter>).toJSON();
    
    expect(props.onSuccess).toHaveBeenCalled();
  });*/
});
